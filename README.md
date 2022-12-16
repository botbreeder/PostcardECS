# PostcardECS
Toy-size entity-component-system architecture.

```js

const PostcardECS = require("./pecs");

// Create instance
let world = new PostcardECS();

// Register systems
world.system(["value", "increment"], (e) => { e.value += e.increment; });
world.system(["value", "show"], (e, id) => console.log(`Value of ${id} is ${e.value}`));

// Create entities
let e0 = world.create({ value: 1 }, 'E'),
    e1 = world.create({ value: 1, show: true }, 'E'),
    e2 = world.create({ value: 1, increment: 1 }, 'E'),
    e3 = world.create({ value: 1, show: true, increment: 1 }, 'E');

// Remove entities
world.remove(e2);

// Loop
setInterval(() => world.step(), 500);

```
