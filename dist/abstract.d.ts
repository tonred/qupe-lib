import { type Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { FullContractState } from 'everscale-inpage-provider/dist/models';
import { RootAbi } from './abi';
import { PlatformType } from './types';
export declare abstract class Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    readonly contract: import("everscale-inpage-provider").Contract<Abi>;
    protected readonly _accountStore: import("./cache").AccountsStore;
    protected isListening: boolean;
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address, contract?: import("everscale-inpage-provider").Contract<Abi>, _accountStore?: import("./cache").AccountsStore);
    abstract parseData(): Promise<void>;
    init(): Promise<void>;
    getState(): Promise<FullContractState | undefined>;
    protected abstract stateTtl(): number;
}
export declare class Root extends Base<typeof RootAbi> {
    protected readonly rpc: ProviderRpcClient;
    readonly address: Address;
    _profileCache: Map<string, any>;
    _serverCache: Map<number, any>;
    constructor(rpc: ProviderRpcClient, address: Address);
    getServer<T extends ServerType>(server: new (rpc: ProviderRpcClient, address: Address, root: Root) => T, serverId: number): Promise<T | undefined>;
    getProfile<T extends ProfileType>(profile: new (rpc: ProviderRpcClient, address: Address, root: Root) => T, owner: Address): Promise<T | undefined>;
    deployProfile(rpc: ProviderRpcClient, from: Address, pubkeys: (string | number)[]): Promise<void>;
    parseData(): Promise<void>;
    protected stateTtl(): number;
    expectedPlatformAddr(root: Address, deployer: Address, platformType: PlatformType, initialData: string): Promise<Address>;
    expectedProfileAddress(owner: Address): Promise<Address>;
    expectedServerAddress(serverID: number): Promise<Address>;
}
export declare abstract class Server<P extends ProfileType, R extends RoomType, M extends MessageType, Abi> extends Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    readonly root: Root;
    baseData?: {
        serverId: number;
        roomsCount: number;
        root: Address;
        defaultPermissions: any;
        balance: string;
        token: Address;
        wallet: Address;
    };
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address, root: Root);
    expectedRoomAddress(roomID: number): Promise<Address>;
    abstract getRoomById(roomID: number): Promise<R>;
    get id(): number | undefined;
    abstract createRoom(): Promise<R | null>;
    abstract update(): Promise<any>;
    abstract impl(): {
        profile: new (rpc: ProviderRpcClient, address: Address, root: Root) => P;
        room: new (rpc: ProviderRpcClient, address: Address, root: Root) => R;
        message: new (rpc: ProviderRpcClient, address: Address) => M;
    };
}
export declare abstract class Profile<S extends ServerType, Abi> extends Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    readonly root: Root;
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address, root: Root);
    abstract getServers(): S;
    abstract update(): Promise<any>;
}
export declare abstract class Room<S extends ServerType, P extends ProfileType, M extends MessageType, Abi> extends Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    readonly root: Root;
    baseData?: {
        serverId: number;
        roomId: number;
        bans: (readonly [Address, boolean])[];
        messagesCount: number;
        root: Address;
        defaultPermissions: any;
        balance: string;
        token: Address;
        wallet: Address;
    };
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address, root: Root);
    abstract getServer(): S;
    abstract update(): Promise<any>;
    abstract subscribe(onMessage: () => Promise<void>, onUpdate: () => Promise<void>): Promise<void>;
    abstract sendMessage(data: any, from: P, replayTo?: M): Promise<M>;
}
export declare abstract class Message<S extends ServerType, P extends ProfileType, R extends RoomType, Abi> extends Base<Abi> {
    abstract isDeleted(): boolean;
    abstract getRoom(): R;
    abstract getSender(): P;
}
type ServerType = Server<any, any, any, any>;
type RoomType = Room<any, any, any, any>;
type ProfileType = Profile<any, any>;
type MessageType = Message<any, any, any, any>;
export {};
