# [next-avenues](https://github.com/samueljoos/next-avenues) *0.6.4*

> A fancy dynamic router for Next.js heavily inspired on Adonis.js and next-routes


### src/Link.js


#### Link(props) 

Link component based on [next/link](https://github.com/zeit/next.js/#with-link)
It is possible to use this component exactly the same as Next.js <Link> component but it has some extra props.

- **name** Route name
- **params** Route parameters (note: this is also the place to define your subdomain variables)
- **domain** Route domain (note: if the domain differs from the current active domain, push state won't be triggered)
- **query** Additional query parameters




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| props | `Object`  | Props that are used by next-avenues: (name:string, params:?Object, domain:?string, query:?object). | &nbsp; |




##### Examples

```javascript
<Link name="article" domain="blog.next-avenues.com" params={{slug: 'lorem-ipsum'}} query={{ q: 'search' }} ><a>link</a><Link>
```


##### Returns


- `React.Element`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
