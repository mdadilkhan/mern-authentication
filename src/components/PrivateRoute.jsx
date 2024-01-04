import {useSelector} from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'



//its working is like that when ever user want to go to the protected
//  route it will redirect to the signin paege when user is not registerd
//  or loggged in and when user is register it will redirec to the desired page using outlet
export default function PrivateRoute() {
    const {currentUser} = useSelector(state => state.user)
  return currentUser ? <Outlet/> : <Navigate to='/signin'/>
}