import { Spinner } from '@/components/ui/spinner';

const Loading = () => {
    return (
        <div className='flex justify-center items-center w-full h-[20vh]'>
            <Spinner className='size-10' />
        </div>
    );
};

export default Loading;
