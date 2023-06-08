import { type ChatMessage, type ChatRoomMeta, type ChatServerMeta, type MessageAttachmentType } from './schema';
import { type PaymentInfo } from '../types';
export type ChatServerData = {
    meta: ChatServerMeta;
    createRoomPayment: PaymentInfo;
};
export type ChatRoomData = {
    meta: ChatRoomMeta;
    messagePayment: PaymentInfo;
    highlightMessagePayment: PaymentInfo;
};
export interface MessageAttachment {
    type: MessageAttachmentType;
    name: string;
    extension: string;
    hash: string;
    ipfs: string;
}
export interface MessageData {
    version: number;
    serverID: number;
    roomID: number;
    message: ChatMessage;
    replyToMessageHash?: string;
    forwardMessageHash?: string;
    highlight: boolean;
    payment: PaymentInfo;
}
