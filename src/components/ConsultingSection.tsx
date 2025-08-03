import { Button } from '@/components/ui/button';
import { Check, Calendar, Clock, Users, Zap } from 'lucide-react';

const ConsultingSection = () => {
  const services = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Technical Strategy",
      description: "Architecture planning, technology selection, and roadmap development"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Mentoring",
      description: "Code reviews, best practices, and knowledge transfer sessions"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Rapid Prototyping",
      description: "Quick proof-of-concepts and MVP development"
    }
  ];

  const benefits = [
    "Personalized consultation tailored to your needs",
    "Practical solutions with immediate impact",
    "Ongoing support and follow-up sessions",
    "Industry best practices and modern approaches",
    "Flexible scheduling around your timezone",
    "Comprehensive documentation and resources"
  ];

  return (
    <section id="consulting" className="section-padding bg-background">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Consulting Services
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Transform your ideas into reality with expert guidance and hands-on support. 
            Whether you're a startup or an established business, I help you navigate 
            technical challenges and accelerate your development.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="portfolio-card p-6 text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-lg mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* What You'll Get */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold mb-6 text-primary">
              What You'll Get
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-accent/10 text-accent rounded-full flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Booking */}
          <div className="animate-slide-up">
            <div className="portfolio-card p-6">
              <div className="text-center mb-6">
                <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">
                  Book a Session
                </h3>
                <p className="text-muted-foreground">
                  Schedule a free 30-minute consultation to discuss your project
                </p>
              </div>

              {/* Calendar Placeholder */}
              <div className="bg-secondary/50 rounded-lg p-8 text-center mb-6">
                <div className="text-sm text-muted-foreground">
                  <p>• Available Monday - Friday, 5 PM - 9 PM WAT</p>
                  <p>• 30-minute consultation sessions</p>
                  <p>• Video call via Google Meet</p>
                </div>
              </div>

              <Button asChild className="w-full group">
                <a href="https://calendly.com/joeolaoye/quick-free-consult" target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Schedule Consultation
                </a>
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-3">
                No commitment required • Free initial consultation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;