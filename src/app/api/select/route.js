import pool from "@/db/MysqlConection";
import { NextResponse } from "next/server";
export const GET = async (req) => {

    try {
        const [rows] = await pool.query('SELECT * FROM ultimepremieres');

        return NextResponse.json(rows);
    } catch (err) {
        console.error(err);
    }
}