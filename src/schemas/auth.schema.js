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

const guestSchema = z.object({
    isGuest: z.literal(true),
    email: z.any().optional(),
    password: z.any().optional(),
});

// 2. Esquema para Usuario Normal (isGuest = false o undefined)
const userSchema = z.object({
    // Aceptamos que isGuest sea false o que simplemente no venga
    isGuest: z.literal(false).optional(),
    
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
});

// 3. Unimos ambos escenarios
export const loginSchema = z.union([guestSchema, userSchema]);