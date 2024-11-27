const schedule = require('node-schedule');

const job = schedule.scheduleJob('*/2 * * * *', function(){
    console.log('This job runs every 2 minutes'); 
});

module.exports = job;