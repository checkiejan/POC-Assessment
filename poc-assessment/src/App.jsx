import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import IterationPage from "./Iteration/IterationPage";
import Assignment from "./Assessment/Assignment";
import FileUpload from "./FileUploading/FileUpload";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Assignment/>} />
      <Route path="/iteration/:iterationID" element={<IterationPage/>} />
      <Route path="/assignment" element={<Assignment/>} />
      <Route path="/upload" element={<FileUpload/>} />
    </Routes>
  )
}

export default App;
