import zod from "zod"

export const WishListSchema = zod.object({
    body: zod.object({
        wishListItems: zod.array(zod.object({}))
    })
})

export type WishListInput = zod.infer<typeof WishListSchema>