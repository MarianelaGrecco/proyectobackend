import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get ('/home', (req, res)=> {
    res.render ('home')
})

viewsRouter.get ('/products', (req, res)=> {
    res.render ('products')
})
viewsRouter.get ('/detalle', (req, res)=> {
    res.render ('detalle')
})

viewsRouter.get ('/cart', (req, res)=> {
    res.render ('cart')
})

viewsRouter.get ('/chat', (req, res)=> {
    res.render ('chat')
})

viewsRouter.get ('/product-details', (req, res)=> {
    res.render ('product-details')
})

viewsRouter.get ('/realTimeProducts', (req, res)=> {
    res.render ('realTimeProducts')
})

viewsRouter.get('/login',(req,res)=>{
    res.render('login')
})

viewsRouter.get('/githubSignup',(req,res)=>{
    res.render('githubSignup')
})

viewsRouter.get('/github',(req,res)=>{
    res.render('github')
})

viewsRouter.get('/signup',(req,res)=>{
    res.render('signup')
})

viewsRouter.get('/errorLogin',(req,res)=>{
    res.render('errorLogin')
})

viewsRouter.get('/errorSignup',(req,res)=>{
    res.render('errorSignup')
})

viewsRouter.get('/profile',(req,res)=>{
    console.log(req);
res.render('profile')
})

viewsRouter.get('/current',(req,res)=>{
    console.log(req);
res.render('current')
})

viewsRouter.get('/message',(req,res)=>{
    console.log(req);
res.render('form')
})



export default viewsRouter