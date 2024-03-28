import { Storage, Arrays, Protobuf, System, SafeMath, authority, error, Base58 } from "@koinos/sdk-as";
import { token } from "./proto/token";
import { SupplyStorage } from "./state/SupplyStorage";
import { BalancesStorage } from "./state/BalancesStorage";
import { common } from "@koinosbox/contracts";
import { Main } from "./Main";

const SUPPLY_SPACE_ID = 0;
const BALANCES_SPACE_ID = 1;
const ALLOWANCES_SPACE_ID = 2;
const VAULTS_SPACE_ID = 3;

export class Token {
  callArgs: System.getArgumentsReturn | null;
  // SETTINGS BEGIN
  _name: string = "Koinos Garden";
  _symbol: string = "KG";
  _decimals: u32 = 8;

  // set _maxSupply to zero if there is no max supply
  // if set to zero, the supply would still be limited by how many tokens can fit in a u64 (u64.MAX_VALUE)
  _maxSupply: u64 = 10000000000000000; // 100 million
  _maxRewards: u64 = 4000000000000000; // 40 million
  _kg_contract: Uint8Array = Base58.decode("13KDXJTZLekVWzFu4zF72yfMEzKz6DPNET");
  _script_wallet: Uint8Array = Base58.decode("1NPvJuEDhjLuW3VbGqAQe4MdSWSB3YWxK1");
  // _nft_contract: Uint8Array = Base58.decode("17tjCXtqqpM2nYtDXS6omQQr8GCJ2HMSE");
  _nft_contract: Uint8Array = Base58.decode("1BiETH1WgXZTGW9yT72NWqEv2dgTKtpjBg");
  // SETTINGS END

  _contractId: Uint8Array = System.getContractId();
  _supplyStorage: SupplyStorage = new SupplyStorage(this._contractId);
  _balancesStorage: BalancesStorage = new BalancesStorage(this._contractId);
  // _starting_timestamp: u64 = 1709058600000; // 2024/02/28
  starting_timestamp: Storage.Obj<common.uint64> = new Storage.Obj(this._contractId, 2, common.uint64.decode, common.uint64.encode, () => new common.uint64(1709749800000)); // 2024/03/7
  _per_day_reward: u64 = 1000000000;

  allowances: Storage.Map<Uint8Array, token.uint64> = new Storage.Map(
    this._contractId,
    ALLOWANCES_SPACE_ID,
    token.uint64.decode,
    token.uint64.encode,
    () => new token.uint64(0)
  );



  name(args: token.name_arguments): token.name_result {
    return new token.name_result(this._name);
  }

  symbol(args: token.symbol_arguments): token.symbol_result {
    return new token.symbol_result(this._symbol);
  }

  decimals(args: token.decimals_arguments): token.decimals_result {
    return new token.decimals_result(this._decimals);
  }

  total_supply(args: token.total_supply_arguments): token.total_supply_result {
    const supply = this._supplyStorage.get()!;

    const res = new token.total_supply_result();
    res.value = supply.value;

    return res;
  }

  max_supply(args: token.max_supply_arguments): token.max_supply_result {
    return new token.max_supply_result(this._maxSupply);
  }

  balance_of(args: token.balance_of_arguments): token.balance_of_result {
    const owner = args.owner;

    const balanceObj = this._balancesStorage.get(owner)!;

    const res = new token.balance_of_result();
    res.value = balanceObj.value;

    return res;
  }

  /**
   * Internal function to check if the account triggered
   * the operation, or if another account is authorized
   */
  check_authority(account: Uint8Array, amount: u64): boolean {
    // check if the user authorized the caller
    const caller = System.getCaller().caller;
    if (caller && caller.length > 0) {
      const key = new Uint8Array(50);
      key.set(account, 0);
      key.set(caller, 25);
      const allowance = this.allowances.get(key)!;
      if (allowance.value >= amount) {
        // spend allowance
        allowance.value -= amount;
        this.allowances.put(key, allowance);
        return true;
      }
    }

    // check if the operation is authorized directly by the user
    if (
      System.checkAuthority(authority.authorization_type.contract_call, account)
    )
      return true;

    return false;
  }

