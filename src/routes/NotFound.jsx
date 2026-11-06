
import Button from "../components/Button.jsx";
import {Home} from "lucide-react";
import {Link} from "react-router";

export default function NotFound(){
    return (
        <div className="flex flex-col justify-center items-center pt-30 select-none animate-[zoomIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            <p className="text-4xl mb-1 dark:text-white font-bold">Page not found</p>
            <p className="mb-10 dark:text-white font-bold">404</p>
            <Link to="/"><Button icon={Home} value="Go home" /></Link>
        </div>
    )
}