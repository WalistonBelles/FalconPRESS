//Importa a biblioteca Express
const express = require('express');
const router = express.Router();
const Category = require('./Category');
//Importa a biblioteca Slugify
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new');
});

router.post('/categories/save', (req, res) => {
    var title = req.body.title;
    if (title !== undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/');
        });
    }else {
        res.redirect('/admin/categories/new');
    }
});

router.get('/admin/categories', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/index', {categories: categories});
    });
});

router.post('/categories/delete', (req, res) => {
    var id = req.body.id;
    if (id != undefined){ // Confere se existe algum valor
        if (!isNaN(id)){ // Confere se é 1 número
            Category.destroy({ // Deleta do banco de dados a categoria com o ID requisitado
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories');
            });
        }else { // Se não for um número
            res.redirect('/admin/categories');
        }
    }else { // Se não existir 1 valor
        res.redirect('/admin/categories');
    }
});

module.exports = router;