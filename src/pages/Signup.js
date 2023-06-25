import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import TextField from '@mui/material/TextField';

const Signup = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({});
    const firstNameRegex = new RegExp(firstname, 'i');
    const lastNameRegex = new RegExp(lastname, 'i');
    const usernameRegex = /^(?!.*(?:${firstname}|${lastname})).+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    const newErrors = {};

    if (!usernameRegex.test(username)) {
      newErrors.username = 'Username cannot contain first name or last name.';
    }

    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must contain at least one capital letter, one small letter, one digit, and one special character.';
    }

    if (firstNameRegex.test(password) || lastNameRegex.test(password)) {
      newErrors.password = 'Password cannot contain first name or last name.';
    }

    setErrors(newErrors);

    // Proceed with form submission if there are no errors
    if (Object.keys(newErrors).length === 0) {
      // Your form submission logic here
    await signup(firstname,lastname,username,email, password)

  }
};

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="signuph3">Sign Up</h3>
      <div>
        <TextField
          label="FirstName"
          id="firstname"
          margin="dense"
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
        />
      </div>
      {errors.firstName && <div className="error">{errors.firstName}</div>}
      <div>
        <TextField
          label="LastName"
          id="lastname"
          margin="dense"
          type="text"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
      </div>
        {errors.lastName && <div className="error">{errors.lastName}</div>}
        <div>
        <TextField
          label="UserName"
          id="username"
          margin="dense"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
        {errors.username && <div className="error">{errors.username}</div>}
        <div>
        <TextField
          label="Email Address"
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
     {errors.password && <div className="error">{errors.password}</div>}
     
     <div className="loginbtn">
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      </div>
    </form>
  )
}


export default Signup