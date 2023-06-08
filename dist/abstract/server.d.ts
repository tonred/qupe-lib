import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider';
import { type MessageType, type ProfileType, type RoomType, type RootType } from './types';
import { Base } from './base';
import { UserPermissions } from '../permissions';
export declare abstract class Server<R extends RootType, P extends ProfileType, Rm extends RoomType, M extends MessageType, Abi> extends Base<Abi> {
    protected readonly rpc: ProviderRpcClient;
    protected readonly abi: Abi;
    readonly address: Address;
    readonly root: R;
    defaultPermissions: UserPermissions;
    baseData?: {
        serverId: number;
        roomsCount: number;
        root: Address;
        defaultPermissions: any;
        balance: string;
        token: Address;
        wallet: Address;
    };
    _roomsCache: Map<number, Rm>;
    protected constructor(rpc: ProviderRpcClient, abi: Abi, address: Address, root: R);
    expectedRoomAddress(roomID: number): Promise<Address>;
    get id(): number | undefined;
    abstract update(): Promise<any>;
}
