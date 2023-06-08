import { type Address, type ProviderRpcClient, type Subscription } from 'everscale-inpage-provider';
import { Profile } from '../abstract/profile';
import { type ChatServer } from './server';
import { ChatAbi } from '../abi';
import { type ChatRoot } from './root';
import { type ChatRoom } from './room';
import { type PaymentInfo } from '../types';
import { type ChatProfileMeta, type ChatRoomMeta, type ChatServerMeta } from './schema';
import { UserPermissions } from '../permissions';
export declare class ChatProfile extends Profile<ChatRoot, ChatServer, typeof ChatAbi.Profile> {
    jointServers: Map<number, boolean>;
    meta?: ChatProfileMeta;
    owner?: Address;
    constructor(rpc: ProviderRpcClient, address: Address, root: ChatRoot);
    subscribe(onStateChanged: () => void): Promise<Subscription<'contractStateChanged'>>;
    protected get stateTtl(): number;
    joinServer(server: number | ChatServer, onJoin: () => void): Promise<void>;
    sendMessage(rpc: ProviderRpcClient, room: ChatRoom, message: string, publicKey: string, forwardMessageHash?: string, replyToMessageHash?: string, onSend?: () => void, highlight?: boolean | undefined, payment?: PaymentInfo | undefined): Promise<void>;
    getServers(): Promise<ChatServer[]>;
    createRoom(server: ChatServer, meta: ChatRoomMeta, anyoneCanSendMessage: boolean, onCreate: (r?: ChatRoom) => void): Promise<void>;
    setBan(serverID: number, roomID: number, user: Address, isBan: boolean, onSaved: () => void): Promise<any>;
    setUserPermissions(permissions: UserPermissions, entity: Address, user: Address, onSaved: () => void): Promise<any>;
    setDefaultPermissions(permissions: UserPermissions, entity: Address, onSaved: () => void): Promise<any>;
    editServerMeta(meta: ChatServerMeta, server: ChatServer, onSaved: () => void): Promise<any>;
    editRoomMeta(meta: ChatRoomMeta, room: ChatRoom, onSaved: () => void): Promise<any>;
    editMeta(meta: ChatProfileMeta, onSaved: () => void): Promise<any>;
    update(): Promise<any>;
    parseData(): Promise<void>;
}
