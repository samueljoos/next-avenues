import { store, router } from './';
import { createElement } from 'react';
import { default as NextLink } from 'next/link';

/**
 * @description
 * Link component based on [next/link](https://github.com/zeit/next.js/#with-link)
 * It is possible to use this component exactly the same as Next.js <Link> component but it has some extra props.
 *
 * - **name** Route name
 * - **params** Route parameters (note: this is also the place to define your subdomain variables)
 * - **domain** Route domain (note: if the domain differs from the current active domain, push state won't be triggered)
 * - **query** Additional query parameters
 *
 * @function Link
 *
 * @param {Object} props Props that are used by next-avenues: (name:string, params:?Object, domain:?string, query:?object).
 * @returns {React.Element}
 *
 * @example
 * <Link name="article" domain="blog.next-avenues.com" params={{slug: 'lorem-ipsum'}} query={{ q: 'search' }} ><a>link</a><Link>
 */
const Link = ({ name, params, domain, protocol, query, ...newProps }) => {
    try {
        const route = store.find(name, domain || router.domain);
        const nextLinkProps = route.getNextLinkProps(params, { domain, protocol: protocol, query });
        return createElement(NextLink, { ...newProps, ...nextLinkProps });
    } catch (e) {
        // Fallback to Next.js Link component.
        return createElement(NextLink, { ...newProps });
    }
};

export default Link;
