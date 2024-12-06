import './styles.css'
import user from './user.json'

function App() {
  return (
    // <h1>Hello world</h1>
    <h1>{user.name},{user.age}</h1>
  )
}

export default App
