
import Meteors from '../components/Meteor';
import Nvabar from '../components/Nvabar';
import Main from '../components/Main';
import Experienceection from '../components/Experienceection';

const page = () => {
  return (
    <div className="relative min-h-screen">
      <Meteors number={25} />
      <Nvabar/>
      <div className="relative z-10 text-white p-10">
    <Main/>
    <Experienceection/>
    </div>
    </div>
  )
}

export default page