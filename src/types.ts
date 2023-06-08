import { type Address } from 'everscale-inpage-provider'

export enum ImplementationType {
    CHAT,
    FORUM,
    PAGES,
}

export enum PlatformType {
    PROFILE,
    SERVER,
    ROOM,
    MESSAGE
}

export interface PaymentInfo {
    token: Address,
    amount: string
}
