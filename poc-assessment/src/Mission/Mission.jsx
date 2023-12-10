import AssignmentForm from "./AssignmentForm";
import { useEffect, useState } from "react";
import axios from "axios";
const Mission = ()=>{
    const [missions, setMissions] = useState([]);

    const fetchMissions = async() =>{
        axios.post("http://localhost:8080/api/mission/get",{
            "assignmentID" : 1,
        }).then(res=>{
            setMissions(res.data.missions);
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchMissions();
    },[])
    return (
        <div>
            {
                missions.map((mission)=>{
                    return (
                        <AssignmentForm key = {mission.MissionID} mission={mission}/>
                    )
                })
            } 
        </div>
    );
}
export default Mission;