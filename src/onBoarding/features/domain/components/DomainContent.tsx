import DomainContentClient from './DomainContentClient';

const DomainContent = async ({ lng }: { lng: string }) => {
    return <DomainContentClient lng={lng} />;
};

export default DomainContent;
