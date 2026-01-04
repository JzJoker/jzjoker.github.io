import Image from "next/image";
import Aurora from '../components/Aurora';

export default function Home() {
  return (
    <div>
      <main>
        <div className= "relative w-screen h-screen overflow-hidden">
          {/* Aurora Background */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <Aurora
              colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
          {/* Centered Tet */}
          <div className="flex w-full h-full items-center justify-center">
            <h2 className="m-auto text-4xl text-center w-full ">Hi, I'm Justin Zhao</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
