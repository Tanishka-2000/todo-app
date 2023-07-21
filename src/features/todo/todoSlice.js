import { createSlice, current } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        list: [],
        projects: [],
        inbox: 0,
        total: 0,
        completed: 0,
        user: {}
    },
    reducers: {
        addTodo : (state, action) => { 
            state.list.push({
                id:  Date.now(),
                ...action.payload,
                subtasks: [],
                completed: false,
            });
            
            state.total++;
            if(action.payload.project === 'Inbox') state.inbox++;
            else {
                const project = state.projects.find(project => project.name === action.payload.project);
                project.total++;
            }
        },

        toggleTodo: (state, action) => {
            const todo = state.list.find(todo => todo.id === action.payload)
            todo.completed = !todo.completed;
            todo.completed ? state.completed++ : state.completed--;
        },

        updateTodo: (state, action) => {
            const {task, description, project, priority, dueDate} = action.payload;
            const todo = state.list.find(todo => todo.id === action.payload.id)
            todo.task = task;
            todo.description = description;
            todo.project = project;
            todo.priority = priority;
            todo.dueDate = dueDate;
        },

        deleteTodo: (state, action) => {
            const index = state.list.findIndex(todo => todo.id === action.payload);
            const todo = state.list.find(todo => todo.id === action.payload);
            if(index !== -1) state.list.splice(index, 1);
            if(todo && todo.project){
                if(todo.project === 'Inbox') state.inbox--
                else {
                    const project = state.projects.find(project => project.name === todo.project);
                    project && project.total--;
                }
            }
        },

        addProject: (state, action) => {
            state.projects.push({
                id: Date.now(),
                ...action.payload,
                total: 0
            })
        },

        updateProject: (state, action) => {
            const project = state.projects.find(project => project.id === action.payload.id);
            project.color = action.payload.color;
        },

        deleteproject: (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload);
            if(index !== -1) state.projects.splice(index, 1);
        },

        addUser: (state, action) => {
            console.log('in slice' + action.payload);
            state.user = {
                email: action.payload.email,
                password: action.payload.password
             };
        }
        
    }
});

export const { addTodo, updateTodo, toggleTodo, deleteTodo, addProject, updateProject, deleteproject, addUser } = todoSlice.actions;
export default todoSlice.reducer;