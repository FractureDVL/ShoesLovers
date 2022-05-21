const bcrypt = require('bcryptjs');

const helpers = {};
//Encrypta la contrasena
helpers.encryptPassword = async(password) =>{

    const salt = await bcrypt.genSalt(10);
    const passCrypt = await bcrypt.hash(password, salt);
    return passCrypt;

};

//Compara una contrasena encryptada con una de la base de datos
helpers.matchPassword = async (password, savedPass) =>{
   try {
     return await bcrypt.compare(password , savedPass);
       
   } catch (error) {
           console.log(error);
   }
}

module.exports = helpers;