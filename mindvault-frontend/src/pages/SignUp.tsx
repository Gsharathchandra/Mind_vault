import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {

            username, password

        })
        alert("you have signed up");
        navigate("/signin");
    }
    return <div className="bg-white w-screen h-screen bg-gray flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signup} loading={false} fullWidth={true} variant="primary" text="Signup" />
            </div>
            <div className="text-center mt-4">
                <span className="text-gray-500">Already have an account? </span>
                <span className="text-blue-600 cursor-pointer underline" onClick={() => navigate("/signin")}>Sign in</span>
            </div>
        </div>
    </div>

} 