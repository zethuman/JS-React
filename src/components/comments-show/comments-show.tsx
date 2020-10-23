import React, { ReactElement, useContext } from 'react'
import { ContextUsername } from '../contexts/context-username'
import './comments-show.css'

interface Props {
    comment: string
}

export default function CommentsShow({comment}: Props): ReactElement {

    const username = useContext(ContextUsername)

    return (
        <>
            <hr/>
        <div className="comments">
            <span className="little">{username}</span>
            <p>{comment}</p>
        </div>
        </>
    )
}
