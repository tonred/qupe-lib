import { Address } from 'everscale-inpage-provider'
import { Buffer } from 'buffer'

export const now = (): number => new Date().getTime()

export const zeroAddress = new Address('0:0000000000000000000000000000000000000000000000000000000000000000')

export function contentDecoder<T>(bytes: string): T {
    // todo compression
    try {
        return JSON.parse(Buffer.from(bytes, 'hex').toString()) as T
    }
    catch (e) {
        return JSON.parse(Buffer.from(bytes, 'base64').toString()) as T

    }
}
export function contentEncoder<T>(data: T): string {
    return Buffer.from(JSON.stringify(data)).toString('base64')
}

export function decStringToUint256Hex(value: string): string {
    const s = BigInt(value).toString(16)
    return '0'.repeat(64 - s.length) + s
}
