import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Send, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual Formspree endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "olaoye.joseph@gmail.com",
      link: "mailto:olaoye.joseph@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+2348067028442",
      link: "tel:+2348067028442"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Lagos, Nigeria",
      link: null
    }
  ];

  return (
    <section id="contact" className="section-padding bg-secondary/30">
      <div className="container-max">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to start your next project? I'd love to hear from you. 
              Send me a message and let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <div className="portfolio-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="h-6 w-6 text-accent" />
                  <h3 className="text-2xl font-bold text-card-foreground">
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for spam protection */}
                  <input
                    type="text"
                    name="bot-field"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-card-foreground">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-card-foreground">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-card-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="portfolio-card p-6">
                <h4 className="font-semibold mb-3 text-card-foreground">
                  Response Time
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I typically respond to all inquiries within 24 hours. For urgent 
                  matters, feel free to reach out directly via phone or schedule 
                  a consultation call.
                </p>
              </div>

              <div className="portfolio-card p-6">
                <h4 className="font-semibold mb-3 text-card-foreground">
                  Project Inquiries
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Whether you have a specific project in mind or just want to 
                  explore possibilities, I'm here to help. No project is too 
                  small or too complex!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;