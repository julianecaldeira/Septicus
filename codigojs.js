/* 
CÓDIGO JAVASCRIPT DO SEPTICUS - CALCULADORA SÉPTICA DESENVOLVIDO POR JULIANE CALDEIRA!
*/

// ---------- DECLARANDO VARIAVEIS ----------

//VARIAVEIS: TANQUE SÉPTICO

var CONTRIBUICAO_ESGOTO;
var CONTRIBUICAO_LODO;
var CONTRIBUICAO_TOTAL_ESGOTO;
var TEMPO_DETENCAO_T;
var TAXA_DE_ACUMULACAO_K;

var VOLUME_UTIL_TANQUE;
var PROFUNDIDADE_TANQUE;
var VOLUME_TOTAL_TANQUE;
var DIAMETRO_LARGURA_TANQUE;
var COMPRIMENTO_TANQUE;

var numPessoas;
var geometria;

//VARIAVEIS: SUMIDOURO

var COEFICIENTE_INF_SUMIDOURO;
var DIAMETRO_SUMIDOURO;
var AREA_INF_SUMIDOURO;
var PROFUNDIDADE_SUMIDOURO;
var VOLUME_TOTAL_SUMIDOURO;

//VARIAVEIS: ÁREAS E PERIMETROS

var AREA_BASE_TANQUE;
var AREA_BASE_SUMIDOURO;
var PERIMETRO_TANQUE;
var PERIMETRO_SUMIDOURO;
var AREA_ALVENARIA_TANQUE;
var AREA_ALVENARIA_SUMIDOURO;

var QUANTIDADE_BLOCOS_TANQUE;
var QUANTIDADE_BLOCOS_SUMIDOURO;

var VOL_ASSENTAMENTO_TANQUE; //referente a arrgamassa de assentamento
var VOL_CONTRAPISO_TANQUE;
var VOL_REG_CONTRAPISO_TANQUE;
var VOL_CHAPISCO_TANQUE;
var VOL_EMBOCO_TANQUE;
var VOL_REBOCO_TANQUE;

var VOL_ASSENTAMENTO_SUMIDOURO;
var VOL_FUNDO_SUMIDOURO; // referente a camada de brita 3 ou 4 no fundo do sumidouro (não há contrapiso)
var VOL_CHAPISCO_SUMIDOURO;
var VOL_EMBOCO_SUMIDOURO;
var VOL_REBOCO_SUMIDOURO;

//VARIAVEIS: QUANTITATIVO DE MATERIAIS

var QUANT_TOTAL_BLOCOS;
var QUANT_TOTAL_CPIII; //CPIII - CIMENTO PORTLAND III - RS
var QUANT_TOTAL_CAL;
var QUANT_TOTAL_AREIA;
var QUANT_TOTAL_BRITA;
var QUANT_TOTAL_BRITA3; //apenas no sumidouro
var QUANT_TOTAL_AGUA; //apenas no concreto do tanque septico

var QUANT_TANQUE_BLOCOS;
var QUANT_TANQUE_CPIII; //CPIII - CIMENTO PORTLAND III - RS
var QUANT_TANQUE_CAL;
var QUANT_TANQUE_AREIA;
var QUANT_TANQUE_BRITA;
var QUANT_TANQUE_AGUA;

var QUANT_SUMIDOURO_BLOCOS;
var QUANT_SUMIDOURO_CPIII; //CPIII - CIMENTO PORTLAND III - RS
var QUANT_SUMIDOURO_CAL;
var QUANT_SUMIDOURO_AREIA;
//var QUANT_SUMIDOURO_BRITA;
var QUANT_SUMIDOURO_BRITA3;


// ---------- FUNÇÕES DE VERIFICAÇÕES ---------- 

//FUNÇÃO MODAL
$(function () {
    $('[data-toggle="popover"]').popover()
})

//FUNÇÃO PARA ESTABELECER OS LIMITES MÍNIMOS E MÁXIMOS
function imposeMinMax(el){
    if(el.value != "0" && el.value != "1"){
        if(parseFloat(el.value) < parseFloat(el.min)){
            el.value = el.min;
        }
        if(parseFloat(el.value) > parseFloat(el.max)){
            el.value = el.max;
        }
    }
} //fim função mínimos e máximos

//FUNÇÃO ALTERAR A LABEL Insira o diâmetro ou largura (m):
function exibirTextoInsiraDiametro(){

    document.getElementById("campoValor").value = "";

    document.getElementById("tipoValor").innerHTML = "Insira o Diâmetro (m):";
    document.getElementById("campoValor").disabled = false;
    document.getElementById("campoValor").setAttribute("min", "1.1");
} 

function exibirTextoInsiraLargura(){
    document.getElementById("campoValor").value = "";
    document.getElementById("tipoValor").innerHTML = "Insira a Largura (m):";
    document.getElementById("campoValor").disabled = false;
    document.getElementById("campoValor").setAttribute("min", "0.8");
} //fim função alteração label

