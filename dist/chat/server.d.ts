import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider';
import { type ChatServerMeta } from './schema';
import { ChatAbi } from '../abi';
import { ChatRoom } from './room';
import { Server } from '../abstract/server';
import { type ChatRoot } from './root';
import { type ChatServerData } from './types';
import { type ChatProfile } from './profile';
export declare class ChatServer extends Server<ChatRoot, ChatProfile, ChatRoom, any, typeof ChatAbi.Server> {
    protected get stateTtl(): number;
    update(): Promise<any>;
    chatData?: {
        info: ChatServerData;
    };
    constructor(rpc: ProviderRpcClient, address: Address, root: ChatRoot);
    createRoom(): Promise<ChatRoom | null>;
    info(): ChatServerData | undefined;
    parseMeta(bytes: string): Promise<ChatServerMeta>;
    parseData(): Promise<void>;
    getRooms(): Promise<ChatRoom[]>;
    getRoomById(roomID: number): Promise<ChatRoom>;
}
