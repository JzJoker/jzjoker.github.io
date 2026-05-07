import { useEffect, useState } from 'react';
import type { RoomId } from '../components/rooms/RoomCanvas';

const CACHE_KEY = 'calendarRoom';

export function getCachedRoom(): RoomId | null {
  try {
    return (sessionStorage.getItem(CACHE_KEY) as RoomId | null) ?? null;
  } catch {
    return null;
  }
}

function setCached(room: RoomId) {
  try {
    sessionStorage.setItem(CACHE_KEY, room);
  } catch {}
}

export function useCalendarRoom(): RoomId | null {
  const [room, setRoom] = useState<RoomId | null>(getCachedRoom);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('/api/calendar');
        if (!res.ok) return;
        const data = await res.json() as { room: RoomId };
        if (data.room) {
          setCached(data.room);
          setRoom(data.room);
        }
      } catch {
        // silently ignore — network errors, missing env vars in dev, etc.
      }
    };

    check();
    const interval = setInterval(check, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return room;
}
