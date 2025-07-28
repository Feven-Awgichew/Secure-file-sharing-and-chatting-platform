import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showLoader, hideLoader } from '../../redux/loaderSlice'; // Adjust import paths
import { Link } from 'react-router-dom';
import { PasswordReset } from '../../apiCalls/auth'; // Import your password change functi
import { Changepassword } from '../../apiCalls/users'; 



function ChangePassword() {
    const dispatch = useDispatch();
    
    
    const [newPassword, setnewpassword] = useState('');
     const [email, setEmail] = useState('');
     const [user, setUser] = useState('');
    const [confirmPassword, setconfirmpassword] = useState('');

    const [otp, setOtp] = useState('');

     const [error, setError] = React.useState('');
    
       
    
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
                errors.push("At least one special character is necessary (e.g., !@#$%^&*).");
            }
            if (password.length < 8) {
                errors.push("Password must be at least 8 characters long.");
            }
            return errors;
        };
    
        const handleChangePassword = (e) => {
            const password = e.target.value;
            setUser({ ...user, password });
    
            // Validate password
            const validationErrors = validatePassword(password);
            if (validationErrors.length > 0) {
                setError(validationErrors.join(' '));
            } else {
                setError('');
            }
        };

    async function onFormSubmit(event) {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            dispatch(showLoader());
    const response = await Changepassword(email,newPassword,confirmPassword); // Adjust API call
            dispatch(hideLoader());

            if (response.success) {
                toast.success('Password changed successfully! Navigating to login page...');
                window.location.href = '/login'; // Navigate to login page
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            dispatch(hideLoader());
            toast.error(err.message || 'An error occurred');
        }
    }

    return (
        <div className="auth-container">
            <div className="logo-section">
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYIGUtqx-VFEl_2arVCO7DLDPX_NgjOoiRKA&s" 
                    alt="Company Logo" 
                    className="logo" 
                />
            </div>
            <div className="form-section">
                <form onSubmit={onFormSubmit}>
                     <input 
                        type="email" 
                        placeholder="your email" 
                        value={email} 
                        onChange={ (e) => setEmail( e.target.value)} 
                        required
                        />
                    
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        value={newPassword} 
                        onChange={(e) => setnewpassword(e.target.value)} 
                        required 
                    />
                   
                    <input 
                        type="password" 
                        placeholder="Confirm New Password" 
                        value={confirmPassword} 
                        onChange={(e) => setconfirmpassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Change Password</button>
                    <div className="card_terms"> 
                        <span>Don't have an account? 
                            <Link to="/signup"> Sign Up Here</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;