const ResponseVersion = ({ responses, currentVersion, switchVersion })=>{
    const totalVersions = responses.length;
     // Function to handle going to the next version
     const goToNextVersion = () => {
        const nextVersion = (currentVersion + 1) % totalVersions;
        switchVersion(nextVersion);
    };

    // Function to handle going to the previous version
    const goToPreviousVersion = () => {
        const previousVersion = (currentVersion - 1 + totalVersions) % totalVersions;
        switchVersion(previousVersion);
    };
    return (
        <div>
            <button onClick={goToPreviousVersion}>&lt;</button>
            <span> {currentVersion + 1}/{totalVersions} </span>
            <button onClick={goToNextVersion}>&gt;</button>
        </div>
    );
}
export default ResponseVersion;