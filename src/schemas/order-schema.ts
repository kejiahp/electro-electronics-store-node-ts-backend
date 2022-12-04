import zod from 'zod'
import {AddressSchema} from './address-schema'

export const OrderSchema = zod.object({
    body: zod.object({
        orderItems: zod.array(zod.object({})),
        addressInfo: AddressSchema.shape.body
    })
})

export type OrderInput = zod.infer<typeof OrderSchema>