import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../config";
import OAuth from "../components/OAuth";


const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          required
          className="bg-slate-100 p-3 rounded-lg"
          name='username'
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  );
};

// export default SignUp;
