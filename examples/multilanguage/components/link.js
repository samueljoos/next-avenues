import { Link as AvenueLink, router } from 'next-avenues';

const Link = ({ lang, ...newProps }) => (
    <AvenueLink {...newProps} lang={ lang || router.getCurrentRoute().data.lang } />
);

export default Link;
