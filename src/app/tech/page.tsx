
import Meteors from '../components/Meteor';
import Nvabar from '../components/Nvabar';
import Main from '../components/Main';
import Experienceection from '../components/Experienceection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Left from '../components/Left';

const page = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Meteors should be just below navbar */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Meteors number={25} />
      </div>

      {/* Navbar stays on top */}
      <div className="relative z-30">
        <Nvabar />
      </div>
      <Left/>

      {/* Main content below meteors */}
      <div className="relative z-10 text-white p-10">
        <Main />
        <ProjectsSection />
        <Experienceection />
        <ContactSection />
      </div>
    </div>
  
  )
}

export default page