import React, { ReactElement } from 'react'
import { Comments } from '../../modules/comments'
import './comments-show.css'

interface Props {
    comment: string,
    username: string
}

export default function CommentsShow({comment, username}: Props): ReactElement {
    return (
        <>
            <hr/>
        <div className="comments">
            <span className="little">{sessionStorage.getItem('username')}</span>
            <p>{sessionStorage.getItem('comments')}</p>
        </div>
        </>
    )
}
