import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { showLoader, hideLoader } from '../../redux/loaderSlice'; // Adjust import paths
import { sendOtpToUser } from '../../apiCalls/auth'; // Adjust import paths
import { Link } from 'react-router-dom';

function SendOtplogin() {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');

    async function onFormSubmit(event) {
        event.preventDefault();
        let response = null;
        try {
            dispatch(showLoader());
            response = await sendOtpToUser({ email });
            dispatch(hideLoader());
           // console.log(response);

             if(response.success){
                toast.success(response.message);
                window.location.href = "/verify";
            }else{
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
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <button type="submit">Send OTP</button>
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

export default SendOtplogin;