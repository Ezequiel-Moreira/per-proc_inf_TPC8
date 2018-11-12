/*jshint esversion: 6 */

$(()=>{
  $('#ficheiros').load('http://localhost:7000/ficheiros')

  $('#adicionar').click(e=>{
    e.preventDefault()
    var nome = $('#file').val().split('\\')[2]
    $('#ficheiros').append('<li><a href=\'http://localhost:7000/data/uploaded/' + 
    nome +'\'>' + nome + '</a>'  + '<p>' + $('#desc').val() + '</p></li>')
    //ajaxPost()
  })

  function ajaxPost(){
    var formulario = $('#FormData')
    alert(formulario)
    var fd = new FormData(formulario)
    alert(fd)
    $.ajax({
      type:"POST",
      contentType: false,
      url:"http://localhost:7000/processaForm",
      data: fd,
      cache: false,
      processData: false,
      success: p => alert('ficheiro gravado com sucesso: ' + p),
      error: e => {
        alert('Erro no post: ' + JSON.stringify(e))
        console.log('erro: '+ JSON.stringify(e))
      }

    })
    $('#desc').val('')
    $('#file').val('')
  }

})
