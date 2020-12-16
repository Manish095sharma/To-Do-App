import { ADD_TODO, EDIT_TODO, TODO_ERROR, TODO, REMOVE_TODO } from "../actions/actionTypes"

const initialState = {
    todo_List: [],
    error: null
};

export default function TodoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todo_List: action.payload.data,
                error: null
            };

        case EDIT_TODO:
            return {
                ...state,
                todo_List: action.payload.data,
                error: null
            };

        case TODO_ERROR:
            return {
                ...state,
                error: action.payload.error,
                todo_List: []
            };

        default:
            return state;
    }
}
