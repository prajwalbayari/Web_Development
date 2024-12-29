import { useMemo, useState } from "react";
import { checkEmail, checkPassword } from "./validators";

export function StateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isAfterFirstSubmit,setIsAfterFirstSubmit]=useState(false)

  const emailErrors=useMemo(()=>{
    return isAfterFirstSubmit? checkEmail(email):[]
  },[isAfterFirstSubmit,email])

  
  const passwordError=useMemo(()=>{
    return isAfterFirstSubmit? checkPassword(password):[]
  },[isAfterFirstSubmit,password])

  function onSubmit(e) {
    e.preventDefault();
    setIsAfterFirstSubmit(true)

    const emailResults = checkEmail(email);
    const passwordResults = checkPassword(password);

    setEmailError(emailResults);
    setPasswordError(passwordResults);

    if(emailErrors.length === 0 && passwordError.length===0){
      alert("Success!!")
    }
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
      </div>
      <div className={`form-group ${passwordError.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          value={password}
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError.length > 0 && (
          <div className="msg">{passwordError.join(", ")}</div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
