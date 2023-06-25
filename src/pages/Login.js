import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import TextField from '@mui/material/TextField';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <div>
        <TextField
          label="Email/UserName"
          id="email"
          margin="dense"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div>
        <TextField
          label="Password"
          id="password"
          margin="dense"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className="loginbtn">
        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Login;

