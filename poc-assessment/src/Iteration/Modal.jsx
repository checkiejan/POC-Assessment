// Modal.js
import React from 'react';

const Modal = ({ onClose, onSubmit, children, suggestion, onSuggestionChange }) => {
    return (
        <div className="absolute left-full ml-4 top-0 ml-4 p-4 flex justify-center items-center" style={{ zIndex: 1000 }}>
            <div className="bg-white p-4 border border-gray-300 shadow-lg rounded-md">
                <div>{children}</div>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        value={suggestion}
                        onChange={onSuggestionChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your suggestions"
                    />
                    <div className="flex justify-between mt-3">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
