/*
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfilePic } from "../../apiCalls/users";
import { hideLoader, showLoader } from "../../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser } from "../../redux/usersSlice";

function Profile(){
    const { user } = useSelector(state => state.userReducer);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if(user?.profilePic){
            setImage(user.profilePic);
        }
    }, [user])

    function getInitials(){
        let f = user?.firstname.toUpperCase()[0];
        let l = user?.lastname.toUpperCase()[0];
        return f + l;
    }

    function getFullname(){
        let fname = user?.firstname.at(0).toUpperCase() + user?.firstname.slice(1).toLowerCase();
        let lname = user?.lastname.at(0).toUpperCase() + user?.lastname.slice(1).toLowerCase();
        return fname + ' ' + lname;
    }

    const onFileSelect = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader(file);

        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            setImage(reader.result);
        }
    }

    const updateProfilePic = async () => {
        
        try{
            dispatch(showLoader());
            const response = await uploadProfilePic(image);
            dispatch(hideLoader());

            if(response.success){
                toast.success(response.message);
                dispatch(setUser(response.data));
            }else{
                toast.error(response.message);
            }
        }catch(err){
            toast.error(err.message);
            dispatch(hideLoader());
        }
    }

    return (
        <div className="profile-page-container">
        <div className="profile-pic-container">
            {image && <img src={image} 
                 alt="Profile Pic" 
                 className="user-profile-pic-upload" 
            />}
            {!image && <div className="user-default-profile-avatar">
                { getInitials() }
            </div>}
        </div>

        <div className="profile-info-container">
            <div className="user-profile-name">
                <h1>{ getFullname() }</h1>
            </div>
            <div>
                <b>Email: </b> { user?.email}
            </div>
            <div>
                <b>Account Created: </b>{moment(user?.createdAt).format('MMM DD, YYYY')}
            </div>
            <div className="select-profile-pic-container">
                <input type="file" onChange={ onFileSelect } />
                <button className="upload-image-btn" onClick={updateProfilePic}>
                    Upload
                </button>
            </div>
        </div>
    </div>
    )
}

export default Profile;
*/
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfilePic } from "../../apiCalls/users";
import { hideLoader, showLoader } from "../../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser } from "../../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";





function Profile({socket}){
    const { user } = useSelector(state => state.userReducer);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isFullSize, setIsFullSize] = useState(false);
    

    console.log('Socket:', socket);

    useEffect(() => {
        if(user?.profilePic){
            setImage(user.profilePic);
        }
        
    }, [user])

    function getInitials(){
        let f = user?.firstname.toUpperCase()[0];
        let l = user?.lastname.toUpperCase()[0];
        return f + l;
    }

    function getFullname(){
        let fname = user?.firstname.at(0).toUpperCase() + user?.firstname.slice(1).toLowerCase();
        let lname = user?.lastname.at(0).toUpperCase() + user?.lastname.slice(1).toLowerCase();
        return fname + ' ' + lname;
    }

    {/*const onFileSelect = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader(file);

        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            setImage(reader.result);
        }
    }*/}

    const updateProfilePic = async () => {
        
        try{
            dispatch(showLoader());
            const response = await uploadProfilePic(image);
            dispatch(hideLoader());

            if(response.success){
                toast.success(response.message);
                dispatch(setUser(response.data));
            }else{
                toast.error(response.message);
            }
        }catch(err){
            toast.error(err.message);
            dispatch(hideLoader());
        }
    }

    const logout = () => {

        console.log('Socket:', socket); 

        localStorage.removeItem('token');
        navigate('/login');
        

        if (socket) {
            Socket.emit('user-offline', user._id);
        } else {
            console.error('Socket is undefined');
    }}

    const FullSize = () => {
        setIsFullSize(!isFullSize);
    };
    
    
    return (
        <div className="profile-page-container">
        <div className="profile-pic-container" onClick={FullSize}>
            {image && <img src={image} 
                 alt="Profile Pic" 
                 className="user-profile-pic-upload" 
            />}
            {!image && <div className="user-default-profile-avatar">
                { getInitials() }
            </div>}
        </div> <br/>

        <div className="profile-info-container">
            <div className="user-profile-name">
                <h1>{ getFullname() }</h1>
            </div>
            <div>
                <b>Email: </b> { user?.email}
            </div>


            
            

            <div>
                <b>Account Created: </b>{moment(user?.createdAt).format('MMM DD, YYYY')}
            </div><br/>
            {/* <div className="select-profile-pic-container">
                <input type="file" onChange={ onFileSelect } />
                <button className="upload-btn" onClick={updateProfilePic}>
                    Upload
                </button>
            </div>   */}
            
            <div className="user-setting" onClick={ () => navigate('/profilepicture')}>
                <h1><i className="fa fa-user"></i>Change profile</h1>
            </div>
            
            
            <div className="user-setting" onClick={ logout }>
                <h1><i className="fa fa-power-off"></i>Log Out</h1>
            </div>
        </div>

        
          {isFullSize && (
                <div className="full-size-modal" onClick={FullSize}>
                    <img src={image} alt="Full Size Profile" className="full-size-image" />
        </div>
          )}

    </div>
    )
}

export default Profile;