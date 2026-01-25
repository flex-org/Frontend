import { Path, FieldValues } from 'react-hook-form';

export interface FormFieldProps<TFormValues extends FieldValues> {
    name: Path<TFormValues>;
    label: string;
    placeholder?: string;
    type?: string;
    suffix?: React.ReactNode;
    autoComplete?: string;
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
export interface Features {
    id: number;
    icon: string;
    price: string;
    default: boolean;
    active: boolean;
    name: string;
    description: string;
}

export interface DraggedFeatures extends Features {
    instanceId: string;
}

export interface SellingSystem {
    description: string;
    id: number;
    name: string;
}

export interface SliderInputProps {
    value: number;
    setValue: (val: number) => void;
    min: number;
    max: number;
    step: number;
    lng: string;
    title: string;
    label: string;
}

export interface BotResponse {
    bot: string;
    features: Features[];
    status: string;
    user: string;
}

export interface Message {
    role: 'user' | 'bot';
    content: string;
}

export interface SellingSystems {
    selling_system: number[];
    storage: number;
    capacity: number;
}

export interface StoredDataProps {
    storedData: number[] | SellingSystems | string;
}
export interface initialPlatformData {
    features: Features[];
    selected_features: Features[];
    selling_systems: SellingSystem[];
    selected_selling_systems: SellingSystem[];
    domain: string;
    capacity: number;
    storage: number;
    mobile_app: boolean;
    step: number;
}
export interface FinalSellingSystemData {
    selling_system: number[];
    storage: number;
    capacity: number;
    mobile_app: boolean;
}
export interface ResourceCost {
    quantity: number;
    price: number;
}

export interface dynamicDataProps {
    storage: ResourceCost;
    capacity: ResourceCost;
    mobile_app: ResourceCost;

}
