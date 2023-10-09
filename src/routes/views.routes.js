import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get ('/home', (req, res)=> {
    res.render ('home')
})

viewsRouter.get ('/products', (req, res)=> {
    res.render ('products')
})

viewsRouter.get ('/cart', (req, res)=> {
    res.render ('cart')
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
res.render('profile')
})


export default viewsRouter