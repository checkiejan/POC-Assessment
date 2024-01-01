import { useState } from "react";
import axios from "axios";

const MarkForm = ({ mission }) => {
    const [mark, setMark] = useState('');

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

    return (
        <form onSubmit={handleSubmit}  className="max-w-sm mx-auto mt-4 p-4 border rounded bg-white shadow">
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Submit Mark
            </button>
        </form>
    );
}

export default MarkForm;
