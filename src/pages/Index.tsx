import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Experiences from "@/components/sections/Experience";

const Index = () => {
  return (
    <div id="top">
      <Hero />
      <main>
        <Projects />
        <Skills />
        <Experiences />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
