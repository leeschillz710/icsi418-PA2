import { useState } from "react";

function Login() {
    // setUsername updates this value whenever the user types.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // runs when user submits the form.
    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        // checks both values were provided.
        // trim() prevents spaces themselves from counting as a username.
        if (!username.trim() || !password) {
            setMessage("Username and password are required.");
            return;
        }

        try {
            // send the username and password to the Express server.
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                // tell Express that the request body contains JSON.
                headers: {
                    "Content-Type": "application/json"
                },

                // converts JavaScript object into JSON text.
                body: JSON.stringify({
                    username: username.trim(),
                    password: password
                })
            });

            // convert the JSON response from Express into an object.
            const data = await response.json();

            // true for successful status codes
            if (response.ok) {
                setMessage(data.message);
            } else {
                //handle server responses
                setMessage(data.message);
            }
        } catch (error) {
            // fetch() reaches catch block when React cannot contactbExpress
            console.error("Login request failed:", error);
            setMessage("Could not connect to the server.");
        }
    }

    return (
        // submitting this form calls handleSubmit
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                {/* htmlFor connects this label to input with
                    id="login-username". */}
                <label htmlFor="login-username">
                    Username
                </label>

                <input
                    id="login-username"
                    type="text"

                    // React controls the displayed input value
                    value={username}

                    // update username when  user types
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }

                    // help browsers identify this as a username field
                    autoComplete="username"
                    required
                />
            </div>

            <div>
                <label htmlFor="login-password">
                    Password
                </label>

                <input
                    id="login-password"
                    type="password"

                    // React controls the displayed password value
                    value={password}

                    // update password when user types
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }

                    // help password managers recognize this field
                    autoComplete="current-password"
                    required
                />
            </div>

            {/* this button is inside the form and has
                type="submit" so, clicking it calls handleSubmit */}
            <button type="submit">
                Login
            </button>

            {/* display paragraph when message is not empty. */}
            {message && <p>{message}</p>}
        </form>
    );
}

// allow App.jsx to import and display this component.
export default Login;