  _approve(args: token.approve_arguments): void {
    const key = new Uint8Array(50);
    key.set(args.owner, 0);
    key.set(args.spender, 25);
    this.allowances.put(key, new token.uint64(args.value));

    const impacted = [args.spender, args.owner];
    System.event(
      "token.approve_event",
      Protobuf.encode<token.approve_arguments>(args, token.approve_arguments.encode),
      impacted
    );
  }


  _transfer(args: token.transfer_arguments): void {
    const from = args.from;
    const to = args.to;
    const value = args.value;

    const fromBalance = this._balancesStorage.get(from)!;
    System.require(
      fromBalance.value >= args.value,
      "account 'from' has insufficient balance"
    );

    fromBalance.value -= args.value;
    this._balancesStorage.put(from, fromBalance);


    const toBalance = this._balancesStorage.get(to)!;
    toBalance.value += args.value;

    this._balancesStorage.put(to, toBalance);

    const impacted = [args.to, args.from];
    const transferEvent = new token.transfer_event(from, to, value);

    System.event('koinos.contracts.token.transfer_event', Protobuf.encode(transferEvent, token.transfer_event.encode), impacted);

  }

  // transfer(args: token.transfer_arguments): token.empty_message {
  //   const from = args.from;
  //   const to = args.to;
  //   const value = args.value;

  //   System.require(!Arrays.equal(from, to), 'Cannot transfer to self');

  //   System.require(
  //     Arrays.equal(System.getCaller().caller, args.from) ||
  //     System.checkAuthority(authority.authorization_type.contract_call, args.from, System.getArguments().args),
  //     "'from' has not authorized transfer",
  //     error.error_code.authorization_failure
  //   );

  //   const fromBalance = this._balancesStorage.get(from)!;

  //   System.require(fromBalance.value >= value, "'from' has insufficient balance");

  //   const toBalance = this._balancesStorage.get(to)!;

  //   // the balances cannot hold more than the supply, so we don't check for overflow/underflow
  //   fromBalance.value -= value;
  //   toBalance.value += value;

  //   this._balancesStorage.put(from, fromBalance);
  //   this._balancesStorage.put(to, toBalance);

  //   const transferEvent = new token.transfer_event(from, to, value);
  //   const impacted = [to, from];

  //   System.event('koinos.contracts.token.transfer_event', Protobuf.encode(transferEvent, token.transfer_event.encode), impacted);

  //   return new token.empty_message();
  // }

  transfer(args: token.transfer_arguments): token.empty_message {
    const isAuthorized = this.check_authority(args.from, args.value);
    System.require(isAuthorized, "from has not authorized transfer");
    this._transfer(args);
    return new token.empty_message();
  }

  mint(args: token.mint_arguments): token.empty_message {
    const to = args.to;
    const value = args.value;

    System.requireAuthority(authority.authorization_type.contract_call, this._script_wallet);

    const supply = this._supplyStorage.get()!;

    const newSupply = SafeMath.tryAdd(supply.value, value);

    System.require(!newSupply.error, 'Mint would overflow supply');

    System.require(this._maxSupply == 0 || newSupply.value <= this._maxSupply, 'Mint would overflow max supply');

    const toBalance = this._balancesStorage.get(to)!;
    toBalance.value += value;

    supply.value = newSupply.value;

    this._supplyStorage.put(supply);
    this._balancesStorage.put(to, toBalance);

    const mintEvent = new token.mint_event(to, value);
    const impacted = [to];

    System.event('koinos.contracts.token.mint_event', Protobuf.encode(mintEvent, token.mint_event.encode), impacted);

    return new token.empty_message();
  }

  drop_rewards(args: token.drop_rewards_arguments): token.empty_message {
    const to = args.to as Uint8Array[];
    System.requireAuthority(authority.authorization_type.contract_call, this._script_wallet);

    const dao_contract = new Main(this._kg_contract);
    
    for (let i = 0; i < to.length; i++) {

      if(Arrays.equal(to[i], Base58.decode("1MJUUXcKV7s1bYUqPSJ5NoMoAe4zQ4J1My"))){
        continue;
      }

      const vault_count = dao_contract.getMyLockedVaultsCount(new common.address(to[i])).value;

      if(vault_count == 0){
        continue;
      }

      const daysElapsed: u64 = this.get_timestamp().value;


      // Calculate the total reward based on the formula
      let totalAmount: u64 = (vault_count * this._per_day_reward) * daysElapsed; 


      const supply = this._supplyStorage.get()!;
      const newSupply = SafeMath.tryAdd(supply.value, totalAmount);
      System.require(newSupply.value <= this._maxRewards, 'Mint would overflow max reward limit');
      this.mint(new token.mint_arguments(to[i], totalAmount));
    }

    this.starting_timestamp.put(new common.uint64(System.getHeadInfo().head_block_time));
    return new token.empty_message();
  }

  
  get_vault_count(
    args: token.get_vault_count_arguments
  ): token.get_vault_count_result {
    const address = args.address;

    const dao_contract = new Main(this._kg_contract);

    const vault_count = dao_contract.getMyLockedVaultsCount(new common.address(address)).value;
    // YOUR CODE HERE

    const res = new token.get_vault_count_result();
    res.value = vault_count;

    return res;
  }

