import "./user.css"
import user from "./user.json"
import { UserCard } from "./UserCard"
import { UserCardClass } from "./userCardClass"

export default function App() {
  return(
    // <UserCard name={user.name} age={user.age} phoneNumber={user.phoneNumber} address={user.address}> </UserCard>
    <UserCardClass name={user.name} age={user.age} phoneNumber={user.phoneNumber} address={user.address}/>
  )
}
