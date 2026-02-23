import { ClickableImage } from '@/components/ClickableImage';
import { HomelabNetworkDiagram } from '@/components/HomelabNetworkDiagram';
import type { ProjectDetailData } from '@/data/projectDetails';

interface HomelabContentProps {
  data: ProjectDetailData;
}

export function HomelabContent(_props: HomelabContentProps) {
  return (
    <>
      <section className="border-t border-border pt-6 first:border-t-0 first:pt-0">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          OVERVIEW & TABLE OF CONTENTS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-6 items-start">
          <p className="text-sm text-muted-foreground">
            The following sections walk through my homelab setup—hardware, OS and runtimes, services, and a network diagram.
            <br />
            <br />
            Use the table of contents to jump to any section.
            <br />
            <br />
            If you want to see the docker-compose.yml file I created to deploy all of my services, you can find it <a href="https://github.com/JzJoker/homelab/blob/main/docker-compose.yaml" className="text-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
          <nav
            aria-label="Table of contents"
            className="rounded-lg border border-border bg-muted/30 p-4 text-sm lg:sticky lg:top-4"
          >
            <p className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-3">
              On this page
            </p>
            <ul className="list-none p-0 m-0 space-y-0">
              <li>
                <a href="#hardware" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Hardware
                </a>
              </li>
              <li>
                <a href="#operating-system-runtimes" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Operating System & Runtimes
                </a>
              </li>
              <li>
                <a href="#services-containers" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Services / Containers
                </a>
              </li>
              <li>
                <a href="#homelab-network-diagram" className="block py-1.5 px-2 -mx-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors no-underline">
                  Homelab — Network Diagram
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section id="hardware" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          HARDWARE
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-8 items-start">
          <div className="flex flex-col gap-2">
          <ClickableImage
           src="/images/dell-micro.svg" alt="Hardware Screenshot" className="w-full h-auto rounded-lg border border-border" 
           />
           <p className="text-sm text-muted-foreground">
            Image drawn by me in Figma. 🙂
           </p>

          </div>
          <p className="text-sm text-muted-foreground">
          My homelab currently consists of a a Dell Optiplex Micro with Ubuntu Server as the host OS. 
          The Micro is a machine I got from work that was being retired and I thought it would be a good fit for a home server since it was compact and drew very little power.
          <br />
          <br />
          It has an Intel Core i7-8700, 8GB of RAM and a 100GB SSD. This is by no means a high-end machine, but it is more than enough for my needs. At idle, the machine draws about 10W of power which is a huge plus.
          <br />
          <br />
          I do have plans to upgrade RAM and increase storage in the future though.
          This would allow me to run more services and possibly even add virtualization in the future or self host some sort of streaming service for my family.
        </p>
        </div>
        
      </section>
      <section id="operating-system-runtimes" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          OPERATING SYSTEM & RUNTIMES
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-8 items-start">
          <p className="text-sm text-muted-foreground">
            The host OS is Ubuntu Server 24.04. I chose Ubuntu because it is a stable and reliable OS that is easy to manage and configure.
            Ubuntu Server is also a natural fit given its widepread use in AWS, where I'm looking to deepen my expertise.
            <br />
            <br />
            As for runtimes, I'm using Docker to containerize my services.
            Docker is a great way to isolate services and make them easy to manage and deploy. Having isolated services also provides a good layer of security, preventing compromised containers from affecting the host OS.
            <br />
            <br />
            In addition to Docker, I'm also using Tailscale for network isolation and encryption. Tailscale is a very popular VPN solution that allows me to connect to my server from anywhere in the world.
            Since I am running Pi-Hole for DNS level ad blocking, using Tailscale also allows me to block ads and trackers on all of my devices, not just my home network.
          </p>
          <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center gap-3 py-2 border-b border-border">
              <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-2xl" title="Ubuntu">
                🐧
              </div>
              <div>
                <div className="text-sm font-medium tracking-wide text-foreground">Ubuntu Server</div>
                <div className="text-xs text-muted-foreground tracking-wider">Host OS</div>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2 border-b border-border">
              <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-2xl" title="Docker">
                🐋
              </div>
              <div>
                <div className="text-sm font-medium tracking-wide text-foreground">Docker</div>
                <div className="text-xs text-muted-foreground tracking-wider">Container runtime</div>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2">
              <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center text-2xl" title="Tailscale">
                🔒
              </div>
              <div>
                <div className="text-sm font-medium tracking-wide text-foreground">Tailscale</div>
                <div className="text-xs text-muted-foreground tracking-wider">VPN • WireGuard</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="services-containers" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          SERVICES/CONTAINERS
        </h2>
        <p className="text-sm text-muted-foreground">
          I am currently running numerous services and containers on my homelab. I plan to add a lot more in the future, but for now, here is what I have:
          <br />
          <br />
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Pi-Hole - As mentioned above, Pi-Hole is a DNS level ad blocker that I use to block ads and trackers on all of my devices.</li>
            <li>Bitwarden - A password manager that I use to store and manage my passwords. Requires tailscale to access the Bitwarden server.</li>
            <li>Uptime Kuma - An uptime monitoring service that I use to monitor the uptime of various services.</li>
            <li>OpenClaw - A self hosted AI agent that I use to help me with various tasks. Went super viral and wanted to try it out for myself.</li>
            <li>Netdata - A monitoring service that I use to monitor the performance of my services.</li>
            <li>Homepage - A simple homepage that I use to display my services and containers.</li>
            <li>Portainer - A container management tool that I use to manage my containers.</li>
          </ul>
          <br />
          <br />
          Some services that I plan to add in the future include Duplicati for backups, Jellyfin for streaming, and Watchtower for automatic container updates.
        </p>
      </section>
      <section id="homepage" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          HOMEPAGE
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-8 items-start">
          <ClickableImage src="/images/screenshots/homelab-homepage.png" alt="Homepage Screenshot" className="w-full h-auto rounded-lg border border-border" />
          <p className="text-sm text-muted-foreground">
            To see quick visual overviews of my server, I'm running a simple homepage to display my services and containers. Each service has a card with a logo, name, and a link to the service.
            <br />
            <br />
            The homepage is hosted on my server and is accessible via Tailscale. You can find the code for the homepage <a href="https://github.com/JzJoker/homelab/tree/main/homepage" className="text-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
        </div>
        
      </section>
      <section id="homelab-network-diagram" className="border-t border-border pt-6 first:border-t-0 first:pt-0 scroll-mt-4">
        <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
          HOMELAB — NETWORK DIAGRAM
        </h2>
        <p className="text-sm text-muted-foreground">
          For a more granular view of my server setup, I've created a network diagram below with the services and containers I am running, how they are connected, and even the ports they are running on.
          <br />
          <br />
        </p>
        <div className="bento-card bg-card border border-border rounded-xl p-5 overflow-x-auto">
          <HomelabNetworkDiagram />
        </div>
      </section>
      
    </>
  );
}
