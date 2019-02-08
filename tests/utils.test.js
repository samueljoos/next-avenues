import { toQuerystring } from '../src/utils';

describe('query string', () => {
    it('Object should convert to query string', () => {
        const queryString = toQuerystring({ a: 'test', b: 2, c: [1, 2, 3] });
        expect(queryString).toBe('?a=test&b=2&c=1%2F2%2F3');
    });
});
