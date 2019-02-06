import { Link as AvenueLink, router } from 'next-avenues';

const Link = ({ lang, ...newProps }) => {
    const route = router.getCurrentRoute();
    return route && route.data ?
        <AvenueLink {...newProps} params={{ lang: lang || route.params.lang }} />
        :
        null;
};

export default Link;
