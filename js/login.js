function logar(){
    var carta = {
        email: document.getElementById("txtemail").value ,
        senha: document.getElementById("txtsenha").value 
    }

    var envelope = {
        method: "POST",
        body: JSON.stringify(carta),
        headers: {
            "Content-type":"application/json"
        }
    }

    fetch("http://localhost:8080/login", envelope)
    .then(res => res.json())
    .then(res => { 
        localStorage.setItem("logado", JSON.stringify(res))
        window.location = "usuario.html"; 
    })
    .catch(err => { 
        window.alert("Não foi possivel logar"); 
    });
}