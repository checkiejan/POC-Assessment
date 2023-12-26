import { useState, useEffect } from "react";
import SkillForm from "./SkillForm";
import Dashboard from "../components/Dashboard/Dashboard";
import axios from "axios";
const Iteration = (iterationOld)=>{
    const [missions,setMissions] = useState([]);
    const iteration = iterationOld.iteration;
    const fetchMissions = async()=>{
        
    }
    return(
        <div>
            <p className="text-xl font-semibold text-center mb-2">{iteration.shortDescription}</p>
            <SkillForm iterationID={iteration.iterationID}/>
            <Dashboard missions={iteration.missions} fetchMissions={fetchMissions}/>
        </div>
    );
}
export default Iteration;

