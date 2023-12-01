import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Mission from "./Mission/Mission";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/mission" element={<Mission/>} />
    </Routes>
  )
}

export default App;
