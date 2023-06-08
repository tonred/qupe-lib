import { type Address, type Contract, type ProviderRpcClient } from 'everscale-inpage-provider';
import { PlatformType } from '../types';
import { type ServerType, type ProfileType, type RoomType, type MessageType } from './types';
import { Base } from './base';
export declare abstract class Root<S extends ServerType, P extends ProfileType, R extends RoomType, M extends MessageType, Abi> extends Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    _profileCache: Map<string, P>;
    _serverCache: Map<number, S>;
    private _contractWallet?;
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address);
    protected get stateTtl(): number;
    abstract get impl(): {
        Server: new (rpc: ProviderRpcClient, address: Address, root: any) => S;
        Profile: new (rpc: ProviderRpcClient, address: Address, root: any) => P;
        Room: new (rpc: ProviderRpcClient, address: Address, root: any) => R;
        Message?: new (rpc: ProviderRpcClient, address: Address) => M;
    };
    connectUserWallet(rpc: ProviderRpcClient): void;
    protected get contractWallet(): Contract<Abi>;
    getServer(serverId: number): Promise<S>;
    getProfile(owner: Address): Promise<P>;
    getProfileFromAddress(address: Address): Promise<P>;
    abstract deployProfile(from: Address, pubkeys: (string | number)[], meta: any, onDeploy: (profile?: P) => void): Promise<void>;
    parseData(): Promise<void>;
    expectedPlatformAddr(root: Address, deployer: Address, platformType: PlatformType, initialData: string): Promise<Address>;
    expectedProfileAddress(owner: Address): Promise<Address>;
    expectedServerAddress(serverID: number): Promise<Address>;
}
