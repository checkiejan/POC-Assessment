import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import ResponseVersion from "./ResponseVersion";
import processRepsonse from "../utils/processResponse";
import Modal from "./Modal";
import axios from "axios";

const AssignmentForm = ({mission})=>{
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [responses, setResponses] = useState([]);
    const [currentVersion, setCurrentVersion] = useState(0);
    const [suggestion, setSuggestion] = useState('');
    const [initialPrompt, setInitialPrompt] =  useState("");
    const [botResponse, setBotResponse] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission logic here
        // console.log('Submitted Text:', text);
        console.log(process.env.REACT_APP_OPENAI_API_KEY);
    };
    const handleImprovementChange = async (event) => {
        setSuggestion(event.target.value);
    };
    const switchVersion = (version) => {
        setCurrentVersion(version);
        setText(responses[version]);
    };

    const handleModalSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        console.log("Improvement Suggestion:", suggestion);
        // setShowModal(false);
        axios.post("http://localhost:8080/api/suggest/adjust",{
            request: suggestion,
            initialPrompt: initialPrompt,
            bot_response: botResponse,
        })
        .then(res=>{
            console.log(res.data);
            let result = processRepsonse(res.data.openAIResponse);
            setResponses(prevResponses => [...prevResponses, result]);
            setCurrentVersion(prevCurrentVersion => {
                return prevCurrentVersion + 1;
            });
            setText(result);
            setSuggestion("");
            setIsLoading(false);
        }).catch(err=>{
            console.log(err);
            setIsLoading(false);
        })
        
    };
    const handleSuggest = async (event)=>{
        event.preventDefault();
        if(!isLoading){
            setIsLoading(true);
            axios.post("http://localhost:8080/api/suggest/v2",{
                "short_description" : mission.shortDescription,
            }).then(res=>{
                
                // let t1= res.data.openAIResponse;
                // let show = t1.replace("```JSON", "");
                // show = show.replace("```","");
                // console.log(show.replace("```","")); 
                // let text = JSON.parse(t1.replace("JSON", ""));
                // let temp = `${text["improvement_description"]}\n\n${text["specific_instruction_to_student"]} \n\n${text["task_to_do"]}\n\n${text["student_revise_essay"]}`;
                let temp = processRepsonse(res.data.openAIResponse);
                console.log(temp);
                setIsLoading(false);
                setText(temp);
                setShowModal(true); // Show the modal after getting response
                setInitialPrompt(res.data.initialPrompt);
                setBotResponse(res.data.openAIResponse);
                setResponses(prevResponses => [...prevResponses, temp]);
            }).catch(err=>{
                console.log(err);
                setIsLoading(false);
            })
        }
    }
    const handleChange = (event) => {
        setText(event.target.value);
    };
    return <div className="mx-auto w-1/2 relative">
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
        {responses.length > 1 && (
                <ResponseVersion 
                    responses={responses} 
                    currentVersion={currentVersion} 
                    switchVersion={switchVersion} 
                />
            )}
        {showModal && (
                <Modal 
                    onClose={() => setShowModal(false)} 
                    onSubmit={handleModalSubmit}
                    suggestion={suggestion}
                    onSuggestionChange={handleImprovementChange}
                >
                    <p>Is there anything you need to improve?</p>
                </Modal>
            )}
    </div>
}
export default AssignmentForm