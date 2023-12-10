import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Mission from "./Mission/Mission";
import Assignment from "./Assessment/Assignment";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Assignment/>} />
      <Route path="/mission" element={<Mission/>} />
      <Route path="/assignment" element={<Assignment/>} />
    </Routes>
  )
}

export default App;
