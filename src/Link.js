import { store, router } from './';
import { createElement, Children, cloneElement } from 'react';
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
const Link = ({ children, name, params, domain, protocol, query, ...newProps }) => {
    const child = Children.only(children);
    let href = newProps.as || newProps.href;
    const props = {
        onClick: (e) => {
            if (child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            router.path = href && href.split('?')[0];
        }
    };

    try {
        const route = store.find(name, domain || router.domain);
        const nextLinkProps = route.getNextLinkProps(params, { domain, protocol: protocol, query });
        href = nextLinkProps.as;
        return createElement(NextLink, { ...newProps, ...nextLinkProps }, cloneElement(child, props));
    } catch (e) {
        // Fallback to Next.js Link component.
        return createElement(NextLink, { ...newProps }, child);
    }
};

export default Link;
