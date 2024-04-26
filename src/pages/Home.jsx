import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../../config";
const Home = () => {
  const navigate = useNavigate();
  const [allRooms, setAllRooms] = useState([]);
  const [allHotel,setAllHotel]=useState([])
  
  const getAllRooms = () => {
    axios
      .get(`${URL}/user/getAllRooms`)
      .then((res) => {
        // console.log(res.data.students);
        setAllRooms(res.data.students);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllRooms();
  },[]);






  const getAllHotel = () => {
    axios.get(`${URL}/user/getAllHotel`)
      .then((res) => {
        console.log(res.data);
        setAllHotel(res.data.hotels);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    getAllHotel();
  },[]);
  console.log(allHotel);
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Available Rooms
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allRooms.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={() => {
                navigate(`/roomdetials/${product._id}`);
              }}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.filename}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-center">
        <button onClick={()=>{navigate('/room')}} className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">View All</button>
      </div>



      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Nearby Hotel
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allHotel.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={() => {
                navigate(`/hoteldetials/${product._id}`);
              }}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.filename}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={()=>{navigate('/hotel')}} className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">View All</button>
      </div>
    </div>
  );
};

export default Home;
