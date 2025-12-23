import PaymentDetailsColumn from './PaymentDetailsColumn';
import PaymentMethodColumn from './PaymentMethodColumn';

const PaymentContent = ({ lng }: { lng: string }) => {
    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <PaymentDetailsColumn lng={lng} />
            <PaymentMethodColumn lng={lng} />
        </div>
    );
};

export default PaymentContent;
