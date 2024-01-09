import AssignmentForm from "./AssignmentForm";
import Dashboard from "../components/Dashboard/Dashboard";
import Iteration from "../Assessment/Iteration";
import LoadingSpinner from "../common/LoadingSpinner";
import FileUpload from "../FileUploading/FileUpload";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
const IterationPage = ()=>{
    const [iteration, setIteration] = useState();
    const [missions, setMissions] = useState([]);
    const [order,setOrder] = useState();
    const [loading, setLoading] = useState(true);
    const { iterationID } = useParams();
    const fetchMissions = async()=>{
        axios.post("http://localhost:8080/api/mission/get",{
            "iterationID": iteration.IterationID,
        }).then(res=>{
            setMissions(res.data.missions);
        })
    }
    const fetchIterations = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/assignment/fetch-mission", {
                "AssignmentID": 1,
            });
            console.log(res.data.iterations.find(iter=>iter.IterationID == iterationID))
            setIteration(res.data.iterations.find(iter=>iter.IterationID == iterationID));
            setOrder(res.data.iterations.findIndex(iter=>iter.IterationID == iterationID))
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchIterations();
    },[])

    if(loading){
        return (<LoadingSpinner/>)
    }
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
             <h1 className="text-2xl font-bold text-center mb-4">Iteration {order + 1}</h1>
             <Iteration  iteration={iteration} />
             <h3 className="text-xl font-semibold text-center mb-2">Upload text book or knowledge to the model</h3>
             <FileUpload iteration={iteration}/>
            {
                iteration.missions.map((mission)=>{
                    return (
                        <AssignmentForm key = {mission.MissionID} iterationID={iteration.IterationID} mission={mission}/>
                    )
                })
            } 
        </div>
    );
}
export default IterationPage;