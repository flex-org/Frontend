import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters' }),
});
export type LoginFormValues = z.infer<typeof LoginSchema>;

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters' })
            .max(50),
        email: z
            .string()
            .email({ message: 'Please enter a valid email address' }),
        phone: z.string().regex(/^01[0125][0-9]{8}$/, {
            message: 'Invalid phone number format',
        }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' }),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match',
        path: ['password_confirmation'],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;
