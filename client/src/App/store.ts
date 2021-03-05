import { configureStore } from '@reduxjs/toolkit'
import { reduxBatch } from '@manaflair/redux-batch'
import createPostReducer from '../pages/CreatePost/slice'

const rootReducer = {
    createPost: createPostReducer
}

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [reduxBatch]
})