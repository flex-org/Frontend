'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from '@/i18n/client';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = ({ lng }: { lng: string }) => {
    const { t } = useTranslation(lng, 'onBoarding-landing');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqItems: FAQItem[] = [
        {
            question: t('faq.items.switchPlans.question'),
            answer: t('faq.items.switchPlans.answer'),
        },
        {
            question: t('faq.items.freeTrial.question'),
            answer: t('faq.items.freeTrial.answer'),
        },
        {
            question: t('faq.items.exceedLimit.question'),
            answer: t('faq.items.exceedLimit.answer'),
        },
        {
            question: t('faq.items.billing.question'),
            answer: t('faq.items.billing.answer'),
        },
        {
            question: t('faq.items.customized.question'),
            answer: t('faq.items.customized.answer'),
        },
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full px-6 md:px-10 py-16 md:py-24 bg-[#e8e8e8] dark:bg-neutral-900">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                        {t('faq.title')}
                    </h2>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3 mb-12">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-neutral-750 transition-colors duration-200"
                            >
                                <span className="text-gray-900 dark:text-white font-medium text-base md:text-lg">
                                    {item.question}
                                </span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                ) : (
                                    <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Form Card */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-neutral-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {/* Left Side - Text */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                {t('faq.contact.title')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                                {t('faq.contact.description')}
                            </p>
                        </div>

                        {/* Right Side - Form */}
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder={t('faq.contact.namePlaceholder')}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all duration-200"
                            />
                            <input
                                type="email"
                                placeholder={t('faq.contact.emailPlaceholder')}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all duration-200"
                            />
                            <textarea
                                rows={4}
                                placeholder={t('faq.contact.messagePlaceholder')}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all duration-200 resize-none"
                            />
                            <button className="w-full py-3 px-6 bg-[#1B5E20] hover:bg-[#155a1c] text-white font-semibold rounded-lg transition-colors duration-200">
                                {t('faq.contact.button')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
