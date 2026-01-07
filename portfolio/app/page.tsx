import { Circle, Code } from 'lucide-react';
import { FaAws, FaReact, FaPython, FaDocker, FaGitAlt, FaJs } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { Luxurious_Script } from 'next/font/google';

const luxuriousScript = Luxurious_Script({
  subsets: ['latin'],
  weight: '400',
});
export default function Home() {
  return (
    <main className="max-w-1080 font-family-inter">
      {/* First Section */}
      <div className="p-30 pb-0 relative h-screen overflow-hidden">
        {/* Nav Bar */}
        <nav className="pl-30 pr-30 absolute top-0 left-0 w-full p-4 flex justify-between gap-4 z-10">
          <button className=" hover:text-gray-400 cursor-pointer flex font-semibold">
            <Circle size={24} fill='black'/>
            <h2 className="pl-2.5">Justin</h2>
          </button>
          {/* Links */}
          <div>
            <a href="#biography" className="mx-4 hover:text-gray-400">
              Biography
            </a>
            <a href="#experiences" className="mx-4 hover:text-gray-400">
              Experiences
            </a>
            <a href="#works" className="mx-4 hover:text-gray-400">
              Works
            </a>
          </div>
          <button className=" hover:text-gray-400 border-1 border-gray pt-2.5 pb-2.5 pl-5 pr-5 rounded-full cursor-pointer">
            Contact
          </button>
        </nav>
      
        {/* Splash Section */}
        <div className="flex justify-between items-center w-full h-full flex flex-col">
          <div className="flex flex-row h-full justify-between">
            <div className="bg-none color-none grid grid-rows-5 grid-cols-5 justify-items-center items-center w-[80%] h-full">
              <div className="icon-container icon-rotate-1"><FaReact size={40} color="#61DAFB" /></div>
              <div className="icon-container col-start-3 margin-auto icon-rotate-2"><FaAws size={40} color="black" /></div>
              <div className="icon-container col-start-5 icon-rotate-3"><FaPython size={40} color="#3776AB" /></div>
              <div className="text-8xl  row-span-3 col-span-3 text-center">
              <span className={`text-[200px] ${luxuriousScript.className}`}>J</span>
              <span className="font-poppins italic tracking-tighter">ustin </span> 
              <span className={`text-[200px] ${luxuriousScript.className}`}>Z</span>
              <span className="font-poppins italic tracking-tighter">hao</span>
              </div>
              <div className="icon-container row-start-3 col-start-5 icon-rotate-4"><FaDocker size={40} color="#29A2BF" /></div>
              <div className="icon-container row-start-3 icon-rotate-5"><FaGitAlt size={40} color="#EB4D28" /></div>
              <div className="icon-container row-start-5 col-start-5 icon-rotate-6"><FaJs size={40} color="#F0DB4E" /></div>
              <div className="icon-container row-start-5 col-start-3 icon-rotate-7"><SiNextdotjs size={40} color="black" /></div>
              <div className="icon-container row-start-5 bg-black icon-rotate-8"><FaReact size={40} color="white" /></div>
            </div>  
            <div className="w-[17.5%] text-right h-full flex flex-col justify-between">
              <img className="w-full rounded-lg" src={"/images/image0.jpg"}></img>
              <p className='text-right font-semibold'>
                Hi, I'm <span className="text-blue-500">Justin</span>,<br />
                A <span className="text-green-500">Full Stack Developer</span><br />
                Based In<br />
                <span className="text-gray-500">New York City</span>
              </p>
            </div>
          </div>
          <div className="w-full pt-30 pb-10 flex flex-row justify-between">
            <div className="flex items-center border-1 border-color-gray pr-5 pl-5 pt-2.5 pb-2.5 rounded-full">
              <div
                className="w-2.5 h-2.5 bg-[#62FF00] rounded-full mr-2"
                style={{ filter: "blur(2.5px)" }}
              />
              <div className="pl-2.5">
                Open to Work
              </div>
            </div>              
            <div>Current Project: UX Interviewer</div>
          </div>
        </div>
        
      </div>
    </main>
  );
}