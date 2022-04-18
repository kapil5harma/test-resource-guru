// First solution that I could think of is:

function flatten(arr) {
  let flattenedArr = [];
  arr.forEach((element) => {
    if (Array.isArray(element)) {
      const result = flatten(element);
      result.forEach((element) => flattenedArr.push(element));
    } else {
      flattenedArr.push(element);
    }
  });
  return flattenedArr;
}

let inputArr;

inputArr = [1, [2, [3]], 4];
console.log("flatten(inputArr): ", flatten(inputArr));

// The maximal recursion depth is limited by JavaScript engine
// For instance, on my machine using NodeJS, it works for ~2600 levels of nesting

// We can optimise the flatten function by:
// 1. using a loop based approach
// 2. using Tail Call Optimisation (TCO)

// TCO - the recursion strategy where we pass the result till now to the recursive call so that we do not wait for the value to be returned.
// As a result, we remove the call from the stack, in turn optimising the memory being used.

// Now the catch here is - most of the JavaScript runtimes/browsers do not support TCO
// So no matter if use slice, reduce, or spread operator with TCO, we end up getting error: "RangeError: Maximum call stack size exceeded" once the nesting level crosses ~2500

// When trying to find an alternative, I came across a Stack Overflow post (https://stackoverflow.com/questions/46434526/tail-call-optimizing-recursive-function)
// Answer by Mulan works for even 50,000 levels of nesting.
// I didn't know this, and I still don't understand it completely, but I'm gona try and spend some time doing that after this.

// Here's the solution for reference:
const recur = (...values) => ({ type: recur, values });

const loop = (f) => {
  let acc = f();
  while (acc && acc.type === recur) acc = f(...acc.values);
  return acc;
};

const flattenDeep = (arr) =>
  loop((acc = [], [x, ...xs] = arr) =>
    x === undefined
      ? acc
      : Array.isArray(x)
      ? recur(acc, x.concat(xs))
      : recur(acc.concat(x), xs),
  );

let data = [];
for (let i = 5e4; i > 0; i--) data = [i, data];

// stack-safe !
console.log(flattenDeep(data));
