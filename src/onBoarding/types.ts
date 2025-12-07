import {
    FieldErrors,
    Path,
    UseFormRegister,
    FieldValues,
} from 'react-hook-form';

export interface FormFieldProps<TFormValues extends FieldValues> {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    name: Path<TFormValues>;
    label: string;
    placeholder?: string;
    type?: string;
    suffix?: React.ReactNode;
}

export interface SignupFormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}
export interface LoginFormValues {
    email: string;
    password: string;
}

export type ActionResponse<TData> = {
    data?: TData;
    error?: string;
    success?: boolean;
};

export interface SignedUpUser {
    created_at: string;
    email: string;
    id: number;
    name: string;
    phone: string;
    updated_at: string;
}
export interface SignedUserData {
    user: SignedUpUser;
    token: string;
}
