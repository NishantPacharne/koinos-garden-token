import { System, Protobuf, authority } from "@koinos/sdk-as";
import { token } from "./proto/token";

export class Token {
  name(args: token.name_arguments): token.name_result {
    // YOUR CODE HERE

    const res = new token.name_result();
    // res.value = ;

    return res;
  }

  symbol(args: token.symbol_arguments): token.symbol_result {
    // YOUR CODE HERE

    const res = new token.symbol_result();
    // res.value = ;

    return res;
  }

  decimals(args: token.decimals_arguments): token.decimals_result {
    // YOUR CODE HERE

    const res = new token.decimals_result();
    // res.value = ;

    return res;
  }

  total_supply(args: token.total_supply_arguments): token.total_supply_result {
    // YOUR CODE HERE

    const res = new token.total_supply_result();
    // res.value = ;

    return res;
  }

  max_supply(args: token.max_supply_arguments): token.max_supply_result {
    // YOUR CODE HERE

    const res = new token.max_supply_result();
    // res.value = ;

    return res;
  }

  balance_of(args: token.balance_of_arguments): token.balance_of_result {
    // const owner = args.owner;

    // YOUR CODE HERE

    const res = new token.balance_of_result();
    // res.value = ;

    return res;
  }

  transfer(args: token.transfer_arguments): token.empty_message {
    // const from = args.from;
    // const to = args.to;
    // const value = args.value;

    // YOUR CODE HERE

    const res = new token.empty_message();

    return res;
  }

  mint(args: token.mint_arguments): token.empty_message {
    // const to = args.to;
    // const value = args.value;

    // YOUR CODE HERE

    const res = new token.empty_message();

    return res;
  }

  get_vault_count(
    args: token.get_vault_count_arguments
  ): token.get_vault_count_result {
    // const address = args.address;

    // YOUR CODE HERE

    const res = new token.get_vault_count_result();
    // res.value = ;

    return res;
  }

  drop_rewards(args: token.drop_rewards_arguments): token.empty_message {
    // const to = args.to;

    // YOUR CODE HERE

    const res = new token.empty_message();

    return res;
  }

  set_last_time(args: token.set_last_time_arguments): token.empty_message {
    // const value = args.value;

    // YOUR CODE HERE

    const res = new token.empty_message();

    return res;
  }

  burn(args: token.burn_arguments): token.empty_message {
    // const from = args.from;
    // const value = args.value;

    // YOUR CODE HERE

    const res = new token.empty_message();

    return res;
  }

  approve(args: token.approve_arguments): token.empty_message {
    // const owner = args.owner;
    // const spender = args.spender;
    // const value = args.value;

    // YOUR CODE HERE

    const res = new token.empty_message();

    return res;
  }

  allowance(args: token.allowance_arguments): token.allowance_result {
    // const owner = args.owner;
    // const spender = args.spender;

    // YOUR CODE HERE

    const res = new token.allowance_result();
    // res.value = ;

    return res;
  }

  get_allowances(
    args: token.get_allowances_arguments
  ): token.get_allowances_result {
    // const owner = args.owner;
    // const start = args.start;
    // const limit = args.limit;
    // const direction = args.direction;

    // YOUR CODE HERE

    const res = new token.get_allowances_result();
    // res.owner = ;
    // res.allowances = ;

    return res;
  }
}
