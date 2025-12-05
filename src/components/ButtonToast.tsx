'use client';
import { toast } from 'sonner';

const ButtonToast = () => {
    return (
        <div
            onClick={() => {
                toast.warning('hello', {
                    description: 'hello mother fucker',
                });
            }}
        >
            ButtonToast
        </div>
    );
};

export default ButtonToast;
