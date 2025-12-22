import { TFunction } from 'i18next';
import { z } from 'zod';

export const createLoginSchema = (t: TFunction) =>
    z.object({
        email: z.string().email({ message: t('zodValidation:email_invalid') }),
        password: z
            .string()
            .min(8, { message: t('zodValidation:password_min') }),
    });
export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

export const createRegisterSchema = (t: TFunction) =>
    z
        .object({
            name: z
                .string()
                .min(2, { message: t('zodValidation:name_min') })
                .max(50, { message: t('zodValidation:name_max') }),
            email: z
                .string()
                .email({ message: t('zodValidation:email_invalid') }),
            phone: z.string().regex(/^01[0125][0-9]{8}$/, {
                message: t('zodValidation:phone_invalid'),
            }),
            password: z
                .string()
                .min(8, { message: t('zodValidation:password_min') }),
            password_confirmation: z.string(),
        })
        .refine((data) => data.password === data.password_confirmation, {
            message: t('zodValidation:password_mismatch'),
            path: ['password_confirmation'],
        });
export type RegisterFormValues = z.infer<
    ReturnType<typeof createRegisterSchema>
>;