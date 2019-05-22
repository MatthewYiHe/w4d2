var knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'development',
        password : 'development',
        database : 'test_db'
    }
});
console.log('Searching...');
const queryType = process.argv.slice(2)[0];


knex.select('*').from('famous_people').where({first_name : queryType }).orWhere({last_name : queryType }).asCallback((err, res) => {
      console.log(`Found ${res.length} person(s) by the name of '${queryType}'`);
      for (let index in res){
        let custdate = res[index].birthdate.toLocaleDateString();
        console.log(`-${Number(index) + 1}: ${res[index].first_name} ${res[index].last_name}, born '${custdate}'`);
      }
  return knex.destroy();
});
