import { initialPlatformData } from '@/onBoarding/types';

const useCalculatePrices = (
    finalData: initialPlatformData,
    mobilePrice: number,
    capacityPrice: number
) => {
    const { selected_features, mobile_app } = finalData;
    const featuresPrices = selected_features.reduce(
        (acc, item) => acc + Number(item.price),
        0,
    );
    const mobileAppPrice = mobile_app ? mobilePrice : 0;
    const studentsPrice = dynamicData.capacityPrice * capacity;
    const storagePrice = dynamicData.storage.price * storage;
    const totalBeforeDiscount =
        Number(mobileAppPrice) +
        Number(studentsPrice) +
        Number(storagePrice) +
        Number(featuresPrices);
    return { totalBeforeDiscount };
};

export default useCalculatePrices;
