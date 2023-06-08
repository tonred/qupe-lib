import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider';
import { type FullContractState } from 'everscale-inpage-provider/dist/models';
export declare abstract class Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    readonly contract: import("everscale-inpage-provider").Contract<Abi>;
    protected readonly _accountStore: import("../cache").AccountsStore;
    balance: string;
    isDeployed: boolean;
    protected isListening: boolean;
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address, contract?: import("everscale-inpage-provider").Contract<Abi>, _accountStore?: import("../cache").AccountsStore);
    abstract parseData(): Promise<void>;
    init(): Promise<void>;
    getState(force?: boolean): Promise<FullContractState | undefined>;
    protected abstract get stateTtl(): number;
}
