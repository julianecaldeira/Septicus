<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<!------ Include the above in your HEAD tag ---------->


<style type="text/css">
.invoice {
    position: relative;
    background: #fff;
    border: 1px solid #f4f4f4;
    padding: 20px;
    margin: 10px 25px;
}
.page-header {
    margin: 10px 0 20px 0;
    font-size: 22px;
}
</style>

<?php
//VARIÁVEIS RECEBIDAS
if(!isset($_POST["geometria"])){
    header("Location: index.php"); 
    die();
}


$diametro = "";
$largura = "";

$diametroOuLargura = "";


//echo "<h2> ESTOU FUNCIONANDO !!! </h2>";

$diametroSumidouro = "";
$profundidadeSumidouro = "";
$volumeTotalSumidouro = "";

$geometria = $_POST["geometria"];

if($geometria == "retangular"){
    $largura = $_POST["dimensaoDIAMETRO_LARGURA_TANQUE"];
    $diametroOuLargura = "Largura";
}elseif($geometria == "cilindrico"){
    $diametro = $_POST["dimensaoDIAMETRO_LARGURA_TANQUE"];
    $diametroOuLargura = "Diâmetro";
}

$comprimento = $_POST["comprimento"];
$profundidadeTanque = $_POST["profundidadeTanque"];
$volumeTotalTanque = $_POST["volumeTotalTanque"];

if(isset($_POST["diametroSumidouro"])){
    $diametroSumidouro = $_POST["diametroSumidouro"];
    $profundidadeSumidouro = $_POST["profundidadeSumidouro"];
    $volumeTotalSumidouro = $_POST["volumeTotalSumidouro"];
}







?>

