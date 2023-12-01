import AssignmentForm from "./AssignmentForm";
const Mission = ()=>{
    const missions = [
        {
            id:1, 
            skill: "opening",
            description: "in the future, please ensure to ensure a more compelling opening",
        },
        {
            id:2, 
            skill: "Dialouge",
            description: "in the future please follow the rule of writing dialouge",
        },
    ]
    return (
        <div>
            {
                missions.map((mission)=>{
                    return (
                        <AssignmentForm key = {mission.id} mission={mission}/>
                    )
                })
            } 
        </div>
    );
}
export default Mission;