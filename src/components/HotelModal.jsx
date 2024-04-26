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

const Modal = ({ onClose }) => {

  const dispatch = useDispatch();
  const fileRef=useRef(null);
  const {currentUser,loading, error } =useSelector(state=>state.user)
  const [image,setImage]=useState(undefined)
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const [formData, setFormData] = useState({
    fullname: '',
    address: '',
    mobileno: '',
    filename: ''
  });


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
          setFormData({ ...formData, filename: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Send the form data to your API endpoint
      const response = await axios.post(`${URL}/user/addHotel`, formData);
      console.log("res>>",response);
      console.log(response.data); // Handle the response from the server
      onClose(); // Close the modal after successfully adding the data
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
   console.log(formData);


  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      {/* Modal content */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal overlay */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* Modal dialog */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mx-auto">Add Room Details</h3>
            <div className="flex flex-col sm:flex-row gap-3">  
             <input
                  type="text"
                  placeholder="Full Name.."
                  required
                  className="bg-slate-100 p-3 rounded-lg"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                  <input
                  type="text"
                  placeholder="address.."
                  required
                  className="bg-slate-100 p-3 rounded-lg w-full"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
           
              <div className="flex flex-col sm:flex-row gap-3">  
                <input
                  type="text"
                  placeholder="999999999"
                  required
                  className="bg-slate-100 p-3 rounded-lg"
                  name="mobileno"
                  value={formData.mobileno}
                  onChange={handleChange}
                /> 
                 <input
                  required
                  className="bg-slate-100 p-3 rounded-lg"
                  name="filename"
                  
                  type='file' ref={fileRef}  accept='image/*' onChange={(e)=>{setImage(e.target.files[0])}}
                 />
                </div>

            </div>
          </div>

          {/* Modal footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose} // Close the modal on button click
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-700 text-base font-medium text-white hover:opacity-95 disabled:opacity-80 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit} // Close the modal on button click
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
