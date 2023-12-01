const Dashboard = ()=>{
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
        <>
        <a href="/mission"  className="block">
        <table className="w-full max-w-lg text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th>Skill</th>
                    <th>Mission</th>
                </tr>
            </thead>
            <tbody>
            {
                missions.map((mission) => {
                                return (
                                    <tr key={mission.id}>
                                        <td data-label="Status" className="p-2">
                                            <p className={"status  status-" + mission.skill}>
                                                {mission.skill.toUpperCase()}
                                            </p>
                                        </td>
                                        <td data-label="mission" className="p-2">{mission.description}</td>
                                    </tr>
                                );
                            })
            }
                </tbody>
           
        </table>
        </a>
        </>
    )
}

export default Dashboard;