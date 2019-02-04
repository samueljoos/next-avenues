# next-avenues *0.2.0*


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
| name | `String`  |  | &nbsp; |




##### Returns


-



#### Store.hasBreakpoint()

Returns a boolean indicating whether breakpoint
is enabled or not.






##### Returns


- `Boolean`



#### Store.breakpointRoutes()

Returns the routes recorded during
breakpoint.






##### Returns


-



#### Store.releaseBreakpoint()

Release the breakpoint.






##### Returns


-



#### Store.add(route)

Add a route to the store




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `Route`  |  | &nbsp; |




##### Returns


- `Void`



#### Store.remove(routeToRemove)

Remove route from the store.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| routeToRemove | `Route`  |  | &nbsp; |




##### Returns


-



#### Store.clear()

Clear all the routes store so far.






##### Returns


-



#### Store.find(nameOrRoute, domain)

Find a route with name or it's url




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| nameOrRoute | `String`  |  | &nbsp; |
| domain | `String`  |  | &nbsp; |




##### Returns


- `Object` `Null`



#### Store.list()

Returns a list of stored routes.






##### Returns


- `Array`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
