import React from 'react';
import Header from '../components/Header';
import Steps from '../components/Steps';
import Description from '../components/Description';
import Testimonials from '../components/Testimonials';
import GenerateBtns from '../components/GenerateBtns';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div>
            <Header/>
            <Steps/>
            <Description/>
            <Testimonials/>
            <GenerateBtns/>
        </div>
    );
};

export default Home;