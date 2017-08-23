var smm = require('../');

smm.getCourseData('74DB-0000-0356-07BA', (error, data) => {
    if (error) throw error;
    console.log(data);
});