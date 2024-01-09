import React, { useState } from 'react';
import axios from "axios";

function FileUpload({iteration}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState(''); // State to hold the title
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setErrorMessage('');
            setSuccessMessage('');
            const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
            setTitle(fileName); // Set the title to the file name
        } else {
            setSuccessMessage(''); // Clear the success message
            setErrorMessage('Only PDF files are allowed.');
            setSelectedFile(null);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title.trim() === '') {
            setErrorMessage('Please enter a title.');
            setSuccessMessage(''); // Clear the success message
            return;
        }

        if (!selectedFile) {
            setErrorMessage('Please select a PDF file.');
            setSuccessMessage(''); // Clear the success message
            return;
        }

        const iterationIDNumber = parseInt(iteration.IterationID);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('iterationID', iterationIDNumber); // Add the assignment ID to the form data
        formData.append('title', title); // Add the title to the form data
        axios.post('http://localhost:8080/api/knowledge/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data);
            if (response.data.status === 'success') {
                setSuccessMessage(response.data.message);
                setErrorMessage("");
                setTitle(''); // Clear the title state
                setSelectedFile(null); // Clear the file selection
            }
        })
        .catch(error => {
            console.error(error);
            setErrorMessage(error.message);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="text" 
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter title"
                    className="block w-full text-sm text-gray-500 py-2 px-4 border rounded"
                />
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept=".pdf" 
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:border-0 file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100"
                />
                <button 
                    type="submit" 
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                >
                    Upload
                </button>
            </form>
            {errorMessage && 
                <div className="mt-2 text-sm text-red-500">{errorMessage}</div>
            }
            {successMessage && 
                <div className="mt-2 text-sm text-green-500">{successMessage}</div>
            }
        </div>
    );
}

export default FileUpload;
