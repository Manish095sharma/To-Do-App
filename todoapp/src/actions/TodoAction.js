import {
    TODO_ERROR,
    ADD_TODO,
    EDIT_TODO,

} from "./actionTypes";



const addTodoAction = (data) => ({
    type: ADD_TODO,
    payload: { data }
});

const UpdateTodoAction = data => ({
    type: EDIT_TODO,
    payload: { data }
});
export const errorTodoAction = error => ({
    type: TODO_ERROR,
    payload: { error }
});

export const addTodo = (todoName, existingData) => {
    return async dispatch => {
        try {

            let todos = [...existingData];
            todos.push({
                todoName,
                mark_as_complete: false
            })
            return dispatch(addTodoAction(todos));


        } catch (err) {
            return dispatch(errorTodoAction(err.message));
        }

    };
}

export const removeTodo = (index, existingData) => {
    return async dispatch => {
        try {

            let todos = [...existingData];
            todos.splice(index, 1);

            return dispatch(UpdateTodoAction(todos));


        } catch (err) {
            return dispatch(errorTodoAction(err.message));
        }

    };
}

export const editTodo = (todoName, index, existingData, isMarkasComplete) => {
    return async dispatch => {
        try {

            let todos = [...existingData];
            todos[index].todoName = todoName;
            todos[index].mark_as_complete = isMarkasComplete

            return dispatch(UpdateTodoAction(todos));


        } catch (err) {
            return dispatch(errorTodoAction(err.message));
        }

    };
}


