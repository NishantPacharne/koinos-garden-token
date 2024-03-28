import { System, Protobuf, StringBytes} from "@koinos/sdk-as";
import {collections} from "./proto/collections";
import {common} from "@koinosbox/contracts";

export class Main {
    _contractId: Uint8Array;
    constructor(contractId: Uint8Array) {
        this._contractId = contractId;
    }

      /**
   * Get count of my created vaults
   * @external
   * @readonly
   */

    getMyLockedVaultsCount(args: common.address): common.uint64 {
        const argsBuffer = Protobuf.encode(args, common.address.encode);
        const callRes = System.call(this._contractId, 1533520474, argsBuffer);
        if (callRes.code != 0) {
            const errorMessage = `failed to call 'Nft.balance_of': ${callRes.res.error && callRes.res.error!.message ? callRes.res.error!.message : "unknown error"}`;
            System.exit(callRes.code, StringBytes.stringToBytes(errorMessage));
        }
        if (!callRes.res.object) return new common.uint64(0);
        return Protobuf.decode<common.uint64>(callRes.res.object, common.uint64.decode);
    }

}
