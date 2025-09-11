import { getUsers } from "@/api/users";
import Link from "next/link";

export default async function UserPage() {
  const users = await getUsers();
  return (
    <>
      <h1 className="page-title">Users</h1>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div className="card-header">{user.name}</div>
          <div className="card-body">
            <div>{user.company.name}</div>
            <div>{user.website}</div>
            <div>{user.email}</div>
          </div>
          <div className="card-footer">
            <Link className="btn" href={`users/${user.id.toString()}`}>
              View
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
