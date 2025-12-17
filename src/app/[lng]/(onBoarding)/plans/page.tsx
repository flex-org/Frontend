import PlansContent from '@/onBoarding/features/plans/components/PlansContent';

const page = async ({ params }: { params: Promise<{ lng: string }> }) => {
    const { lng } = await params;
    return (
        <div className="mt-24 px-2 sm:px-0">
            <PlansContent lng={lng} />
        </div>
    );
};

export default page;
