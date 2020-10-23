import React, { ReactElement, useEffect, useRef, useState, useContext} from 'react'
import { Comments } from '../../modules/comments';
import './comments-list.css';
import { Context } from '../contexts/context'
import {v4 as uuid} from 'uuid'


interface Props {
	onChange: (comment: Comments) => void
	product_id: number
}

export default function CommentsList(props : Props): ReactElement {

	const[comments, setComments] = useState('');
	const commentRef = useRef<HTMLTextAreaElement>(null);
	
	const context = useContext(Context);

    useEffect(() => {
        commentRef.current?.focus()
    }, [])

	const onChange = (comment: Comments) => {
		props.onChange(comment)
	}

	const onSubmit = (e: any) => {
        e.preventDefault();
        const newComment = {
			comment_id: uuid(),
			comment: comments,
			username: context,
			product_id: props.product_id
        }
        console.log(newComment);
		onChange(newComment);
		sessionStorage.setItem('comments', JSON.stringify({'product_id': props.product_id, 'comments': comments, 'username': context}))
	}
	

    return (
        <>
			<div className="commentform">
				<textarea name="" id =""  placeholder = "Please enter your comment here." ref={commentRef} 
								 onChange={e => setComments(e.target.value)} className="textarea"></textarea><br/>
				<button type="submit" onClick={onSubmit} className="github-btn"> Comment </button>
				<hr/>
				<h2>Comments</h2>
			</div>
        </>
    )
}
