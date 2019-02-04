# [next-avenues](https://github.com/samueljoos/next-avenues) *0.2.1*

> A fancy dynamic router for Next.js heavily inspired on Adonis.js and next-routes


### src/Router.js


#### new Router() 

Router is the public interface used to define
routes, groups and Link components.






##### Returns


- `Void`



#### Router._initialize()  *private method*

Initialize the client url location data






##### Returns


-  



#### Router._validateGroupClosure(callback)  *private method*

Validates the group closure to make sure
it is a function




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  |  | &nbsp; |




##### Returns


- `Void`



#### Router._validateNestedGroups()  *private method*

Validates that nested groups are not created.






##### Returns


- `Void`



#### Router.add(route, page) 

Creates a new route which resolves to a Next.js page component.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `string`  |  | &nbsp; |
| page | `string`  |  | &nbsp; |




##### Returns


- `Route`  



#### Router.match(url, host) 

Resolves and returns the route that matches given **url** and **host**

**Note:** The first matching route will be used. So make
sure the generic routes are created after the
static routes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `string`  |  | &nbsp; |
| host | `string`  |  | &nbsp; |




##### Returns


- `Object`  



#### matchingRoute() 

Find the first matching route.






##### Returns


- `Void`



#### if() 

Return null when unable to find a route.






##### Returns


- `Void`



#### group([name], callback) 

Create a group of routes




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | *Optional* |
| callback | `Function`  |  | &nbsp; |




##### Examples

```javascript
routes.group(() => {
    routes.add('/', 'dashboard')
}).prefix('admin')
```


##### Returns


- `Group`  



#### group() 

Create a new group and pass all the routes
to the group.






##### Returns


- `Void`



#### list() 

Returns an array of all the registered routes






##### Returns


- `Array`  



#### Link(props) 

Link component for react




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| props | `Object`  |  | &nbsp; |




##### Returns


- `React.Element`  



#### getCurrentRoute() 

Return the current active route.
This is usualy called inside the getInitialProps a Next.js page component.






##### Returns


- `Object`  



#### getRequestHandler(app, customHandler) 

Middleware function for your nextjs server setup.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| app | `Next.App`  |  | &nbsp; |
| customHandler | `Function`  |  | &nbsp; |




##### Returns


- `Function`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
