let todo = [];

let req = prompt("Please enter your choice");

while (true) {
  if (req == "quit") {
    console.log("Quitting app\n");
    break;
  }
  if (req == "list") {
    console.log(todo);
  } else if (req == "add") {
    let a1 = prompt("Enter the task to be added\n");
    todo.push(a1);
    console.log("Task added successfully\n");
  } else if (req == "delete") {
    let a2 = prompt("Enter the task to be added\n");
    todo.splice(todo.indexOf(a2), 1);
    console.log("Task deleted successfully\n");
  } else console.log("Invalid input\n");
  req=prompt("Please enter your choice:")
}
