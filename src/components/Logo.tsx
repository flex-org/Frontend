'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import LogoLight from '../../public/platme-light-mode.svg';
import logo from '../../public/images/logo.svg';
import LogoDark from '../../public/platme-dark-mode.svg';
const Logo = () => {
    return <div>
        <Image src={logo} alt='amr' />
    </div>;
};

export default Logo;
