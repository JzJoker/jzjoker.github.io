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
        <nav className="pl-20 pr-20 absolute top-0 left-0 w-full p-4 flex justify-between gap-4 z-10">
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
            <div>Current Project: <a href='#interviewer' className='underline'>UX Interviewer</a></div>
          </div>
        </div>
      </div>


      {/* Works */}
      <div id='works' className='p-20 pb-0 relative'>

        {/* UX Interviewer */}
        <div id='interviewer' className="grid grid-rows-4 grid-cols-6 h-full w-full gap-5 h-screen">
          <div className="row-span-2 col-span-3 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className='text-3xl font-poppins tracking-tighter mb-5 font-semibold pt-5'>UX Interviewer</h2>
              <p className='mr-30 font-light'>There are many interview prep resources for software engineers out there on the web—the most notorious being LeetCode; however, while software engineers can practice active recall for technical interiviews doing DSA problems, there is no real way to practice retrieval of UI/UX design principles in preperation for design interviews. So we decided to make it. The First Structured Interview Prep Platform for UI/UX Design.</p>
            </div>
            <a href="" className='underline text-lg underline-offset-6'>Visit Case Study</a>
          </div>
          <div className="row-span-1 col-span-3  shadow-md border-1 border-gray"> <img src="/images/ux-interviewer/uxinterviewerbanner.png" alt="" /></div>
          <div className="row-span-2 col-span-2 shadow-md border-1 border-gray"><img src="/images/ux-interviewer/home.png" alt="" className="w-full h-full object-cover " /></div>
          <div className="row-span-2 col-span-1 pb-10"><img src="/images/ux-interviewer/whiteboard.png" alt="" className="w-full h-full shadow-md object-cover object-[10%]" /></div>
          <div className="row-span-2 col-span-2 shadow-md"><img src="/images/ux-interviewer/stats.png" alt="" className="w-full h-full object-cover " /></div>
          <div className="row-span-1 col-span-1 rounded-lg shadow-md"><img src="/images/ux-interviewer/speech.png" alt="" className="object-cover w-full h-full " /></div>
          <div className="row-span-2 col-span-2 pb-10 pr-10"><img src="/images/ux-interviewer/home.png" alt="" className="w-full h-full shadow-md object-cover object-top" /></div>
          <div className='col-span-2 bg-[#F0F0F0] -ml-10 p-5 h-fit'>
            <div className='font-semibold '>Quick Links</div>
            <ul className='list-none'>
              <li className='my-1'><a href="" className='underline underline-offset-6 decoration-gray-500 font-light'>Case Study</a></li>
              <li className='my-1'><a href="" className='underline underline-offset-6 decoration-gray-500 font-light'>GitHub Repo</a></li>
              <li className='my-1'><a href="" className='underline underline-offset-6 decoration-gray-500 font-light'>Live Demo</a></li>
            </ul>
          </div>
        </div>

        {/* Writely */}
        <div className="grid grid-rows-5 grid-cols-6 h-full w-full gap-2 pt-10 h-screen">
          {/* Box 1 */}
          <div className="row-span-3 col-span-3 rounded-lg flex flex-col justify-between">
            <div>
              <h2 className='text-3xl font-poppins tracking-tighter mb-5'>Writely</h2>
              <p className='mr-30'>WriteAI is an AI-powered collaborative writing platform designed to enhance productivity, creativity, and research-backed writing. Users can create and edit rich-text documents in a Slate.js-based editor, where AI assists with autocomplete, sentence generation, and evidence citation. The platform learns the user's writing style by embedding uploaded documents into a vector database using OpenAI's text-embedding-3-small model. These embeddings are stored in an Aurora PostgreSQL database with pgvector support, enabling similarity searches for real-time AI suggestions.</p>
            </div>
            <a href="" className='underline'>Visit Case Study</a>
          </div>
          
          {/* Box 2 */}
          <div className="bg-blue-500 row-span-1 col-span-3 rounded-lg shadow-md"></div>
          
          {/* Box 3 */}
          <div className="bg-green-500 row-span-2 col-span-1 rounded-lg shadow-md"></div>
          
          {/* Box 4 */}
          <div className="bg-yellow-500 row-span-2 col-span-2 rounded-lg shadow-md"></div>
          
        </div>

      </div>
    </main>
  );
}