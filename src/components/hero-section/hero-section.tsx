import React, { ReactElement, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './hero-section.css';
import { textIntro } from '../animation/animation'
import { CSSPlugin } from 'gsap/CSSPlugin'

gsap.registerPlugin(CSSPlugin)

interface Props {
    
}

export default function HeroSection(): ReactElement {
 
    const headRef = useRef(null);
    let textRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin();
        gsap.from(headRef.current, {duration: 1, autoAlpha: 0, ease: 'none'})
    }, [headRef])

    useEffect(() => {
        gsap.registerPlugin();
        textIntro(textRef)
    }, [])

    return (
        <div className='hero-container' ref={textRef}>
            {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
            <h1 ref={(e: any) => {textRef = e}}>Wallpaper Craft</h1>
            <p>Choose what your heart desires</p>
            <div className="hero-btns">
                <a href="https://www.youtube.com/watch?v=9WyZWvpZiB4" target='blank' className="btn--primary btn-large">WATCH TRAILER <i className='far fa-play-circle' /></a>
            </div>
        </div>
    )
}
