import React, { ReactElement, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './hero-section.css';

interface Props {
    
}

export default function HeroSection(): ReactElement {
 
    const headRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {duration: 1, autoAlpha: 0, ease: 'none'})
    }, [headRef])

    useEffect(() => {
        gsap.from(textRef.current, {duration: 1, autoAlpha:0, ease: "power3.out", y: -64, stagger: {
            amount: 0.15
        }})
    }, [textRef])

    return (
        <div className='hero-container' ref={textRef}>
            {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
            <h1 ref={textRef}>Wallpaper Craft</h1>
            <p>Choose what your heart desires</p>
            <div className="hero-btns">
                <a href="https://www.youtube.com/watch?v=9WyZWvpZiB4" target='blank' className="btn--primary btn-large">WATCH TRAILER <i className='far fa-play-circle' /></a>
            </div>
        </div>
    )
}
