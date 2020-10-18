import React from 'react';
import '../app/App.css';
import Cards from '../cards/cards';
import Footer from '../footer/footer';
import HeroSection from '../hero-section/hero-section';

export default function Home() {
    return(
        <>
            <HeroSection />
            <Cards />
            <Footer />
        </>
    );
};