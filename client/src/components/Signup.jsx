import { useState } from "react";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        if (!username.trim() || !password) {
            setMessage("Username and password are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:9000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password
                })
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage("Could not connect to the server");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            <div>
                <label htmlFor="signup-username">Username</label>
                <input
                    id="signup-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="signup-password">Password</label>
                <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>

            <button type="submit">Sign Up</button>

            {message && <p>{message}</p>}
        </form>
    );
}

export default Signup;