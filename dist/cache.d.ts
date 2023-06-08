import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider';
import { type FullContractState } from 'everscale-inpage-provider/dist/models';
type AccountStateResponse = FullContractState | undefined;
export declare class AccountsStore {
    private rpc;
    private cache;
    constructor(rpc: ProviderRpcClient);
    getAccountState(address: Address, ttl?: number): Promise<AccountStateResponse>;
    private downloadState;
    private getStoredOrDownload;
    setAccountState(address: Address, state: AccountStateResponse): void;
    purgeAll(): void;
    purge(address: Address): void;
    purgeOld(ttl: number): void;
}
export declare const accountStore: (rpc: ProviderRpcClient) => AccountsStore;
export {};
