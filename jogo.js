/*
    *JOGO DA VELHA*
    *FEITO POR RENAN ANDRADE DE GOUVEIA*
    *SITE UTILIZADO COMO EXEMPLO PARA ESTILIZAÇÃO -> https://playtictactoe.org/*
*/

var quadrados = document.getElementsByClassName('square');
var jogadores = document.getElementsByClassName('jogadores');
var placar_pontos = document.getElementsByClassName('ponto');
var terminou = false;
var pontos = [0,0];
var marcaX = true;
var quadrados_preenchidos = 0;

function inicia(){
    for(i in quadrados){
        quadrados[i].onclick = function(n){
            var x = this;
            return marcaXouO(x);
        };
        quadrados[i].value = '';
    }
    exibeVez();
}

function marcaXouO(object){
    if(!terminou){
        if(object.innerHTML == ''){
           if(!marcaX){
                var O = document.createElement('div');
                O.className = 'o';
                object.value = 'o';
                object.appendChild(O);
                marcaX = true;
           }
           else{
                var X = document.createElement('div');
                X.className = 'x';
                object.value = 'x'
                object.appendChild(X);
                marcaX = false;
           }
           quadrados_preenchidos += 1;
           verificaVitoria();
        }
        exibeVez();
    }
}

function exibeVez(){
    if(marcaX){
        jogadores[0].style.color = "rgba(225,225,225,1)";
        jogadores[1].style.color = "rgba(225,225,225,0.4)";
    }
    else{
        jogadores[0].style.color = "rgba(225,225,225,0.4)";
        jogadores[1].style.color = "rgba(225,225,225,1)";
    }
}

function verificaVitoria(){
    var q = 0;
    // Verifica se os valores dos quadrados na horizontal são iguais
    for(i=0;i < 3;i++){
        if(quadrados[q].value != '' && quadrados[q].value == quadrados[q+1].value && 
           quadrados[q+1].value == quadrados[q+2].value){
                terminou = true;
                return vitoria(quadrados[q].firstChild,quadrados[q+1].firstChild,
                                quadrados[q+2].firstChild,quadrados[q].value);
        }
        q += 3;
    }
    // Verifica se os valores dos quadrados na vertical são iguais
    for(i=0;i < 3;i++){
        if(quadrados[i].value != '' && quadrados[i].value == quadrados[i+3].value && 
           quadrados[i+3].value == quadrados[i+6].value){
                terminou = true;
                return vitoria(quadrados[i].firstChild,quadrados[i+3].firstChild,
                                quadrados[i+6].firstChild,quadrados[i].value);
        }
    }
    // Verifica se os valores dos quadrados na diagonal são iguais
    if(quadrados[4].value != ''){
        if(quadrados[0].value == quadrados[4].value && 
           quadrados[4].value == quadrados[8].value){
                terminou = true;
                return vitoria(quadrados[0].firstChild,quadrados[4].firstChild,
                               quadrados[8].firstChild,quadrados[0].value);
        }
        else if(quadrados[2].value == quadrados[4].value && 
                quadrados[4].value == quadrados[6].value){
                    terminou = true;
                    return vitoria(quadrados[2].firstChild,quadrados[4].firstChild,
                                   quadrados[6].firstChild,quadrados[2].value);
        }
    }
    //Chama a função reinicia quando todos os 9 espaços forem preenchidos
    if(quadrados_preenchidos == 9){
        reinicia();
    }
}

function vitoria(q1,q2,q3,jogador){
    q1.className += ' vitoria';
    q2.className += ' vitoria';
    q3.className += ' vitoria';
    
    if(jogador == 'x'){
        pontos[0]++;
    }
    else{
        pontos[1]++;
    }
    setTimeout(function(){
        reinicia();
    },3000);
}

function reinicia(){
    quadrados_preenchidos = 0;
    
    for(i in quadrados){
       if(quadrados[i].firstChild != null)
           quadrados[i].firstChild.className += ' desaparece';
    }
    
    setTimeout(function(){
        for(i in quadrados){
            if(quadrados[i].firstChild != null){
                quadrados[i].value = '';
                quadrados[i].removeChild(quadrados[i].firstChild);
            }
        }
    },1800)
    
    placar_pontos[0].textContent = pontos[0];
    placar_pontos[1].textContent = pontos[1];
    
    exibeVez();
    terminou = false;
}

inicia();