import AssignmentDescription from "./AssignmentDescription";
import Dashboard from "../components/Dashboard/Dashboard";
import axios from "axios";
import { useState, useEffect } from "react";
const Assignment = ()=>{
    const [description, setDescription] = useState("");
    useEffect(()=>{
        axios.post("http://localhost:8080/api/suggest/assignment",{
            "AssignmentID" : 1,
        }).then(res=>{
            console.log(res.data)
           setDescription(res.data.assignment);
        }).catch(err=>{
            console.log(err);
        })
    },[]);
    return(
        <div className="flex flex-col items-center  min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-4">Assignment</h1>
            <h2 className="text-xl font-semibold text-center mb-2">Description</h2>
            <AssignmentDescription description= {description}/>
            <h2 className="text-xl font-semibold text-center mb-2">Student Problems</h2>
            <Dashboard/>
        </div>
    );
}
export default Assignment;