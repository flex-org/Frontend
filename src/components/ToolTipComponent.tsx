import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';

const ToolTipComponent = ({
    children,
    label,
}: {
    children: ReactNode;
    label: string;
}) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default ToolTipComponent;
