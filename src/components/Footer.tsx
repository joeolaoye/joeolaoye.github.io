import { Button } from '@/components/ui/button';
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-max py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Joseph Olaoye</h3>
            <p className="text-primary-foreground/80">
              Fullstack Software Engineer and Consultant
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/joeolaoye"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/joeolaoye"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/joeolaoye"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:olaoye.joseph@gmail.com"
              className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Back to Top */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              onClick={scrollToTop}
              className="text-primary-foreground hover:bg-primary-foreground/10 group"
            >
              Back to Top
              <ArrowUp className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            © {currentYear} made with <Heart className="inline-block h-4 w-4 text-red-500" /> by Joseph Olaoye. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;