const fs = require("fs");

fs.writeFileSync('./file.txt', 'abcd', (err) => {
  if (err) throw err;
  else console.log('File has been saved!');
});

fs.appendFileSync('./file.txt', new Date().toISOString(), (err) => {
  if (err) throw err;
  console.log('Data has been appended!');
});

//Asynchrounous task returns a callback function whereas synchronous task returns the result directly
console.log("File operations started\n");
console.log("Synchronous");

console.log(1);

const res = fs.readFileSync("./file.txt", "utf-8");   //Blocking operation
console.log("Synchronous data:", res);

console.log(2);

console.log("\nAsynchronous");

console.log(1);

fs.readFile("./file.txt", "utf-8", (err, data) => { //Non blocking operation
  if (err) throw err;
  console.log("Asynchronous data:", data);
});
console.log(2);

// console.log("File stats:", fs.statSync('./file.txt')); //Prints file stats synchronously

// fs.ftruncateSync(fs.openSync('./file.txt', 'r+'), 2, (err) => {
//   if (err) throw err;
//   console.log('File truncated successfully');
// });

const os = require("os");
console.log("\nNumber of CPUs:", os.cpus().length);