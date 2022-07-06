const oracledb = require('oracledb');

async function callquery() {
    const con = await oracledb.getConnection({
        user : 'system',
        password : 'oracle',
        connectString : 'orcl' // type here global database name
    });
    await con.execute("insert into test values(2,'moaez')")
    await con.execute("commit")
}

callquery();