//FUNÇÃO PARA VERIFICAR SE TODOS OS CAMPOS ESTÃO PREENCHIDOS SEM CONSIDERAR O DIMENSIONAMENTO DO SUMIDOURO
function camposOKSemSumidouro(){ 

  radioCircular = document.getElementById("botaoRadioCircular").checked;
  radioRetangular = document.getElementById("botaoRadioRetangular").checked;

  numDigitos1 = document.getElementById("campoValor").value.length;
  numDigitos2 = document.getElementById("campoNumPessoas").value.length;

  tipoResidencia = document.getElementById("tipoResidenciaOption").value.length;

  tempRadio1 = document.getElementById("temperaturaRadio1").checked;
  tempRadio2 = document.getElementById("temperaturaRadio2").checked;
  tempRadio3 = document.getElementById("temperaturaRadio3").checked;

  valorIntervaloLimpeza = document.getElementById("intervaloLimpeza").value.length;

  return ((radioCircular || radioRetangular) 
    && numDigitos1 > 0 
    && numDigitos2 > 0 
    && tipoResidencia > 0
    && (tempRadio1 || tempRadio2 || tempRadio3)
    && valorIntervaloLimpeza > 0);

} //fim função camposOKSemSumidouro


//FUNÇÃO PARA VERIFICAR SE TODOS OS CAMPOS ESTÃO PREENCHIDOS CONSIDERANDO O DIMENSIONAMENTO DO SUMIDOURO
function camposOKComSumidouro(){

  radioCircular = document.getElementById("botaoRadioCircular").checked;
  radioRetangular = document.getElementById("botaoRadioRetangular").checked;

  numDigitos1 = document.getElementById("campoValor").value.length;
  numDigitos2 = document.getElementById("campoNumPessoas").value.length;

  tipoResidencia = document.getElementById("tipoResidenciaOption").value.length;

  tempRadio1 = document.getElementById("temperaturaRadio1").checked;
  tempRadio2 = document.getElementById("temperaturaRadio2").checked;
  tempRadio3 = document.getElementById("temperaturaRadio3").checked;

  valorIntervaloLimpeza = document.getElementById("intervaloLimpeza").value.length;

  valorCampoD = document.getElementById("campoDIAMETRO_SUMIDOURO").value.length;
  valorCampoC = document.getElementById("campoCOEFICIENTE_INF_SUMIDOURO").value.length;

  return ((radioCircular || radioRetangular) 
    && numDigitos1 > 0 
    && numDigitos2 > 0 
    && tipoResidencia > 0
    && (tempRadio1 || tempRadio2 || tempRadio3)
    && valorIntervaloLimpeza > 0
    && valorCampoD > 0
    && valorCampoC > 0);
} //fim função camposOKComSumidouro


//FUNÇÃO PARA CONFERIR SE O BOTÃO DO SUMIDOURO FOI HABILITADO
document.getElementById('customSwitch1').onchange = function() {
  //document.getElementById('campoSumidouro').disabled = !this.checked;
  document.getElementById('campoCoeficienteSumidouro').style.display = "block";
    if(!document.getElementById("customSwitch1").checked){
        document.getElementById("campoCoeficienteSumidouro").style.display = "none";
    }
};

function checkSeSumidouroAtivo(){
    return document.getElementById("customSwitch1").checked;
}

function setCorSumidouroSelecionado(){
    document.getElementById("corStatusSumidouro").className ="alert alert-primary";
}

function setCorSumidouroNaoSelecionado(){
    document.getElementById("corStatusSumidouro").className ="alert alert-danger";
} //fim conf. sumidouro


// ---------- FUNÇÕES - ATRIBUINDO VALORES A DADOS DE ENTRADA ---------- 

$('#tipoResidenciaOption').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;

    switch(valueSelected) {
        case '1':
            CONTRIBUICAO_ESGOTO = 160;
            CONTRIBUICAO_LODO = 1;
        break;

        case '2':
            CONTRIBUICAO_ESGOTO = 130;
            CONTRIBUICAO_LODO = 1;
        break;

        case '3':
            CONTRIBUICAO_ESGOTO = 100;
            CONTRIBUICAO_LODO = 1;
        break;

        case '4':
            CONTRIBUICAO_ESGOTO = 100;
            CONTRIBUICAO_LODO = 1;
        break;

        case '5':
            CONTRIBUICAO_ESGOTO = 80;
            CONTRIBUICAO_LODO = 1;
        break;

        case '6':
            CONTRIBUICAO_ESGOTO = 70;
            CONTRIBUICAO_LODO = 0.30;
        break;

        case '7':
            CONTRIBUICAO_ESGOTO = 50;
            CONTRIBUICAO_LODO = 0.20;
        break;

        case '8':
            CONTRIBUICAO_ESGOTO = 50;
            CONTRIBUICAO_LODO = 0.20
        break;

        case '9':
            CONTRIBUICAO_ESGOTO = 50;
            CONTRIBUICAO_LODO = 0.20;
        break;

        case '10':
            CONTRIBUICAO_ESGOTO = 6;
            CONTRIBUICAO_LODO = 0.10;
        break;

        case '11':
            CONTRIBUICAO_ESGOTO = 25;
            CONTRIBUICAO_LODO = 0.10;
        break;

        case '12':
            CONTRIBUICAO_ESGOTO = 2;
            CONTRIBUICAO_LODO = 0.02;
        break;


        case '13':
            CONTRIBUICAO_ESGOTO = 480;
            CONTRIBUICAO_LODO = 4.0;
        break; 

        default:
    }
});


