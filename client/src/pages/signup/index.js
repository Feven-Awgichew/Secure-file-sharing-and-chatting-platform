import React from "react";
import { Link } from "react-router-dom";
import { signupUser } from './../../apiCalls/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import "./index.css"

function Signup(){
    const dispatch = useDispatch();
    const [user, setUser] = React.useState({
        firstname: '',
        lastname: '',
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

      const validatePassword = (password) => {
    const errors = [];   
    if (!/[A-Z]/.test(password)) {
        errors.push("At least one uppercase letter is necessary.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("At least one lowercase letter is necessary.");
    }
    if (!/\d/.test(password)) {
        errors.push("At least one digit is necessary.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
        errors.push("At least one special character is necessary Eg. ! @ # $ % ^ & *.");
    }
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    return errors;
};


    const handleChangePassword = (e) => {
        const password = e.target.value;
        setUser({ ...user, password });

        const sanitizedUser = {
            firstname: sanitizeInput(user.firstname),
            lastname: sanitizeInput(user.lastname),
            email: sanitizeInput(user.email),
            password: user.password // Password can be validated but not sanitized in the same way
        };

        // Validate password
        const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
        setError(validationErrors.join(' ')); // Join errors into a single string
    } else {
        setError('');
    }
    };
    async function onFormSubmit(event){
                event.preventDefault();

                // Sanitize all fields
            const firstNameResult = sanitizeInput(user.firstname);
            const lastNameResult = sanitizeInput(user.lastname);
            const emailResult = sanitizeInput(user.email);
            
            // Check for any invalid inputs
            if (!firstNameResult.valid) {
                setError('First name contains invalid characters.');
                return; // Stop the form submission
            }
            if (!lastNameResult.valid) {
                setError('Last name contains invalid characters.');
                return; // Stop the form submission
            }
            if (!emailResult.valid) {
                setError('Email contains invalid characters.');
                return; // Stop the form submission
            }


            // Proceed with sanitized inputs
            const sanitizedUser = {
                firstname: firstNameResult.sanitized,
                lastname: lastNameResult.sanitized,
                email: emailResult.sanitized,
                password: user.password // Handle password separately
            };

            
                
                let response = null;
        try{

            // Validate password
        const validationErrors = validatePassword(user.password);
        if (validationErrors.length > 0) {
            setError(validationErrors.join(' ')); // Show validation errors
            toast.error("Password Not Valid");
            return; // Stop the form submission
            
        }

            dispatch(showLoader());
            response = await signupUser(user);
            dispatch(hideLoader());
            //const publicKey=response.publicKey;

            if(response.success){
                toast.success(response.message);
                
                //localStorage.setItem(publicKey, response.publicKey);
                //localStorage.setItem('private-key',response.privateKey);
                window.location.href = "/login";
            }else{
                toast.error(response.message);
            }
        }catch(err){
            dispatch(hideLoader());
            toast.error(response.message);
        }
    }
    
    return (
        <div className="auth-container">
                <div className="logo-section">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIGUtqx-VFEl_2arVCO7DLDPX_NgjOoiRKA&s"  alt="Company Logo" className="logo" />
                </div>
                <div className="form-section">
                   
                    <form  onSubmit={ onFormSubmit }>
                    <input type="text" placeholder="First Name" 
                            value={user.firstname} 
                            onChange={(e) => setUser({...user, firstname: e.target.value})} />
                        <input type="text" placeholder="Last Name" 
                            value={ user.lastname }
                            onChange={(e) => setUser({...user, lastname: e.target.value})}/>
                         <input type="email" placeholder="Email" 
                        value={ user.email }
                        onChange={(e) => setUser({...user, email: e.target.value})}/>
                       <input
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => {
                                const password = e.target.value;
                                setUser({ ...user, password }); // Update user state
                                handleChangePassword(e); // Validate password
                            }}
                        />                   
                        {error && <p style={{ color: 'red' }}>{error}</p>}


                        <button type="submit">Signup</button>
                        <div className="card_terms"> 
                    <span>Already have an account?
                    <Link to="/SendOtp">Login Here</Link>
                   
                </span>
                   
                </div>
                    </form>
                  
                </div>
               
            </div>

       /* <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
            <div className="card_title">
                <h1>Create Account</h1>
            </div>
            <div className="form">
                <form onSubmit={ onFormSubmit }>
                    <div className="column">
                        <input type="text" placeholder="First Name" 
                            value={user.firstname} 
                            onChange={(e) => setUser({...user, firstname: e.target.value})} />
                        <input type="text" placeholder="Last Name" 
                            value={ user.lastname }
                            onChange={(e) => setUser({...user, lastname: e.target.value})}/>
                    </div>
                    <input type="email" placeholder="Email" 
                        value={ user.email }
                        onChange={(e) => setUser({...user, email: e.target.value})}/>
                    <input type="password" placeholder="Password" 
                        value={ user.password }
                        onChange={(e) => setUser({...user, password: e.target.value})}/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="card_terms">
                <span>Already have an account?
                    <Link to="/login">Login Here</Link>
                </span>
            </div>
        </div>
    </div>
    */
    )
}

export default Signup;