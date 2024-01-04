import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const {currentUser} = useSelector((state)=>state.user)
  console.log("currentUser",currentUser);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center md:max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className="font-bold"> Auth App</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>

          {
            currentUser? <img  className="h-7 w-7 rounded-full" src={currentUser.profilePicture} alt="profile" />:<Link to='/signin'>
            <li>Signin</li>
          </Link>
          }
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
