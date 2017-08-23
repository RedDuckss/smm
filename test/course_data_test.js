var smm = require('smm');

smm.getCourseData('F6A4-0000-0286-ECA1', (error, data) => {
    if (error) throw error;
    console.log(data);
});