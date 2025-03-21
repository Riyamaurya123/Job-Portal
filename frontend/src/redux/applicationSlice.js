import { createSlice } from "@reduxjs/toolkit";
const applicatioSlice = createSlice({
    name:'application',
    initialState:{
        allApplicants:[]
    },
    reducers:{
        setAllApplicants:(state,action)=>{
            state.allApplicants = action.payload
        }
    }
})
export const {setAllApplicants} = applicatioSlice.actions
export default applicatioSlice.reducer