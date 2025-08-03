import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});

  const projects = [
    {
      id: 1,
      title: "Rova: A mobile first fintech platform live in Nigeria and the UK.",
      description: "Rova is a mobile-first fintech platform that provides financial services to its users. It is live in Nigeria and the UK.",
      images: [
        "/img/rova/0.webp",
        "/img/rova/1.webp",
        "/img/rova/2.webp",
        "/img/rova/3.webp",
        "/img/rova/4.webp",
        "/img/rova/5.webp"
      ],
      tags: ["Flutter", "Java", "MongoDB", "Spring Boot", "AWS", "Docker", "Kubernetes", "MySQL"],
      githubUrl: "https://github.com/roava",
      liveUrl: "https://getrova.com/",
      featured: true
    },
    {
      id: 2,
      title: "mKobo: A neo-bank platform",
      description: "The digital bank of choice for salary earners. Mkobo.bank gives easy access to 50 percent of your already earned wages anytime before payday at ZERO interest!",
      images: [
        "/img/mkobo/0.webp",
        "/img/mkobo/1.webp",
        "/img/mkobo/2.webp",
        "/img/mkobo/3.webp",
        "/img/mkobo/4.webp",
        "/img/mkobo/5.webp"
      ],
      tags: ["React", "Firebase", "Java", "Spring Boot", "TypeScript"],
      githubUrl: "https://github.com/mkobo",
      liveUrl: "https://mkobo.bank/",
      featured: false
    },
    {
      id: 3,
      title: "WiseCV: An AI powered resume builder and job search tool.",
      description: "WiseCV is an AI powered resume builder that helps users create professional and personalized resumes in minutes.",
      images: [
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      tags: ["Express", "React", "Typescript", "Postgres", "Redis", "Docker"],
      githubUrl: "https://github.com/joeolaoye/wisecv",
      liveUrl: "https://wisecv.co/",
      featured: false
    }
  ];

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  const filters = ['All', ...allTags];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedFilter));

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="container-max">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
          Some Projects
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`portfolio-card p-6 animate-slide-up ${
                project.featured ? 'md:col-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`grid gap-6 ${project.featured ? 'md:grid-cols-2 items-center' : ''}`}>
                <div className={project.featured ? 'order-2 md:order-1' : ''}>
                  <div className="relative group">
                    <img
                        src={project.images[currentImageIndex[project.id] || 0]}
                        alt={`${project.title} - Image ${(currentImageIndex[project.id] || 0) + 1}`}
                        className="w-full h-auto object-contain rounded-lg mb-4 transition-all duration-300 bg-gray-50"
                      />
                    
                    {/* Carousel Navigation */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            const currentIndex = currentImageIndex[project.id] || 0;
                            const newIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
                            setCurrentImageIndex(prev => ({ ...prev, [project.id]: newIndex }));
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => {
                            const currentIndex = currentImageIndex[project.id] || 0;
                            const newIndex = currentIndex === project.images.length - 1 ? 0 : currentIndex + 1;
                            setCurrentImageIndex(prev => ({ ...prev, [project.id]: newIndex }));
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(prev => ({ ...prev, [project.id]: index }))}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                (currentImageIndex[project.id] || 0) === index
                                  ? 'bg-white'
                                  : 'bg-white/50 hover:bg-white/70'
                              }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className={project.featured ? 'order-1 md:order-2' : ''}>
                  {project.featured && (
                    <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      Featured
                    </span>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Learn More
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;