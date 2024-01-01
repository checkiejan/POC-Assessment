import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import HomeworkForm from "./HomeworkForm";
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";
const Homework = ()=>{
    const { iterationID } = useParams();
    const [iteration, setIteration] = useState();
    const [loading, setLoading] = useState(true);
    const fetchIterations = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/assignment/fetch-mission", {
                "AssignmentID": 1,
            });
            console.log(res.data.iterations.find(iter=>iter.IterationID == iterationID))
            setIteration(res.data.iterations.find(iter=>iter.IterationID == iterationID));

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
    
    return(
        <div className="mx-auto w-1/2 relative">
            {
                iteration.missions.map((mission,index)=>{
                    return (
                        <div>
                            <h1 className="text-xl font-bold mb-4">Mission {index+1}</h1>
                            <p style={{ whiteSpace: 'pre-line' }}>{mission.fullDescription}</p>
                            <HomeworkForm mission={mission}/>
                        </div>
                        
                    )
                })
            } 
        </div>
    );
}

export default Homework;