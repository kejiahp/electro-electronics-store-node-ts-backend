import zod from 'zod'

export const AddressSchema = zod.object({
    body: zod.object({
        state: zod.string({
            required_error: "state is required"
        }),
        city: zod.string({
            required_error: "city is required"
        }),
        country: zod.string({
            required_error: "country is required"
        }),
        addressDesc: zod.string({
            required_error: "addressDesc is required"
        }),
        phoneNumber1: zod.string({
            required_error: "phonenumber1 is required"
        }),
        phoneNumber2: zod.string().optional()
    })
})

export type createAddressInput = zod.infer<typeof AddressSchema>