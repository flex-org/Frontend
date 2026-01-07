import { getTranslation } from '@/i18n/server';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Github } from 'lucide-react';

const Footer = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'onBoarding-landing');

    const companyLinks = [
        { label: t('footer.company.features'), href: '#features' },
        { label: t('footer.company.pricing'), href: '#pricing' },
        { label: t('footer.company.team'), href: '#team' },
        { label: t('footer.company.about'), href: '#about' },
    ];

    const legalLinks = [
        { label: t('footer.legal.terms'), href: '/terms' },
        { label: t('footer.legal.privacy'), href: '/privacy' },
        { label: t('footer.legal.cookies'), href: '/cookies' },
    ];

    const resourceLinks = [
        { label: t('footer.resources.blog'), href: '/blog' },
        { label: t('footer.resources.help'), href: '/help' },
    ];

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Github, href: '#', label: 'GitHub' },
    ];

    return (
        <footer className="w-full bg-[#1B5E20] text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        {/* Logo */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-[#1B5E20]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Platme</h3>
                        <p className="text-green-100 text-sm max-w-xs leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.company.title')}</h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-green-100 hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.legal.title')}</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-green-100 hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="font-semibold mb-4">{t('footer.resources.title')}</h4>
                        <ul className="space-y-3">
                            {resourceLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-green-100 hover:text-white text-sm transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-green-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-green-100 text-sm">
                            {t('footer.copyright')}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                                >
                                    <social.icon className="w-4 h-4 text-white" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
