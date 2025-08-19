import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center hero-gradient">
      <div className="container-max text-center text-white animate-fade-in">
        <div className="mb-8">
          <img
            src="/img/favicon.png"
            alt="Profile"
            className="w-40 h-40 rounded-full mx-auto mb-6 shadow-2xl"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Joseph Olaoye
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
          Software Leader | Fullstack Software Engineer | Fintech Consultant
        </p>
        
        <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
          Crafting digital experiences with modern technologies. Specializing in React, Node.js, 
          and cloud solutions that drive business growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={() => scrollToSection('projects')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold group"
          >
            View My Work
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold"
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/joeolaoye"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/joeolaoye"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/joeolaoye"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="mailto:joseph@tjoc.dev"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;