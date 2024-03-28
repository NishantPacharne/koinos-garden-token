import { Writer, Reader } from "as-proto";

export namespace common {
  export class str {
    static encode(message: str, writer: Writer): void {
      if (message.value.length != 0) {
        writer.uint32(10);
        writer.string(message.value);
      }
    }

    static decode(reader: Reader, length: i32): str {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new str();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: string;

    constructor(value: string = "") {
      this.value = value;
    }
  }

  @unmanaged
  export class uint32 {
    static encode(message: uint32, writer: Writer): void {
      if (message.value != 0) {
        writer.uint32(8);
        writer.uint32(message.value);
      }
    }

    static decode(reader: Reader, length: i32): uint32 {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new uint32();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u32;

    constructor(value: u32 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class uint64 {
    static encode(message: uint64, writer: Writer): void {
      if (message.value != 0) {
        writer.uint32(8);
        writer.uint64(message.value);
      }
    }

    static decode(reader: Reader, length: i32): uint64 {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new uint64();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class boole {
    static encode(message: boole, writer: Writer): void {
      if (message.value != false) {
        writer.uint32(8);
        writer.bool(message.value);
      }
    }

    static decode(reader: Reader, length: i32): boole {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new boole();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  export class address {
    static encode(message: address, writer: Writer): void {
      if (message.account.length != 0) {
        writer.uint32(10);
        writer.bytes(message.account);
      }
    }

    static decode(reader: Reader, length: i32): address {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new address();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array;

    constructor(account: Uint8Array = new Uint8Array(0)) {
      this.account = account;
    }
  }

  export class list_args {
    static encode(message: list_args, writer: Writer): void {
      if (message.start.length != 0) {
        writer.uint32(10);
        writer.bytes(message.start);
      }

      if (message.limit != 0) {
        writer.uint32(16);
        writer.int32(message.limit);
      }

      if (message.direction != 0) {
        writer.uint32(24);
        writer.int32(message.direction);
      }
    }

    static decode(reader: Reader, length: i32): list_args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.start = reader.bytes();
            break;

          case 2:
            message.limit = reader.int32();
            break;

          case 3:
            message.direction = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    start: Uint8Array;
    limit: i32;
    direction: direction;

    constructor(
      start: Uint8Array = new Uint8Array(0),
      limit: i32 = 0,
      direction: direction = 0
    ) {
      this.start = start;
      this.limit = limit;
      this.direction = direction;
    }
  }

  export class addresses {
    static encode(message: addresses, writer: Writer): void {
      const unique_name_accounts = message.accounts;
      if (unique_name_accounts.length !== 0) {
        for (let i = 0; i < unique_name_accounts.length; ++i) {
          writer.uint32(10);
          writer.bytes(unique_name_accounts[i]);
        }
      }
    }

    static decode(reader: Reader, length: i32): addresses {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new addresses();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.accounts.push(reader.bytes());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    accounts: Array<Uint8Array>;

    constructor(accounts: Array<Uint8Array> = []) {
      this.accounts = accounts;
    }
  }

  export enum direction {
    ascending = 0,
    descending = 1,
  }
}
