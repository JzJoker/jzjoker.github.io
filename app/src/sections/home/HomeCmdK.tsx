import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface CmdKItem {
  section: string;
  icon: string;
  label: string;
  shortcut: string;
  action: 'scroll' | 'navigate' | 'mailto' | 'extlink' | 'easter';
  target?: string;
}

const cmdkItems: CmdKItem[] = [
  { section: 'Navigate', icon: '→', label: 'Selected work',    shortcut: 'g w', action: 'scroll',    target: '#work' },
  { section: 'Navigate', icon: '→', label: 'Experience',       shortcut: 'g e', action: 'scroll',    target: '#experience' },
  { section: 'Navigate', icon: '→', label: 'Stack',            shortcut: 'g s', action: 'scroll',    target: '#stack' },
  { section: 'Navigate', icon: '→', label: 'About',            shortcut: 'g a', action: 'scroll',    target: '#about' },
  { section: 'Navigate', icon: '→', label: 'Contact',          shortcut: 'g c', action: 'scroll',    target: '#contact' },
  { section: 'Navigate', icon: '◻', label: 'All projects',     shortcut: 'g p', action: 'navigate',  target: '/projects' },
  { section: 'Actions',  icon: '✉', label: 'Email Justin',     shortcut: '⌘ E', action: 'mailto',    target: 'hello@justinzhao.dev' },
  { section: 'Actions',  icon: '↗', label: 'Open GitHub',      shortcut: '⌘ G', action: 'extlink',   target: 'https://github.com/JzJoker' },
  { section: 'Actions',  icon: '↗', label: 'Open LinkedIn',    shortcut: '⌘ L', action: 'extlink',   target: 'https://linkedin.com/in/justinzhao1' },
  { section: 'Actions',  icon: '↗', label: 'Open Devpost',     shortcut: '⌘ D', action: 'extlink',   target: 'https://devpost.com/JzJoker' },
  { section: 'Easter eggs', icon: '☕', label: 'Pour me a coffee',             shortcut: 'easter', action: 'easter', target: 'coffee' },
  { section: 'Easter eggs', icon: '🎵', label: "What I'm listening to",       shortcut: 'easter', action: 'easter', target: 'music' },
  { section: 'Easter eggs', icon: '⚡', label: 'sudo make me a sandwich',     shortcut: 'easter', action: 'easter', target: 'sandwich' },
];

interface HomeCmdKProps {
  open: boolean;
  onClose: () => void;
}

export function HomeCmdK({ open, onClose }: HomeCmdKProps) {
  const [q, setQ] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQ('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const lc = q.toLowerCase();
    if (!lc) return cmdkItems;
    return cmdkItems.filter(it => it.label.toLowerCase().includes(lc));
  }, [q]);

  useEffect(() => { setActiveIdx(0); }, [q]);

  const grouped = useMemo(() => {
    const out: Record<string, CmdKItem[]> = {};
    filtered.forEach(it => {
      out[it.section] = out[it.section] || [];
      out[it.section].push(it);
    });
    return out;
  }, [filtered]);

  const runItem = (it: CmdKItem) => {
    if (it.action === 'scroll' && it.target) {
      const el = document.querySelector(it.target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (it.action === 'navigate' && it.target) {
      navigate(it.target);
    } else if (it.action === 'mailto' && it.target) {
      window.location.href = `mailto:${it.target}`;
    } else if (it.action === 'extlink' && it.target) {
      window.open(it.target, '_blank', 'noopener');
    } else if (it.action === 'easter') {
      const messages: Record<string, string> = {
        coffee:   '☕ Pouring you a virtual oat-milk latte. (medium roast, no sugar)',
        music:    '🎵 Currently in heavy rotation: Khruangbin · Mac DeMarco · Yves Tumor',
        sandwich: '$ sudo make me a sandwich\n→ Permission denied (and also: I am a webpage)',
      };
      setToast(messages[it.target ?? ''] ?? '');
      setTimeout(() => setToast(''), 3500);
    }
    onClose();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIdx]) runItem(filtered[activeIdx]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let runningIdx = -1;

  return (
    <>
      <div
        className={`pf-cmdk-overlay${open ? ' open' : ''}`}
        onClick={onClose}
      >
        <div className="pf-cmdk" onClick={e => e.stopPropagation()}>
          <div className="pf-cmdk-input-wrap">
            <span className="pf-cmdk-prompt">~</span>
            <input
              ref={inputRef}
              className="pf-cmdk-input"
              placeholder="Type a command or search..."
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={handleKey}
            />
            <span className="pf-cmdk-esc">ESC</span>
          </div>
          <div className="pf-cmdk-list">
            {Object.keys(grouped).length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--fg-3)', fontSize: '12px' }}>
                No matches. Try "work", "email", or "coffee".
              </div>
            )}
            {Object.entries(grouped).map(([sec, items]) => (
              <div key={sec}>
                <div className="pf-cmdk-section">{sec}</div>
                {items.map(it => {
                  runningIdx += 1;
                  const idx = runningIdx;
                  return (
                    <div
                      key={it.label}
                      className={`pf-cmdk-item${idx === activeIdx ? ' active' : ''}`}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onClick={() => runItem(it)}
                    >
                      <span className="pf-cmdk-item-icon">{it.icon}</span>
                      <span>{it.label}</span>
                      <span className="pf-cmdk-item-shortcut">{it.shortcut}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="pf-cmdk-footer">
            <span><kbd>↑↓</kbd>navigate</span>
            <span><kbd>↵</kbd>select</span>
            <span><kbd>esc</kbd>close</span>
            <span style={{ marginLeft: 'auto' }}>{filtered.length} commands</span>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: '6px',
          padding: '14px 20px', fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--fg)',
          zIndex: 300, whiteSpace: 'pre-line', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
          maxWidth: '90vw',
        }}>
          {toast}
        </div>
      )}
    </>
  );
}
