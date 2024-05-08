const pool = require('./db');
const Base = require('./Base');
const districtModel = require('./District');
class Ward extends Base {
    TABLE_NAME = 'ward';
    SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

    convertRowToObject = (row) => {
        const object = new Ward(row);
        return object;
    }

    getDistrict = async () => {
        const district = await districtModel.find(this.district_id);
        return district;

    }


}
module.exports = new Ward();
