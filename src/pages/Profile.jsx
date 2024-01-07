import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
const Profile = () => {
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
 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>{setImage(e.target.files[0])}}/>
        <img onClick={()=>{fileRef.current.click()}} src={formData.profilePicture || currentUser.profilePicture} alt="profile" className='h-24 w-24 rounded-full cursor-pointer object-cover self-center mt-2' />
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
        <input type="text" className='bg-slate-100 rounded-lg p-3' placeholder='username'/>
        <input type="text" className='bg-slate-100 rounded-lg p-3' placeholder='username'/>
        <input type="password" className='bg-slate-100 rounded-lg p-3' placeholder='username'/>
        <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
    <div className="flex justify-between mt-5">
      <span className='text-red-700 cursor-pointer'>
        Delete Account
      </span>
      <span className='text-red-700 cursor-pointer'>
        Sign out
      </span>
    </div>

    </div>
  )
}

export default Profile