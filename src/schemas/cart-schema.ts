import zod from 'zod'

export const CartSchema = zod.object({
    body: zod.object({
        cartItems: zod.array(zod.object({})),
        cartQuantity: zod.number({
            required_error: "cartQuantity is required"
        }),
        cartTotal: zod.number({
            required_error: "cartTotal is required"
        })
    })
})

export type CartInput = zod.infer<typeof CartSchema>