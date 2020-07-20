var botaomatriz = document.querySelector("#botaoM")
var mensagem = document.querySelector("#mensagem")
var comboBox = document.querySelector("#combobox")
var botaocod = document.querySelector("#botaoC")
var matrizmsg = document.querySelector("#matrizmsg")
var matrizmsgcod = document.querySelector("#matrizmsgcod")
var matrizmsgcodif = document.querySelector("#matrizmsgcodif")
var matrizchaveinv = document.querySelector("#matrizchaveinv")
var chavelimpa = document.querySelector("#posicao22")
var botaodecodificarmsg = document.querySelector("#botaoD")
var radioesquerda = document.querySelector("#esquerda")
var radiodireita = document.querySelector("#direita")
var mensagemdecodificadaletra = document.querySelector("#mensagemdecodificadaletra")

var chave = []
var matriz = []

comboBox.addEventListener("change", function() {
    mensagem.value = "";
    mensagem.disabled = true
    botaocod.disabled = true;
    botaomatriz.disabled = false
    matrizmsg.innerHTML = ""
    matrizmsgcod.innerHTML = ""
    matrizmsgcodif.innerHTML = ""
    matrizchaveinv.innerHTML = ""
    chavelimpa.innerHTML = `<div class="matriz" id="matrizi"></div>`

    chave = []
    matriz = []
})


botaomatriz.addEventListener("click", function() {

    matriz = [];

    console.table(matriz)
    for (i = 0; i < 2; i++) {
        let temp = new Array();
        matriz.push(temp)
        chave.push(temp)
    }

    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {

            matriz[i][j] = Math.floor(Math.random() * 30 + 1)
            chave[i][j] = matriz[i][j]
        }
    }
    console.table(matriz)
    let matrizi = document.querySelector("#matrizi")
    let conteudo = `<table class="tabelamatriz"><tr>`;

    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            conteudo += `<td>${matriz[i][j]}${" "}`
        }
        conteudo += `</td></tr>`
    }
    matrizi.innerHTML = conteudo + "</table>"

    mensagem.disabled = false;
    mensagem.setAttribute('maxlength', 4)
    botaocod.disabled = false;
    botaomatriz.disabled = true

})

botaocod.addEventListener("click", function() {

    var index = comboBox.selectedIndex
    var item = comboBox.options

    var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    var mensagem = document.querySelector("#mensagem").value
    var tamanho = mensagem.length;
    var letras = []
    letras = mensagem.split("")
    console.table(letras)
    var k = 0
    var y = 0

    if (item[index].value == 2) {
        var msg = [
            [],
            []
        ]
        var msgcod = [
            [],
            [],
            []
        ]


        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {
                msg[i][j] = letras[y]
                y++;
            }
        }
        k = 0;
        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {
                if (typeof msg[i][j] == 'undefined') {
                    msg[i][j] = ""
                }
            }
        }
        console.table(msg)

        //transeformar em codigo

        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {
                for (k = 0; k < 26; k++) {
                    if (msg[i][j].toUpperCase() == alfabeto[k].toUpperCase()) {
                        msgcod[i][j] = k + 1;
                    }
                }

            }
        }
        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {
                if (typeof msgcod[i][j] == 'undefined') {
                    msgcod[i][j] = 0
                }
            }
        }
        //multiplica a matriz para codificar
        var msgmult = [
            [],
            [],

        ]
        var msgmulteste = [
            [],
            [],
        ]

        msgmult[0][0] = (msgcod[0][0] * chave[0][0]) + (msgcod[0][1] * chave[1][0])
        msgmult[0][1] = (msgcod[0][0] * chave[0][1]) + (msgcod[0][1] * chave[1][1])
        msgmult[1][0] = (msgcod[1][0] * chave[0][0]) + (msgcod[1][1] * chave[1][0])
        msgmult[1][1] = (msgcod[1][0] * chave[0][1]) + (msgcod[1][1] * chave[1][1])

        msgmulteste = msgcod * chave

        console.table(msgmult)


        //calcular matriz inversa
        var chavecof = [ //ok
            [],
            [],
        ]
        var chavecoftransp = [ //ok
            [],
            [],
        ]
        var determinante = (chave[0][0] * chave[1][1]) - (chave[0][1] * chave[1][0])
        console.log("determinante = " + determinante) //ok

        console.table("chave = " + chave)
            //matriz cof
        chavecof[0][0] = chave[0][0] / determinante
        chavecof[0][1] = chave[0][1] / determinante
        chavecof[1][0] = chave[1][0] / determinante
        chavecof[1][1] = chave[1][1] / determinante

        console.table(chavecof)

        //matriz transposta de COF
        chavecoftransp[0][0] = chavecof[1][1]
        chavecoftransp[0][1] = chavecof[0][1] * -1
        chavecoftransp[1][0] = chavecof[1][0] * -1
        chavecoftransp[1][1] = chavecof[0][0]

        console.table(chavecoftransp)
            //decodificação da mensagem

        var decod = [
            [],
            [],
        ]

        decod[0][0] = (msgmult[0][0] * chavecoftransp[0][0]) + (msgmult[0][1] * chavecoftransp[1][0])
        decod[0][1] = (msgmult[0][0] * chavecoftransp[0][1]) + (msgmult[0][1] * chavecoftransp[1][1])
        decod[1][0] = (msgmult[1][0] * chavecoftransp[0][0]) + (msgmult[1][1] * chavecoftransp[1][0])
        decod[1][1] = (msgmult[1][0] * chavecoftransp[0][1]) + (msgmult[1][1] * chavecoftransp[1][1])


        //exibir matriz
        let conteudo = `<table class="tabelamatriz"><tr>`;
        let conteudocod = `<table class="tabelamatriz2"><tr>`;
        let conteudocodificado = `<table class="tabelamatriz"><tr>`;
        let decodificado = `<table class="tabelamatriz"><tr>`;

        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {
                conteudo += `<td>${msg[i][j]}${" "}`
                    //conteudocod += `<td>${msgcod[i][j]}${" "}`
                conteudocod += `<td>${chavecoftransp[i][j].toFixed(7)}${" "}`
                conteudocodificado += `<td>${msgmult[i][j]}${" "}`
                decodificado += `<td>${decod[i][j].toFixed(0)}${" "}`

            }
            conteudo += `</td></tr>`
            conteudocod += `</td></tr>`
            conteudocodificado += `</td></tr>`
            decodificado += `</td></tr>`
        }
        matrizmsgcod.innerHTML = conteudocod + "</table>"
        matrizmsg.innerHTML = conteudo + "</table>"
        matrizmsgcodif.innerHTML = conteudocodificado + "</table>"
        matrizchaveinv.innerHTML = decodificado + "</table>"

    }
})

