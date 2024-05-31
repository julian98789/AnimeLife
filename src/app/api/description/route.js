import { NextResponse } from "next/server"
import pool from "@/db/MysqlConection";

export const POST = async (req, res) => {
    const data = await req.json();

    const [rows] = await pool.execute('SELECT * FROM episodes WHERE episodes.ultimepremieres_id = ?', [data.id]);

    const [animeRows] = await pool.execute('SELECT image FROM ultimepremieres WHERE id = ?', [data.id]);
    const animeImage = animeRows[0]?.image;

    const details = await Promise.all(rows.map(async (row) => {
        const [detailRows] = await pool.execute('SELECT title, url, nameAnime FROM detailepisode WHERE episodes_id = ?', [row.id]);
        return detailRows[0];
    }));

    return NextResponse.json({ episodes: rows, details: { ...details, animeImage } });
}