var knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'development',
        password : 'development',
        database : 'test_db'
    }
});

const firstName = process.argv.slice(2)[0];
const lastName = process.argv.slice(2)[1];
const dob = process.argv.slice(2)[2];


knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: dob}).asCallback((err, res) => {
  console.log('complete');
knex.select('*').from('famous_people').asCallback((err, res) => {console.log(res)})

  return knex.destroy();
});
