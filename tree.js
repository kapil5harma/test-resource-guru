const assert = require("assert");

class Node {
  constructor(operator, value, left, right) {
    this.operator = operator;
    this.value = value;
    this.left = left;
    this.right = right;
  }

  result() {
    switch (this.operator) {
      case "+":
        return this.left.result() + this.right.result();
      case "-":
        return this.left.result() - this.right.result();
      case "x":
        return this.left.result() * this.right.result();
      case "÷":
        return this.left.result() / this.right.result();
      default:
        return this.value;
    }
  }

  toString() {
    switch (this.operator) {
      case "+":
        return `(${this.left.toString()} + ${this.right.toString()})`;
      case "-":
        return `(${this.left.toString()} - ${this.right.toString()})`;
      case "x":
        return `(${this.left.toString()} x ${this.right.toString()})`;
      case "÷":
        return `(${this.left.toString()} ÷ ${this.right.toString()})`;
      default:
        return this.value.toString();
    }
  }
}

const tree = new Node(
  "÷",
  null,
  new Node(
    "+",
    null,
    new Node("", 7, null, null),
    new Node(
      "x",
      null,
      new Node(
        "-",
        null,
        new Node("", 3, null, null),
        new Node("", 2, null, null),
      ),
      new Node("", 5, null, null),
    ),
  ),
  new Node("", 6, null, null),
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
