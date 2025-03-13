import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const count = await kv.get('vamo_dale') || 0;
        return res.json({ count });
    }

    if (req.method === 'POST') {
        const newCount = (await kv.get('vamo_dale') || 0) + 1;
        await kv.set('vamo_dale', newCount);
        return res.json({ count: newCount });
    }

    res.status(405).end();
}
