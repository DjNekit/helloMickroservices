import React, { useEffect } from 'react'
import { Card, Spinner } from 'react-bootstrap-v5'
import { Comments } from './Comments'

import { PostsWrapper } from './style'

export const Posts = ({ loading, posts, actions }) => {
	useEffect(() => {
        actions.getPreloadData()
    }, [])

    return loading 
        ? (
            <div className='text-center mt-3'>
                <Spinner animation='border' variant="primary"/>
            </div>
        ) 
        : (
            <React.Fragment>
                <hr />
                <PostsWrapper>
                    {posts.map(p =>
                        <Card key={p.id}>
                            <Card.Body>
                                <Card.Title>
                                    {p.title}
                                </Card.Title>
                                <Comments postId={p.id} data={p.comments} createComment={actions.createComment}/>
                            </Card.Body>
                        </Card>
                    )}
                </PostsWrapper>
            </React.Fragment>
	    )
}
