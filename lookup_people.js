const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  const queryType = process.argv.slice(2)[0];

  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1 OR last_name = $1", [queryType], (err, res) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${res.rows.length} person(s) by the name of '${queryType}'`);
    for (let index in res.rows){
      let custdate = res.rows[index].birthdate.toLocaleDateString();
      console.log(`-${Number(index) + 1}: ${res.rows[index].first_name} ${res.rows[index].last_name}, born '${custdate}'`);
    }
    client.end();
  });
});