//FUNÇÃO ATRIBUINDO VARIAVEIS
function getContribuicaoEsgoto(){
    console.log("Esgoto : " + CONTRIBUICAO_ESGOTO);
}

function getContribuicaoLodo(){
    console.log("Lodo : " + CONTRIBUICAO_LODO);
}



// ---------- FUNÇÕES - METODOLOGIA DE CÁLCULO SEPTICUS ---------- 

function capturarNumeroPessoas(){ //PRIMEIRA CHAMADA
    numPessoas = document.getElementById("campoNumPessoas").value;
}

function capturarDIAMETRO_LARGURA_TANQUE(){ //SEGUNDA CHAMADA
    DIAMETRO_LARGURA_TANQUE = parseFloat(document.getElementById("campoValor").value);
}

function calcularCOMPRIMENTO_TANQUE(){ 
    COMPRIMENTO_TANQUE = parseFloat((2*DIAMETRO_LARGURA_TANQUE).toFixed(2));
}

function calcularContribuicaoTotalEsgoto(){ //TERCEIRA CHAMADA
    CONTRIBUICAO_TOTAL_ESGOTO = CONTRIBUICAO_ESGOTO * numPessoas;
}

function calcularTempoDetencao(){ //QUARTA CHAMADA

    if(CONTRIBUICAO_TOTAL_ESGOTO <= 1500){
        TEMPO_DETENCAO_T = 1;
    }

    if(CONTRIBUICAO_TOTAL_ESGOTO > 1500 && CONTRIBUICAO_TOTAL_ESGOTO <= 3000){
        TEMPO_DETENCAO_T = 0.92;
    }

    if(CONTRIBUICAO_TOTAL_ESGOTO > 3000 && CONTRIBUICAO_TOTAL_ESGOTO <= 4500){
        TEMPO_DETENCAO_T = 0.83;
    }

    if(CONTRIBUICAO_TOTAL_ESGOTO > 4500 && CONTRIBUICAO_TOTAL_ESGOTO <= 6000){
        TEMPO_DETENCAO_T = 0.75;
    }

    if(CONTRIBUICAO_TOTAL_ESGOTO > 6000 && CONTRIBUICAO_TOTAL_ESGOTO <= 7500){
        TEMPO_DETENCAO_T = 0.67;
    }

    if(CONTRIBUICAO_TOTAL_ESGOTO > 7500 && CONTRIBUICAO_TOTAL_ESGOTO <= 9000){
        TEMPO_DETENCAO_T = 0.58;
    }

    if(CONTRIBUICAO_TOTAL_ESGOTO > 9000){
        TEMPO_DETENCAO_T = 0.5;
    }
}

function calcularTaxaAcumulacao(){ //QUINTA CHAMADA
    var intervaloLimpeza = $( "#intervaloLimpeza" ).val();
    var temperatura = $('input[name="flexRadioDefault"]:checked').val();

    switch(intervaloLimpeza){
        case '1':
            if(temperatura == "igualAbaixo10"){
                TAXA_DE_ACUMULACAO_K = 94;
            }
          
            if(temperatura == "entre10e20"){
                TAXA_DE_ACUMULACAO_K = 65;
            }
          
            if(temperatura == "igualSuperior20"){
                TAXA_DE_ACUMULACAO_K = 57;
            }
        break;

        case '2':
            if(temperatura == "igualAbaixo10"){
                TAXA_DE_ACUMULACAO_K = 134;
            }
          
            if(temperatura == "entre10e20"){
                TAXA_DE_ACUMULACAO_K = 105;
            }
          
            if(temperatura == "igualSuperior20"){
                TAXA_DE_ACUMULACAO_K = 97;
            }
        break;
      
        case '3':
            if(temperatura == "igualAbaixo10"){
                TAXA_DE_ACUMULACAO_K = 174;
            }
            
            if(temperatura == "entre10e20"){
                TAXA_DE_ACUMULACAO_K = 145;
            }
            
            if(temperatura == "igualSuperior20"){
                TAXA_DE_ACUMULACAO_K = 137;
            }
        break;
        
        case '4':
            if(temperatura == "igualAbaixo10"){
                TAXA_DE_ACUMULACAO_K = 214;
            }
            if(temperatura == "entre10e20"){
                TAXA_DE_ACUMULACAO_K = 183;
            }
            if(temperatura == "igualSuperior20"){
                TAXA_DE_ACUMULACAO_K = 177;
            }
        break;
        
        case '5':
            if(temperatura == "igualAbaixo10"){
                TAXA_DE_ACUMULACAO_K = 254;
            }
            if(temperatura == "entre10e20"){
                TAXA_DE_ACUMULACAO_K = 225;
            }
            if(temperatura == "igualSuperior20"){
                TAXA_DE_ACUMULACAO_K = 217;
            }
        break;
    }
}

