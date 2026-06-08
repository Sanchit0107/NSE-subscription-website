const db = require("./src/config/database");

async function main() {
    try {
        const result = await db.query(
            "SELECT * FROM otp_verifications ORDER BY created_at DESC LIMIT 1"
        );
        if (result.rows.length > 0) {
            const row = result.rows[0];
            console.log(`LATEST_OTP:${row.mobile}:${row.otp_hash}`);
            console.log(`Note: OTP is bcrypted in database, we will check user list or log output.`);
        } else {
            console.log("NO_OTP_FOUND");
        }
        
        // Let's also print the users in database so we can see what user exists
        const users = await db.query("SELECT * FROM users LIMIT 10");
        console.log("USERS:", users.rows);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
