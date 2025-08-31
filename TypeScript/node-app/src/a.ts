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

type arr=number[] //Array cannot be created by interface

function findMax(arr:number[]):void{
    console.log(Math.max(...arr));
}

findMax([1,2,3]);