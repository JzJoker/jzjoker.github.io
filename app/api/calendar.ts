import type { VercelRequest, VercelResponse } from '@vercel/node';

const CALENDAR_ROOM_MAP: Record<string, string> = {
  Classes: 'classroom',
  Work: 'office',
  Cafe: 'cafe',
};

const DEFAULT_ROOM = 'bedroom';

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    return res.json({ room: DEFAULT_ROOM });
  }

  const debug = req.query.debug === '1';

  try {
    const token = await getAccessToken();
    const authHeader = { Authorization: `Bearer ${token}` };

    // Fetch calendar list
    const listRes = await fetch(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      { headers: authHeader },
    );
    const listData = await listRes.json() as { items: { id: string; summary: string }[] };

    const now = new Date();
    // timeMin filters on event END (must end after now = still ongoing)
    // timeMax filters on event START (must start before now = already started)
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + 1000).toISOString(); // 1s future

    if (debug) {
      return res.json({
        calendars: listData.items?.map((c) => c.summary),
        now: now.toISOString(),
        timeMin,
        timeMax,
      });
    }

    // Check each mapped calendar for a current event
    for (const [calName, roomId] of Object.entries(CALENDAR_ROOM_MAP)) {
      const cal = listData.items?.find((c) => c.summary.toLowerCase() === calName.toLowerCase());
      if (!cal) continue;

      const eventsRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal.id)}/events?` +
          new URLSearchParams({
            singleEvents: 'true',
            orderBy: 'startTime',
            timeMin,
            timeMax,
            maxResults: '1',
          }),
        { headers: authHeader },
      );
      const eventsData = await eventsRes.json() as { items: unknown[] };

      if (eventsData.items?.length > 0) {
        return res.json({ room: roomId });
      }
    }

    return res.json({ room: DEFAULT_ROOM });
  } catch (e) {
    return res.json({ room: DEFAULT_ROOM, error: String(e) });
  }
}
