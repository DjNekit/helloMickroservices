import React from 'react';
import { CreatePost } from '../pages/CreatePost'

import 'bootstrap/dist/css/bootstrap.min.css'

export const App = () => {
	return (
        <div className='container mt-3'>
            <CreatePost />
        </div>
    )
}
