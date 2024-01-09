import { useState } from "react";
import axios from "axios";

const MarkForm = ({ mission }) => {
    const [mark, setMark] = useState('');
    const [feedback, setFeedback] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        // You might want to make an axios request here or handle the mark
        console.log('Submitting Mark:', mark, 'for Mission:', mission.MissionID);
    };

    const handleChange = (event) => {
        const inputMark = event.target.value;
        if (inputMark <= mission.fullMark && inputMark >= 0) {
            setMark(inputMark);
        }
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSuggestMark = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/api/suggest/suggest-mark",{
            "missionID": mission.MissionID,
        }).then(res=>{
            console.log(res.data);
            setMark(res.data.result.mark);
            setFeedback(`${res.data.result.feedback}\n\n${res.data.result.suggestions}`);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <form onSubmit={handleSubmit}  className="max-w-md mx-auto mb-8 mt-4 p-4 border rounded bg-white shadow">
            <div  className="mb-4">
                <label htmlFor="markInput" className="block text-gray-700 text-sm font-bold mb-2">
                    Enter Mark (out of {mission.fullMark}):
                </label>
                <input
                    type="number"
                    id="markInput"
                    value={mark}
                    onChange={handleChange}
                    min="0"
                    max={mission.fullMark}
                    placeholder="Mark"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="feedbackInput" className="block text-gray-700 text-sm font-bold mb-2">
                    Feedback:
                </label>
                <textarea
                    id="feedbackInput"
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Enter your feedback here"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="3"
                ></textarea>
            </div>
            <div className="flex justify-between gap-4">
                <button onClick={handleSuggestMark} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Suggest Mark
                </button>
                <button type="submit" className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit Mark
                </button>
            </div>
        </form>
    );
}

export default MarkForm;
