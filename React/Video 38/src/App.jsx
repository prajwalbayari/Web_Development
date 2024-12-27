import { useEffect } from "react";
import { useState } from "react";
import { User } from "./User";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    let controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(setUsers)
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <h1>User list</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {users != null &&
            users.map((user) => {
              return <User key={user.id} {...user} />;
            })}
        </ul>
      )}
    </>
  );
}

export default App;
