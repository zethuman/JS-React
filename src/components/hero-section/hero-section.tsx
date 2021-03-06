import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import React, { ReactElement, useEffect, useRef } from 'react';
import { textIntro } from '../animation/animation';
import classes from './hero-section.module.css';

gsap.registerPlugin(CSSPlugin)

interface Props {

}

export default function HeroSection(): ReactElement {

    // const [products, setProducts] = useState<any[]>([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const result = await axios.get("products");
    //         console.log(result.data);
    //         setProducts([...result.data]);
    //     }

    //     fetchData();
    // }, []);


    const headRef = useRef(null);
    let textRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin();
        gsap.from(headRef.current, { duration: 1, autoAlpha: 0, ease: 'none' })
    }, [headRef])

    useEffect(() => {
        gsap.registerPlugin();
        textIntro(textRef)
    }, [])

    return (
        <>
            <div className={classes.hero_container} ref={textRef}>
                <video src='/videos/video-4.mp4' autoPlay loop muted />
                <h1 ref={(e: any) => { textRef = e }}>Wallpaper Craft</h1>
                <p>Choose what your heart desires</p>
                <div className={classes.hero_btns}>
                    <a href="https://www.youtube.com/watch?v=9WyZWvpZiB4" target='blank' className={`${classes.btn__primary} ${classes.btn_large} ${classes.a}`}>WATCH TRAILER <i className={`far fa-play-circle`} /></a>
                </div>
            </div>
        </>
    )
}
