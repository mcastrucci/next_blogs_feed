import { create } from '../../services/airtable'

export default async (req, res) => {
    if (!req.method === 'POST') {
        res.status(405).end() //Method Not Allowed
        return
    }
    const { name, email, blogurl, feedurl, notes } = req.body;

    let err = await create(name, email, blogurl, feedurl, notes);

    console.log(err)
    if (err) {
        res.status(500).end()
    } else {
        res.json({
            success: true
        })
    }
}