import axios from "axios";
import { useNavigate } from "react-router-dom";
const Dashboard = ({missions,fetchMissions })=>{
    const navigate = useNavigate();
    const handleDelete = (missionID, assignmentID)=>{
        axios.post('http://localhost:8080/api/mission/delete', {
            "assignmentID": 1,
            "missionID": missionID
        })
        .then(response => {
            // Handle the response from the server
            console.log(response.data);
            // Optionally, you can refresh the list of missions here
            fetchMissions();
        })
        .catch(error => {
            // Handle any errors here
            console.error("Error deleting mission:", error);
        });
        
    }
    const navigateToMission = ()=>{
        navigate("/mission");
    }
    return (
        <>
       
        <table className="w-full max-w-lg text-sm text-left text-gray-500 dark:text-gray-400 m-8">
       
            <thead onClick={navigateToMission} className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" style={{ cursor: 'pointer' }}>
                <tr>
                    <th className="p-2">Skill</th>
                    <th className="p-2">Mission</th>
                    <th className="p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                missions.map((mission) => {
                                return (
                                    <tr key={mission.MissionID}>
                                        <td data-label="Status" className="p-2">
                                            <p className={"status  status-" + mission.Skill}>
                                                {mission.Skill.toUpperCase()}
                                            </p>
                                        </td>
                                        <td data-label="mission" className="p-2">{mission.shortDescription}</td>
                                        <td data-label="Actions" className="p-2">
                                        <button 
                                            onClick={() => handleDelete(mission.MissionID, mission.AssignmentID)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                </td>
                                    </tr>
                                );
                            })
            }
                </tbody>
           
        </table>
       
        </>
    )
}

export default Dashboard;