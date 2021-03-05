import React, { useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap-v5'

export const Comments = ({ data, postId, createComment }) => {
	const [inputValue, setInputValue] = useState('')

	const handleClick = () => {
		inputValue && createComment(inputValue, postId) && setInputValue('')
	}

	return (
		<React.Fragment>
			<Card.Subtitle className='mb-3'>
				{data.length} comments:
			</Card.Subtitle>

			{data.map(c => {
				switch (c.status) {
					case 'pending':
						return <Alert key={c.id} variant='secondary'>Комментарий проходит модерацию</Alert>
					case 'rejected':
						return <Alert key={c.id} variant='danger'>Комментарий скрыт модератором</Alert>
					case 'approved':
						return (
							<Card.Text key={c.id}>
								<i>{c.id} - {c.comment}</i>
							</Card.Text>
						)
				}
			})}
			
			<Card.Text>
				<Form.Control
					as="textarea"
					value={inputValue}
					placeholder="comment"
					onChange={e => setInputValue(e.target.value)}
					onKeyDown={({ key }) => key === 'Enter' && handleClick()}
				/>
			</Card.Text>
			<Card.Text>
				<Button onClick={handleClick}>Send</Button>
			</Card.Text>
		</React.Fragment>
	)
}
