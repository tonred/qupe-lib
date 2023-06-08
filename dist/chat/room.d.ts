import { type Address, type ProviderRpcClient, type TransactionId, type Subscription } from 'everscale-inpage-provider';
import { Room } from '../abstract/room';
import { ChatAbi } from '../abi';
import { ChatServer } from './server';
import { type ChatMessage, type ChatRoomMeta } from './schema';
import { type ChatRoot } from './root';
import { type ChatRoomData, type MessageData } from './types';
import { type ChatProfile } from './profile';
export interface StoredMessage {
    hash: string;
    data: MessageData;
    createdAt: number;
    sender: Address;
    profile: ChatProfile;
    isHidden?: boolean;
}
export declare class ChatRoom extends Room<ChatRoot, ChatServer, ChatProfile, any, typeof ChatAbi.Room> {
    roomData?: {
        info: ChatRoomData;
    };
    private _profileContract;
    storedMessages: Map<number, StoredMessage>;
    pendingMessages: Map<number, StoredMessage>;
    subscriptions: {
        onMessage: (() => void)[];
    };
    constructor(rpc: ProviderRpcClient, address: Address, root: ChatRoot);
    protected get stateTtl(): number;
    getServer(): ChatServer;
    addPendingMessage(data: StoredMessage): void;
    gcPendingMessages(): void;
    getMessages(limit: number, startFrom?: TransactionId): Promise<{
        continuation: TransactionId | undefined;
    }>;
    private processNewTransactions;
    sendMessage(data: any, from: ChatProfile, replayTo: ChatMessage | undefined): Promise<ChatMessage>;
    subscribe(onMessage: () => void): Promise<Subscription<any>>;
    update(): Promise<any>;
    parseMeta(bytes: string): Promise<ChatRoomMeta>;
    parseData(): Promise<void>;
    info(): ChatRoomData | undefined;
}
