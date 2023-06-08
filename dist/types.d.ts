import { type Address } from 'everscale-inpage-provider';
export declare enum ImplementationType {
    CHAT = 0,
    FORUM = 1,
    PAGES = 2
}
export declare enum PlatformType {
    PROFILE = 0,
    SERVER = 1,
    ROOM = 2,
    MESSAGE = 3
}
export interface PaymentInfo {
    token: Address;
    amount: string;
}
