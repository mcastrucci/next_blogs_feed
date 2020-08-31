require('dotenv').config();

const AIRTABLE_KEY = process.env.AIRTABLE_API_KEY

const Airtable = require('airtable')
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base(
    'appwRJqvmi4chF4Mi'
)

const create = (name, email, blogurl, feedurl, notes) => new Promise((resolve, reject) => {
    base('Table 1').create(
        [{ fields: { Name: name, email, blogurl, feedurl, notes } }],
        (err, records) => {
            if (err) {
                console.log('error! ', err);
                reject(err);
            }
            resolve(records);
        }
    )
});

const getRecords = async () => {
    const records = await base('Table 1').select({
        view: 'Grid view',
    }).firstPage();
    
    const feeds = records.filter((record) => {
        if (record.get('approved') === true) return true
    }).map((record) => {
        return {
            id: record.id,
            name: record.get('Name'),
            blogurl: record.get('blogurl'),
            feedurl: record.get('feedurl'),
        }
    })
    console.log(feeds)
    return feeds;
}

export {
    create,
    getRecords
}