function calcularVolumeUtilTanque(){ //SEXTA CHAMADA
    VOLUME_UTIL_TANQUE = parseFloat((0.001*(1000 + (numPessoas * ((CONTRIBUICAO_ESGOTO * TEMPO_DETENCAO_T) + (TAXA_DE_ACUMULACAO_K * CONTRIBUICAO_LODO))))).toFixed(2));
}

function calcularProfundidadeTanque(){ //SETIMA CHAMADA
    if(VOLUME_UTIL_TANQUE <= 6){
        PROFUNDIDADE_TANQUE = parseFloat((1.20).toFixed(2));
    }
    if(VOLUME_UTIL_TANQUE > 6 && VOLUME_UTIL_TANQUE < 10){
        PROFUNDIDADE_TANQUE = parseFloat((1.50).toFixed(2));
    }
    if(VOLUME_UTIL_TANQUE > 10){
        PROFUNDIDADE_TANQUE = parseFloat((1.80).toFixed(2));
    }
}

function calcularVolumeTotalTanque(){ //OITAVA CHAMADA
    geometria = $('input[name="optradio"]:checked').val();

    if(geometria == "cilindrico"){
        VOLUME_TOTAL_TANQUE = parseFloat((Math.PI * 0.25 * DIAMETRO_LARGURA_TANQUE * DIAMETRO_LARGURA_TANQUE * PROFUNDIDADE_TANQUE).toFixed(2));
    }
    
    if (geometria == "retangular"){
        VOLUME_TOTAL_TANQUE = parseFloat((COMPRIMENTO_TANQUE * DIAMETRO_LARGURA_TANQUE * PROFUNDIDADE_TANQUE).toFixed(2));
    }

return Math.round(VOLUME_TOTAL_TANQUE);
}

//FUNÇÕES DIMENSIONAMENTO SUMIDOURO

function capturarValoresCamposSumidouro(){
    COEFICIENTE_INF_SUMIDOURO = document.getElementById("campoCOEFICIENTE_INF_SUMIDOURO").value; // capturando campo Coeficiente de infiltração do sumidouro
    
    DIAMETRO_SUMIDOURO = document.getElementById("campoDIAMETRO_SUMIDOURO").value; // capturando campo diametro do sumidouro
}

function calcularAreaInfiltracaoSumidouro(){ //NONA CHAMADA
    AREA_INF_SUMIDOURO = ((numPessoas*CONTRIBUICAO_ESGOTO*TEMPO_DETENCAO_T)/COEFICIENTE_INF_SUMIDOURO); //função para o cálculo da área de infiltração do sumidouro
}

function calcularProfundidadeSumidouro(){ //DECIMA CHAMADA
    PROFUNDIDADE_SUMIDOURO = parseFloat(((AREA_INF_SUMIDOURO-(Math.PI*0.25*DIAMETRO_SUMIDOURO*DIAMETRO_SUMIDOURO))/(Math.PI*DIAMETRO_SUMIDOURO)).toFixed(2)); //com a área de infiltração e dados de entrada é possível calcular a profundidade do sumidouro
}

function calcularVolumeTotalSumidouro(){
    VOLUME_TOTAL_SUMIDOURO = parseFloat((PROFUNDIDADE_SUMIDOURO*((Math.PI * DIAMETRO_SUMIDOURO * DIAMETRO_SUMIDOURO)/4)).toFixed(2)); //volume total do sumidouro
}

//FUNÇÃO VERIFICAÇÃO TODOS OS CAMPOS
function verificarEProcessar(){
    if(checkSeSumidouroAtivo()){    
        if(camposOKComSumidouro()){
            gerarRelatorioBETA();
        }else{
            alert("É necessário preencher todos os campos.");
        }
    }else{

        if(camposOKSemSumidouro()){
            gerarRelatorioBETA();
        }else{
            alert("É necessário preencher todos os campos.");
        }
    }
}




// CHAMADAS - FUNÇÕES DE ÁREAS E VOLUMES PARA O CÁLCULO DOS MATERIAIS

// TANQUE SÉPTICO
function calcularAREA_BASE_TANQUE(){ //
    geometria = $('input[name="optradio"]:checked').val();
    if(geometria == "cilindrico"){
        AREA_BASE_TANQUE = (Math.PI*DIAMETRO_LARGURA_TANQUE*DIAMETRO_LARGURA_TANQUE)/4;
    }
 
    if (geometria == "retangular"){
        AREA_BASE_TANQUE = DIAMETRO_LARGURA_TANQUE*COMPRIMENTO_TANQUE;
    }

    return Math.round(AREA_BASE_TANQUE);
}

