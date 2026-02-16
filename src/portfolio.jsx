import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const canvasRef = React.useRef(null);
  const particlesRef = React.useRef([]);
  const animationRef = React.useRef(null);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        // Gentle random drift
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['hero', 'about', 'research', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const researchProjects = [
    {
      title: "Multi-Task CNN for Biological Sample QC",
      role: "Undergraduate Student Researcher",
      location: "University of Notre Dame",
      period: "September 2025 – Present",
      description: "Engineered a ResNet-18 CNN achieving 99.5% classification accuracy for automated quality control, with real-time freshness detection deployed via TensorFlow Lite.",
      metrics: ["99.5% accuracy", "MAE 1.4 hours", "42,936 images processed", "R² = 0.997"],
      tags: ["PyTorch", "TensorFlow Lite", "Computer Vision", "OpenCV"],
      link: null
    },
    {
      title: "VR Hardware Security Testbed",
      role: "Research Assistant",
      location: "George Mason University",
      period: "June 2024 – August 2024",
      description: "Developed real-time DAQ architecture to identify acoustic interference vulnerabilities in MEMS sensors for VR hardware security research.",
      metrics: ["120 Hz synchronization", "Real-time fault detection"],
      tags: ["Python", "Hardware Security", "Signal Processing"],
      link: null
    },
    {
      title: "Neural 3D Representations in VR",
      role: "Research Assistant & First Author",
      location: "National Yang Ming Chiao Tung University",
      period: "December 2023 – August 2024",
      description: "Published IEEE MIPR paper evaluating 3D Gaussian Splatting for mobile VR, achieving 8x performance improvement while reducing storage by 99%.",
      metrics: ["72 FPS vs 9 FPS", "99% storage reduction", "252 user sessions"],
      tags: ["Unity", "3D Gaussian Splatting", "VR/AR", "C#"],
      link: "https://ieeexplore.ieee.org/document/10708024"
    }
  ];

  const projects = [
    {
      title: "Air Quality Monitoring System",
      role: "Project Team Member",
      location: "University of Notre Dame",
      period: "September 2025 – December 2025",
      description: "Prototyped a robust sensor array for environmental monitoring, utilizing SolidWorks for 3D modeling and Arduino microcontrollers to automate data capture.",
      metrics: ["3 design iterations", "Servo-powered mechanism", "Team of 4"],
      tags: ["Arduino", "SolidWorks", "IoT", "C++"],
      link: null
    },
    {
      title: "Autonomous Drones for Wildlife Protection",
      role: "Team Lead",
      location: "Taiwan",
      period: "March 2021 – June 2021",
      description: "Led development of autonomous drone tracking system using YOLOv5, achieving 38% performance improvement over baseline algorithms.",
      metrics: ["37-second detection", "7+ concurrent targets", "38% improvement"],
      tags: ["YOLOv5", "Unreal Engine 4", "Python", "Computer Vision"],
      link: null
    }
  ];

  const skills = {
    "Languages": ["Python", "C", "C++", "JavaScript", "R", "C#", "MATLAB"],
    "ML & CV": ["PyTorch", "TensorFlow", "OpenCV", "Pandas", "NumPy", "SciPy"],
    "Tools & Platforms": ["React", "Unity", "Unreal Engine", "SolidWorks", "Git", "Linux"],
    "Learning": ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  };

  return (
    <div style={{
      fontFamily: "'Berkeley Mono', 'IBM Plex Mono', 'SF Mono', monospace",
      background: '#0a0a0a',
      color: '#e8e8e8',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Interactive particle background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: scrollY > 100 ? 0.4 : 0.6,
          transition: 'opacity 0.6s ease'
        }}
      />
      
      {/* Subtle grid overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        opacity: 0.3,
        zIndex: 0
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrollY > 50 ? 'rgba(10,10,10,0.9)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }}>
        <div style={{
          fontSize: '0.9rem',
          letterSpacing: '0.1em',
          fontWeight: '500'
        }}>
          CHARLIE HSU
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem' }}>
          {['About', 'Research', 'Projects', 'Skills', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 4rem',
        position: 'relative',
        animation: 'fadeIn 1s ease-out'
      }}>
        <div style={{
          maxWidth: '900px',
          animation: 'slideUp 1s ease-out'
        }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#666',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Computer Science @ University of Notre Dame
          </div>
          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Charlie Hsu
          </h1>
          <p style={{
            fontSize: '1.3rem',
            lineHeight: '1.6',
            color: '#aaa',
            marginBottom: '2rem',
            maxWidth: '650px'
          }}>
            Building intelligent systems with computer vision, machine learning, and cloud infrastructure.
          </p>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.8',
            color: '#888',
            marginBottom: '3rem',
            maxWidth: '650px'
          }}>
            CS student focused on DevOps, cloud computing, and scalable ML systems. 
            Published researcher in VR/AR and computer vision with experience in PyTorch, TensorFlow, and Unity.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a
              href="#contact"
              className="cta-button"
            >
              GET IN TOUCH
            </a>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/Plaqard" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={22} />
              </a>
              <a href="https://www.linkedin.com/in/charlie-hsu/" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={22} />
              </a>
              <a href="mailto:chsu2@nd.edu" className="social-link">
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
        
        <a href="#about" style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#666',
          animation: 'bounce 2s infinite'
        }}>
          <ChevronDown size={28} />
        </a>
      </section>

      {/* About Section */}
      <section id="about" style={{
        minHeight: '60vh',
        padding: '8rem 4rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '900px' }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#666',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            About
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '2rem',
            letterSpacing: '-0.01em'
          }}>
            Research-Driven Engineer
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            fontSize: '1rem',
            lineHeight: '1.8',
            color: '#aaa'
          }}>
            <div>
              <p style={{ marginBottom: '1.5rem' }}>
                I'm a Computer Science student at Notre Dame with a minor in Bioengineering, maintaining a 4.0 GPA. 
                My research spans computer vision, VR/AR, and machine learning systems.
              </p>
              <p>
                Currently working as an undergraduate researcher developing CNN-based quality control systems 
                for biological samples, achieving 99.5% classification accuracy across 42K+ images.
              </p>
            </div>
            <div>
              <p style={{ marginBottom: '1.5rem' }}>
                I've published first-author research at IEEE MIPR on neural 3D representations for VR, 
                and contributed to hardware security research at George Mason University.
              </p>
              <p>
                Now transitioning toward DevOps and cloud computing, building expertise in containerization, 
                CI/CD pipelines, and infrastructure-as-code to deploy scalable ML systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" style={{
        padding: '8rem 4rem',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#666',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Research Experience
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '4rem',
            letterSpacing: '-0.01em'
          }}>
            Published Work & Research
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {researchProjects.map((project, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em'
                    }}>
                      {project.title}
                    </h3>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#888',
                      marginBottom: '0.3rem'
                    }}>
                      {project.role} • {project.location}
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      letterSpacing: '0.05em'
                    }}>
                      {project.period}
                    </div>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#aaa',
                  marginBottom: '1.5rem'
                }}>
                  {project.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem',
                  color: '#888',
                  flexWrap: 'wrap'
                }}>
                  {project.metrics.map((metric, i) => (
                    <div key={i} style={{
                      padding: '0.4rem 0.8rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: "'SF Mono', monospace",
                      fontSize: '0.8rem'
                    }}>
                      {metric}
                    </div>
                  ))}
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '0.8rem',
                  flexWrap: 'wrap'
                }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{
                      fontSize: '0.75rem',
                      color: '#666',
                      letterSpacing: '0.05em'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{
        padding: '8rem 4rem',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#666',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Projects
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '4rem',
            letterSpacing: '-0.01em'
          }}>
            Course & Personal Projects
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {projects.map((project, idx) => (
              <div
                key={idx}
                style={{
                  padding: '2.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.01em'
                    }}>
                      {project.title}
                    </h3>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#888',
                      marginBottom: '0.3rem'
                    }}>
                      {project.role} • {project.location}
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      letterSpacing: '0.05em'
                    }}>
                      {project.period}
                    </div>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#aaa',
                  marginBottom: '1.5rem'
                }}>
                  {project.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.85rem',
                  color: '#888',
                  flexWrap: 'wrap'
                }}>
                  {project.metrics.map((metric, i) => (
                    <div key={i} style={{
                      padding: '0.4rem 0.8rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontFamily: "'SF Mono', monospace",
                      fontSize: '0.8rem'
                    }}>
                      {metric}
                    </div>
                  ))}
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '0.8rem',
                  flexWrap: 'wrap'
                }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{
                      fontSize: '0.75rem',
                      color: '#666',
                      letterSpacing: '0.05em'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" style={{
        padding: '8rem 4rem',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#666',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Technical Skills
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '600',
            marginBottom: '4rem',
            letterSpacing: '-0.01em'
          }}>
            Tools & Technologies
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {Object.entries(skills).map(([category, items], idx) => (
              <div
                key={category}
                style={{
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                }}
              >
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  color: '#fff',
                  letterSpacing: '0.05em'
                }}>
                  {category}
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.6rem'
                }}>
                  {items.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.85rem',
                        color: '#aaa',
                        padding: '0.4rem 0.8rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.3)';
                        e.target.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.target.style.color = '#aaa';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        minHeight: '80vh',
        padding: '8rem 4rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#666',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            Get In Touch
          </div>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '600',
            marginBottom: '2rem',
            letterSpacing: '-0.01em'
          }}>
            Let's Build Something
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#aaa',
            marginBottom: '3rem'
          }}>
            I'm currently seeking opportunities in DevOps, cloud computing, and ML infrastructure. 
            Open to internships, research collaborations, and full-time roles starting December 2028.
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }}>
            <a
              href="mailto:chsu2@nd.edu"
              className="cta-button"
              style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}
            >
              chsu2@nd.edu
            </a>
            <div style={{ fontSize: '1rem', color: '#888' }}>
              +1 227-300-9128
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center'
          }}>
            <a
              href="https://github.com/charliehsu"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              style={{ gap: '0.5rem', fontSize: '0.9rem' }}
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/charliehsu"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              style={{ gap: '0.5rem', fontSize: '0.9rem' }}
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem 4rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
        color: '#666'
      }}>
        <div>© 2026 Charlie Hsu</div>
        <div style={{ letterSpacing: '0.05em' }}>
          Built with React
        </div>
      </footer>

      <style>{`
        /* Standard Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        
        /* Base Resets */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }

        /* NEW: Stable Navigation Links */
        .nav-link {
          color: #888;
          text-decoration: none;
          transition: color 0.3s ease;
          letter-spacing: 0.05em;
        }
        
        .nav-link:hover {
          color: #fff;
        }
        
        .nav-link.active {
          color: #fff;
        }

        /* NEW: Stable Social Icon Links */
        .social-link {
          color: #888;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        
        .social-link:hover {
          color: #fff;
        }

        /* NEW: CTA Buttons */
        .cta-button {
          padding: 0.9rem 2rem;
          background: #fff;
          color: #0a0a0a;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid #fff;
        }

        .cta-button:hover {
          background: transparent;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;