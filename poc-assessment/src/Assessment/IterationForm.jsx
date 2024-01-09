import { useState } from "react";
import axios from "axios";
const SkillForm = ({assignmentID,fetchIteration})=>{
    const [formData, setFormData] = useState({
        description: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    const handleAdd = ()=>{
        axios.post("http://localhost:8080/api/iteration/create",{
            "AssignmentID": assignmentID,
            "shortDescription": formData.description,
        }).then(res=>{
           console.log(res);
           if(fetchIteration)
           {
                console.log("fetching");
                fetchIteration();
           }
        //    fetchMission();
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div  className="space-y-4">
            <input 
                type="text" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Description"
            />
           <div className="flex justify-center">
                <button 
                    onClick={handleAdd}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add
                </button>
            </div>  
        </div>
    );

}
export default SkillForm;