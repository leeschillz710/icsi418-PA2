import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        if (!username.trim() || !password) {
            setMessage("Username and password are required.");
            return;
        }

        // We will replace this in the next step.
        setMessage("Login form is ready.");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label htmlFor="login-username">Username</label>
                <input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="login-password">Password</label>
                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>

            <button type="submit">Login</button>

            {message && <p>{message}</p>}
        </form>
    );
}

export default Login;