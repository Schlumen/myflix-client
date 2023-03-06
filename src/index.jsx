import { createRoot } from "react-dom/client";
import "./index.scss"; // To indicate to bundle it

// Main component
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <div>Good morning</div>
        </div>
    );
};

// Find root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Render app in the root DO element
root.render(<MyFlixApplication />);