import React, { ReactElement } from 'react'
import './hero-section.css';

interface Props {
    
}

export default function HeroSection(): ReactElement {
    return (
        <div className='hero-container'>
            {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
            <h1>Adventure Awaits</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
                <button>
                    GET STARTED
                </button>
                <a href="https://www.youtube.com/watch?v=9WyZWvpZiB4" target='blank' className="btn--primary btn-large">WATCH TRAILER <i className='far fa-play-circle' /></a>
            </div>
        </div>
    )
}
