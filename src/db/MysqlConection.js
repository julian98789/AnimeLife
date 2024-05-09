import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
    host: "roundhouse.proxy.rlwy.net",
    user: "root",
    database: "railway",
    password: "KWFYTsOnzypCWuhaaqxhUySIfqvpRPfW",
    port: "44698"
})

export default pool;