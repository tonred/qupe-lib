import {
    type InferType, object, string, array, number,
} from 'yup'
// todo .matches() for all string values

const IPFS_CID_REGEX = /^Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,}$/g

export const chatServerMetaSchema = object({
    avatar: string().length(65),
    description: string(),
    title: string().required().max(40).min(1),
})
export type ChatServerMeta = InferType<typeof chatServerMetaSchema>


export const chatRoomMetaSchema = object({
    categories: array(string()).max(5),
    description: string().max(250),
    title: string().required().max(40).min(1),
})
export type ChatRoomMeta = InferType<typeof chatRoomMetaSchema>

export enum MessageAttachmentType {
    IMAGE = 0,
    AUDIO = 1,
    VIDEO = 2,
    FILE = 3,
}

export const chatMessageAttachmentSchema = object({
    extension: string().min(1).max(8),
    hash: string().required().length(64), // todo .matches()
    ipfs: string().required().length(64),
    name: string().required().min(1).max(127),
    type: number().oneOf([
        MessageAttachmentType.IMAGE,
        MessageAttachmentType.AUDIO,
        MessageAttachmentType.VIDEO,
        MessageAttachmentType.FILE,
    ]),
})
export type ChatMessageAttachment = InferType<typeof chatMessageAttachmentSchema>

export const chatMessageSchema = object({
    a: array(chatMessageAttachmentSchema).max(6),
    c: string().required().max(250),
})

export type ChatMessage = InferType<typeof chatMessageSchema>

export const chatProfileMetaSchema = object({
    avatar: string().matches(IPFS_CID_REGEX),
    displayName: string().min(1).max(30),
})
export type ChatProfileMeta = InferType<typeof chatProfileMetaSchema>
