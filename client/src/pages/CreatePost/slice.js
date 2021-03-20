import { createSlice } from '@reduxjs/toolkit'

const { reducer, actions } = createSlice({
    name: 'createPost',
    initialState: {
        posts: [],
        loading: true
    },
    reducers: {
        setPreloadData: (state, action) => {
            state.posts = action.payload
            state.loading = false
        },
        setNewPost: (state, action) => {
            state.posts.push(action.payload)
        },
        setNewComment: (state, action) => {
            const { id, comments } = action.payload
            state.posts.find(p => p.id === id).comments = comments
        }
    }
})

export const { setPreloadData, setNewPost, setNewComment } = actions
export default reducer