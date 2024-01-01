import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkillForm from "./SkillForm";
import Dashboard from "../components/Dashboard/Dashboard";
import axios from "axios";
const Iteration = ({iteration})=>{
    const [missions,setMissions] = useState(iteration.missions);
    const [showSkillForm, setShowSkillForm] = useState(false); // State to track visibility of SkillForm
    const navigate = useNavigate();
    const toggleSkillForm = () => {
        setShowSkillForm(!showSkillForm); // Toggle the state to show/hide SkillForm
    };
    const fetchMissions = async()=>{
        axios.post("http://localhost:8080/api/mission/get",{
            "iterationID": iteration.IterationID,
        }).then(res=>{
            setMissions(res.data.missions);
        })
    }
    const navigateToMission = ()=>{
        navigate(`/iteration/${iteration.IterationID}`);
    }
    return(
        <div>
            <p className="text-xl font-semibold text-center mb-2">{iteration.shortDescription}</p>
            <button 
                className="bg-blue-500 mb-4 text-white rounded-full py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition ease-in-out duration-300"
                onClick={toggleSkillForm} >
                {showSkillForm ? 'Hide Skill Form' : 'Add New Skill'}
            </button>
            {/* Conditionally render the SkillForm based on showSkillForm state */}
            {showSkillForm && <SkillForm iterationID={iteration.IterationID} />}
            <Dashboard missions={missions} iterationID={iteration.IterationID} fetchMissions={fetchMissions}/>

        </div>
    );
}
export default Iteration;

