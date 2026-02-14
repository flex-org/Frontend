import { initialPlatformData, dynamicDataProps } from '@/onBoarding/types';
import { PaymentCalculator } from './PaymentCalculator';
import { ResourcesSummary } from './ResourcesSummary';
import { DomainSummary } from './DomainSummary';
import {
    SellingSystemsSummary,
    MobileAppSummary,
    FeaturesList,
} from './FeaturesSummary';

const PaymentDetailsColumn = async ({
    lng,
    finalData,
    dynamicData,
}: {
    lng: string;
    finalData: initialPlatformData;
    dynamicData: dynamicDataProps;
}) => {
    const {
        selected_features,
        selected_selling_systems,
        capacity,
        storage,
        mobile_app,
        domain,
    } = finalData;

    const featuresPrices = selected_features.reduce(
        (acc, item) => acc + Number(item.price),
        0,
    );
    const mobileAppPrice = mobile_app ? dynamicData.mobile_app.price : 0;
    const studentsPrice = dynamicData.capacity.price * capacity;
    const storagePrice = dynamicData.storage.price * storage;

    const totalBeforeDiscount =
        Number(mobileAppPrice) +
        Number(studentsPrice) +
        Number(storagePrice) +
        Number(featuresPrices);

    return (
        <PaymentCalculator lng={lng} totalBeforeDiscount={totalBeforeDiscount}>
            <ResourcesSummary
                lng={lng}
                studentsCount={capacity}
                studentsPrice={studentsPrice}
                storageCount={storage}
                storagePrice={storagePrice}
            />
            <DomainSummary lng={lng} domain={domain} />
            <SellingSystemsSummary
                systems={selected_selling_systems}
                lng={lng}
            />
            <MobileAppSummary
                hasApp={mobile_app}
                price={mobileAppPrice}
                lng={lng}
            />
            <FeaturesList items={selected_features} lng={lng} />
        </PaymentCalculator>
    );
};

export default PaymentDetailsColumn;
