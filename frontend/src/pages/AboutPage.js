import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <>
      <SEO 
        title="About Toiral - Professional Web Development Team"
        description="Learn about Toiral's mission, team, and approach to web development. Discover how we craft digital experiences that reflect your brand's soul."
        keywords="about toiral, web development team, digital agency bangladesh, web design company dhaka"
        url="https://toiral.com/about"
      />
      <Header />
      <main className="min-h-screen">
        <About />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;