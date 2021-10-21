import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
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

  const handleLogin = async (e) => {
    setResponse({ isError: false, message: null });
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/user/login',
        inputs,
      );
      setResponse({
        isError: false,
        message: `Login Successfully`,
      });
      const date = new Date();
      date.setTime(date.getTime() + 10800000);

      const expires = date.toUTCString();
      document.cookie = `idToken=${response.data.idToken};expires=${expires};path=/`;
      history.push('/note');
    } catch (err) {
      setResponse({
        isError: true,
        message: err?.response?.data?.message || err?.message,
      });
    }
  };

  return (
    <div className="Login">
      <Form onSubmit={handleLogin}>
        <Form.Group size="lg" controlId="email">
          <Form.Label id="username">username</Form.Label>
          <Form.Control name="username" onChange={handleInputChange} />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label id="password">Password</Form.Label>
          <Form.Control name="password" onChange={handleInputChange} />
        </Form.Group>
        <div style={{textAlign: "center",margin: '1rem'}}>
        <Button block size="lg" type="submit" >
          Login
        </Button>
        </div>
      </Form>
      {response.message && (
        <div
          style={{
            color: `${response.isError ? 'red' : 'green'}`,
            textAlign: 'center',
          }}
        >
          {response.message}
        </div>
      )}
    </div>
  );
}
