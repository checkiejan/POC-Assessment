import AssignmentDescription from "./AssignmentDescription";
import LoadingSpinner from "../common/LoadingSpinner";
import Iteration from "./Iteration";
import IterationForm from "./IterationForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Assignment = () => {
    const [description, setDescription] = useState("");
    const [studentText, setStudentText] = useState("");
    // const [missions, setMissions] = useState([]);
    const [iterations, setIterations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showIterationForm, setShowIterationForm] = useState(false); 
    const navigate = useNavigate();
    // const fetchMissions = async () => {
    //     try {
    //         const res = await axios.post("http://localhost:8080/api/mission/get", {
    //             "assignmentID": 1,
    //         });
    //         setMissions(res.data.missions);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    const toggleIterationForm = () => {
        setShowIterationForm(!showIterationForm); // Toggle the state to show/hide SkillForm
    };
    const fetchIterations = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/assignment/fetch-mission", {
                "AssignmentID": 1,
            });
            setIterations(res.data.iterations);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post("http://localhost:8080/api/assignment", {
                    "AssignmentID": 1,
                });
                console.log(res.data);
                setDescription(res.data.assignment);
                setStudentText(res.data.essay);
                await fetchIterations();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const navigateToMission = (id)=>{
        navigate(`/iteration/${id}`);
    }
    const navigateToMarking = (id)=>{
        navigate(`/marking/${id}`);
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-4">Assignment</h1>
            <h2 className="text-xl font-semibold text-center mb-2">Description</h2>
            <AssignmentDescription description={description} />
            <h2 className="text-xl font-semibold text-center mb-2">Student Text</h2>
            <AssignmentDescription description={studentText} />
            <h2 className="text-xl font-semibold text-center mb-2">Iterations</h2>
            <button 
                className="bg-blue-500 mb-4 text-white rounded-full py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition ease-in-out duration-300"
                onClick={toggleIterationForm} >
                {showIterationForm ? 'Hide Iteration Form' : 'Add Iteration'}
            </button>
            {showIterationForm && <IterationForm fetchIteration={fetchIterations} assignmentID={1} />}
            {loading ? <LoadingSpinner/> : iterations.map((iteration) => (
                <div>
                    <Iteration key={iteration.IterationID} iteration={iteration} />
                    <div className="flex justify-between"> {/* Flex container for equal width buttons */}
                        <button 
                            className="bg-blue-500 mb-4 text-white rounded-full py-2 px-4 flex-1 mx-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition ease-in-out duration-300"
                            onClick={()=>navigateToMission(iteration.IterationID)} 
                            >
                            Create Assessment
                        </button>
                        <button 
                            className="bg-blue-500 mb-4 text-white rounded-full py-2 px-4 flex-1 mx-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition ease-in-out duration-300"
                            onClick={()=>navigateToMarking(iteration.IterationID)} 
                            >
                            Marking
                        </button>
                    </div>
                </div>
                
            ))}

        </div>
    );
}

export default Assignment;
