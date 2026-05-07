import { useEffect, useState } from 'react';
import type { RoomId } from '../components/rooms/RoomCanvas';

const FALLBACK_DELAY = 3000; // show bedroom if API hasn't responded in 3s

export function useCalendarRoom(): RoomId | null {
  const [room, setRoom] = useState<RoomId | null>(null);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch('/api/calendar');
        if (!res.ok) return;
        const data = await res.json() as { room: RoomId };
        if (!cancelled && data.room) setRoom(data.room);
      } catch {
        // silently ignore
      }
    };

    // Fall back to bedroom after timeout if API hasn't responded
    const fallback = setTimeout(() => {
      setRoom((current) => current ?? 'bedroom');
    }, FALLBACK_DELAY);

    check();
    const interval = setInterval(check, 5 * 60 * 1000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      clearInterval(interval);
    };
  }, []);

  return room;
}
