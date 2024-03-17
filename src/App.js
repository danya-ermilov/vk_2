import logo from "./logo.svg";
import "./App.css";
import Log from "./consoleLog";
import AgeForm from "./logAge";
import CatFactFetcher from "./consoleLog";

function App() {
  return (
    <div className="App">
      <CatFactFetcher />
      <AgeForm />
    </div>
  );
}

export default App;