  get_timestamp(): token.uint64_object {

    // YOUR CODE HE
    const res = new token.uint64_object();
    const timestamp = this.starting_timestamp.get()!.value;

    const millisecondsInDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const timeDifference = System.getHeadInfo().head_block_time - timestamp;
    const daysDifference = timeDifference / millisecondsInDay;

    res.value = daysDifference;
    return res;
  }


  // last_drop_time(args: token.last_drop_time_arguments): common.uint64 {
  //   // YOUR CODE HERE

  //   const res = new common.uint64();
  //   res.value = this.starting_timestamp.get()!.value;

  //   return res;
  // }

  set_last_time(args: token.set_last_time_arguments): token.empty_message {
    const value = args.value;
    System.requireAuthority(authority.authorization_type.contract_call, this._script_wallet);

    // YOUR CODE HERE
    this.starting_timestamp.put(new common.uint64(value));
    const res = new token.empty_message();

    return res;
  }

  burn(args: token.burn_arguments): token.empty_message {
    const from = args.from;
    const value = args.value;

    System.require(
      Arrays.equal(System.getCaller().caller, args.from) ||
      System.checkAuthority(authority.authorization_type.contract_call, args.from, System.getArguments().args),
      "'from' has not authorized transfer",
      error.error_code.authorization_failure
    );

    const fromBalance = this._balancesStorage.get(from)!;

    System.require(fromBalance.value >= value, "'from' has insufficient balance");

    const supply = this._supplyStorage.get()!;

    const newSupply = SafeMath.sub(supply.value, value);

    supply.value = newSupply;
    fromBalance.value -= value;

    this._supplyStorage.put(supply);
    this._balancesStorage.put(from, fromBalance);

    const burnEvent = new token.burn_event(from, value);
    const impacted = [from];

    System.event('koinos.contracts.token.burn_event', Protobuf.encode(burnEvent, token.burn_event.encode), impacted);

    return new token.empty_message();
  }


  approve(args: token.approve_arguments): token.empty_message {
    const owner = args.owner;
    const spender = args.spender;
    const value = args.value;

    const isAuthorized = System.checkAuthority(authority.authorization_type.contract_call, owner);
    System.require(isAuthorized, "approve operation not authorized");
    this._approve(args);

    const res = new token.empty_message();

    return res;
  }

  allowance(args: token.allowance_arguments): token.allowance_result {
    const owner = args.owner;
    const spender = args.spender;

    const res = new token.allowance_result();

    const key = new Uint8Array(50);
    key.set(owner, 0);
    key.set(spender, 25);

    res.value =  this.allowances.get(key)!.value;
    return res;
  }

  get_allowances(
    args: token.get_allowances_arguments
  ): token.get_allowances_result {
    // const owner = args.owner;
    // const start = args.start;
    // const limit = args.limit;
    // const direction = args.direction;


    let key = new Uint8Array(50);
    key.set(args.owner, 0);
    key.set(args.start ? args.start : new Uint8Array(0), 25);
    const result = new token.get_allowances_result(args.owner, []);
    for (let i = 0; i < args.limit; i += 1) {
      const nextAllowance =
        args.direction == token.direction.ascending
          ? this.allowances.getNext(key)
          : this.allowances.getPrev(key);
      if (
        !nextAllowance ||
        !Arrays.equal(args.owner, nextAllowance.key!.slice(0, 25))
      )
        break;
      const spender = nextAllowance.key!.slice(25);
      result.allowances.push(
        new token.spender_value(spender, nextAllowance.value.value)
      );
      key = nextAllowance.key!;
    }
    return result;
  }


}
