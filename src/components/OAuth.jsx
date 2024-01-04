import {GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../config';
const OAuth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleGoogleCLick=async()=>{
  
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      console.log(result.user.displayName,result.user.email,result.user.photoURL);
      const res = await fetch(`${URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log("Could not login wit google",error);
    }
  }
  return (
    <button type='button' onClick={handleGoogleCLick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Contnue with Google</button>
  )
}

export default OAuth