function calcularPERIMETRO_TANQUE(){
    geometria = $('input[name="optradio"]:checked').val();

    if(geometria == "cilindrico"){
        PERIMETRO_TANQUE = Math.PI*DIAMETRO_LARGURA_TANQUE;
    }
 
    if (geometria == "retangular"){
        PERIMETRO_TANQUE = 2*(DIAMETRO_LARGURA_TANQUE+COMPRIMENTO_TANQUE);
    }

    return Math.round(PERIMETRO_TANQUE);
}

function calcularAREA_ALVENARIA_TANQUE(){
    AREA_ALVENARIA_TANQUE = PERIMETRO_TANQUE*PROFUNDIDADE_TANQUE;
}

// SUMIDOURO
function calcularAREA_BASE_SUMIDOURO(){
    AREA_BASE_SUMIDOURO = (Math.PI*Math.pow(DIAMETRO_SUMIDOURO,2)/4);
}

function calcularPERIMETRO_SUMIDOURO(){
    PERIMETRO_SUMIDOURO = Math.PI*DIAMETRO_SUMIDOURO;
}

function calcularAREA_ALVENARIA_SUMIDOURO(){
    AREA_ALVENARIA_SUMIDOURO = PERIMETRO_SUMIDOURO*PROFUNDIDADE_SUMIDOURO;
}

// CHAMADAS - FUNÇÕES QUANTIDADE DE BLOCOS

function calcularQUANTIDADE_BLOCOS_TANQUE(){
    QUANTIDADE_BLOCOS_TANQUE = Math.ceil(AREA_ALVENARIA_TANQUE*25); //quantidade de blocos arredonda para o número inteiro imed. superior
}

function calcularQUANTIDADE_BLOCOS_SUMIDOURO(){
    QUANTIDADE_BLOCOS_SUMIDOURO = Math.ceil(AREA_ALVENARIA_SUMIDOURO*25); //quantidade de blocos arredonda para o número inteiro imed. superior
}

function calcularQUANT_TOTAL_BLOCOS(){
    QUANT_TOTAL_BLOCOS = QUANTIDADE_BLOCOS_TANQUE+QUANTIDADE_BLOCOS_SUMIDOURO;
}
// CHAMADAS - FUNÇÕES VOLUME DE MATERIAIS

// TANQUE SÉPTICO
function calcularVOL_ASSENTAMENTO_TANQUE(){
    VOL_ASSENTAMENTO_TANQUE = 0.028*AREA_ALVENARIA_TANQUE;
}

function calcularVOL_CONTRAPISO_TANQUE(){
    geometria = $('input[name="optradio"]:checked').val();

    if(geometria == "cilindrico"){
        VOL_CONTRAPISO_TANQUE = 0.06*((Math.PI*Math.pow(DIAMETRO_LARGURA_TANQUE+0.22,2))/4);
    }
 
    if (geometria == "retangular"){
        VOL_CONTRAPISO_TANQUE = 0.06*((DIAMETRO_LARGURA_TANQUE+0.22*2)*(COMPRIMENTO_TANQUE+0.22*2));
    }

    return Math.round(VOL_CONTRAPISO_TANQUE);
}

function calcularVOL_REG_CONTRAPISO_TANQUE(){
    VOL_REG_CONTRAPISO_TANQUE = AREA_BASE_TANQUE*0.01;
}

function calcularVOL_CHAPISCO_TANQUE(){
    VOL_CHAPISCO_TANQUE = AREA_ALVENARIA_TANQUE*0.003;
}

function calcularVOL_EMBOCO_TANQUE(){
    VOL_EMBOCO_TANQUE = AREA_ALVENARIA_TANQUE*0.01;
}

function calcularVOL_REBOCO_TANQUE(){
    VOL_REBOCO_TANQUE = AREA_ALVENARIA_TANQUE*0.005;
}

// SUMIDOURO
function calcularVOL_ASSENTAMENTO_SUMIDOURO(){
    VOL_ASSENTAMENTO_SUMIDOURO = 0.028*AREA_ALVENARIA_SUMIDOURO;
}

function calcularVOL_FUNDO_SUMIDOURO(){
    VOL_FUNDO_SUMIDOURO = 0.5*((Math.PI*Math.pow(DIAMETRO_SUMIDOURO,2)/4));
}

function calcularVOL_CHAPISCO_SUMIDOURO(){
    VOL_CHAPISCO_SUMIDOURO = AREA_ALVENARIA_SUMIDOURO*0.003;
}

function calcularVOL_EMBOCO_SUMIDOURO(){
    VOL_EMBOCO_SUMIDOURO = AREA_ALVENARIA_SUMIDOURO*0.01;
}

