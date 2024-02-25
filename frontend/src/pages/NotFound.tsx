import { useState } from "react";
import notFound from "../images/NotFound.png"

function NotFound() {

    return (
        <div className="App bg-gradient-to-t to-green-500 from-green-900 h-screen w-screen">
            <h1>Page Not Found</h1>
            <img src={notFound} />
        </div>
    );
}

export default NotFound;
