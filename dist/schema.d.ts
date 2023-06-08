import { type InferType } from 'yup';
export declare const chatServerMetaSchema: import("yup").ObjectSchema<{
    avatar: string | undefined;
    description: string;
    title: string;
}, import("yup").AnyObject, {
    avatar: undefined;
    description: undefined;
    title: undefined;
}, "">;
export type ChatServerMeta = InferType<typeof chatServerMetaSchema>;
export declare const chatRoomMetaSchema: import("yup").ObjectSchema<{
    categories: (string | undefined)[];
    description: string;
    title: string;
}, import("yup").AnyObject, {
    categories: undefined;
    description: undefined;
    title: undefined;
}, "">;
export type ChatRoomMeta = InferType<typeof chatRoomMetaSchema>;
export declare enum MessageAttachmentType {
    IMAGE = 0,
    AUDIO = 1,
    VIDEO = 2,
    FILE = 3
}
export declare const chatMessageAttachmentSchema: import("yup").ObjectSchema<{
    extension: string | undefined;
    hash: string;
    ipfs: string;
    name: string;
    type: number | undefined;
}, import("yup").AnyObject, {
    extension: undefined;
    hash: undefined;
    ipfs: undefined;
    name: undefined;
    type: undefined;
}, "">;
export type ChatMessageAttachment = InferType<typeof chatMessageAttachmentSchema>;
export declare const chatMessageSchema: import("yup").ObjectSchema<{
    a: {
        extension?: string | undefined;
        type?: number | undefined;
        hash: string;
        ipfs: string;
        name: string;
    }[] | undefined;
    c: string;
}, import("yup").AnyObject, {
    a: undefined;
    c: undefined;
}, "">;
export type ChatMessage = InferType<typeof chatMessageSchema>;
