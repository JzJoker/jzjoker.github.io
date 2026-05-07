import { useEffect, useState } from 'react';
import type { RoomId } from '../components/rooms/RoomCanvas';

export function useCalendarRoom(): RoomId | null {
  const [room, setRoom] = useState<RoomId | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('/api/calendar');
        if (!res.ok) return;
        const data = await res.json() as { room: RoomId };
        if (data.room) setRoom(data.room);
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
