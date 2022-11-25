import zod from "zod"

export const createUserSchema =  zod.object({
    body: zod.object({
        firstname: zod.string({
            required_error: "firstname is required"
        }),
        lastname: zod.string({
            required_error: "lastname is required"
        }),
        email: zod.string({
            required_error: "email is required"
        }).email("invalid email format"),
        password: zod.string({
            required_error: "password is required"
        }).min(6, "a minimum of 6 characters are required for the password"),
        confirmationPassword: zod.string({
            required_error: "please confirm your password"
        }).min(6, "a minimum of 6 characters are required for the confirmation password")
    }).refine((data)=> data.password===data.confirmationPassword, {
        message: "passwords do not match",
        path: ["confirmationPassword"]
    })
})


type createUserSchemaType = zod.infer<typeof createUserSchema>
export type CreateUserInput = Omit<createUserSchemaType, "body.confirmationPassword">