import React from 'react';
import Cards from '../cards/cards';
import Footer from '../footer/footer';
import HeroSection from '../hero-section/hero-section';

export default function Home() {
    return (
        <React.Fragment>
            <HeroSection />
            <Cards />
            <Footer />
        </React.Fragment>
    );
};