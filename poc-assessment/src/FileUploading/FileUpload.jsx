import React, { useState } from 'react';
import axios from "axios";
function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // New state for success message


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            setErrorMessage('');
            setSuccessMessage('');
        } else {
            setErrorMessage('Only PDF files are allowed.');
            setSelectedFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            return; // No file selected (or wrong file type), so don't submit
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append("test","test")
        // Here you would typically send the form data to the server
        // For example: axios.post('/api/upload', formData);
         // Send the form data to the server
        console.log(formData);
        axios.post('http://localhost:8080/api/knowledge/add', formData
        ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
        .then(response => {
            console.log( response.data);
            if (response.data.status === 'success') {
                setSuccessMessage(response.data.message);
            }
        })
        .catch(error => {
            console.error(error);
            setErrorMessage(error.message);
        });

        // Clear the selected file
        // setSelectedFile(null);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
