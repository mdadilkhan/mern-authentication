import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { URL } from '../../config';
import { signInStart,signInSuccess,signInFailure } from '../redux/slices/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import axios from 'axios'
const Signin = () => {
  const [formData, setFormData] = useState({});
  const {loading,error,currentUser} =useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      dispatch(signInStart())
      axios.post(`${URL}/auth/signin`,formData).then((res)=>{
      
         if(res.status===200){
          console.log(res);
          dispatch(signInSuccess(res.data))
          navigate("/");
         }else{
          dispatch(signInFailure(res.data))
          return
         }
      })
   
    } catch (error) {
      dispatch(signInFailure(error))
    }
  };

  console.log(">>>",loading,error,currentUser);
  return (
    <div className='max-w-lg p-3 mx-auto'>
       <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          required
          className="bg-slate-100 p-3 rounded-lg"
          name='email'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          required
          className="bg-slate-100 p-3 rounded-lg"
          name='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error? error.message || 'Something went wrong!':""}</p>
    </div>
    
  )
}

// export default Signin