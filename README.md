## React Mobx IoC Boilerplate

For my projects based on https://www.logicroom.co/

### Technologies:

- React
- Mobx
- Vite.js
- styled-components

### Gochas:

#### Error 1:
```
11:22:18 PM [vite] Internal server error: /react-mobx-ioc-starter/src/Books/BooksPresenter.tsx: 
Support for the experimental syntax 'decorators-legacy' isn't currently enabled (6:1):

  4 | import { BooksRepository } from "./BooksRepository";
  5 |
> 6 | @injectable()
    | ^
  7 | export class BooksPresenter {

```
Solution:
- change `BooksPresenter.tsx` file type to `BooksPresenter.ts`

#### Error 2:
```
tree_model_1.default is not a constructor
```
Solution:
```js
import * as TreeModel from "tree-model";
```
