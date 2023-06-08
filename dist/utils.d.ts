import { Address } from 'everscale-inpage-provider';
export declare const now: () => number;
export declare const zeroAddress: Address;
export declare function contentDecoder<T>(bytes: string): T;
export declare function contentEncoder<T>(data: T): string;
export declare function decStringToUint256Hex(value: string): string;
