import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from './../../apiCalls/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderSlice";
import "./index.css"
import  { useState } from 'react';

    

        function Login(){
            const dispatch = useDispatch();
            const [user, setUser] = React.useState({
                email: '',
                password: ''
            });

            const [error, setError] = React.useState('');
            
                const sanitizeInput = (input) => {
                // Trim whitespace
                const trimmedInput = input.trim();
            
                // Check for characters commonly used in XSS attacks
                const hasXSSChars = /[<>\/\\&"'`]/.test(trimmedInput);
                if (hasXSSChars) {
                    return { valid: false, sanitized: '' }; // Return invalid state
                }
            
                // If valid, return the sanitized input
                return { valid: true, sanitized: trimmedInput };
            };

                const handleChangePassword = (e) => {
            const password = e.target.value;
            setUser({ ...user, password });

            const sanitizedUser = {
                
                email: sanitizeInput(user.email),
                password: user.password // Password can be validated but not sanitized in the same way
            };

        };

        async function onFormSubmit(event){
            event.preventDefault();

             // Sanitize all fields
            
            const emailResult = sanitizeInput(user.email);
            const passwordResult = sanitizeInput(user.password);
            // Check for any invalid inputs
            
            if (!emailResult.valid) {
                setError('Email contains invalid characters.');
                return; // Stop the form submission
            }

            // Proceed with sanitized inputs
            const sanitizedUser = {
            
                email: emailResult.sanitized,
                password: user.password // Handle password separately
            };

            let response = null;
            try{
                dispatch(showLoader());
                response = await loginUser(user);
                dispatch(hideLoader());
    
                if(response.success){
                    toast.success(response.message);
                    localStorage.setItem('token', response.token);
                    window.location.href = "/";
                }else{
                    toast.error(response.message);
                }
            }catch(error){
                dispatch(hideLoader());
                toast.error(response.message);
            }
        }
    
    return (
        <div className="auth-container">
        <div className="logo-section">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIGUtqx-VFEl_2arVCO7DLDPX_NgjOoiRKA&s" alt="Company Logo" className="logo" />
        </div>
        <div className="form-section">
           
            <form  onSubmit={ onFormSubmit }>
                <input type="email" placeholder="Email" required value={user.email}  onChange={ (e) => setUser({...user, email: e.target.value})} />
                <input type="password" placeholder="Password" required  value={user.password}
            onChange={ (e) => setUser({...user, password: e.target.value})} />
                
                <button type="submit">Login</button>
                <div className="card_terms"> 
            <span>Don't have an account yet?
                <Link to="/signup"> Signup Here</Link>
                <br />
                <Link to="/send"> Forget Password</Link>

            </span>
        </div>
            </form>
          
        </div>
       
    </div>
    )
}

export default Login;