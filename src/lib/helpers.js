const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async(password) =>{

    const salt = await bcrypt.genSalt(10);
    const passCrypt = await bcrypt.hash(password, salt);
    return passCrypt;

};

helpers.matchpassword = async (password, savedPass) =>{

   await bcrypt.compare(password,savedPass);


}

module.exports = helpers;