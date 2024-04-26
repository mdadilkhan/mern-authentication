import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { useRef } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { URL } from '../../config';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/slices/userSlice';
const Profile = () => {
  const dispatch = useDispatch();
  const fileRef=useRef(null);
  const {currentUser,loading, error } =useSelector(state=>state.user)
  const [image,setImage]=useState(undefined)
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  console.log(formData.profilePicture);

  // console.log(image);
  useEffect(()=>{
    console.log("useEff");
    if(image){
      handleFileUpload(image);
    }
  },[image])

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progress>>",progress);
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.log("uploading error",error);
        setImageError(true);
      },
      () => { 
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      axios.post(`${URL}/user/update/${currentUser.rest._id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            dispatch(updateUserSuccess(res.data));
            setUpdateSuccess(true);
          } else {
            dispatch(updateUserFailure(res.data));
          }
        })
        .catch((error) => {
          dispatch(updateUserFailure(error));
        });
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`${URL}/user/delete/${currentUser.rest._id}`);
      if (res.status === 200) {
        dispatch(deleteUserSuccess(res.data));
      } else {
        dispatch(deleteUserFailure(res.data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  

  const handleSignOut = async () => {
    try {
      const res = await axios.get(`${URL}/auth/signout`);
      console.log(res);
      if (res.status === 200) {
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>{setImage(e.target.files[0])}}/>
        <img onClick={()=>{fileRef.current.click()}} src={formData.profilePicture || currentUser?.rest?.profilePicture} alt="profile" className='h-24 w-24 rounded-full cursor-pointer object-cover self-center mt-2' />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 5 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" name='username' className='bg-slate-100 rounded-lg p-3' placeholder='username' onChange={handleChange}/>
        <input type="email" name='email' className='bg-slate-100 rounded-lg p-3' placeholder='email' onChange={handleChange}/>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteAccount}
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
    </div>
  )
}

export default Profile


