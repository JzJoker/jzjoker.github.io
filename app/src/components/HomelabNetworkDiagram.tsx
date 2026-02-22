export function HomelabNetworkDiagram() {
  const clients = [
    { icon: '💻', name: 'MACBOOK', os: 'MACOS' },
    { icon: '🖥️', name: 'DESKTOP', os: 'WINDOWS' },
    { icon: '📱', name: 'MOBILE', os: 'IOS / ANDROID' },
  ];

  const hostChips = [
    { name: '🐧 UBUNTU 24.04', sub: 'HOST OS' },
    { name: '🐋 DOCKER', sub: 'CONTAINER RUNTIME' },
    { name: '🛡️ FAIL2BAN', sub: 'INTRUSION PREVENTION' },
    { name: '🐳 PORTAINER', sub: 'CONTAINER MGMT' },
  ];

  const containers = [
    { icon: '🍓', name: 'PI-HOLE', port: ':53', tag: 'DNS', new: false },
    { icon: '🔀', name: 'NGINX PM', port: ':80 :443', tag: 'REVERSE PROXY', new: true },
    { icon: '🛡️', name: 'BITWARDEN', port: ':8080', tag: 'PASSWORDS', new: false },
    { icon: '🟢', name: 'UPTIME KUMA', port: ':3001', tag: 'UPTIME MON.', new: true },
    { icon: '🦀', name: 'OPENCLAW', port: ':APP', tag: 'APP', new: false },
    { icon: '📊', name: 'NETDATA', port: ':19999', tag: 'METRICS', new: false },
  ];

  return (
    <div className="font-mono overflow-x-auto">
      <div className="flex items-stretch min-w-max">
        {/* Clients */}
        <div className="bg-card border border-border rounded-l-xl p-6 w-[200px] flex-shrink-0 flex flex-col">
          <div className="text-xl font-bold tracking-wide mb-1.5 text-foreground">CLIENTS</div>
          <div className="text-sm tracking-wider text-muted-foreground mb-5">
            REMOTE DEVICES • TAILSCALE NODES
          </div>
          {clients.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2.5 py-2 border-b border-border last:border-b-0"
            >
              <div className="w-9 h-9 border border-border rounded-md flex items-center justify-center text-base flex-shrink-0">
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm tracking-wide text-foreground">{c.name}</div>
                <div className="text-xs tracking-wide text-muted-foreground mt-0.5">{c.os}</div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/50 flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Connector VPN MESH */}
        <div className="w-[52px] flex-shrink-0 flex flex-col items-center justify-center gap-1.5 bg-card border-y border-l border-border">
          <span className="text-base text-muted-foreground">→</span>
          <span className="text-xs tracking-[0.12em] text-muted-foreground/80 [writing-mode:vertical-rl] rotate-180">
            VPN MESH
          </span>
        </div>

        {/* Tailscale */}
        <div className="w-[150px] flex-shrink-0 bg-card border-y border-border flex flex-col justify-center items-start px-6 py-4">
          <div className="text-xl font-bold tracking-wide mb-1.5 text-foreground">TAILSCALE</div>
          <div className="text-sm tracking-wider text-muted-foreground mb-2.5">E2E ENCRYPTED</div>
          <span className="text-4xl mb-2.5 block">🔒</span>
          <span className="inline-block border border-border text-xs tracking-[0.12em] px-1.5 py-0.5 text-muted-foreground">
            WIREGUARD®
          </span>
        </div>

        {/* Connector LAN */}
        <div className="w-[52px] flex-shrink-0 flex flex-col items-center justify-center gap-1.5 bg-card border-y border-border">
          <span className="text-base text-muted-foreground">→</span>
          <span className="text-xs tracking-[0.12em] text-muted-foreground/80 [writing-mode:vertical-rl] rotate-180">
            LAN
          </span>
        </div>

        {/* Server + Containers */}
        <div className="bg-card border border-border rounded-r-xl border-l-0 p-6 flex-1 flex flex-col min-w-[500px]">
          <div className="mb-1.5">
            <div className="text-xl font-bold tracking-wide mb-1.5 text-foreground">HOMELAB</div>
            <div className="text-sm tracking-wider text-muted-foreground mb-5">
              SELF-HOSTED SANDBOX ENVIRONMENT • UBUNTU SERVER | DOCKER
            </div>
          </div>

          <div className="flex gap-4 flex-1">
            {/* Host column */}
            <div className="flex flex-col gap-1.5 w-[115px] flex-shrink-0">
              {hostChips.map((h) => (
                <div
                  key={h.name}
                  className="border border-border rounded-md px-2.5 py-2"
                >
                  <div className="text-sm tracking-wide text-foreground/90 mb-0.5">{h.name}</div>
                  <div className="text-xs tracking-wide text-muted-foreground">{h.sub}</div>
                </div>
              ))}
            </div>

            <div className="w-px bg-border self-stretch flex-shrink-0" />

            {/* Containers */}
            <div className="flex-1 min-w-0">
              <div className="text-sm tracking-[0.2em] text-muted-foreground mb-3 pb-2 border-b border-border">
                DOCKER CONTAINERS
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {containers.map((c) => (
                  <div
                    key={c.name}
                    className="border border-border rounded-lg px-2 py-2.5 flex flex-col gap-0.5 relative cursor-default transition-colors hover:border-muted-foreground/30 hover:bg-muted/20"
                  >
                    {c.new && (
                      <span className="absolute top-1 right-1 text-xs tracking-wide border border-border text-muted-foreground px-1 py-0.5">
                        NEW
                      </span>
                    )}
                    <div className="text-lg mb-0.5">{c.icon}</div>
                    <div className="text-sm font-bold tracking-wide text-foreground">{c.name}</div>
                    <div className="text-xs tracking-wide text-muted-foreground">{c.port}</div>
                    <span className="text-xs tracking-wider border border-border text-muted-foreground px-1 py-0.5 rounded-sm mt-0.5 w-fit">
                      {c.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-border text-sm tracking-[0.12em] text-muted-foreground">
            // ALL TRAFFIC ENCRYPTED VIA WIREGUARD TUNNEL
          </div>
        </div>
      </div>
    </div>
  );
}
