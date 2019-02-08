import { createElement } from 'react';
import { Link, router } from '../src';
import renderer from 'react-test-renderer';

router.domain = 'local.test';
router.port = 3000;

describe('adding routes', () => {
    it('route can be created', () => {
        const startCount = router.list().length;
        router.add('/home/:slug', 'homepage').as('homepage');
        expect(router.list().length - startCount).toBe(1);
    });

    it('domain route can be created', () => {
        const startCount = router.list().length;
        router.add('/domain/:slug', 'domain').as('domain').domain('local.test');
        expect(router.list().length - startCount).toBe(1);
    });

    it('subdomain route can be created', () => {
        const startCount = router.list().length;
        router.add('/subdomain', 'subdomain').as('subdomain').domain(':domainname.test');
        expect(router.list().length - startCount).toBe(1);
    });

    it('prefixed route can be created', () => {
        const startCount = router.list().length;
        router.add('/prefixed', 'prefix').as('prefix').prefix('prefix');
        expect(router.list().length - startCount).toBe(1);
    });

    it('prefixed domain route can be created', () => {
        const startCount = router.list().length;
        router.add('/domain', 'prefix-domain').as('prefix-domain').domain('local.test').prefix('prefix');
        expect(router.list().length - startCount).toBe(1);
    });

    it('group with routes can be created', () => {
        const startCount = router.list().length;

        router.group(() => {
            router.add('/first', 'group-first').as('group-first');
            router.add('/second', 'group-second').as('group-second');
        });

        expect(router.list().length - startCount).toBe(2);
    });

    it('prefix group with routes can be created', () => {
        const startCount = router.list().length;

        router.group(() => {
            router.add('/first', 'group-prefix-first').as('group-prefix-first');
            router.add('/second', 'group-prefix-second').as('group-prefix-second');
        }).prefix('group-prefix');

        expect(router.list().length - startCount).toBe(2);
    });

    it('domain group with routes can be created', () => {
        const startCount = router.list().length;

        router.group(() => {
            router.add('/domain-first', 'group-domain-first').as('group-domain-first');
            router.add('/domain-second', 'group-domain-second').as('group-domain-second');
        }).domain('local.test');

        expect(router.list().length - startCount).toBe(2);
    });

    it('subdomain group with routes can be created', () => {
        const startCount = router.list().length;

        router.group(() => {
            router.add('/subdomain-first', 'group-subdomain-first').as('group-subdomain-first');
            router.add('/subdomain-second', 'group-subdomain-second').as('group-subdomain-second');
        }).domain(':domainname.test');

        expect(router.list().length - startCount).toBe(2);
    });
});

describe('creating links', () => {
    it('for a route', () => {
        const component = renderer.create(
            createElement(Link, { name: 'homepage', params: { slug: 'slug' }}, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a domain route', () => {
        const component = renderer.create(
            createElement(Link, { name: 'domain', params: { slug: 'slug-2' }}, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a subdomain route', () => {
        const component = renderer.create(
            createElement(Link, { name: 'subdomain', params: { domainname: 'bla' }}, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a prefixed route', () => {
        const component = renderer.create(
            createElement(Link, { name: 'prefix' }, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a prefixed domain route', () => {
        const component = renderer.create(
            createElement(Link, { name: 'prefix-domain' }, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a route in a group', () => {
        const component = renderer.create(
            createElement(Link, { name: 'group-first' }, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a route in a prefix group', () => {
        const component = renderer.create(
            createElement(Link, { name: 'group-prefix-first' }, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a route in a domain group', () => {
        const component = renderer.create(
            createElement(Link, { name: 'group-domain-first' }, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('for a route in a subdomain group', () => {
        const component = renderer.create(
            createElement(Link, { name: 'group-subdomain-first', params: { domainname: 'subdomain' }}, createElement('a', {}, 'link')),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('resolving routes', () => {
    it('for a route', () => {
        const { page } = router.match('/home/slug', router.domain);
        expect(page).toBe('homepage');
    });

    it('for a domain route', () => {
        const { page } = router.match('/domain/slug-2', router.domain);
        expect(page).toBe('domain');
    });

    it('for a subdomain route', () => {
        const { page } = router.match('/subdomain', 'bla.test');
        expect(page).toBe('subdomain');
    });

    it('for a prefixed route', () => {
        const { page } = router.match('/prefix/prefixed', router.domain);
        expect(page).toBe('prefix');
    });

    it('for a prefixed domain route', () => {
        const { page } = router.match('/prefix/domain', router.domain);
        expect(page).toBe('prefix-domain');
    });

    it('for a route in a group', () => {
        const { page } = router.match('/first', router.domain);
        expect(page).toBe('group-first');
    });

    it('for a route in a prefix group', () => {
        const { page } = router.match('/group-prefix/first', router.domain);
        expect(page).toBe('group-prefix-first');
    });

    it('for a route in a domain group', () => {
        const { page } = router.match('/domain-first', router.domain);
        expect(page).toBe('group-domain-first');
    });

    it('for a missing route', () => {
        const match = router.match('/missing-route', router.domain);
        expect(JSON.stringify(match)).toBe('{}');
    });
});


describe('get current route', () => {
    it('path / should not exist', () => {
        const route = router.getCurrentRoute();
        expect(JSON.stringify(route)).toBe('{}');
    });

    it('path /group-prefix/first should exist', () => {
        router.path = '/group-prefix/first';
        const { page } = router.getCurrentRoute();
        expect(page).toBe('group-prefix-first');
    });
});

describe('Request handler', () => {
    const setup = url => {
        router.path = '/';
        const nextHandler = jest.fn();
        const app = { getRequestHandler: () => nextHandler, render: jest.fn() };
        return { app, req: { url, headers: { host: router.domain }}, res: {}};
    };

    it('find route and call render', () => {
        const { app, req, res } = setup('/');
        const route = router.add('/', 'index');
        router.getRequestHandler(app)(req, res);
        expect(app.render).toBeCalledWith(req, res, '/' + route.page, {});
    });
});

describe('Browser history methods', () => {
    const setup = (method) => {
        router.NextRouter = {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn()
        };
        router[`${method}Route`]('group-prefix-first', {}, { a: 'a' });
        expect(router.NextRouter[method]).toHaveBeenCalledWith('/group-prefix-first', '/group-prefix/first?a=a');
    };
    it('pushRoute', () => {
        setup('push');
    });

    it('replaceRoute', () => {
        setup('replace');
    });

    it('prefetchRoute', () => {
        setup('prefetch');
    });
});
