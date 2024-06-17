import { NextResponse } from "next/server";
import pool from "@/db/MysqlConection";

export async function DELETE(req, res) {
    // Crea una lista de consultas SQL para eliminar todos los registros de varias tablas.
    let sqlQueries = [
        `DELETE FROM detailepisode`,
        `DELETE FROM episodes`,
        `DELETE FROM ultimepremieres`
        // Agrega más consultas DELETE según sea necesario
    ];

    try {
        // Ejecuta cada consulta SQL utilizando la conexión a la base de datos "pool".
        for (let sql of sqlQueries) {
            await pool.query(sql);
        }

        return NextResponse.json({ message: "All records deleted successfully from all tables" })  // Devuelve un mensaje de éxito como respuesta en formato JSON utilizando NextResponse.

    } catch (error) {
        console.log(error)  // Captura cualquier error que ocurra durante la ejecución de las consultas y lo registra en la consola.
    }
}