import React from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { Card, Button } from 'react-bootstrap-v5'
import { FieldInput } from '../../shared/FieldInput'
import { Posts } from './components/Posts'

import * as asyncActions from './actions'

export const CreatePost = props => {
    const dispatch = useDispatch()
    const { posts, loading } = useSelector(({ createPost }) => createPost)
    const actions = bindActionCreators(asyncActions, dispatch)

    return (
        <div>
            <h1>Create Post</h1>
            <hr />
            <Formik
                initialValues={{
                    title: ''
                }}

                onSubmit={async ({ title }) => {
                    if (title) {
                        actions.createPost(title)
                        title = ''
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Card>
                        <Card.Body>
                            <Card.Title>What's new?</Card.Title>
                            <Card.Text>
                            <FieldInput 
                                type="title" 
                                name="title" 
                                placeholder="write a post"
                                disabled={isSubmitting}
                            />
                            </Card.Text>
                            <Button type='submit' disabled={isSubmitting}>Publish</Button>
                        </Card.Body>
                        </Card>
                    </Form>
                )}
            </Formik>
            <Posts loading={loading} posts={posts} actions={actions}/>
        </div>
    )
}