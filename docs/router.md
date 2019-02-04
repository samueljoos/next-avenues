# next-avenues *0.0.1*

> Sofisticated routes for nextjs


### src/Router.js


#### new Router() 

Router is the public interface used to define
routes, groups and Link components.






##### Returns


- `Void`



#### Router._initialize(callback)  *private method*

Initialize the client url location data




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  |  | &nbsp; |




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


-  



#### Router._validateNestedGroups()  *private method*

Validates that nested groups are not created.






##### Returns


-  



#### Router.add(route, page) 

Creates a new route which resolves to a Next.js page component.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `String`  |  | &nbsp; |
| page | `String`  |  | &nbsp; |




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
| url | `String`  |  | &nbsp; |
| host | `String`  |  | &nbsp; |




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
| name | `string`  | == null] | *Optional* |
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
| props | `object`  |  | &nbsp; |




##### Returns


-  React.Element



#### getCurrentRoute() 

Return the current active route.
This is usualy called inside the getInitialProps a Next.js page component.






##### Returns


- `object`  



#### getRequestHandler(app, customHandler) 

Middleware function for your nextjs server setup.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| app | `Next.App`  |  | &nbsp; |
| customHandler | `Function`  |  | &nbsp; |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
