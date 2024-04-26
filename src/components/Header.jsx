import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();
  const {currentUser} = useSelector((state)=>state.user)
  console.log("currentUser",currentUser);
  const { pathname } = location;
  console.log(pathname);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center md:max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className="font-bold">SAA</h1>
        </Link>

        <ul className="flex gap-4">
        {
          pathname=='/signin' || pathname=='/signup'  ? "": 
          <>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/room'>
            <li>Room</li>
          </Link>
          <Link to='/hotel'>
            <li>Hotel</li>
          </Link>
          
          </>
        }
         
          <Link to='/about'>
            <li>About</li>
          </Link>

          {
            currentUser? <Link to="/profile"><img  className="h-7 w-7 rounded-full" src={currentUser?.rest?.profilePicture} alt="profile" /></Link> :<Link to='/signin'>
            <li>Signin</li>
          </Link>
          }
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
