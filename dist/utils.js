"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decStringToUint256Hex = exports.contentEncoder = exports.contentDecoder = exports.zeroAddress = exports.now = void 0;
const everscale_inpage_provider_1 = require("everscale-inpage-provider");
const buffer_1 = require("buffer");
const now = () => new Date().getTime();
exports.now = now;
exports.zeroAddress = new everscale_inpage_provider_1.Address('0:0000000000000000000000000000000000000000000000000000000000000000');
function contentDecoder(bytes) {
    // todo compression
    try {
        return JSON.parse(buffer_1.Buffer.from(bytes, 'hex').toString());
    }
    catch (e) {
        return JSON.parse(buffer_1.Buffer.from(bytes, 'base64').toString());
    }
}
exports.contentDecoder = contentDecoder;
function contentEncoder(data) {
    return buffer_1.Buffer.from(JSON.stringify(data)).toString('base64');
}
exports.contentEncoder = contentEncoder;
function decStringToUint256Hex(value) {
    const s = BigInt(value).toString(16);
    return '0'.repeat(64 - s.length) + s;
}
exports.decStringToUint256Hex = decStringToUint256Hex;
