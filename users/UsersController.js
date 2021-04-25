const express = require('express');
const router = express.Router();
const User = require('./Users');
const bcrypt = require('bcryptjs');

// Area de listagem de usuários
router.get('/admin/users', (req, res) => { 
    User.findAll().then(users => {
        res.render('admin/users/index', {users: users}); 
    });
});

// Area de criação de conta
router.get('/admin/users/create', (req, res) => {
    res.render('admin/users/create');
});

// Criação de conta
router.post('/users/create', (req, res) => {
    var email = req.body.email;
    var username = req.body.login;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then( user => { // Confere se o email já está cadastrado
        if (user == undefined){
            User.findOne({where: {name: username}}).then( user => { // Confere se o username já está cadastrado
                if (user == undefined){
                    // Gera 1 salt de 10 caracteres
                    var salt = bcrypt.genSaltSync(10);
                    // Cria 1 hash com a senha digitada + o salt gerado
                    var hash = bcrypt.hashSync(password, salt);

                    User.create({
                        email: email,
                        name: username,
                        password: hash
                    }).then(() => {
                        res.redirect('/');
                    }).catch(err => {
                        res.redirect('/');
                    });
                }else {
                    res.redirect('/admin/users/create');
                }
            })
        }else {
            res.redirect('/admin/users/create');
        }
    })
});

// Area de login
router.get('/login', (req, res) =>{
    res.render('admin/users/login');
});

// Autenticação
router.post('/authenticate', (req, res) =>{
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({where: {name: username}}).then(user => {
        if (user !== undefined){ // Se existe 1 usuário com esse email
            var correct = bcrypt.compareSync(password, user.password); // Validação de senha
            if (correct){ // Confere se a autenticação foi efetuada com sucesso
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles');
            } else { // Se não, retorna para a área de login
                res.redirect('/login');
            }
        } else { // Se não existe, retorna para área de login
            res.redirect('/login');
        }
    })
});

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/login');
})

module.exports = router;