import { useState } from "react";
import axios from "axios";
const HomeworkForm = ({mission})=>{
    const [text, setText] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const handleChange = (event) => {
        setText(event.target.value);
    };
    const handleSubmit = (event)=>{
        event.preventDefault();
        if(!disabled){
            axios.post("http://localhost:8080/api/mission/submit",{
                "missionID":mission.MissionID,
                "studentText": text,
            }). then(res=>{
                console.log(res)
                setSuccessMessage('Mission submitted successfully!');
                setDisabled(true);
            })
            .catch(err=>{
                console.log(err);
                setSuccessMessage('');
            })    
        }
    }
    return( 
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    id="textArea"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    value={text}
                    onChange={handleChange}
                    placeholder="Write your work here"
                    disabled={disabled}
                />
                 {successMessage && <div className="text-green-500 mt-3 mb-4">{successMessage}</div>}
                <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                </button>
            </form>

        </div>
    );
}

export default HomeworkForm;