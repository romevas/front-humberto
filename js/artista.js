function carregarartista(){

    var usuariologado = localStorage.getItem("logado");

    if (usuariologado == null) {
        window.location = "index.html";
    }
    else {
        fetch("http://localhost:8080/artistas")
        .then(res => res.json())
        .then(res => preenchercombo(res));
    }
}

function preenchercombo(lista){
    var combo = "<option selected>Selecione o Artista</option>";

    for (contador=0; contador<lista.length; contador++)
    {
        combo += 
        "<option value='" + lista[contador].id + "'>" + lista[contador].nomeArtistico + "</option>";
    }

    document.getElementById("cmbartistas").innerHTML = combo;
}

function filtrar(){
    fetch("http://localhost:8080/artista/" + document.getElementById("cmbartistas").value)
    .then(res => res.json())
    .then(res => preenchertabela(res.musicas));
}

function preenchertabela(lista) {

    var tabela =
        "<table width='75%' border='1' cellpadding='5' cellspacing='2' align='center'>" +
        "<tr>" +
        "<th>Musica</th> <th>Lancamento</th> <th>Alteração</th> <th>Cadastro</th>" +
        "</tr>";
    for (contador = 0; contador < lista.length; contador++) {
        tabela +=
            "<tr>" +
                  "<td>" + lista[contador].titulo + 
            "</td> <td>" + lista[contador].lancamento + 
            "</td> <td><button onclick=alterarsim('" + lista[contador].id + "') type='button' class='btn btn-success'>Lancamento</button>" +
                      "<button onclick=alterarnao('" + lista[contador].id + "') type='button' class='btn btn-danger'>FlashBack</button>" +
            "</td> <td>" + lista[contador].cadastro + 
            "</td> </tr>";
    }
    tabela += "</table>";
    document.getElementById("resultado").innerHTML = tabela;
}
function alterarsim(codigo){
    var carta = {
        id: codigo ,
        lancamento: "1"
    }

    var envelope = {
        method: "POST",
        body: JSON.stringify(carta),
        headers: {
            "Content-type":"application/json"
        }
    }

    fetch("http://localhost:8080/alterarlancamento", envelope)
    .then(res => res.json())
    .then(res => { 
        window.alert("Registro Alterado !!"); 
        filtrar();
    })
    .catch(err => { 
        window.alert("Erro na alteração !!"); 
    });    
}
function alterarnao(codigo){
    var carta = {
        id: codigo ,
        lancamento: "0"
    }

    var envelope = {
        method: "POST",
        body: JSON.stringify(carta),
        headers: {
            "Content-type":"application/json"
        }
    }

    fetch("http://localhost:8080/alterarlancamento", envelope)
    .then(res => res.json())
    .then(res => { 
        window.alert("Registro Alterado !!"); 
        filtrar();
    })
    .catch(err => { 
        window.alert("Erro na alteração !!"); 
    });    
}