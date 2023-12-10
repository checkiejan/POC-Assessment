import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";
const AssignmentForm = ({mission})=>{
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission logic here
        // console.log('Submitted Text:', text);
        console.log(process.env.REACT_APP_OPENAI_API_KEY);
    };
    const handleSuggest = async (event)=>{
        event.preventDefault();
        if(!isLoading){
            setIsLoading(true);
            axios.post("http://localhost:8080/api/suggest",{
                "short_description" : mission.shortDescription,
            }).then(res=>{
                console.log(res.data.openAIResponse);
                
                let text = JSON.parse(res.data.openAIResponse.content);
                let temp = `${text["improvement_description"]} Rewrite this part:\n${text["part_need_to_be_improved"]}`;
                console.log(text);
                setIsLoading(false);
                setText(temp)
            }).catch(err=>{
                console.log(err);
                setIsLoading(false);
            })
        }
    }
    const handleChange = (event) => {
        setText(event.target.value);
    };
    return <div className="mx-auto w-1/2">
        <h1 className="text-xl font-bold mb-4">Mission {mission.id}</h1>
        <p>Skill: {mission.Skill}</p>
        <p>{mission.shortDescription}</p>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="textArea" className="block text-gray-700 text-sm font-bold mb-2">
                    Create task
                </label>
                <div className="mb-4 relative">
                {isLoading && 
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-10"> 
                            <LoadingSpinner /> {/* Show loading spinner when loading */}
                    </div>
                    }
                    <textarea
                        id="textArea"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                        value={text}
                        onChange={handleChange}
                        placeholder="Enter your text here"
                        disabled={isLoading}
                    />
                </div>                
            </div>
            <div className="flex justify-between space-x-4"> {/* Container for buttons with space */}
                    <button onClick={handleSuggest}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Suggest
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
            </div>
            
        </form>
    </div>
}
export default AssignmentForm