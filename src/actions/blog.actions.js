import axiosInstance from "../helpers/axios"
import { blogConstants } from "./constants";

export const getAllBlog= () =>{
    return async (dispatch) =>{
        dispatch({type: blogConstants.GET_ALL_BLOG_REQUEST});
        const res = await axiosInstance.get('/blog/getBlogs');
        if(res.status === 200){
            const {blogLists} = res.data
            dispatch({
                type:blogConstants.GET_ALL_BLOG_SUCCESS,
                payload:{
                    blog: blogLists
                }
            })
        }else{
            dispatch({
                type:blogConstants.GET_ALL_BLOG_FAILURE,
                payload:{
                    error: res.data.error
                }
            })
        }
    }
}

export const addBlog = (form)=>{
    return async dispatch =>{
        
        dispatch({type: blogConstants.ADD_NEW_BLOG_REQUEST});
        const res = await axiosInstance.post('/blog/create',form);
        if(res.status === 201){
            dispatch({
                type: blogConstants.ADD_NEW_BLOG_SUCCESS,
                payload: {
                    blog:res.data.blog
                }
            })
        }else{
            dispatch({
                type: blogConstants.ADD_NEW_BLOG_FAILURE,
                payload:{
                    error: res.data.error
                }
            })
        }
    }
}

// export const updateCategories = (form) =>{
//     return async dispatch => {

//         dispatch({type: categoryConstants.UPDATE_CATEGORY_REQUEST});
//         const res = await axiosInstance.post(`/category/update`, form);
//         if(res.status == 201){
            
            
//             dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS})
//             dispatch(getAllCategory());
//             return true;
//         }else{
//             console.log(res)
//             dispatch({
//                 type: categoryConstants.UPDATE_CATEGORY_FAILURE,
//                 payload: {error: res.data.error}
//             })
//         }
        
//     }
// }

export const deleteCategories = (ids) =>{
    return async dispatch => {

        dispatch({type: blogConstants.DELETE_BLOG_REQUEST});
        const res = await axiosInstance.post(`/category/delete`, {
           payload: {
               ids
            }
        });
        if(res.status == 201){
            dispatch(getAllBlog());
            dispatch({
                type: blogConstants.DELETE_BLOG_SUCCESS
            })
            return true
        }else{
            dispatch({
                type: blogConstants.DELETE_BLOG_FAILURE,
                payload: {error: res.data.error}
            })
        }
        
    }
}


export const deleteBlogById = (payload) => {
    return async (dispatch) => {
        
      try {
        dispatch({ type: blogConstants.DELETE_BLOG_BY_ID_REQUEST });

        const res = await axiosInstance.delete(`/blog/deleteBlogById`, {
          data: { payload },
        });
       
        if (res.status === 202) {
          dispatch({ type: blogConstants.DELETE_BLOG_BY_ID_SUCCESS });
          dispatch(getAllBlog());
        } else {
          const { error } = res.data;
          dispatch({
            type: blogConstants.DELETE_BLOG_BY_ID_FAILURE,
            payload: {
              error,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };