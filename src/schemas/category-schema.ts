import zod from "zod"

export const categorySchema = zod.object({
    body: zod.object({
        name: zod.string({
            required_error: "category name is required"
        })
    })
})

export type categoryInput = zod.infer<typeof categorySchema>