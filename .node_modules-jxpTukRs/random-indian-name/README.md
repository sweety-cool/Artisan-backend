# random-indian-name
Generate random (or seeded) Indian Names.

To install:
```
npm install random-indian-name
```

To use:
```
var random_name = require('random-indian-name');
console.log(random_name()); // -> "Gaurav Seth"
console.log(random_name({ first: true, gender: "male" })); // -> "Pushkar"
console.log(random_name({ last: true })); // -> "Seth"
console.log(random_name({ seed: 'Based on this' })); // -> "Madhu Bhatia"
console.log(random_name({ random: Math.random, female: true })); // -> "Monika"
```

The names are taken from Baby names sites.  The default random number
generator is [alea](https://www.npmjs.com/package/alea), because it
can be seeded -- but you can pass in any function you like, so long
as it returns a floating point number in the range \[0,1\).
