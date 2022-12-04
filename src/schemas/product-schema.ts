import zod from "zod"

const attributesItems = zod.object({
    displayValue: zod.string({
        required_error: "item attribute displayValue is required"
    }),
    value: zod.string({
        required_error: "value is required"
    })
})

const attributesValues = zod.object({
    name: zod.string({
        required_error: "attribute name is required"
    }),
    items: zod.array(attributesItems),
    type: zod.enum(["text", "swatch"])
})

const payload = {
    body: zod.object({
        name: zod.string({
            required_error: "product name is required"
        }),
        brand: zod.string({
            required_error: "brand name is required"
        }),
        attributes: zod.array(attributesValues),
        category: zod.string({
            required_error: "category name is required"
        }),
        gallery: zod.array(zod.string()),
        instock: zod.boolean({
            required_error: "please provide stock status"
        }),
        description: zod.string({
            required_error: "please provide product description"
        }).min(120, "description should be a minimum of 120 characters"),
        moreDetails: zod.string().optional(),
        discount: zod.number().optional(),
        price: zod.number()
    })
}

const params = {
    params: zod.object({
        productId: zod.string({
            required_error: "product id is required"
        })
    })
}

// const query = {
//     query: zod.object({
        
//     })
// }

export const createProductSchema = zod.object({
    ...payload
})

export const updateProductSchema = zod.object({
    ...params,
    ...payload
})

export const deleteProductSchema = zod.object({
    ...params
})

export const getProductSchema = zod.object({
    ...params
})


export type createProductInput = zod.infer<typeof createProductSchema>
export type updateProductInput = zod.infer<typeof updateProductSchema>
export type deleteProductInput = zod.infer<typeof deleteProductSchema>
export type getProductInput = zod.infer<typeof getProductSchema>