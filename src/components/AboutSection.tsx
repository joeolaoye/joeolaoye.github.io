import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Java', 'PostgreSQL', 'MySQL', 'AWS',
    'Docker', 'GraphQL', 'Next.js', 'Tailwind CSS', 'MongoDB', 'Redis'
  ];

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with over 17 years of experience building 
                scalable web applications and digital solutions. My journey started with a 
                computing degree, but my real education came from building real-world 
                projects and solving complex problems.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I specialize in modern JavaScript technologies, cloud architecture, and creating 
                user-centric applications that deliver tangible business value. When I'm not coding, 
                you'll find me mentoring junior developers or exploring the latest in AI and machine learning 
                innovation.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently, I'm focused on helping startups and established businesses leverage 
                technology to achieve their goals through consulting and custom development services.
              </p>

              <div className="pt-4 flex gap-4">
                <Button 
                  className="group"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/src/assets/docs/Joseph Olaoye CV.pdf';
                    link.download = 'Joseph Olaoye CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Download Resume
                </Button>
                <Button asChild className="group">
                  <a href="https://www.linkedin.com/in/joeolaoye/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <svg className="mr-2 h-4 w-4 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    View LinkedIn
                  </a>
                </Button>
              </div>
            </div>
            

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Skills & Technologies
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-center font-medium hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;