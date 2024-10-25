const { Client } = require("pg");
require("dotenv").config();

async function sql() {

    const randomInt = () => Math.floor(Math.random() * 4) + 1;
    const randomPrice = () => Math.floor(Math.random() * 50) + 1;

    const categories = `
        ('clothing'),
        ('tool'),
        ('medical'),
        ('science')
    `;

    const makes = `
        ('nexura'),
        ('viraio'),
        ('aqualis'),
        ('fuseon')
    `

    const response = await fetch(`https://emoji-api.com/categories/objects?access_key=6453d82c968a7e244cb73ce3c08d5019a841b380`)
    const emojis = await response.json();

    const filteredEmojis =  
        emojis.filter(emoji => 
            emoji.subGroup.includes('clothing') ||
            emoji.subGroup.includes('tool') ||
            emoji.subGroup.includes('medical') ||
            emoji.subGroup.includes('science'))
    
    const productsSQL =
        filteredEmojis.map(emoji => 
            `((SELECT id FROM categories WHERE name = '${emoji.subGroup}'), '${emoji.unicodeName}', ${randomPrice()}, '${emoji.codePoint}', ${randomInt()})`)
            .join(`,\n`);
    
    const SQL = `
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category_id INTEGER,
        name TEXT,
        price INTEGER,
        character TEXT,
        make_id TEXT
    );

    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT
    );

    CREATE TABLE IF NOT EXISTS makes (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT
    );

    INSERT INTO categories (name)
    VALUES
        ${categories};
    
    INSERT INTO makes (name)
    VALUES
        ${makes}; 

    INSERT INTO products (category_id, name, price, character, make_id)
    VALUES
        ${productsSQL};   
    `
    return SQL;
}

async function main() {
    const SQL = await sql();
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Done!");
}

main();

