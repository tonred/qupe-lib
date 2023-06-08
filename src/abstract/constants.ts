import { Address } from 'everscale-inpage-provider'

import { type PaymentInfo } from '../types'

export const EMPTY_PAYMENT = {
    amount: '0',
    token: new Address('0:0000000000000000000000000000000000000000000000000000000000000000'),
} as PaymentInfo