function calcularVOL_REBOCO_SUMIDOURO(){
    VOL_REBOCO_SUMIDOURO = AREA_ALVENARIA_SUMIDOURO*0.005;
}


// CHAMADAS - QUANTIDADE DE MATERIAIS POR CONSUMO M³ - CIMENTO

function calcularQUANT_TANQUE_CPIII(){
    QUANT_TANQUE_CPIII = (VOL_CONTRAPISO_TANQUE*4.2)+(VOL_REG_CONTRAPISO_TANQUE*10)+(VOL_ASSENTAMENTO_TANQUE*3.65)+(VOL_CHAPISCO_TANQUE*7.4)+(VOL_EMBOCO_TANQUE*4.9)+(VOL_REBOCO_TANQUE*3.3);
}

function calcularQUANT_SUMIDOURO_CPIII(){
    QUANT_SUMIDOURO_CPIII = (VOL_ASSENTAMENTO_SUMIDOURO*3.65)+(VOL_CHAPISCO_SUMIDOURO*7.4)+(VOL_EMBOCO_SUMIDOURO*4.9)+(VOL_REBOCO_SUMIDOURO*3.3);
}

function calcularQUANT_TOTAL_CPIII(){
    QUANT_TOTAL_CPIII = Math.ceil(QUANT_TANQUE_CPIII+QUANT_SUMIDOURO_CPIII);
}



// CHAMADAS - QUANTIDADE DE MATERIAIS POR CONSUMO M³ - CAL

function calcularQUANT_TANQUE_CAL(){
    QUANT_TANQUE_CAL = (VOL_ASSENTAMENTO_TANQUE*9)+(VOL_EMBOCO_TANQUE*2.9)+(VOL_REBOCO_TANQUE*7.8);
}

function calcularQUANT_SUMIDOURO_CAL(){
    QUANT_SUMIDOURO_CAL = (VOL_ASSENTAMENTO_SUMIDOURO*9)+(VOL_EMBOCO_SUMIDOURO*2.9)+(VOL_REBOCO_SUMIDOURO*7.8);
}

function calcularQUANT_TOTAL_CAL(){
    QUANT_TOTAL_CAL = Math.ceil(QUANT_TANQUE_CAL+QUANT_SUMIDOURO_CAL);
}


// CHAMADAS - QUANTIDADE DE MATERIAIS POR CONSUMO M³ - AREIA

function calcularQUANT_TANQUE_AREIA(){
    QUANT_TANQUE_AREIA = (VOL_CONTRAPISO_TANQUE*0.564)+(VOL_REG_CONTRAPISO_TANQUE*1.08)+(VOL_ASSENTAMENTO_TANQUE*1.4)+(VOL_CHAPISCO_TANQUE*1.1)+(VOL_EMBOCO_TANQUE*1.1)+(VOL_REBOCO_TANQUE*1.1);
}

function calcularQUANT_SUMIDOURO_AREIA(){
    QUANT_SUMIDOURO_AREIA = (VOL_ASSENTAMENTO_SUMIDOURO*1.4)+(VOL_CHAPISCO_SUMIDOURO*1.1)+(VOL_EMBOCO_SUMIDOURO*1.1)+(VOL_REBOCO_SUMIDOURO*1.1);
}

function calcularQUANT_TOTAL_AREIA(){
    QUANT_TOTAL_AREIA = Math.ceil(QUANT_TANQUE_AREIA+QUANT_SUMIDOURO_AREIA);
}

// CHAMADAS - QUANTIDADE DE MATERIAIS POR CONSUMO M³ - BRITA 01

function calcularQUANT_TANQUE_BRITA(){
    QUANT_TANQUE_BRITA = VOL_CONTRAPISO_TANQUE*0.441;
}

//function calcularQUANT_SUMIDOURO_BRITA(){
//    QUANT_SUMIDOURO_BRITA = 0;
//}

function calcularQUANT_TOTAL_BRITA(){
    QUANT_TOTAL_BRITA = Math.ceil(QUANT_TANQUE_BRITA);
}



// CHAMADAS - QUANTIDADE DE MATERIAIS POR CONSUMO M³ - BRITA 03

function calcularQUANT_SUMIDOURO_BRITA3(){
    QUANT_SUMIDOURO_BRITA3 = 0.5*(Math.PI*Math.pow(DIAMETRO_SUMIDOURO/2,2));
}

function calcularQUANT_TOTAL_BRITA3(){
    QUANT_TOTAL_BRITA3 = Math.ceil(QUANT_SUMIDOURO_BRITA3);
}


// CHAMADAS - QUANTIDADE DE MATERIAIS POR CONSUMO M³ - água

function calcularQUANT_TANQUE_AGUA(){
    QUANT_TANQUE_AGUA = (VOL_CONTRAPISO_TANQUE*198);
}

