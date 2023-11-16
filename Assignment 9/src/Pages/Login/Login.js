import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({onLogin}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateEmail = () => {
        if(!email){
            setEmailError('Email is required');
        }
        else if(!/^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(email)){
            setEmailError('Please use Northeastern email');
        }
        else{
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (!password) {
          setPasswordError('Password is required');
        } else {
          setPasswordError('');
        }
    };

    const submitLogin = async (e) => {
        e.preventDefault();
    
        validateEmail();
        validatePassword();

        if (!emailError && !passwordError) {
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email, password }),
                });
          
                if (response.ok) {
                  // Successful login
                  console.log('Login successful');
                  onLogin(email);
                  navigate('/home', { replace: true });

                } else {
                  // Handle unsuccessful login
                  const errorData = await response.json();
                  console.error('Login failed:', errorData.error);

                toast.error('Incorrect password. Please try again.');

                }
              } catch (error) {
                // Handle network or other errors
                console.error('Error during login:', error);
              }
          }
      };

    return(
        <div>
        <br />
       
        <div class="container">
        <form novalidate id="login-form" onSubmit={submitLogin}>
            <div class="row justify-content-center align-items-center">
                <h4>Login Form</h4>
                <hr />
                <br />
                <div class="col-lg-4">
                    <div class="form-group">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" className={`form-control ${emailError ? 'is-invalid' : ''}`} id="emailInput" name="email"
                               value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validateEmail} />
                        <div id="email-error" className="invalid-feedback">{emailError}</div>
                      </div>
                      <br/>
                      <div class="form-group">
                          <label for="password" class="form-label">Password</label>
                          <input type="password" className={`form-control ${passwordError ? 'is-invalid' : ''}`} name="password" 
                                value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} />
                          <div id="password-error" className="invalid-feedback">{passwordError}</div>
                      </div>
                      <br />
                      <button type="submit" class="btn btn-success" id="btnSubmit">Submit</button>
                </div>
            </div>
        </form>
    </div>

    <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        pauseOnFocusLoss
        draggable
        pauseOnHover />

    </div>

    );
}

export default Login;