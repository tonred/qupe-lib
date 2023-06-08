import { type Address, type Contract, type ProviderRpcClient } from 'everscale-inpage-provider';
import { type RootType, type ServerType } from './types';
import { Base } from './base';
import { type UserPermissions } from '../permissions';
export declare abstract class Profile<R extends RootType, S extends ServerType, Abi> extends Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    readonly root: R;
    permissions: Map<string, UserPermissions>;
    protected _contractWallet?: Contract<Abi>;
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address, root: R);
    connectUserWallet(rpc: ProviderRpcClient): void;
    abstract getServers(): Promise<S[]>;
    abstract update(): Promise<any>;
}
