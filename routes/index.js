/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var url = require('url')
var fs = require('fs')
var formidable = require('formidable')

var bd= '/home/iamtruth/mestrado/processamento e representacao de informacao/aula8/TPC8/servidor/public/data/paras.json'
console.log('BD in: ' + bd)

/* GET home page. */
router.get('/', (req, res) => res.render('index'))

router.get('/ficheiros', (req,res)=>{
  jsonfile.readFile(bd,(erro,ficheiros)=>{
    if(!erro){
      res.render('lista',{lista: ficheiros})
    }else{
      res.json(erro)
    }
  })
})


router.post('/processaForm',(req,res,next)=>{
  var p = req.body
  console.log('==================================')
  console.log(p)
  console.log('==================================')
  var form = new formidable.IncomingForm()
  form.parse(req,(erro,fields,files)=>{
      
    var fenviado = files.ficheiro.path
    var fnovo = './public/data/uploaded/' + files.ficheiro.name

    fs.rename(fenviado,fnovo,(erro)=>{
      if(!erro){
        fields.status = "Ficheiro recibido e guardado com sucesso."
        fields.ficheiro = files.ficheiro.name


        var addToRegisto = {}

        addToRegisto.nome = files.ficheiro.name
        addToRegisto.desc = fields.desc

        jsonfile.readFile(bd,(erro,registos)=>{
          if(!erro){
            registos.push(addToRegisto)

            jsonfile.writeFile(bd,registos,(erro2)=>{
              if(!erro2){
                console.log('registo guardado com sucesso!')
                next()
              }
              else{
                console.log('Erro:' + erro2)
              }
            })
          }else{
            console.log('Erro: ' + erro)
          }
        })
      }else{
        res.render('error')
      }
    })

    res.redirect('/')
  })

})

module.exports = router;
