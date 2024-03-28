import { System, Protobuf, StringBytes} from "@koinos/sdk-as";
import {collections} from "./proto/collections";
import {common} from "@koinosbox/contracts";

export class Nft {
    _contractId: Uint8Array;
    constructor(contractId: Uint8Array) {
        this._contractId = contractId;
    }

    /**
     * Get balance of an account
     * @external
     * @readonly
     */
    balance_of(args: collections.balance_of_arguments): collections.uint64_object {
        const argsBuffer = Protobuf.encode(args, collections.balance_of_arguments.encode);
        const callRes = System.call(this._contractId, 1550980247, argsBuffer);
        if (callRes.code != 0) {
            const errorMessage = `failed to call 'Nft.balance_of': ${callRes.res.error && callRes.res.error!.message ? callRes.res.error!.message! : "unknown error"}`;
            System.exit(callRes.code, StringBytes.stringToBytes(errorMessage));
        }
        if (!callRes.res.object) return new collections.uint64_object(0);
        return Protobuf.decode<collections.uint64_object>(callRes.res.object!, collections.uint64_object.decode);
    }

    /**
     * Get balance of an account
     * @external
     * @event collections.transfer_event collections.transfer_arguments
     */
    transfer(args: collections.transfer_arguments): void {
        const argsBuffer = Protobuf.encode(args, collections.transfer_arguments.encode);
        const callRes = System.call(this._contractId, 670398154, argsBuffer);
        if (callRes.code != 0) {
            const errorMessage = `failed to call 'Nft.transfer': ${callRes.res.error && callRes.res.error!.message ? callRes.res.error!.message! : "unknown error"}`;
            System.exit(callRes.code, StringBytes.stringToBytes(errorMessage));
        }
        return;
    }

    /**
     * Get the owner of a token
     * @external
     * @readonly
     */
    owner_of(args: collections.owner_of_arguments): collections.address_object {
        const argsBuffer = Protobuf.encode(args, collections.owner_of_arguments.encode);
        const callRes = System.call(this._contractId, 3982608455, argsBuffer);
        if (callRes.code != 0) {
            const errorMessage = `failed to call 'Nft.owner_of': ${callRes.res.error && callRes.res.error!.message ? callRes.res.error!.message! : "unknown error"}`;
            System.exit(callRes.code, StringBytes.stringToBytes(errorMessage));
        }
        if (!callRes.res.object) return new collections.address_object();
        return Protobuf.decode<collections.address_object>(callRes.res.object!, collections.address_object.decode);
    }

    get_timestamp(args: collections.get_timestamp_arguments): collections.uint64_object {
        const argsBuffer = Protobuf.encode(args, collections.get_timestamp_arguments.encode);
        const callRes = System.call(this._contractId, 0x05720ff8, argsBuffer);
        if (callRes.code != 0) {
          const errorMessage = `failed to call 'Nft.get_timestamp': ${callRes.res.error && callRes.res.error!.message ? callRes.res.error!.message! : "unknown error"}`;
          System.exit(callRes.code, StringBytes.stringToBytes(errorMessage));
        }
        if (!callRes.res.object) return new collections.uint64_object();
        return Protobuf.decode<collections.uint64_object>(callRes.res.object!, collections.uint64_object.decode);
      }
    

    /**
     * Grant permissions to other account to manage a specific Token owned
     * by the user. The user must approve only the accounts he trust.
     * @external
     * @event collections.token_approval_event collections.approve_arguments
     */
    approve(args: collections.approve_arguments): void {
        const argsBuffer = Protobuf.encode(args, collections.approve_arguments.encode);
        const callRes = System.call(this._contractId, 1960973952, argsBuffer);
        if (callRes.code != 0) {
            const errorMessage = `failed to call 'Nft.approve': ${callRes.res.error && callRes.res.error!.message ? callRes.res.error!.message! : "unknown error"}`;
            System.exit(callRes.code, StringBytes.stringToBytes(errorMessage));
        }
        return;
    }
    /**
     * Get total supply
     * @external
     * @readonly
     */
    total_supply(): common.uint64 {
        const argsBuffer = new Uint8Array(0);
        const callRes = System.call(this._contractId, 2967091508, argsBuffer);
        if (callRes.code != 0) {
            const errorMessage = `failed to call 'Nft.total_supply': ${callRes.res.error && callRes.res.error!.message ? callRes.res.error!.message! : "unknown error"}`;
            System.exit(callRes.code, StringBytes.stringToBytes(errorMessage));
        }
        if (!callRes.res.object) return new common.uint64(0);
        return Protobuf.decode<common.uint64>(callRes.res.object!, common.uint64.decode);
    }

}
