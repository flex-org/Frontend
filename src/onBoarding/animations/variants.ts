export const chatContainerVariants = (lng: string) => ({
    hidden: { x: 0 },
    visible: {
        x: lng === 'ar' ? -30 : 30,
        transition: { duration: 1.5 },
    },
});
export const featuresContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 1.5 } },
};

export const featureItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 1 } },
};