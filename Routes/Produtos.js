const express = require('express');
const router = express.Router();
const Produto = require('../models/produtoP');
const mongoose = require('mongoose');
const fs = require('fs');

router.get('/',(req, res, next) => {
    Produto.find()
    .exec()
    .then(doc=>{
       res.status(200).json(doc)
    })
    .catch(err=>{
        res.status(500).json({
            erro: err
        })
    });
    res.status(200).json({
        message:'GET Request para /Produtos' 
    
    });

});
//recuperando um unico produto
router.get('/:produtoId',(req, res, next) => {
    const id = req.params.produtoId;
    if(id === 'unidesc'){
          res.status(200).json({
            message:'Produto encontrado',
            id: id   
    })
    }else{
      res.status(400).json({
          message:"produto não encontrado"
      })
  }

});

router.post('/', (req, res,next) =>{
    const produto = new Produto({
        _id: new mongoose.Types.ObjectId(), 
        nome: req.body.nome,
        preco: req.body.preco
    })
    produto.save()
    .then(result =>{
        res.status(201).json({
            message:'Post Request para /produtos',
            produto: produto
        });
    })
    .catch(erro =>{
        res.status(500).json({
            error:erro
        })   
    });   
});

router.put('/:produtoId',async (req, res,next) =>{

    const produto = new Produto({
        _id:  mongoose.Types.ObjectId(), 
        nome: req.body.nome,
        preco: req.body.preco
    })
    produto.save()
    .then(result =>{
        res.status(201).json({
            message:'Post Request para /produtos',
            produto: produto
        });
    })
    .catch(erro =>{
        res.status(500).json({
            error:erro
        })   
    });   
});



/*
router.put('/:produtoId',async (req, res,next) =>{
    console.log(req.body);
    const id = req.params.produtoId;
    if(id === 'unidesc'){
          
           const produto = await Produto.findByIdAndUpdate(req.params.produtoId,{
                nome,
                preco,
               
            } ,{new : true })
           
            produto.save()
            .then(result =>{
                res.status(201).json({
                    message:'Post Request para /produtos',
                    produto: produto
                })
            
                res.status(200).json({
                    message:'Produto encontrado',
                    id: id   
            })
        })
        }
            else{
                res.status(400).json({
                    message:"produto não encontrado"

                })
            }     
    });*/
    

router.delete('/:produtoId',async (req, res,next) =>{
        try {
            await Produto.findByIdAndRemove(req.params.produtoId);
            return res.send();
        }catch (err){
            return res.status(400).send({error: 'error Deleting produto'});
        }
        
      
});
module.exports = router;
/*
  try{

     const {nome, preco} = req.body;
    const produto = await Produto.findByIdAndUpdate(req.params.produtoId,{
        nome,
        preco,
    }, {new : true });
    
    produto.tasks =[];
    await Task.remove({ produto: produto._id });

    await Promise.all(tasks.map(async tasck =>{
        const produtoTasck = new Task({...task, produto: produto._id});
        await produtoTasck.save();
        produto.task.push(produtoTask);

}));

await produto.save();
return res.send({ produto })
  } catch (err){
      return res.status(400).send({error: 'Error Updating new produto'});
  }
 /*catch{
     console.log("teste")
 }
});//*/