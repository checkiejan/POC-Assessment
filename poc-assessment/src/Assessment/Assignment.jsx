import AssignmentDescription from "./AssignmentDescription";
import Dashboard from "../components/Dashboard/Dashboard";
import LoadingSpinner from "../common/LoadingSpinner";
import Iteration from "./Iteration";
import SkillForm from "./SkillForm";
import axios from "axios";
import { useState, useEffect } from "react";

const Assignment = () => {
    const [description, setDescription] = useState("");
    const [studentText, setStudentText] = useState("");
    const [missions, setMissions] = useState([]);
    const [iterations, setIterations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMissions = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/mission/get", {
                "assignmentID": 1,
            });
            setMissions(res.data.missions);
        } catch (err) {
            console.log(err);
        }
    }

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


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-4">Assignment</h1>
            <h2 className="text-xl font-semibold text-center mb-2">Description</h2>
            <AssignmentDescription description={description} />
            <h2 className="text-xl font-semibold text-center mb-2">Student Text</h2>
            <AssignmentDescription description={studentText} />
            <h2 className="text-xl font-semibold text-center mb-2">Iterations</h2>
            {loading ? <LoadingSpinner/> : iterations.map((iteration) => (
                <Iteration key={iteration.IterationID} iteration={iteration} />
            ))}
            {/* Uncomment the lines below when you want to use these components */}
            {/* <SkillForm fetchMission={fetchMissions} />
            <Dashboard missions={missions} fetchMissions={fetchMissions} /> */}
        </div>
    );
}

export default Assignment;
