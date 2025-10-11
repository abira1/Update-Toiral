import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import SEO from '../components/SEO';

const AboutPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <SEO 
        title="About Toiral - Professional Web Development Team"
        description="Learn about Toiral's mission, team, and approach to web development. Discover how we craft digital experiences that reflect your brand's soul."
        keywords="about toiral, web development team, digital agency bangladesh, web design company dhaka"
        url="https://toiral.com/about"
      />
      <Header mousePosition={mousePosition} />
      <main className="min-h-screen">
        <About mousePosition={mousePosition} />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;