import { System, Protobuf, authority } from "@koinos/sdk-as";
import { Token as ContractClass } from "./Token";
import { token as ProtoNamespace } from "./proto/token";

export function main(): i32 {
  const contractArgs = System.getArguments();
  let retbuf = new Uint8Array(1024);

  const c = new ContractClass();

  switch (contractArgs.entry_point) {
    case 0x82a3537f: {
      const args = Protobuf.decode<ProtoNamespace.name_arguments>(
        contractArgs.args,
        ProtoNamespace.name_arguments.decode
      );
      const res = c.name(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.name_result.encode);
      break;
    }

    case 0xb76a7ca1: {
      const args = Protobuf.decode<ProtoNamespace.symbol_arguments>(
        contractArgs.args,
        ProtoNamespace.symbol_arguments.decode
      );
      const res = c.symbol(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.symbol_result.encode);
      break;
    }

    case 0xee80fd2f: {
      const args = Protobuf.decode<ProtoNamespace.decimals_arguments>(
        contractArgs.args,
        ProtoNamespace.decimals_arguments.decode
      );
      const res = c.decimals(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.decimals_result.encode);
      break;
    }

    case 0xb0da3934: {
      const args = Protobuf.decode<ProtoNamespace.total_supply_arguments>(
        contractArgs.args,
        ProtoNamespace.total_supply_arguments.decode
      );
      const res = c.total_supply(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.total_supply_result.encode);
      break;
    }

    case 0x02c683fd: {
      const args = Protobuf.decode<ProtoNamespace.max_supply_arguments>(
        contractArgs.args,
        ProtoNamespace.max_supply_arguments.decode
      );
      const res = c.max_supply(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.max_supply_result.encode);
      break;
    }

    case 0x5c721497: {
      const args = Protobuf.decode<ProtoNamespace.balance_of_arguments>(
        contractArgs.args,
        ProtoNamespace.balance_of_arguments.decode
      );
      const res = c.balance_of(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.balance_of_result.encode);
      break;
    }

    case 0x27f576ca: {
      const args = Protobuf.decode<ProtoNamespace.transfer_arguments>(
        contractArgs.args,
        ProtoNamespace.transfer_arguments.decode
      );
      const res = c.transfer(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0xdc6f17bb: {
      const args = Protobuf.decode<ProtoNamespace.mint_arguments>(
        contractArgs.args,
        ProtoNamespace.mint_arguments.decode
      );
      const res = c.mint(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0x6c00a4eb: {
      const args = Protobuf.decode<ProtoNamespace.get_vault_count_arguments>(
        contractArgs.args,
        ProtoNamespace.get_vault_count_arguments.decode
      );
      const res = c.get_vault_count(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.get_vault_count_result.encode
      );
      break;
    }

    case 0xa45f6792: {
      const args = Protobuf.decode<ProtoNamespace.drop_rewards_arguments>(
        contractArgs.args,
        ProtoNamespace.drop_rewards_arguments.decode
      );
      const res = c.drop_rewards(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0x96664b72: {
      const args = Protobuf.decode<ProtoNamespace.set_last_time_arguments>(
        contractArgs.args,
        ProtoNamespace.set_last_time_arguments.decode
      );
      const res = c.set_last_time(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0x859facc5: {
      const args = Protobuf.decode<ProtoNamespace.burn_arguments>(
        contractArgs.args,
        ProtoNamespace.burn_arguments.decode
      );
      const res = c.burn(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0x74e21680: {
      const args = Protobuf.decode<ProtoNamespace.approve_arguments>(
        contractArgs.args,
        ProtoNamespace.approve_arguments.decode
      );
      const res = c.approve(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0x32f09fa1: {
      const args = Protobuf.decode<ProtoNamespace.allowance_arguments>(
        contractArgs.args,
        ProtoNamespace.allowance_arguments.decode
      );
      const res = c.allowance(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.allowance_result.encode);
      break;
    }

    case 0x8fa16456: {
      const args = Protobuf.decode<ProtoNamespace.get_allowances_arguments>(
        contractArgs.args,
        ProtoNamespace.get_allowances_arguments.decode
      );
      const res = c.get_allowances(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.get_allowances_result.encode
      );
      break;
    }

    default:
      System.exit(1);
      break;
  }

  System.exit(0, retbuf);
  return 0;
}

main();
