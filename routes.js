var express = require('express');
var Zombie = require('./models/zombie');
var Armas = require('./models/armas');
var passport = require('passport');

var router = express.Router();

router.use((req, res, next) => {
    res.locals.currentZombie = req.zombie;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
}); 
  
router.get("/", (req, res, next) => {
    Zombie.find()
    .sort({createdAt: "descending"})
    .exec((err, zombies) => {
        if(err){
            return next(err);
        }
        res.render("index", {zombies: zombies});
    });
});

router.get("/ArmasView", (req, res, next) => {
    Armas.find()
    .sort({name: "descending"})
    .exec((err, armas) => {
        if(err){
            return next(err);
        }
        res.render("ArmasView", {armas: armas});
    });
});
router.get("/")

router.get("/signup", (req, res) => {
    res.render("signup"); 
});

router.get("/Armas", (req, res) => {
    res.render("Armas"); 
});

router.get("/NotFound", (req, res) => {
    res.render("404"); 
});

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    Zombie.findOne({username: username}, (err, zombie) => {
        if(err){
            return next(err);
        }
        if(zombie){
            req.flash("error", "El nombre de usuario ya lo ha tomado otro zombie");
            return res.redirect("/signup");
        }
        var newZombie = new Zombie({
            username: username,
            password: password
        });
        newZombie.save(next);
        return res.redirect("/");
    });
});


router.post("/Armas", (req, res, next) => {
    var name = req.body.name;
    var descripcion = req.body.descripcion;
    var fuerza = req.body.fuerza;
    var categoria = req.body.categoria;
    var municion = req.body.municion; 
    if (municion==="on"){
        municion = true; 
    }else {
        municion =false
    }
    Armas.findOne({name: name}, (err, Arma) => {
        if(err){
            return next(err);
        }
        if(Arma){
            req.flash("error", "El arma ya existe T.T");
            return res.redirect("/Armas");
        }
        var newArma = new Armas({
            name: name,
            descripcion: descripcion,
            fuerza: fuerza, 
            categoria: categoria,
            municion: municion
        });
        newArma.save(next);
        return res.redirect("/Armas");
    });
});
/*router.get("/login", (req, res) => {
    res.render("login"); 
});*/

router.get("/zombie/:username", (req, res, next) => {
    Zombie.findOne({username: req.params.username}, (err, zombie) => {
        if (err){
            return next(err);
        }
        if (!zombie){
            return next(404);
        }
        res.render("profile", {zombie: zombie});
    });
});

router.get("/arma/:name", (req, res, next) => {
    Armas.findOne({name: req.params.name}, (err, armas) => {
        if (err){
            return next(err);
        }
        if (!armas){
            return next(404);
        }
        res.render("ArmaInfo", {armas: armas});
    });
});

module.exports = router;