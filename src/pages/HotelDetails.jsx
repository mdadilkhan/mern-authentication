import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { URL } from '../../config'
const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRoomDetails = () => {

            
            axios.get(`${URL}/user/getHotel/${id}`).then((res) => {
                setRoom(res.data.room);
                setLoading(false);
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
                setError(error.message);
                setLoading(false);
            });
   
       
    };

    useEffect(() => {
        getRoomDetails();
    }, []); // Add an empty dependency array to ensure useEffect runs only once
   console.log(room);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!room) {
        return <div>Room not found</div>;
    }
  return (
    <>
    <div className='flex justify-center py-4'>
       <h2>Room Details</h2>
    </div>
   <div className="product-card w-full">
    <div className="badge">Hot</div>
    <div className="product-tumb">
        <img src={room.filename} alt=""/>
    </div>
    <div className="product-details flex justify-center">
    <div className='flex  gap-10'>
     <div>
        <h4>Name</h4>
        <h4>Phone-no</h4>
        <h4>Address</h4>
      </div>
      <div>
        <h4>{room.fullname}</h4>
        <h4>{room.college}</h4>
        <h4>{room.course}</h4>
        <h4>{room.email}</h4>
        <h4>{room.mobileno}</h4>
        <h4>{room.address}</h4>
        <h4>{}</h4>
       
      </div>
    </div>
    
     
    </div>
</div>
    </>
 
  )
}

export default RoomDetails


