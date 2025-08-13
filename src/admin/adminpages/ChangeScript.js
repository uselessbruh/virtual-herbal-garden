import React, { useState } from "react";

function Changescript() {
    // Step 1: State to keep track of messages/components
    const [components, setComponents] = useState([]);

    // Step 2: Function to handle button click and add a new component
    const handleClick = () => {
        // Generate a unique key
        const newComponent = `Component ${components.length + 1}`;

        // Update state with a new component/message
        setComponents([...components, newComponent]);
    };

    return (
        <div className="App">
            <h1>Dynamic Component Creator</h1>
            {/* Step 3: Button to add new components */}
            <button onClick={handleClick}>Create New Component</button>

            {/* Step 4: Render each component dynamically */}
            <div>
                {components.map((component, index) => (
                    <DynamicComponent key={index} message={component} />
                ))}
            </div>
        </div>
    );
}

// Step 5: Component that displays the message
const DynamicComponent = ({ message }) => {
    return (
        <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p>{message}: Hey hello there, how are you?</p>
        </div>
    );
};

export default Changescript;
