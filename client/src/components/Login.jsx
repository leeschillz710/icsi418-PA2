function Login() {
    return (
	<div>
	    <h2>Log In</h2>
	
	    <form>

		<input type="email" placeholder="Email" required />
		<input type="password" placeholder="Password" required />
		<button type="submit">Log In</button>
	    </form>

	</div>
    );
}

export default Login;