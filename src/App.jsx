import { useEffect, useState } from 'react';
import './App.css';
import { useForm, ValidationError } from '@formspree/react';

function App() {
  // Constants for logos, skills, projects, and certificates
  const htmlLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748172691/dic6wugjbn4sbuaotanf.jpg";
  const bootstrapLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748172690/bnqvt1nqa18ptucmqmnv.jpg";
  const cssLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748172690/x5qu17eipmbz98v0vamj.jpg";
  const navbarLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748172690/jplgelvqiangaeniffsd.png";
  const mainLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748884916/profile-pic_b2e19x.png";
  const nodejsLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748270933/node-js_yqny53.png";
  const reactLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748270763/react-logo_nyv92k.jpg";
  const pythonLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748172690/sjb69f0bylzxoxxkp7nr.jpg";
  const javascriptLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748172690/gbofu9fmpvq0kr5anup8.jpg";
  const githubLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748270763/github-logo_j5atu0.jpg";
  const firebaseLogo = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748172690/ao06nnidu3mdkhf3syod.jpg";

  const skillsArray = [htmlLogo, bootstrapLogo, cssLogo, nodejsLogo, reactLogo, pythonLogo, javascriptLogo];
  const skillValues = ["HTML", "Bootstrap", "CSS", "Node.js", "React", "Python", "Javascript"];
  const techValues = ["Github", "Firebase"];
  const techUsedArray = [githubLogo, firebaseLogo];

  const javaCertificate = "https://res.cloudinary.com/dz7moyhci/image/upload/v1734680337/Programming_in_Java_1_xbs75m.jpg";
  const python1infosys = "https://res.cloudinary.com/dz7moyhci/image/upload/v1734680330/REAL-PYTHON_PART-1_vsqiyd.jpg";
  const python2infosys = "https://res.cloudinary.com/dz7moyhci/image/upload/v1734680333/REAL-PYTHON_PART-2_ycyinl.jpg";
  const responsWeb = "https://res.cloudinary.com/dz7moyhci/image/upload/v1734621193/rqh4p0jiz1fygdryxgyt.jpg";
  const staticWeb = "https://res.cloudinary.com/dz7moyhci/image/upload/v1734621189/wqgqqlepneaytngvazbo.jpg";
  const pythonFou = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748184034/python-nxtwave_k4ha6n.jpg";
  const xpmCert = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748184024/xpm_awbejp.jpg";
  const uiux = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748183997/ui-ux_xprqeu.png";
  const fulstack = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748184058/fullstack-internship_man3is.jpg";
  const databaseCertificate = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748183966/databases_f7x5ki.jpg";

  const certificateName = [
    "BUILD YOUR OWN STATIC WEBSITE",
    "BUILD YOUR OWN RESPONSIVE WEBSITE",
    "PROGRAMMING IN JAVA",
    "PROGRAMMING FOUNDATIONS USING PYTHON PART-1",
    "PROGRAMMING FOUNDATIONS USING PYTHON PART-2",
    "XPM 4.O FUNDAMENTALS",
    "BUILDING MODREN WEB APPLICATIONS WITH MERN STACK",
    "INTRODUCTION TO DATABASES",
    "UI/UX MEGA WORKSHOP",
    "PROGRAMMING FOUNDATIONS WITH PYTHON"
  ];
  const certificateFrom = [
    "NxtWave", "NxtWave", "NPTEL", "Infosys Springboard", "Infosys Springboard",
    "NxtWave", "Edunet Foundation", "NxtWave", "NxtWave", "NxtWave"
  ];
  const certificateLinks = [
    staticWeb, responsWeb, javaCertificate, python1infosys, python2infosys,
    xpmCert, fulstack, databaseCertificate, uiux, pythonFou
  ];

  const project1Image5 = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748179307/gpbgk6jtwnpbwvxb4zbt.png";
  const project1Image4 = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748179307/spcarjz1uf15f0smyjlc.png";
  const project1Image3 = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748179307/fo4pnj5fgdk5u9bjh4eb.jpg";
  const project1Image2 = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748179308/gmvfksr9hf5iwmqqwikk.png";
  const project1Image1 = "https://res.cloudinary.com/dz7moyhci/image/upload/v1748284656/Screenshot_32_gbrszw.png";
  const projectImageArray = [project1Image1, project1Image2, project1Image3, project1Image4, project1Image5];
  const projectName = ["KNN Movie Rating Predictor", "Portfolio", "Mood Tracker", "Chatbot", "GoRest API Interface"];
  const projectUsedLang = [
    ["React", "JavaScript"],
    ["React", "JavaScript", "Cloudinary"],
    ["React", "JavaScript", "Local Storage"],
    ["React", "JavaScript", "Gemini Api"],
    ["React", "JavaScript", "GoRest Api"]
  ];
  const giturl = "https://github.com/yaswanthkillampalli/";
  const projectLink = [
    giturl + "movie-hit-flop",
    giturl + "personal-portfolio",
    giturl + "mood-tracker",
    giturl + "chat-bot",
    giturl + "gorest-api"
  ];

  // State for modal and counters
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectCount, setProjectCount] = useState(1);
  const [certificateCount, setCertificateCount] = useState(2);
  const [currentSection, setCurrentSection] = useState('About Me');
  const [state, handleSubmit] = useForm('mnnvqdnv');

  // Counter animation for projects and certificates
  useEffect(() => {
    const interval1 = setInterval(() => {
      setProjectCount((prev) => {
        if (prev >= projectName.length) {
          clearInterval(interval1);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    const interval2 = setInterval(() => {
      setCertificateCount((prev) => {
        if (prev >= certificateName.length) {
          clearInterval(interval2);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [projectName.length, certificateName.length]);

  // Scroll handler for navigation dropdown
  useEffect(() => {
    const sectionToTextMap = {
      sectionAbout: 'About Me',
      sectionEducationExperience: 'Education & Experience',
      sectionSkills: 'Skills',
      sectionProject: 'Projects',
      sectionCertificates: 'Certificates',
      sectionContact: 'Contact'
    };

    const handleScroll = () => {
      let current = '';
      for (const id in sectionToTextMap) {
        const section = document.getElementById(id);
        const rect = section?.getBoundingClientRect();
        if (rect?.top <= 100 && rect?.bottom >= 100) {
          current = id;
          break;
        }
      }
      if (current && sectionToTextMap[current]) {
        setCurrentSection(sectionToTextMap[current]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modal handlers
  const showCertificate = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <div id="sectionHome" style={{ height: '75px', position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1037, padding: '10px' }}>
        <nav className="navbar navbar-expand-lg navbar-settings my-auto mx-auto mt-2">
          <div className="container-fluid">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src={mainLogo} className="personal-logo" alt="Navbar Logo" />
            </a>
            <div className="dropdown">
              <a
                id="navigator"
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentSection}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#sectionAbout">About Me</a></li>
                <li><a className="dropdown-item" href="#sectionEducationExperience">Education & Experience</a></li>
                <li><a className="dropdown-item" href="#sectionSkills">Skills</a></li>
                <li><a className="dropdown-item" href="#sectionProject">Projects</a></li>
                <li><a className="dropdown-item" href="#sectionCertificates">Certificates</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#sectionContact">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div style={{ height: '10px', position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1031, backgroundImage: 'linear-gradient(to bottom, #D4D4D4, transparent)' }}></div>

      <div className="mt-5 d-sm show-md show-lg" style={{ height: '40px' }}></div>

      {/* About Section */}
      <div id="sectionAbout">
        <div className="container pb-3">
          <div className="row align-items-center justify-content-center">
            <div id="image-container" className="col-12 col-md-6 about-image-container">
              <div className="d-none show-md" style={{ height: '100px' }}></div>
              <img
                src={mainLogo}
                className="about-image-settings"
                alt="About"
              />
            </div>
            <div id="about-me" className="col-12 col-md-6 about-me-text-box">
              <h4><span style={{ color: '#0E0E55' }}>-</span> About Me</h4>
              <h1><span style={{ color: '#4747D4' }}>I am </span>Killampalli Yaswanth Vardhan</h1>
              <p style={{ color: '#4747D4' }}>
                A Student who is currently pursuing his B.Tech along with Several Courses
                and having interest in training and developing ML Models
              </p>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-4 d-flex flex-column">
                    <h1 id="counterProjects">{projectCount}</h1>
                    <p style={{ color: '#4747D4' }}>Projects Completed</p>
                  </div>
                  <div className="col-4 d-flex flex-column">
                    <h1 id="counterCertificate">{certificateCount}</h1>
                    <p style={{ color: '#4747D4' }}>Certifications</p>
                  </div>
                  <div className="col-4 d-flex flex-column">
                    <h1>1</h1>
                    <p style={{ color: '#4747D4' }}>Years of Experience</p>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-12 d-flex justify-content-center">
                    <button className="download-cv-button">
                      <a href="https://drive.google.com/uc?export=download&id=1T8lEg5kNJM6PTyCM4mto4CjPS1Ujg2EF" download="resume_yaswanthkillampalli.pdf">
                        Download CV
                      </a>
                    </button>
                  </div>
                  <div className="d-none col-8">
                    <h1 className="px-3 text-center m-0" style={{ fontFamily: "'Allura', cursive", fontWeight: 800 }}>
                      Yaswanth Killampalli
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education & Experience Section */}
      <div id="sectionEducationExperience">
        <div className="container pt-3">
          <div className="row">
            <div className="col-12">
              <h2 style={{ color: 'white' }} className="text-center main-headings">Education and Work Experience</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-5 col-lg-4 education-section">
              <div className="education-card">
                <div className="icon-title">
                  <div className="icon">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <h2>Education</h2>
                </div>
                <div className="edu-list">
                  <div className="edu-entry">
                    <p className="edu-years">2024 - 2028</p>
                    <h3 className="edu-school">NxtWave Technologies</h3>
                    <p className="edu-degree">Full-Stack Web Development</p>
                  </div>
                  <div className="edu-entry">
                    <p className="edu-years">2023 - 2027</p>
                    <h3 className="edu-school">Dhanekula Institute of Engineering of Technology</h3>
                    <p className="edu-degree">Bachelor of Technology</p>
                  </div>
                  <div className="edu-entry">
                    <p className="edu-years">2021 - 2023</p>
                    <h3 className="edu-school">Sri Chaitanya Junior College</h3>
                    <p className="edu-degree">Intermediate</p>
                  </div>
                  <div className="edu-entry">
                    <p className="edu-years">2020 - 2021</p>
                    <h3 className="edu-school">Aravinda High School</h3>
                    <p className="edu-degree">SSC</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-4 education-section">
              <div className="education-card">
                <div className="icon-title">
                  <div className="icon">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <h2>Work Experience</h2>
                </div>
                <div className="edu-list">
                  <div className="edu-entry">
                    <p className="edu-years">2025</p>
                    <h3 className="edu-school">Edunet Foundation (Internship)</h3>
                    <p className="edu-degree">Modern Web Applications with MERN Stack</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="sectionSkills">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="main-headings text-center">Skills</h2>
            </div>
          </div>
          <div id="skillsSection" className="row justify-content-center">
            {skillsArray.map((skill, index) => (
              <div key={index} className="col-4 col-md-2 col-lg-1 text-center">
                <img src={skill} className="skillLogoSettings" alt={skillValues[index]} />
                <h1>{skillValues[index]}</h1>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12">
              <h2 className="text-center main-headings pt-3">Technologies Using</h2>
            </div>
          </div>
          <div id="techSection" className="row justify-content-center">
            {techUsedArray.map((tech, index) => (
              <div key={index} className="col-4 col-md-2 col-lg-1 text-center">
                <img src={tech} className="skillLogoSettings" alt={techValues[index]} />
                <h1>{techValues[index]}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="sectionProject">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 style={{ color: 'white' }} className="main-headings pt-3">Projects</h1>
            </div>
          </div>
          <div id="projects" className="row">
            {projectImageArray.map((image, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card">
                  <img src={image} className="card-image" alt={projectName[index]} />
                  <div className="card-tags">
                    {projectUsedLang[index]?.map((lang, langIndex) => (
                      <span key={langIndex} className="tag">{lang}</span>
                    ))}
                  </div>
                  <div className="card-content">
                    <h1>{projectName[index]}</h1>
                  </div>
                  <div className="card-action">
                    <a href={projectLink[index]} target="_blank" rel="noopener noreferrer">
                      <button>
                        <i className="fa-solid fa-paper-plane"></i>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div id="sectionCertificates">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="main-headings pb-3">Certificates</h1>
            </div>
          </div>
          <div id="certificates" className="row">
            {certificateName.map((name, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="certificate-card">
                  <h1 className="certificate-title">{name}</h1>
                  <div className="certificate-provider">
                    Certificate of Completion from <span>{certificateFrom[index]}</span>
                  </div>
                  <button className="certificate-button" onClick={() => showCertificate(certificateLinks[index])}>
                    Show Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {isModalOpen && (
        <div id="certificateModal" className="custom-modal">
          <span className="close-btn" onClick={closeModal}>×</span>
          <img id="certificateImage" src={modalImage} alt="Certificate" />
        </div>
      )}

      {/* Contact Section */}
      <div id="sectionContact">
        <div className="container">
          <div className="row justify-content-center py-5">
            <div className="col-md-8 col-lg-6">
              <h2 style={{ color: 'white' }} className="mb-4 text-center main-headings">
                Let's Discuss Our Next Project
              </h2>
              {state.succeeded ? (
                <div className="text-center text-success">
                  <p className='text-white'>Thank you for your message! I'll get back to you soon.</p>
                </div>
              ) : (
                <form id="contactForm" onSubmit={handleSubmit} className="contact-form border p-4 rounded bg-light shadow-sm">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="+91 9876543210"
                      required
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      required
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Type your message here..."
                      required
                    ></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="contact-button" disabled={state.submitting}>
                      {state.submitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                </form>
              )}
              <div className="text-center mt-4 social-icons">
                <a
                  href="https://linkedin.com/in/yaswanthvardhankillampalli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="me-3"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://wa.me/7207100712" target="_blank" rel="noopener noreferrer" className="me-3">
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <a className='d-none' href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-discord"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;