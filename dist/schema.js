"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessageSchema = exports.chatMessageAttachmentSchema = exports.MessageAttachmentType = exports.chatRoomMetaSchema = exports.chatServerMetaSchema = void 0;
const yup_1 = require("yup");
// todo .matches() for all string values
exports.chatServerMetaSchema = (0, yup_1.object)({
    avatar: (0, yup_1.string)().length(65),
    description: (0, yup_1.string)().required().max(250),
    title: (0, yup_1.string)().required().max(40).min(1),
});
exports.chatRoomMetaSchema = (0, yup_1.object)({
    categories: (0, yup_1.array)((0, yup_1.string)()).required().max(5),
    description: (0, yup_1.string)().required().max(250),
    title: (0, yup_1.string)().required().max(40).min(1),
});
var MessageAttachmentType;
(function (MessageAttachmentType) {
    MessageAttachmentType[MessageAttachmentType["IMAGE"] = 0] = "IMAGE";
    MessageAttachmentType[MessageAttachmentType["AUDIO"] = 1] = "AUDIO";
    MessageAttachmentType[MessageAttachmentType["VIDEO"] = 2] = "VIDEO";
    MessageAttachmentType[MessageAttachmentType["FILE"] = 3] = "FILE";
})(MessageAttachmentType = exports.MessageAttachmentType || (exports.MessageAttachmentType = {}));
exports.chatMessageAttachmentSchema = (0, yup_1.object)({
    extension: (0, yup_1.string)().min(1).max(8),
    hash: (0, yup_1.string)().required().length(64),
    ipfs: (0, yup_1.string)().required().length(64),
    name: (0, yup_1.string)().required().min(1).max(127),
    type: (0, yup_1.number)().oneOf([
        MessageAttachmentType.IMAGE,
        MessageAttachmentType.AUDIO,
        MessageAttachmentType.VIDEO,
        MessageAttachmentType.FILE,
    ]),
});
exports.chatMessageSchema = (0, yup_1.object)({
    a: (0, yup_1.array)(exports.chatMessageAttachmentSchema).max(6),
    c: (0, yup_1.string)().required().max(250),
});
