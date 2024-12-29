export function checkEmail(email) {
  const errors = [];

  if (email.length === 0) {
    errors.push("Email cannot be empty!!");
  }

  if (!email.endsWith("@webdevsimplified.com")) {
    errors.push("Must end with @webdevsimplified.com!!");
  }

  return errors;
}

export function checkPassword(password) {
  const errors = [];

  if (password.length < 10) {
    errors.push("Password must have 10 characters!!");
  }

  if (!password.match(/[a-z]/)) {
    errors.push("Password must contain atleast 1 lowercase letter");
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Password must contain atleast 1 uppercase letter");
  }

  if (!password.match(/[0-9]/)) {
    errors.push("Password must contain atleast 1 number");
  }

  return errors;
}
