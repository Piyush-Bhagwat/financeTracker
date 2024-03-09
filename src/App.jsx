import './App.css';
import { checkUserExist, login } from './database/auth.db';

function App() {
  return (
    <div className="App">
      <h1>Tracker</h1>
      <button onClick={login}>Hello</button>
    </div>
  );
}

export default App;
