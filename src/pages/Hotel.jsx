import {useEffect, useState} from 'react'
import HotelModal from '../components/HotelModal';
import  axios  from 'axios';
import { useNavigate } from "react-router-dom";
import { URL } from '../../config';


const Room = () => {
  const navigate=useNavigate()
    const [searchText, setSearchText] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allHotel,setAllHotel]=useState([])
    const [filteredHotel, setFilteredHotel] = useState([]);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };


    const getAllRooms = () => {
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
      getAllRooms();
    }, [isModalOpen]);
    console.log(allHotel);


 
  
    useEffect(() => {
      // Filter rooms based on the address field when searchText changes
      const filtered = allHotel.filter(room =>
        room.address.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredHotel(filtered);
    }, [searchText, allHotel]);
    console.log("all hotels",allHotel);
  return (
    <>

     <div className='flex flex-wrap justify-around p-4 sm:flex-nowrap gap-5'>
      <input
      type="text"
      placeholder="Search area..."
      value={searchText}
      onChange={(event) => {
        setSearchText(event.target.value);
      }}
      className='border border-1 border-[#cccccc] px-4 py-2 min-w-[100%] sm:min-w-[500px] block rounded-[4px]'
    />
      <button onClick={openModal}  className='bg-slate-700 text-white p-3 rounded-lg capitalize hover:opacity-95 disabled:opacity-80  md:w-auto md:inline-block w-full'>Add Hotel</button>
     </div>
     {isModalOpen && <HotelModal onClose={closeModal} />}
    <div className="bg-white">
     
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Popular Hotels</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {filteredHotel.map((product) => (
          <div key={product.id} className="group relative" onClick={()=>{
            navigate(`/hoteldetials/${product._id}`)
          }}>
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
  </div>
  </>
  )
}

export default Room