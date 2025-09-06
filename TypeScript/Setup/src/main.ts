let a: number = 4;

// Arrays
const arr = [1, 2, 3];
// arr.push("a"); // Error
arr.push(a);

// Any type
let b;
b = "abc";
b = 3;

// const par = JSON.parse("abc"); //Any type

// Objects

const Person: { name: string; age: number; isProgrammer?: boolean } = {
  name: "Prajwal",
  age: 10,
};

// Types these are reusable

// type person = {
//   name: string;
//   age: number;
//   isProgrammer: boolean;
//   isStudent: boolean;
//   friends?: string[];
//   address?: {
//     houseNO: number;
//     street: string;
//     city: string;
//   };
// };

//Interface

interface person {
  name: string;
  age: number;
  isProgrammer: boolean;
  isStudent: boolean;
  friends?: string[];
  address?: {
    houseNO: number;
    street: string;
    city: string;
  };
}

const p1: person = {
  name: "prajwal",
  age: 20,
  isProgrammer: false,
  isStudent: true,
};

// Functions
function func(p1: person): number {
  console.log(p1);
  return 0;
}

// Optional attributes into a function
function opt(num1: number, num2: number = 0) {
  console.log(++num2);
}

// Function with callback
function sumWithCallback(a: number, b: number, cb: (c: number) => void) {
  cb(a + b);
}

// sumWithCallback(10, 20, (sum: number) => {
//   console.log("Sum with callback: " + sum);
// });

// Unions

let id: number | string | boolean = 0;
// console.log(id);
id = "Hello";
// console.log(id);
id = false;
// console.log(id);

// Intersection
// Use extends to perform intersection on interfaces
type NewPerson = person & { gender: string };

const p2: NewPerson = {
  name: "Sujit",
  age: 21,
  isProgrammer: true,
  isStudent: false,
  gender: "M",
};
// console.log(p2);

// Read only
type Number = readonly number[];
const ar: Number = [1, 2, 3];
// ar[3]=10; Throws an error

// keyof

function getVal(key: keyof person, person: person) {
  return person[key];
}
const p: person = {
  name: "Japti",
  age: 35,
  isProgrammer: true,
  isStudent: true,
};

// indexof

type Soldier = {
  name: string;
  skill: "Beginner" | "Intermediate" | "Expert";
};

// Object.entries(p2).forEach(([key, val]) => {
//   console.log(key, ":", val);
// });

// tuple

type Tuple = [string, boolean, number];
let z: Tuple = ["name", false, 10];
// console.log(z);

// Generics

function getSecond<T>(array: T[]): T {
  return array[2];
}

const nums = [1, 2, 3];
const strs = ["1", "2", "3"];
// console.log(getSecond<number>(nums));
// console.log(getSecond<string>(strs));

///Promises
function wait(duration: number) {
  return new Promise<String>((resolve) => {
    setTimeout(() => {
      "Hi";
    }, duration);
  });
}

wait(1000).then((val) => {
  console.log(val.length);
});

// Pick and omit
type Programmer = Omit<person, "isProgrammer">;
type Student = Pick<
  person,
  "age" | "name" | "friends" | "isProgrammer" | "address"
>;

//Partial and required
type opt = Partial<Student>;
type req = Required<Student>;

//Return type and parameters
type returnType = ReturnType<typeof getSecond>;
type params = Parameters<typeof getSecond>;

// Record
type group = Record<string, number[]>;
//Readonly
type confidentialPerson = Readonly<person>;
