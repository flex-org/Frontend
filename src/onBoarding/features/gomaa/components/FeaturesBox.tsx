import { motion } from 'motion/react';
import { featureItemVariants } from '@/onBoarding/animations/variants';
import { useChatBotStore } from '@/onBoarding/store/chatBotStore';
import FeatureItem from '../../build/components/FeatureItem';
import { Package } from 'lucide-react';
import { useTranslation } from '@/i18n/client';

const FeaturesBox = ({ lng }: { lng: string }) => {
    const selectedFeatures = useChatBotStore((state) => state.selectedFeatures);
    const { t } = useTranslation(lng, 'domain');
    return selectedFeatures.length > 0 ? (
        selectedFeatures?.map((item) => (
            <motion.div
                key={item.id}
                variants={featureItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <FeatureItem
                    feature={item}
                    classNames="border p-2 border-green-400 dark:border-green-900 rounded-md relative"
                />
            </motion.div>
        ))
    ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Package size={48} />
            <p className="text-xl font-semibold">{t('empty-list')}</p>
        </div>
    );
};

export default FeaturesBox;
