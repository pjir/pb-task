# PbTask

## Stuck problem in unit tests

`ReferenceError: \_\_classPrivateFieldGet is not defined`

- **Description** - When we are using unit tests with new typescript 3.8+ and we have a private property using hashtag syntax. It doesn't matter which version of tslib we are using, problem exist even with tslib 2.0.

- **Fix** - To fix the problem we must disable the helper inside "tsconfig.spec.json". I tried everything else and disable helper is the only way I found.

## Tech stack

- Angular 9+ (some pros: incremental DOM [lower memory footprint in browser], XSS protection, lazy loading, good for large enterprise projects, great support)
- Typescript 3.8+
- SASS
- Material Components (we could use any alternative like bootstrap, foundation, semantic etc...)
- RxJS - Reactive programming is really powerful, for enterprise project i can recommend to use NgRx
- Prettier as extension to lint

## What's done

- All FR and NFR’s are completed and working
- RWD - I did some basic RWD, first idea in my head :)
- Shared components are reusable pure components, we could transform them to separate lib and use them in other projects.
- Reasonable (for that limited period of time) test coverage. Components and marble tests for RxJS also.
- SASS - Theme, some helper variables
- Accessibility - aria labels ( few for example )
- Optimization - OnPush strategy

## What's should be done for the real production project

- I used material icons because provided png are low-res and they don't have transparency (In production for safety reason we should remove them from head and use it directly from server )
- Strong UI/UX / RWD - With Angular Animations we can create really great complex animations, or even reusable animations with attributes
- more more and more tests, we should consider TDD approach
- To better optimization
  - virtual scrolling for lists
  - trackBy function to track changes for items in list
  - use web workers for multi-threads
  - create data proxies
  - SSR - Server Side Rendering using Universal
  - split app to multiple nodes with one core per node and load balancer on top (DevOps job :D)

## That's all

- I spent on this task between 30-35h with some gaps to play with my kids :D
- Thank you very much for your patience and your time to check this task.

#### Kind Regards

_Patrick J._
