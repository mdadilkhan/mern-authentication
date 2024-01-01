import {createSlice} from '@reduxjs/toolkit';


const initialState={
    currentUser:null,
    error:false,
    loading:false
}


const userSLice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
          state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false
            state.error=false
        },
        signInFailure:(state,action)=>{
            console.log(action.payload);
            state.loading=true
            state.error=action.payload
        }
    }
})

// these are action we are exporting to be used for dispatching action
export const {signInStart,signInSuccess,signInFailure}=userSLice.actions

// now we need to export the reducer to be user in the root reducer fo the store
export default userSLice.reducer;