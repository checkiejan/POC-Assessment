import React, { useState } from 'react';

const AssignmentDescription = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const shortenDescription = (desc) => {
        const words = desc.split(' ');
        if (words.length > 100) {
            return words.slice(0, 100).join(' ') + '... ';
        }
        return desc;
    };

    return (
        <>
            <div className="w-1/2 border border-gray-300 rounded p-4 mx-auto my-8">
                {isExpanded ? description : shortenDescription(description)}
                {description.split(' ').length > 100 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full bg-blue-500/50 hover:bg-blue-700/50 text-white font-bold py-1 px-2 rounded mt-2"
                    >
                        {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                )}
            </div>
        </>
    );
};

export default AssignmentDescription;
