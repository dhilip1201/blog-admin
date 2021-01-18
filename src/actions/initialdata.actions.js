import axiosInstance from "../helpers/axios";
import { blogConstants, productConstants } from "./constants";
export const getInitialData=()=>{
    return async dispatch => {
        
        const res = await axiosInstance.get('/initialdata');
        if(res.status === 200){
            const {blogs} = res.data
            dispatch({
                type: blogConstants.GET_ALL_BLOG_SUCCESS,
                payload:{
                    blogs
                }
            })
            
        }
        console.log(res)
       
    }
}