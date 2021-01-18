import { userConstants } from "../actions/constants"

const initState={
    // user:{
    //     firstName:'',
    //     lastName:'',
    //     email:'',
    //     password:''
    // },
    error:null,
    loading:false,
    loaded:false,
    message:null
}

export const userReducers= (state=initState, action)=>{
    console.log("ACTION",action);
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state={
                ...state,
                loading:false,
                loaded:true,
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state={
                ...state,
                loading:true,
                loaded:false,
                message:action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state={
                error:action.payload.error,
                loading:false,
                loaded:false
            }
            break;
        
    }
    return state;
}