botaodecodificarmsg.addEventListener("click", function() {

    var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    var mensagemdecodificada = document.querySelector("#mensagemdecodificada")
    var inversadachave = document.querySelector("#inversadachave")

    var chaveDecod = [
        [document.querySelector("#c00").value, document.querySelector("#c01").value],
        [document.querySelector("#c10").value, document.querySelector("#c11").value],
    ]
    var msgcodificada = [
        [document.querySelector("#m00").value, document.querySelector("#m01").value],
        [document.querySelector("#m10").value, document.querySelector("#m11").value],
    ]

    if (radioesquerda.checked) {

        //calcular matriz inversa
        var chavecof = [ //ok
            [],
            [],
        ]
        var chavecoftransp = [ //ok
            [],
            [],
        ]
        var determinante = (chaveDecod[0][0] * chaveDecod[1][1]) - (chaveDecod[0][1] * chaveDecod[1][0])
        console.log("determinante = " + determinante) //ok

        console.table("chave = " + chaveDecod)

        //matriz cof
        chavecof[0][0] = chaveDecod[0][0] / determinante
        chavecof[0][1] = chaveDecod[0][1] / determinante
        chavecof[1][0] = chaveDecod[1][0] / determinante
        chavecof[1][1] = chaveDecod[1][1] / determinante

        console.table(chavecof)

        //matriz transposta de COF
        chavecoftransp[0][0] = chavecof[1][1]
        chavecoftransp[0][1] = chavecof[0][1] * -1
        chavecoftransp[1][0] = chavecof[1][0] * -1
        chavecoftransp[1][1] = chavecof[0][0]

        console.table(chavecoftransp)

        //dicodificação da matriz
        var decod = [
            [],
            [],
        ]

        //multiplicando com a chave pela esquerda
        decod[0][0] = (chavecoftransp[0][0] * msgcodificada[0][0]) + (chavecoftransp[1][0] * msgcodificada[0][1])
        decod[0][1] = (chavecoftransp[0][1] * msgcodificada[0][0]) + (chavecoftransp[1][1] * msgcodificada[0][1])
        decod[1][0] = (chavecoftransp[0][0] * msgcodificada[1][0]) + (chavecoftransp[1][0] * msgcodificada[1][1])
        decod[1][1] = (chavecoftransp[0][1] * msgcodificada[1][0]) + (chavecoftransp[1][1] * msgcodificada[1][1])

        //transformar decod em letras

        var decodlet = [
            [],
            []
        ]

        console.table(decodlet)
        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {
                for (l = 0; l < 26; l++) {

                    if (decod[i][j] == l + 1) {
                        decodlet[i][j] = alfabeto[l]
                    }

                }
            }
        }
        console.table(decodlet)

        //exibir matriz

        let chaveinversa = `<table class="tabelamatriz2"><tr>`;
        let decodificado = `<table class="tabelamatriz"><tr>`;

        for (i = 0; i < 2; i++) {
            for (j = 0; j < 2; j++) {

                chaveinversa += `<td>${chavecoftransp[i][j].toFixed(7)}${" "}`
                decodificado += `<td>${decod[i][j].toFixed(0)}${" "}`

            }
            chaveinversa += `</td></tr>`
            decodificado += `</td></tr>`
        }

        inversadachave.innerHTML = chaveinversa + "</table>"
        mensagemdecodificada.innerHTML = decodificado + "</table>"


    } else {
        if (radiodireita.checked) {

            //calcular matriz inversa
            var chavecof = [ //ok
                [],
                [],
            ]
            var chavecoftransp = [ //ok
                [],
                [],
            ]
            var determinante = (chaveDecod[0][0] * chaveDecod[1][1]) - (chaveDecod[0][1] * chaveDecod[1][0])
            console.log("determinante = " + determinante) //ok

            console.table("chave = " + chaveDecod)

            //matriz cof
            chavecof[0][0] = chaveDecod[0][0] / determinante
            chavecof[0][1] = chaveDecod[0][1] / determinante
            chavecof[1][0] = chaveDecod[1][0] / determinante
            chavecof[1][1] = chaveDecod[1][1] / determinante

            console.table(chavecof)

            //matriz transposta de COF
            chavecoftransp[0][0] = chavecof[1][1]
            chavecoftransp[0][1] = chavecof[0][1] * -1
            chavecoftransp[1][0] = chavecof[1][0] * -1
            chavecoftransp[1][1] = chavecof[0][0]

            console.table(chavecoftransp)

            //dicodificação da matriz
            var decod = [
                [],
                [],
            ]

            //multiplicando com a chave pela direita
            decod[0][0] = ((msgcodificada[0][0] * chavecoftransp[0][0]) + (msgcodificada[0][1] * chavecoftransp[1][0]))
            decod[0][1] = ((msgcodificada[0][0] * chavecoftransp[0][1]) + (msgcodificada[0][1] * chavecoftransp[1][1]))
            decod[1][0] = ((msgcodificada[1][0] * chavecoftransp[0][0]) + (msgcodificada[1][1] * chavecoftransp[1][0]))
            decod[1][1] = ((msgcodificada[1][0] * chavecoftransp[0][1]) + (msgcodificada[1][1] * chavecoftransp[1][1]))

            for (i = 0; i < 2; i++) {
                for (j = 0; j < 2; j++) {
                    decod[i][j] = Math.round(decod[i][j])
                }
            }

            //transformar decod em letras
            var decodlet = [
                [],
                [],
            ]
            letra = 0
            console.table(decodlet)
            for (i = 0; i < 2; i++) {
                for (j = 0; j < 2; j++) {
                    console.log(decod[i][j])
                    console.log("----------")
                    for (k = 0; k < 26; k++) {
                        console.log(k)

                        if (decod[i][j] == k + 1) {
                            console.log(decod[i][j])
                            console.log(decod[i][j] + " no alfabeto é " + alfabeto[k])
                            decodlet[i][j] = alfabeto[k]
                            console.table(decodlet)
                        } else {
                            console.log("entrou no else")
                        }
                    }
                }
            }
            console.table("decodlet completo")
            console.table(decodlet)

            //exibir matriz

            let chaveinversa = `<table class="tabelamatriz2"><tr>`;
            let decodificado = `<table class="tabelamatriz"><tr>`;
            let decodemletra = `<table class="tabelamatriz"><tr>`;

            for (i = 0; i < 2; i++) {
                for (j = 0; j < 2; j++) {

                    chaveinversa += `<td>${chavecoftransp[i][j].toFixed(7)}${" "}`
                    decodificado += `<td>${decod[i][j].toFixed(0)}${" "}`
                    decodemletra += `<td>${decodlet[i][j]}${" "}`
                }
                chaveinversa += `</td></tr>`
                decodificado += `</td></tr>`
                decodemletra += `</td></tr>`
            }

            inversadachave.innerHTML = chaveinversa + "</table>"
            mensagemdecodificada.innerHTML = decodificado + "</table>"
            mensagemdecodificadaletra.innerHTML = decodemletra + "</table>"

        } else {
            alert("selecione qual lado a chave foi multiplicada")
        }
    }



})