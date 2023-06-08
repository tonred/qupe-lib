import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider';
import { ChatAbi } from '../abi';
import { Root } from '../abstract/root';
import { ChatServer } from './server';
import { ChatProfile } from './profile';
import { ChatRoom } from './room';
import { type ChatProfileMeta, type ChatServerMeta } from './schema';
export declare class ChatRoot extends Root<ChatServer, ChatProfile, ChatRoom, any, typeof ChatAbi.Root> {
    constructor(rpc: ProviderRpcClient, address: Address);
    deployServer(owner: Address, meta: ChatServerMeta, onCreate: (s?: ChatServer) => void): Promise<ChatServer | undefined>;
    deployProfile(from: Address, pubkeys: (string | number)[], meta: ChatProfileMeta, onDeploy: (profile?: ChatProfile) => void): Promise<void>;
    get impl(): {
        Server: new (rpc: ProviderRpcClient, address: Address, root: ChatRoot) => ChatServer;
        Profile: new (rpc: ProviderRpcClient, address: Address, root: ChatRoot) => ChatProfile;
        Room: new (rpc: ProviderRpcClient, address: Address, root: ChatRoot) => ChatRoom;
        Message?: new (rpc: ProviderRpcClient, address: Address) => undefined;
    };
}
