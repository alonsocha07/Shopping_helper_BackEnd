import {z} from 'zod'

export const createMarketSchema = z.object({
    name: z.string({
        required_error: "name is required"
    }),
})