function calcularQUANT_TOTAL_AGUA(){
    QUANT_TOTAL_AGUA = Math.ceil(QUANT_TANQUE_AGUA); //RETORNA NÚMERO INTEIRO IMEDIATAMENTO MAIOR
}


// ---------- FUNÇÃO INSERIR VALORES PARA SEREM IMPRESSOS NO RELATÓRIO ---------- 

function inserirValoresPost(){
    /* Geral */
    document.getElementById("postGeometria").value = geometria;
    document.getElementById("postDimensaoDIAMETRO_LARGURA_TANQUE").value = document.getElementById("campoValor").value;
    document.getElementById("postComprimento").value = COMPRIMENTO_TANQUE;
    document.getElementById("postProfundidadeTanque").value = PROFUNDIDADE_TANQUE;
    document.getElementById("postVolumeTotalTanque").value = VOLUME_TOTAL_TANQUE;

    /* Exclusivo caso sumidouro */
    document.getElementById("postDiametroSumidouro").value = DIAMETRO_SUMIDOURO;
    document.getElementById("postProfundidadeSumidouro").value = PROFUNDIDADE_SUMIDOURO;
    document.getElementById("volumeTotalSumidouro").value = VOLUME_TOTAL_SUMIDOURO;


    /* TABELA QUANTITATIVO DE MATERIAIS */
    document.getElementById("postBlocoTanque").value = QUANTIDADE_BLOCOS_TANQUE;
    document.getElementById("postBlocoSumidouro").value = QUANTIDADE_BLOCOS_SUMIDOURO;
    document.getElementById("postBlocoTotal").value = QUANT_TOTAL_BLOCOS;
    document.getElementById("postCimentoTanque").value = parseFloat(QUANT_TANQUE_CPIII.toFixed(2));
    document.getElementById("postCimentoSumidouro").value = parseFloat(QUANT_SUMIDOURO_CPIII.toFixed(2));
    document.getElementById("postCimentoTotal").value = QUANT_TOTAL_CPIII;
    document.getElementById("postCalTanque").value = parseFloat(QUANT_TANQUE_CAL.toFixed(2));
    document.getElementById("postCalSumidouro").value = parseFloat(QUANT_SUMIDOURO_CAL.toFixed(2));
    document.getElementById("postCalTotal").value = QUANT_TOTAL_CAL;
    document.getElementById("postAreiaTanque").value = parseFloat(QUANT_TANQUE_AREIA.toFixed(2));
    document.getElementById("postAreiaSumidouro").value = parseFloat(QUANT_SUMIDOURO_AREIA.toFixed(2));
    document.getElementById("postAreiaTotal").value = QUANT_TOTAL_AREIA;
    document.getElementById("postBrita01Tanque").value = parseFloat(QUANT_TANQUE_BRITA.toFixed(2));
    //document.getElementById("postBrita01Sumidouro").value = QUANT_SUMIDOURO_BRITA;
    document.getElementById("postBrita01Total").value = QUANT_TOTAL_BRITA;
    document.getElementById("postBrita03Sumidouro").value = parseFloat(QUANT_SUMIDOURO_BRITA3.toFixed(2));
    document.getElementById("postBrita03Total").value = QUANT_TOTAL_BRITA3;
    document.getElementById("postAguaTanque").value = parseFloat(QUANT_TANQUE_AGUA.toFixed(2));
    document.getElementById("postAguaTotal").value = QUANT_TOTAL_AGUA;

}

function inserirValoresTabela(){


}


// ---------- CONFERÊNCIA SE TODOS AS CHAMADAS FORAM EXECUTADAS ---------- 

