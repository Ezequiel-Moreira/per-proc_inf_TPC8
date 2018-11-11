/*jshint esversion: 6 */

$(()=>{
  $('#ficheiros').load('http://localhost:7000/ficheiros')

  $('#adicionar').click(e=>{
    e.preventDefault()
    var nome = $('#file').val().split('\\')[2]
    $('#ficheiros').append('<li><a href=\'http://localhost:7000/data/uploaded/' + 
    nome +'\'>' + nome + '</a>'  + '<p>' + $('#desc').val() + '</p></li>')
  })

})
