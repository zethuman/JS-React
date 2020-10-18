import React, { Component } from 'react'
import { User } from '../../modules/user';

interface Props {
    initUser: User;
}

export default function Welcome(props: Props) {

        console.log("you r already logged in!")

        return (
            <div>
                Welcome back, {props.initUser['name']}!
            </div>
        )
}
