import React, { ReactElement, useEffect, useRef, useState } from 'react'
import './comments.css'

interface Props {
    
}

export default function Comments({}: Props): ReactElement {

	const[comments, setComments] = useState('');
	const commentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        commentRef.current?.focus()
    }, [])

	const handleComment = (comment: string) => {
		
	}

    return (
        <>
			<div className="container">
				<div className="row">
					<h3>Comments</h3>
				</div>
    
				<div className="row">
				<div className="col-md-6">
						<div className="widget-area no-padding blank">
							<div className="status-upload">
									<form>
										<textarea placeholder="What are you doing right now?" ref={commentRef}  onChange={e => setComments(e.target.value)}></textarea>
										<button type="submit"  className="btn btn-success green">Add</button>
									</form>
							</div>
						</div>
				</div>
				</div>

				<div>
					{comments}
				</div>
			</div>
        </>
    )
}