function gerarRelatorioBETA(){
    capturarNumeroPessoas();
    capturarDIAMETRO_LARGURA_TANQUE();
    calcularCOMPRIMENTO_TANQUE();
    calcularContribuicaoTotalEsgoto();
    calcularTempoDetencao();
    calcularTaxaAcumulacao();
    calcularVolumeUtilTanque();
    calcularProfundidadeTanque();
    calcularVolumeTotalTanque();
    // novo
    capturarValoresCamposSumidouro();
    calcularAreaInfiltracaoSumidouro();
    calcularProfundidadeSumidouro();
    // novo
    calcularVolumeTotalSumidouro();
    //novo p/ gerar relatorio
    //inserirValoresPost();
    //novo p/ gerar relatorio
    calcularAREA_BASE_TANQUE();
    calcularPERIMETRO_TANQUE();
    calcularAREA_ALVENARIA_TANQUE();
    calcularAREA_BASE_SUMIDOURO();
    calcularPERIMETRO_SUMIDOURO();
    calcularAREA_ALVENARIA_SUMIDOURO();

    calcularQUANTIDADE_BLOCOS_TANQUE();
    calcularQUANTIDADE_BLOCOS_SUMIDOURO();
    calcularQUANT_TOTAL_BLOCOS();

    calcularVOL_ASSENTAMENTO_TANQUE();
    calcularVOL_CONTRAPISO_TANQUE();
    calcularVOL_REG_CONTRAPISO_TANQUE();
    calcularVOL_CHAPISCO_TANQUE();
    calcularVOL_EMBOCO_TANQUE();
    calcularVOL_REBOCO_TANQUE();

    calcularVOL_ASSENTAMENTO_SUMIDOURO();
    calcularVOL_FUNDO_SUMIDOURO();
    calcularVOL_CHAPISCO_SUMIDOURO();
    calcularVOL_EMBOCO_SUMIDOURO();
    calcularVOL_REBOCO_SUMIDOURO();

    calcularQUANT_TANQUE_CPIII();
    calcularQUANT_SUMIDOURO_CPIII();
    calcularQUANT_TOTAL_CPIII();

    calcularQUANT_TANQUE_CAL();
    calcularQUANT_SUMIDOURO_CAL();
    calcularQUANT_TOTAL_CAL();

    calcularQUANT_TANQUE_AREIA();
    calcularQUANT_SUMIDOURO_AREIA();
    calcularQUANT_TOTAL_AREIA();

    calcularQUANT_TANQUE_BRITA();
    calcularQUANT_TOTAL_BRITA();

    calcularQUANT_SUMIDOURO_BRITA3();
    calcularQUANT_TOTAL_BRITA3();

    calcularQUANT_TANQUE_AGUA();
    calcularQUANT_TOTAL_AGUA();



    inserirValoresPost();

    
 // ---------- IMPRESSÃOO DADOS MODAL SUSPENSO ---------- 

    if(geometria == "cilindrico"){
        document.getElementById("relatorioGeometria").innerHTML = "Tanque séptico em formato circular."; //informações impressão no modal da geometria
        document.getElementById("relatorioDimensoes").innerHTML = "Diâmetro: " + DIAMETRO_LARGURA_TANQUE + "m. <br> Profundidade: " + PROFUNDIDADE_TANQUE + "m."; //informações impressão no modal do diametro
        document.getElementById("relatorioVolumeUtil").innerHTML = "Volume Útil: " + VOLUME_UTIL_TANQUE + " m³"; //informações impressão no modal volume util
        document.getElementById("relatorioVolumeTotal").innerHTML = "Volume total: " + VOLUME_TOTAL_TANQUE + "m³.";  //informações impressão no modal volume total

        if(checkSeSumidouroAtivo()){
            document.getElementById("statusSumidouro").innerHTML = "Sumidouro selecionado";	
                setCorSumidouroSelecionado();
            document.getElementById("campoDimensoesSumidouro").style.display = "block";
            document.getElementById("relatorioSumidouro").innerHTML = "Diâmetro: " + DIAMETRO_SUMIDOURO + "m. <br> Profudidade: " + PROFUNDIDADE_SUMIDOURO + "m." + "<br> Volume Total: " + VOLUME_TOTAL_SUMIDOURO; //informações impressão geometria do sumidouro
        }else{
            document.getElementById("statusSumidouro").innerHTML = "Sumidouro não selecionado!";
                setCorSumidouroNaoSelecionado();
            document.getElementById("campoDimensoesSumidouro").style.display = "none";
        }
    }

    if (geometria == "retangular"){
        document.getElementById("relatorioGeometria").innerHTML = "Tanque séptico em formato retangular."; //informações impressão no modal da geometria
        document.getElementById("relatorioDimensoes").innerHTML = "Largura: " + DIAMETRO_LARGURA_TANQUE + "m <br> Comprimento: " + COMPRIMENTO_TANQUE + "m. <br> Profundidade: " + PROFUNDIDADE_TANQUE + "m."; //informações impressão no modal da largura e comprimento
        document.getElementById("relatorioVolumeUtil").innerHTML = VOLUME_UTIL_TANQUE + "m³."; //informações impressão no modal volume util
        document.getElementById("relatorioVolumeTotal").innerHTML = VOLUME_TOTAL_TANQUE + "m³.";  //informações impressão no modal volume total

        if(checkSeSumidouroAtivo()){
            document.getElementById("statusSumidouro").innerHTML = "Sumidouro selecionado";
                setCorSumidouroSelecionado();
            document.getElementById("campoDimensoesSumidouro").style.display = "block";
            document.getElementById("relatorioSumidouro").innerHTML = "Diâmetro: " + DIAMETRO_SUMIDOURO + "m. <br> Profudidade: " + PROFUNDIDADE_SUMIDOURO + "m." + "<br> Volume Total: " + VOLUME_TOTAL_SUMIDOURO; //informações impressão geometria do sumidouro
        }else{
            document.getElementById("statusSumidouro").innerHTML = "Sumidouro não selecionado !";
                setCorSumidouroNaoSelecionado();
            document.getElementById("campoDimensoesSumidouro").style.display = "none";
        }
    }
    $('#exampleModal').modal('show'); //O modal nasce invisível apenas a verificações e população de todas as informações ele torna-se visível
}