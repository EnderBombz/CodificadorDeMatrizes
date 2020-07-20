var botaomatriz = document.querySelector("#botaoM")
var mensagem = document.querySelector("#mensagem")
var comboBox = document.querySelector("#combobox")
var botaocod = document.querySelector("#botaoC")
var matrizmsg = document.querySelector("#matrizmsg")
var matrizmsgcod = document.querySelector("#matrizmsgcod")
var matrizmsgcodif = document.querySelector("#matrizmsgcodif")
var matrizchaveinv = document.querySelector("#matrizchaveinv")
var chavelimpa = document.querySelector("#posicao22")
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


    var index = comboBox.selectedIndex
    var item = comboBox.options

    if (item[index].value == 2) {

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


    } else {

        matriz = []

        console.table(matriz)
        for (i = 0; i < 3; i++) {
            let temp = new Array();
            matriz.push(temp)
            chave.push(temp)
        }
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {

                matriz[i][j] = Math.floor(Math.random() * 30 + 1)
                chave[i][j] = matriz[i][j]
            }
        }
        console.table(matriz)
        let matrizi = document.querySelector("#matrizi")
        let conteudo = `<table class="tabelamatriz"><tr>`;

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                conteudo += `<td>${matriz[i][j]}${" "}`
            }
            conteudo += `</td></tr>`
        }
        matrizi.innerHTML = conteudo + "</table>"


        mensagem.disabled = false;
        mensagem.setAttribute('maxlength', 9)
        botaocod.disabled = false;
        botaomatriz.disabled = true

    }

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

    } else if (item[index].value == 3) {

        var msg = [
            [],
            [],
            []
        ]
        var msgcod = [
            [],
            [],
            []
        ]


        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                msg[i][j] = letras[y]
                y++;
            }
        }
        k = 0;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (typeof msg[i][j] == 'undefined') {
                    msg[i][j] = ""
                }
            }
        }
        console.table(msg)

        //transeformar em codigo

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                for (k = 0; k < 26; k++) {
                    if (msg[i][j].toUpperCase() == alfabeto[k].toUpperCase()) {
                        msgcod[i][j] = k + 1;
                    }
                }
            }
        }
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (typeof msgcod[i][j] == 'undefined') {
                    msgcod[i][j] = 0
                }
            }
        }
        //multiplica a matriz para codificar
        var msgmult = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        console.table(chave)
        console.table(msgcod)

        msgmult[0][0] = (msgcod[0][0] * chave[0][0]) + (msgcod[0][1] * chave[1][0]) + (msgcod[0][2] * chave[2][0])
        msgmult[0][1] = (msgcod[0][0] * chave[0][1]) + (msgcod[0][1] * chave[1][1]) + (msgcod[0][2] * chave[2][1])
        msgmult[0][2] = (msgcod[0][0] * chave[0][2]) + (msgcod[0][1] * chave[1][2]) + (msgcod[0][2] * chave[2][2])
        msgmult[1][0] = (msgcod[1][0] * chave[0][0]) + (msgcod[1][1] * chave[0][0]) + (msgcod[1][2] * chave[2][0])
        msgmult[1][1] = (msgcod[1][0] * chave[0][1]) + (msgcod[1][1] * chave[1][1]) + (msgcod[1][2] * chave[2][1])
        msgmult[1][2] = (msgcod[1][0] * chave[0][2]) + (msgcod[1][1] * chave[1][2]) + (msgcod[1][2] * chave[2][2])
        msgmult[2][0] = (msgcod[2][0] * chave[0][0]) + (msgcod[2][1] * chave[1][0]) + (msgcod[2][2] * chave[2][0])
        msgmult[2][1] = (msgcod[2][0] * chave[0][1]) + (msgcod[2][1] * chave[1][1]) + (msgcod[2][2] * chave[2][1])
        msgmult[2][2] = (msgcod[2][0] * chave[0][2]) + (msgcod[2][1] * chave[1][2]) + (msgcod[2][2] * chave[2][2])

        console.table(msgmult)
            //calcular determinante

        var determinante = ((chave[0][0] * chave[1][1] * chave[2][2]) + (chave[0][1] * chave[1][2] * chave[2][0]) + (chave[0][2] * chave[1][0] * chave[2][1])) - ((chave[0][1] * chave[1][0] * chave[2][2]) + (chave[0][0] * chave[1][2] * chave[2][1]) + (chave[0][2] * chave[1][1] * chave[2][0])) //ok
        console.log("determinante = " + determinante)

        //calcular cofator 3x3

        var chavecof = [ //ok
            [],
            [],
            [],
        ]
        var chavecoftransp = [ //ok
            [],
            [],
            [],
        ]

        //submatriz dentro da 3x3 sendo 2x2
        chavecof[0][0] = ((chave[1][1] * chave[2][2]) - (chave[1][2] * chave[2][1]))
        chavecof[0][1] = ((chave[1][0] * chave[2][2]) - (chave[1][2] * chave[2][0]))
        chavecof[0][2] = ((chave[1][0] * chave[2][1]) - (chave[1][1] * chave[2][0]))
        chavecof[1][0] = ((chave[0][1] * chave[2][2]) - (chave[0][2] * chave[2][1]))
        chavecof[1][1] = ((chave[0][0] * chave[2][2]) - (chave[0][2] * chave[2][0]))
        chavecof[1][2] = ((chave[0][0] * chave[2][1]) - (chave[0][1] * chave[2][0]))
        chavecof[2][0] = ((chave[0][1] * chave[1][2]) - (chave[0][2] * chave[1][1]))
        chavecof[2][1] = ((chave[0][0] * chave[1][2]) - (chave[0][2] * chave[1][0]))
        chavecof[2][2] = ((chave[0][0] * chave[1][1]) - (chave[0][1] * chave[1][0]))


        //transpondo a matriz cofat

        console.log("antes de transpor")
        console.table(chavecof)

        chavecoftransp[0][0] = chavecof[0][0]
        chavecoftransp[0][1] = chavecof[1][0] * -1
        chavecoftransp[0][2] = chavecof[2][0]
        chavecoftransp[1][0] = chavecof[0][1] * -1
        chavecoftransp[1][1] = chavecof[1][1]
        chavecoftransp[1][2] = chavecof[2][1] * -1
        chavecoftransp[2][0] = chavecof[0][2]
        chavecoftransp[2][1] = chavecof[1][2] * -1
        chavecoftransp[2][2] = chavecof[2][2]

        console.log("depois de transpor")
        console.table(chavecoftransp)

        //calcular a inversa dividindo os elementos da matriz
        //transpostos na matriz cofator pela determinante da chave

        chavecoftransp[0][0] /= determinante
        chavecoftransp[0][1] /= determinante
        chavecoftransp[0][2] /= determinante
        chavecoftransp[1][0] /= determinante
        chavecoftransp[1][1] /= determinante
        chavecoftransp[1][2] /= determinante
        chavecoftransp[2][0] /= determinante
        chavecoftransp[2][1] /= determinante
        chavecoftransp[2][2] /= determinante

        console.log("Após dividir a matriz transposta do cofat pela determinante da chave, obtemos a tão aclamada matriz inversa da chave")
        console.log(" ")
        console.table(chavecoftransp)

        //decodificação da matriz mensagem
        var decod = [
            [],
            [],
            [],
        ]

        decod[0][0] = parseInt((msgmult[0][0] * chavecoftransp[0][0]) + (msgmult[0][1] * chavecoftransp[1][0]) + (msgmult[0][2] * chavecoftransp[2][0])) //ok
        decod[0][1] = parseInt((msgmult[0][0] * chavecoftransp[0][1]) + (msgmult[0][1] * chavecoftransp[1][1]) + (msgmult[0][2] * chavecoftransp[2][1])) //ok
        decod[0][2] = parseInt((msgmult[0][0] * chavecoftransp[0][2]) + (msgmult[0][1] * chavecoftransp[1][2]) + (msgmult[0][2] * chavecoftransp[2][2])) //ok
        decod[1][0] = parseInt((msgmult[1][0] * chavecoftransp[0][0]) + (msgmult[1][1] * chavecoftransp[1][0]) + (msgmult[1][2] * chavecoftransp[2][0])) //ok

        decod[1][1] = parseInt((msgmult[1][0] * chavecoftransp[0][1]) + (msgmult[1][1] * chavecoftransp[1][1]) + (msgmult[1][2] * chavecoftransp[2][1])) //ok
        decod[1][2] = parseInt((msgmult[1][0] * chavecoftransp[0][2]) + (msgmult[1][1] * chavecoftransp[1][2]) + (msgmult[1][2] * chavecoftransp[2][2])) //ok

        decod[2][0] = parseInt((msgmult[2][0] * chavecoftransp[0][0]) + (msgmult[2][1] * chavecoftransp[1][0]) + (msgmult[2][2] * chavecoftransp[2][0])) //ok
        decod[2][1] = parseInt((msgmult[2][0] * chavecoftransp[0][1]) + (msgmult[2][1] * chavecoftransp[1][1]) + (msgmult[2][2] * chavecoftransp[2][1])) //ok
        decod[2][2] = parseInt((msgmult[2][0] * chavecoftransp[0][2]) + (msgmult[2][1] * chavecoftransp[1][2]) + (msgmult[2][2] * chavecoftransp[2][2])) //ok

        console.log("tabela decodificada")
        console.table(decod)

        //exibir matriz
        let conteudo = `<table class="tabelamatriz"><tr>`;
        let conteudocod = `<table class="tabelamatriz2"><tr>`;
        let conteudocodificado = `<table class="tabelamatriz" style="margin-left:-35px;"><tr>`;
        let decodificado = `<table class="tabelamatriz"><tr>`;

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                conteudo += `<td>${msg[i][j]}${" "}`
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