import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    textAlign: 'center',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [response, setResponse] = useState({
    isError: false,
    message: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    setResponse({ isError: false, message: null });
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/user/signup',
        inputs,
      );
      setResponse({
        isError: false,
        message: `New User Created with ${response.data.newUser.user_name}`,
      });
    } catch (err) {
      setResponse({
        isError: true,
        message: err?.response?.data?.message || err?.message,
      });
    }
  };

  return (
    <div>
      <h1 className={classes.root}>SIGNUP</h1>

      <form className={classes.root} onSubmit={handleSignup}>
        <TextField
          label="First Name"
          name="username"
          variant="filled"
          required
          onChange={handleInputChange}
        />

        <TextField
          label="Password"
          name="password"
          variant="filled"
          type="password"
          required
          onChange={handleInputChange}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </div>
        {response.message && (
          <span style={{ color: `${response.isError ? 'red' : 'green'}` }}>
            {response.message}
          </span>
        )}
      </form>
    </div>
  );
};

export default Signup;

//nnnnnnnnn

// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles(theme => ({
//       root: {
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: theme.spacing(2),

//             '& .MuiTextField-root': {
//                   margin: theme.spacing(1),
//                   width: '300px',
//             },
//             '& .MuiButtonBase-root': {
//                   margin: theme.spacing(2),
//             },
//       },
// }));

// const Form = ({ handleClose }) => {
//       const classes = useStyles();
//       // create state variables for each input
//       const [firstName, setFirstName] = useState('');
//       const [lastName, setLastName] = useState('');
//       const [email, setEmail] = useState('');
//       const [password, setPassword] = useState('');

//       const handleSubmit = e => {
//             e.preventDefault();
//             console.log(firstName, lastName, email, password);
//             handleClose();
//       };

//       return (
//             <form className={classes.root} onSubmit={handleSubmit}>
//                   <TextField
//                         label="First Name"
//                         variant="filled"
//                         required
//
//                         onChange={e => setFirstName(e.target.value)}
//                   />
//                   <TextField
//                         label="Last Name"
//                         variant="filled"
//                         required
//                         value={lastName}
//                         onChange={e => setLastName(e.target.value)}
//                   />
//                   <TextField
//                         label="Email"
//                         variant="filled"
//                         type="email"
//                         required
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                   />
//                   <TextField
//                         label="Password"
//                         variant="filled"
//                         type="password"
//                         required
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                   />
//                   <div>
//                         <Button variant="contained" onClick={handleClose}>
//                               Cancel
//                         </Button>
//                         <Button type="submit" variant="contained" color="primary">
//                               Signup
//                         </Button>
//                   </div>
//             </form>
//       );
// };

// export default Form;
