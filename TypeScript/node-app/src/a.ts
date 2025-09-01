// let x:number=1;

function greet(firstName: String) {
  console.log("Hello " + firstName);
}

function sum(a: number, b: number): number {
  return a + b;
}

function isLegal(a: number): boolean {
  return a >= 18;
}

function runAfter1s(fn: () => void) {
  console.log("Waiting....");
  setTimeout(fn, 1000);
}

interface User {
  name: String;
  age: number;
  email?: String;
}

function islegal(user: user): boolean {
  if (user.age >= 18) return true;
  return false;
}

type user = {
  name: String;
  age: number;
  email?: String;
};

// console.log(islegal({ name: "P", age: 10 }));

type Greet = number | String | boolean; // Union

type Employee = {
  name: String;
  startDate: Date;
};

type Manager = {
  name: String;
  department: String;
};

type teamLead = Employee & Manager; // Intersection

type arr = number[]; //Array cannot be created by interface

function findMax(arr: number[]): void {
  console.log(Math.max(...arr));
}

// findMax([1,2,3]);

enum direction {
  "Up", // 0
  "Down", // 1
  "Left", // 2
  "Right", // 3 These values can be changed by assigning different values here
}

function doSomeThing(dir: direction): void {
  if (dir == direction.Up) {
    console.log("Going up");
  } else if (dir == direction.Down) {
    console.log("Going down");
  } else if ((dir = direction.Left)) {
    console.log("Going left");
  } else {
    console.log("Going right");
  }
}

// doSomeThing(direction.Up);

//Generics
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity<string>("MyString");
let output2 = identity<Number>(10);

output1 = output1.toUpperCase();

// console.log(output1, output2);

function getMyFirstElement<T>(args: T[]): T | undefined {
  return args[0];
}

const el = getMyFirstElement<String>(["Hello", "There"]);
console.log(el?.toLowerCase());
