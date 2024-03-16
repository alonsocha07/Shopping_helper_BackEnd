import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario es necesario'
    }),
    email: z.string({
        required_error: 'Correo electronico es necesario'
    }).email({
        message: 'Correo invalido'
    }),
    password: z.string({
        required_error: 'Contraseña es necesaria'
    }).min(6, {
        message: 'Contraseña deberia ser de al menos 6 caracteres',
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Correo electronico es necesario"
    }).email({
        message: "Correo invalido"
    }),
    password: z.string({
        required_error: "Contraseña es necesaria"
    }).min(6, {
        message: 'Contraseña deberia ser de al menos 6 caracteres'
    })
})