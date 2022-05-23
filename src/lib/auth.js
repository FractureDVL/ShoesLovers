module.exports = { 
        isLoggedIn (req, res, next){
            if(req.isAuthenticated()){
                return next();
            }
            return res.render('/inicio');
        },
        isNotLoggedIn (req, res, next){
            if(!req.isAuthenticated()){
                return next();
            }
            return res.render('/perfil');
        }


     }