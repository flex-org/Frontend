'use client';

import Image from 'next/image';
import logo from '../../public/images/logo.svg';
const Logo = () => {
    return <div>
        <Image src={logo} alt='amr' />
    </div>;
};

export default Logo;
