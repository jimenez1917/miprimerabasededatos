import express from 'express';
import contenedor from './ProductsManager.js';
const ProductsService = new contenedor();
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(8080,()=>console.log('listening on port 8080'));

app.get('/productos',(req,res)=>{
    ProductsService.getAll().then(result=>res.send(result))
})
app.post('/productos',(req,res)=>{
    ProductsService.save(req.body).then(result=>res.send(result))
})
app.get('/productos/:id',(req,res)=>{
    ProductsService.getById(req.params.id).then(result=>res.send(result))
})
app.delete('/productos',(req,res)=>{
    ProductsService.deleteAll().then(result=>res.send(result));
})
app.delete('/productos/:id',(req,res)=>{
    ProductsService.deleteById(req.params.id).then(result=>res.send(result));
})
app.put('/productos/:id',(req,res)=>{
    ProductsService.upload(req.body,req.params.id).then(result=>res.send(result));
})