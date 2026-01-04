import Aurora from '../components/Aurora';
import CardSwap, { Card } from '../components/CardSwap/CardSwap';
import { Circle, Sliders, Code } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-black">
      <main>
          {/* Top Nav */}
          <nav className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50 bg-black/20 backdrop-blur-sm">
            <div className="text-white font-bold text-xl">JUSTIN ZHAO</div>
          </nav>

          {/* First Section */}
          <div className="relative w-full h-screen overflow-hidden">
            {/* Aurora Background */}
            <div className="absolute inset-0 w-full h-full bg-black">
              <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={1}
              />
            </div>
            {/* Centered Text */}
            <div className="relative z-10 flex w-full h-full items-center justify-center">
              <h2 className="font-bold text-4xl text-center text-white">
                Hi, I'm Justin! <br /><br />
                I CODE, DESIGN, AND BUILD
              </h2>
            </div>
          </div>
            
          {/* Projects View */}
          <div className="relative w-full min-h-screen bg-black flex items-center justify-center px-8 py-20 overflow-hidden">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text */}
              <div className="text-left space-y-4 z-10">
                <h2 className="font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
                  Checkout my projects
                </h2>
                <p className="text-gray-400 text-xl md:text-2xl">
                  Hover over the cards to see more details about each project.
                </p>
              </div>

              {/* Right Side - Cards */}
              <div className="relative h-full w-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  <CardSwap
                    cardDistance={100}
                    verticalDistance={75}
                    skewAmount={7}
                    easing="elastic"
                  >
                  <Card className="p-8 flex flex-col items-start justify-center">
                    <Circle className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-white text-2xl font-semibold">Proj 1</h3>
                  </Card>
                  <Card className="p-8 flex flex-col items-start justify-center">
                    <Sliders className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-white text-2xl font-semibold">Proj 2</h3>
                  </Card>
                  <Card className="p-8 flex flex-col items-start justify-center overflow-hidden relative">
                    <div className="relative z-10">
                      <Code className="w-8 h-8 text-white mb-4" />
                      <h3 className="text-white text-2xl font-semibold">Proj 3</h3>
                    </div>
                  </Card>
                  </CardSwap>
                </div>
              </div>
            </div>
          </div>
        
      </main>
    </div>
  );
}