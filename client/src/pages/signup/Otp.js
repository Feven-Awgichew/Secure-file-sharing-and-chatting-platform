import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showLoader, hideLoader } from '../../redux/loaderSlice'; // Adjust import paths
import { Link } from 'react-router-dom';
import { VerifyUserOtp } from '../../apiCalls/auth';

function Otp() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    async function onFormSubmit(event) {
        event.preventDefault();
        try {
            dispatch(showLoader());
            const response = await VerifyUserOtp({ email, otp }); // Correctly assign response here
            dispatch(hideLoader());

            if (response.success) {
                toast.success('OTP verified! Navigating to home page...');
                window.location.href = '/login'; // Navigate to home page
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            dispatch(hideLoader());
            toast.error(error.message || 'An error occurred');
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
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        required 
                    />
                    <button type="submit">Verify OTP</button>
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

export default Otp;