let initialState = {
    users : localStorage.getItem('crud')  ? JSON.parse(localStorage.getItem('crud'))  : [],
    user : {}
}

const Crud = (state = initialState, action) =>{
    switch(action.type){
        case 'ADD_RECORD' :
            let insertdata = action.payload;
            let data = [...state.users,insertdata];
            localStorage.setItem('crud',JSON.stringify(data));
        return{
            ...state,
            users: data
        }

        case 'DELETE_RECORD' :
             let deleteData = state.users.filter((v)=>{
                return v.id !== action.payload
             })
          
             localStorage.setItem('crud',JSON.stringify(deleteData));
             return{
                ...state,
                users: deleteData
             }

        case 'EDIT_RECORD' :
            let edit = state.users.find((v)=>{
                return v.id === action.payload
            })
            localStorage.setItem('crud',JSON.stringify(edit));
            return{
                ...state,
                user : edit
            }

        case 'UPDATE_RECORD' :
            let update = state.users.map((v)=>{
                if(v.id === action.payload.id){
                    return{
                        ...v,
                        fname: action.payload.fname,
                        lname: action.payload.lname,
                        salary: action.payload.salary
                    }
                }
                return v;
            })
            localStorage.setItem('crud',JSON.stringify(update));
            return{
                ...state,
                users: update
            }

        default : 
         return state;
    }
}
export default Crud;