<section class="content content_content" style="width: 70%; margin: auto;">
    <section class="invoice">

        <!-- TÍTULO -->
        <div class="row">
            <div class="col-xs-12">
                <h2 class="page-header">
                    <i class="fa fa-globe"></i> <img id="imagembanner" src="imagens/SepticusLogo.png" width="35%">
                </h2>
            </div><!-- /.col -->
        </div>

        <!-- linhas de informações sobre o projeto -->
        <div class="row invoice-info">
            
            <div class="col-sm-4 invoice-col">
                SEPTICUS<br>
                Calculadora séptica<br>
                Relatório de dimensionamento<br>
                Iniciação em Desenvolvimento Tecnológico e Inovação<br>
                IFBA - campus Eunápolis<br>
                <address>
                    <strong>
                    </strong>
                </address>
            </div><!-- /.col -->
            
            <!-- linhas de informações sobre desenvolvedor -->
            <div class="col-sm-4 invoice-col">
                Desenvolvido por
                <address>
                    <b>Juliane Caldeira</b><br>
                    Técnica em Edificações <br>
                    Graduanda em Engenharia Civil <br>
                    <!-- <a class="nav-link" href="https://www.linkedin.com/in/julianecaldeira/">LinkedIn</a> -->
                </address>
            </div><!-- /.col -->

            <!-- linhas de informações sobre o SEPTICUS -->
            <div class="col-sm-4 invoice-col">
                <b>Calculadora séptica</b><br>
                <br>
                Dimensionamento: <b>Tanque séptico residencial</b><br>
                Dimensionamento: <b>Sumidouro</b><br>
                <b>Quantitativo de materiais</b><br>
            </div><!-- /.col -->
        
        </div><!-- /.linhas de informações sobre o projeto -->
        <br>

        <!-- INFORMAÇÕES DO MODAL SUSPENSO: INFORMAÇÕES GEOMETRICAS DO DIMENSIONAMENTO -->
        
        <h4>Dimensões</h4> <!-- titulo -->
        <p></p>
        <div class="table-responsive">
            <table class="table">
                <tbody>

                    <!-- programar de forma que dependendo da opção de dimensionamento apareça ou não uma linha. 
                        Exemplo: só parece a segunda linha de sumidouro caso o mesmo tenha sido selecionado. 
                        Se a fossa for cilindra apareça uma linha que tenha diametro e profundidade, 
                        senão apareça uma linha que tenha largura, comprimento e profundidade!-->

                    <thead>
                        <tr>
                            <th>Equipamento</th>
                            <th>Geometria</th>
                            <th><?php echo $diametroOuLargura  ?> (m)</th>
                            
                            <?php 
                                if($geometria == "retangular"){
                                    echo "<th> Comprimento (m) </th> ";
                            }                         
                            ?>

                            <th>Profundidade (m)</th>
                            <th>Volume total (m³)</th>
                        </tr>
                    </thead> 

                    <tbody>
                        <tr>
                            <th> Tanque séptico </th>
                            <td> <?php  echo $geometria  ?> </td>
                            
                            <td> 
                            <?php 
                            if($geometria == "retangular"){
                                echo $largura;
                            }elseif($geometria == "cilindrico"){
                                echo $diametro;
                            }
                            ?> 
                            </td>
                            
                            <?php                          
                                if($geometria == "retangular"){
                                    echo "<td> " . $comprimento . "</td>";
                                } 
                            ?>

                            <td> <?php  echo $profundidadeTanque?> </td>
                            <td> <?php echo $volumeTotalTanque ?> </td>
                        </tr>


                        

                    <?php 
                    ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){

                        echo "<thead>";
                        echo "<tr>";
                                echo "<th> Equipamento </th>";
                                echo "<th> Geometria </th>";
                                echo "<th> Diametro (m) </th>";
                                echo "<th> Profundidade (m) </th>";
                                echo "<th> Volume total (m³) </th>";
                        echo "</tr>";
                        echo "</thead>";

                        echo "<tbody>";
                                echo "<th> Sumidouro </th>";
                                echo "<td> cilíndrico </td>";
                                echo "<td>" . $diametroSumidouro . "</td>";
                                echo "<td>" . $profundidadeSumidouro . "</td>";
                                echo "<td>" . $volumeTotalSumidouro . "</td>";
                        echo "</tbody>";

                    }else{
                        echo "<h5> Não possui sumidouro! </h5>";
                    }

                    ?>

                </tbody>
            </table>
        </div>
       <br><br>

       <!-- TABELA INFORMATIVA CONSUMO DE MATERIAIS-->
       <div id="tabelaConsumoMateriais">
       <h4>Consumo de materiais por m³ de concreto</h4> <!-- titulo -->
       <div class="row">
           <div class="col-xs-12 table-responsive">

               <table class="table table-striped">
                   <thead>
                       <tr>
                           <th>Mistura</th>
                           <th>UtilizaçãO</th>
                           <th>Traço</th>
                           <th>Cimento (saco 50kg)</th>  
                           <th>Cal (saco 20kg)</th> 
                           <th>Areia (Litros)</th> 
                           <th>Pedra britada (Litros)</th> 
                           <th>Água (Litros)</th>  
                       </tr>                     
                   </thead>
                   <tbody>
                       <!-- Cada <tr> é uma linha da lista de materiais --> 
                        <tr>
                           <td>Concreto</td>
                           <td>Contrapiso</td>
                           <td>1:3:6</td>
                           <td>4.20</td>
                           <td>-</td>
                           <td>0.564</td>
                           <td>0.441</td>
                           <td>198</td>
                        </tr>

                        <tr>
                            <td>Argamassa</td>
                            <td>Contrapiso</td>
                            <td>1:0:6</td>
                            <td>10</td>
                            <td>-</td>
                            <td>1.080</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Argamassa</td>
                            <td>Assentamento</td>
                            <td>1:4:16</td>
                            <td>3.65</td>
                            <td>9</td>
                            <td>1.400</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Argamassa</td>
                            <td>Chapisco</td>
                            <td>1:0:8</td>
                            <td>7.40</td>
                            <td>-</td>
                            <td>1.100</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Argamassa</td>
                            <td>Emboço</td>
                            <td>1:1:12</td>
                            <td>4.90</td>
                            <td>2.900</td>
                            <td>1.100</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>Argamassa</td>
                            <td>Reboco</td>
                            <td>1:4:8</td>
                            <td>3.30</td>
                            <td>7.800</td>
                            <td>1.100</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                       
                   </tbody>
               </table>
           </div><!-- /.col -->
           </div>
                </div>
       <br><br>

        <!-- TABELA QUANTITATIVO DE MATERIAIS-->
        <h4>Quantitativo de materiais</h4> <!-- titulo -->
        <?php

        $blocoTanque = $_POST['blocoTanque'];
        $blocoSumidouro = $_POST['blocoSumidouro'];
        $blocoTotal = $_POST['blocoTotal'];


        $cimentoTanque = $_POST['cimentoTanque'];
        $cimentoSumidouro = $_POST['cimentoSumidouro'];
        $cimentoTotal = $_POST['cimentoTotal'];

        $calTanque = $_POST['calTanque'];
        $calSumidouro = $_POST['calSumidouro'];
        $calTotal = $_POST['calTotal'];

        $areiaTanque = $_POST['areiaTanque'];
        $areiaSumidouro = $_POST['areiaSumidouro'];
        $areiaTotal = $_POST['areiaTotal'];

        $brita01Tanque = $_POST['brita01Tanque'];
        $brita01Sumidouro = $_POST['brita01Sumidouro'];
        $brita01Total = $_POST['brita01Total'];

        $brita03Sumidouro = $_POST['brita03Sumidouro'];
        $brita03Total = $_POST['brita03Total'];

        $aguaTanque = $_POST['aguaTanque'];
        $aguaTotal = $_POST['aguaTotal'];


        ?>



        <div class="row">
            <div class="col-xs-12 table-responsive">

                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Materiais</th>
                            <th>Descrição</th>
                            <th>Quant. Tanque Séptico</th>
                            <th> Quant. Sumidouro</th>  
                            <th>Quantidade total</th>  
                        </tr>                     
                    </thead>
                    <tbody>
                        <!-- Cada <tr> é uma linha da lista de materiais --> 
                        <tr>
                            <td>Bloco cerâmico</td>
                            <td>19x19x9cm</td>
                            <td><?php echo $blocoTanque; ?> </td>
                            <td>
                            <?php 
                    ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){
                        echo $blocoSumidouro; 
                    }else{
                        echo "0";
                    } 
                            ?> 
                            </td>  <!-- sumidouro -->
                            <td><b><?php                     
                            ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){
                        echo $blocoTotal; 
                    }else{
                        echo $blocoTanque;
                    } ?></b></td>
                        </tr>
                        <tr>
                            <td>Cimento CP III</td>
                            <td>Saco 50Kg</td>
                            <td><?php echo $cimentoTanque; ?> </td>
                            <td><?php                     
                    ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){
                        echo $cimentoSumidouro; 
                    }else{
                        echo "0";
                    }  ?>   </td> <!-- sumidouro -->
                            <td><b><?php                     
                    if($diametroSumidouro != ""){
                        echo $cimentoTotal; 
                    }else{
                        echo $cimentoTanque;
                    }  ?></b></td>
                        </tr>
                        <tr>
                            <td>Cal</td>
                            <td>Saco 20Kg</td>
                            <td><?php echo $calTanque; ?></td>
                            <td><?php                     
                    ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){
                        echo $calSumidouro; 
                    }else{
                        echo "0";
                    }  ?>   </td> <!-- sumidouro -->
                            <td><b><?php                             
                        ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){
                        echo $calTotal; 
                    }else{
                        echo $calTanque;
                    }  ?></b></td>
                        </tr>
                        <tr>
                            <td>Areia média</td>
                            <td>Litros</td>
                            <td><?php echo $areiaTanque; ?></td>
                            <td><?php                     
                    ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){
                        echo $areiaSumidouro; 
                    }else{
                        echo "0";
                    }  ?>
                            </td> <!-- sumidouro -->
                            <td><b><?php                         
                    ## SE POSSUI SUMIDOURO ##
                    if($diametroSumidouro != ""){
                        echo $areiaTotal; 
                    }else{
                        echo $areiaTanque;
                    }   ?></b></td>
                        </tr>
                        <tr>
                            <td>Brita 01</td>
                            <td>Litros</td>
                            <td><?php echo $brita01Tanque; ?></td>
                            <td><?php echo $brita01Sumidouro; ?></td> 
                            <td><b><?php echo $brita01Total; ?></b></td>
                        </tr>
                        <tr>
                            <td>Brita 03 ou 04</td>
                            <td>Litros</td>
                            <td>0</td>
                            <td><?php echo $brita03Sumidouro; ?></td>
                            <td><b><?php echo $brita03Total; ?></b></td>
                        </tr>
                        <tr>
                            <td>Água</td>
                            <td>Litros</td>
                            <td><?php echo $aguaTanque; ?></td>
                            <td>0</td>
                            <td><b><?php echo $aguaTotal; ?></b></td>
                        </tr>
                    </tbody>
                </table>
            </div><!-- /.col -->
        </div><!-- /.tabela -->
        <br><br>

        <!-- CAMPOS PARA OBSERVAÇÕES E INFORMAÇÕES ADICIONAIS -->
        <div class="row">
            <div class="col-md-12">
                <p class="lead" align="justify"> 
                    <b>OBSERVAÇÕES:</b></br>
                    ◦ <b>A quantidade total de materiais é arredondado para o número inteiro imediatamente superior.</b><br>
                    ◦ DICA: Uma lata equivale a 18 litros; 1 metro cúbico (m³) equivale a 1.000 litros.<br>
                    ◦ As tampas das câmaras deverão ser feitas com placas pré-moldadas de concreto, para facilitar a sua execução e até a sua remoção. <br>
                    ◦ No fundo do sumidouro existe uma camada protetora de brita, que, segundo a norma NBR 13969/96, não deve ser inferior a 30 cm. Será colocada brita número 3 ou 4 com uma altura de 50 cm.<BR> 
                    ◦ Deverá ser observado o afastamento mínimo de 1,50m de qualquer parede, obstáculos, árvores ou cerca de divisa de terreno e de acordo com o tamanho do terreno.<br>
                    ◦ O impermeabilizante de ser aplicado de acordo com as instruções do fabricante. Todas as paredes da fossa e o fundo deve ser impermeabilizado.<br>
                    ◦ A atual versão da aplicação não calcula tanques em série.<br>
                </p>
                
            </div><!-- /.col -->
        </div><!-- /.observações -->
        <br><br>
        
        <!-- Botões no final da página / dimensionar:retorna para os dados de entra / Memorial de cálculo: exibe ou faz o download do pdf com o passo a passo do calculo / Gerar PDF: salva a página atual no formato PDF -->
        <div class="row no-print">
            <div class="col-xs-12">
                <a href="" class="btn btn-default" href="index.php"><i class="fa fa-print"></i> Dimensionar </a>
                <button class="btn btn-primary pull-right" onclick="location.href='referencias.php';"; style="margin-right: 5px;">Referências</button>
                <button class="btn btn-primary pull-right" onclick=window.print(); style="margin-right: 5px;">Gerar PDF</button>
            </div>
        </div>
    </section>
</section>