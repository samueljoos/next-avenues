import { router } from '../src';

describe('Creating a named group with a route', () => {
    const group = router.group(() => {
        router.add('named-group-route', 'route').as('route');
    }, 'named-group');

    it('group should have a route', () => {
        expect(group._routes.length).toBe(1);
    });

    it('route name should be prefixed', () => {
        expect(group._routes[0].name).toBe('named-group.route');
    });
});

describe('Creating a named group via as(name) with a route', () => {
    const group = router.group(() => {
        router.add('named-group-route', 'route').as('route');
    }).as('named-group');

    it('group should have a route', () => {
        expect(group._routes.length).toBe(1);
    });

    it('route name should be prefixed', () => {
        expect(group._routes[0].name).toBe('named-group.route');
    });
});

describe('Creating a prefix group with a route', () => {
    const group = router.group(() => {
        router.add('prefix-group-route', 'route').as('route');
    }).prefix('prefix-group');
    it('group should have a route', () => {
        expect(group._routes.length).toBe(1);
    });
    it('route path should be prefixed', () => {
        expect(group._routes[0]._route).toBe('/prefix-group/prefix-group-route');
    });
});

describe('Creating a domain group with a route', () => {
    const group = router.group(() => {
        router.add('domain-route', 'route').as('route');
    }).domain('test.domain.local');
    it('group should have a route', () => {
        expect(group._routes.length).toBe(1);
    });
    it('route should have a domain', () => {
        expect(group._routes[0]._domain).toBe('test.domain.local');
    });
});

describe('Creating a group with data', () => {
    const group = router.group(() => {
        router.add('data-route', 'route').as('route');
    }).data({ test: 'data' });
    it('group should have a route', () => {
        expect(group._routes.length).toBe(1);
    });
    it('route should have data', () => {
        expect(JSON.stringify(group._routes[0].data)).toBe('{"test":"data"}');
    });
});
