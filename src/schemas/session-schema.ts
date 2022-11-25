import zod from "zod"

export const sessionSchema = zod.object({
    body: zod.object({
        email: zod.string({
            required_error: "email is required"
        }).email("invalid email"),
        password: zod.string({
            required_error: "password is required"
        }).min(6, "a minimum of 6 characters are required")
    })
})


export type sessionSchemaInput = zod.infer<typeof sessionSchema>