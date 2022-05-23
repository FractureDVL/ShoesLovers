module.exports = { 
        isLoggedIn (req, res, next){
            if(req.isAuthenticated()){
                return next();
            }
            return res.redirect('auth/inicio');
        },
        isNotLoggedIn (req, res, next){
            if(!req.isAuthenticated()){
                return next();
            }
            return res.redirect('Jinja/perfil');
        }


     }