'use client';
import { motion, HTMLMotionProps } from 'motion/react';
import { useTranslation } from '@/i18n/client';
import { Message } from '@/onBoarding/types';
import parse, { DOMNode, Element, domToReact, Text } from 'html-react-parser';
import { ComponentType } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
        },
    },
};

const wordVariants = {
    hidden: { opacity: 0, y: 3 },
    visible: { opacity: 1, y: 0 },
};

const MessageBubble = ({
    lng,
    msg,
    LastMsg,
}: {
    lng: string;
    msg: Message;
    LastMsg: boolean;
}) => {
    const { t } = useTranslation(lng, 'domain');
    const contentToShow =
        msg.content === 'welcome-message' ? t('welcome-message') : msg.content;

    const replaceNode = (domNode: DOMNode) => {
        if (domNode.type === 'text' && domNode instanceof Text) {
            const textContent = domNode.data;
            if (!textContent.trim()) return null;
            const words = textContent.split(/(\s+)/);
            return (
                <>
                    {words.map((word, index) => (
                        <motion.span
                            key={index}
                            variants={wordVariants}
                            className="inline-block whitespace-pre"
                        >
                            {word}
                        </motion.span>
                    ))}
                </>
            );
        }

        if (domNode instanceof Element && domNode.attribs) {
            const tagName = domNode.name as keyof typeof motion;
            const Tag = motion[tagName] as ComponentType<
                HTMLMotionProps<'div'>
            >;
            const isVoid = ['br', 'img', 'hr'].includes(tagName);
            if (Tag) {
                if (isVoid) {
                    return (
                        <Tag
                            variants={wordVariants}
                            className={domNode.attribs.class}
                            {...domNode.attribs}
                        />
                    );
                }
                return (
                    <Tag
                        variants={containerVariants}
                        className={domNode.attribs.class}
                    >
                        {domToReact(domNode.children as DOMNode[], {
                            replace: replaceNode,
                        })}
                    </Tag>
                );
            }
        }
    };

    return (
        <div
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
            <div
                className={`relative max-w-[85%] px-4 py-3 text-sm shadow-sm md:text-base ${
                    msg.role === 'user'
                        ? `rounded-2xl ${lng === 'ar' ? 'rounded-tl-none' : 'rounded-tr-none'} bg-green-600 text-white dark:bg-green-700`
                        : `rounded-2xl ${lng === 'ar' ? 'rounded-tr-none' : 'rounded-tl-none'} bg-gray-200 text-gray-800 dark:bg-emerald-800 dark:text-gray-100`
                } [&_li]:mb-1 [&_li]:marker:text-current [&_ol]:list-decimal [&_ol]:ps-6 [&_ul]:list-disc [&_ul]:ps-6`}
            >
                <motion.div
                    initial={LastMsg ? 'hidden' : 'visible'}
                    animate="visible"
                    variants={containerVariants}
                >
                    {msg.role === 'bot'
                        ? parse(contentToShow, { replace: replaceNode })
                        : parse(contentToShow)}
                </motion.div>
            </div>
        </div>
    );
};

export default MessageBubble;
