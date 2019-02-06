# Next Avenues

A fancy dynamic router for [Next.js](https://nextjs.org/) heavily inspired on [Adonis.js](https://adonisjs.com/) and [next-routes](https://github.com/fridays/next-routes)

## What's in the box?

- Adonis.js like syntax for building routes
- Request handler middleware for express & co
- Link and Router that generate URLs by route definition
- Ability to use domains and subdomain parameters
- Group routes and apply a prefix, domain or extra route data to all of your routes

## How to use?

Install

```
npm install next-avenues --save
```

Create a routes.js file inside your project

```js
// ./routes.js
const router = require('next-avenues');

router.add('/', 'index').as('homepage');
router.add('/blog-item/:slug', 'blog').as('blog-item');
router
	.group(() => {
		router.add('/', 'admin-dashboard').as('admin-dashboard');
	})
	.prefix('admin');

module.exports = router;
```

The routes file will be used by the server and the client.

### Server implementation
Create a custom **server.js** and implement the [router.getRequestHandler](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#routergetrequesthandlerapp-customhandler) middleware.
For more information about creating a custom next.js server configuration goto [Next.js documentation](https://github.com/zeit/next.js/#custom-server-and-routing)

**Example implementation:**
```js
// ./server.js
const next = require('next');
const http = require('http');
const router = require('./routes');
const port = 3002;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handleNextRequests = router.getRequestHandler(app);

app.prepare().then(() => {
    const server = new http.Server((req, res) => {
        app.setAssetPrefix('');
        return handleNextRequests(req, res);
    });

    server.listen(port, (err) => {
        if (err) {
            throw err;
        }

        console.log(`> Ready on http://localhost:${port}`);
    });
});
```

Replace the scripts part in your **package.json** file with following configuration:

```json
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
```

### The page component (the basic implementation)

To get the route data you need to import the **routes.js** file and call the [router.getCurrentRoute](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#routergetcurrentroute) function.

```js
// ./pages/BlogItem.js
import routes from '../routes';
export default class BlogItem extends React.Component {
	static async getInitialProps() {
		// Retrieve the current route data
		const route = routes.getCurrentRoute();
		return { route };
	}
	render() {
        // this.props.route.params.slug
	}
}
```

### The page component (the advanced implementation)

Most of the times you'll want an **_app.js** component which does the call to your current route and passes it down to your page component.

```js
// ./pages/_app.js
import React from 'react';
import App, { Container } from 'next/app';
import routes from '../routes';
export default class App extends React.Component {
	static async getInitialProps() {
		let pageProps = {};
		// Retrieve the current route data
		const route = routes.getCurrentRoute();
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx, route);
		}
		return { pageProps, route };
	}
	render() {
		const { Component, pageProps, route } = this.props;
		return (
			<Container>
			    <Component {...pageProps} route={route}/>
			</Container>
		);
	}
}
```

Now you can access the route data in every page component like this:

```js
// ./pages/BlogItem.js
import routes from '../routes';
export default class BlogItem extends React.Component {
	static async getInitialProps(ctx, route) {
		// route.params.slug
	}
	render() {
		// this.props.route.params.slug
	}
}
```

## Link component

Use the [Link](https://github.com/samueljoos/next-avenues/blob/master/docs/link.md) component to generate links based on route name

For example consider following **routes.js** in the root of your project.
```js
// ./routes.js
const router = require('next-avenues');

router.add('/', 'index').as('homepage');
router.add('/blog-item/:slug', 'blog').as('blog-item');

router
	.group(() => {
		router.add('/', 'admin-dashboard').as('dashboard');
	})
    .name('admin')
    .domain(':subdomain.someurl.com')
    .prefix('admin');

module.exports = router;
```
Then you can for example create following [Link](https://github.com/samueljoos/next-avenues/blob/master/docs/link.md) instances:
```js
// ./components/LinkExample.js
import { Link } from 'next-avenues';

const LinkExample = () => (
    <div>
        <Link name='homepage'><a>Homepage</a></Link>
        // this resolves to a link with following href: '/'
        <Link name='blog-item' params={{ slug:'some-article' }}><a>A blog post</a></Link>
        // this resolves to a link with following href: '/blog-item/some-article'
        <Link name='admin.dashboard' params={{ subdomain:'some-subdomain' }}><a>A complex route url</a></Link>
        // this resolves to a link with following href: 'http://some-subdomain.someurl.com/admin/'
    </div>
)
```

## Api documentation

- [Link](https://github.com/samueljoos/next-avenues/blob/master/docs/link.md)
- [Router](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md)
- [Route](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md)
- [Group](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md)
- [Store](https://github.com/samueljoos/next-avenues/blob/master/docs/store.md)
