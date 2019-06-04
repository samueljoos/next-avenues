# [next-avenues](https://github.com/samueljoos/next-avenues) *0.8.2*

> A fancy dynamic router for Next.js heavily inspired on Adonis.js and next-routes


### src/Store.js


#### new Store() 

Route store is used to store registered routes as an
array. It is a singleton store to be exported and
used by an part of the application to store
routes.






##### Returns


- `Void`



#### Store.breakpoint(name) 

Add a breakpoint to routes. All routes after the
breakpoint will be recorded seperately. Helpful
for @ref(Route/group).

Also only one breakpoint at a time is allowed.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | Breakpoint name. | &nbsp; |




##### Returns


- `Void`



#### Store.hasBreakpoint() 

Returns a boolean indicating whether breakpoint
is enabled or not.






##### Returns


- `boolean`  



#### Store.breakpointRoutes() 

Returns the routes recorded during
breakpoint.






##### Returns


- `Array`  



#### Store.releaseBreakpoint() 

Release the breakpoint.






##### Returns


- `Void`



#### Store.add(route) 

Add a route to the store.
This function is used by [Router.add](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#routeraddroute-page)
Also see [Route](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `Route`  | Route instance. | &nbsp; |




##### Returns


- `Void`



#### Store.remove(routeToRemove) 

Remove route from the store.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| routeToRemove | `Route`  | Route instance. | &nbsp; |




##### Returns


- `Void`



#### Store.clear() 

Clear all the routes store so far.






##### Returns


- `Void`



#### Store.find(routeNameOrHandler, domain) 

Find a route with name or it's url




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| routeNameOrHandler | `string`  | Route name or path template. | &nbsp; |
| domain | `string`  | For domain matching not used for subdomain matching. | &nbsp; |




##### Returns


- `Object` `Null`  



#### Store.list() 

Returns a list of stored routes.






##### Returns


- `Array`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
