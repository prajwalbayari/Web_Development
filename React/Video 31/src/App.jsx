import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else return Promise.reject(res);
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((e) => {
        if(e?.name==="AbortError") return
        setErr(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  let jsx = <h1>Hello</h1>;

  if (loading) {
    jsx = <h2>Loading...</h2>;
  } else if (err != null) {
    jsx = <h2>Error:Something went wrong</h2>;
  } else {
    jsx = JSON.stringify(users);
  }

  return (
    <div>
      <h1>Users</h1>
      {jsx}
    </div>
  );
}

export default App;
