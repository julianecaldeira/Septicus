<?php
require_once __DIR__ . '/vendor/autoload.php';

$mpdf = new \Mpdf\Mpdf();


$pagina =  '<div id="tabelaConsumoMateriais">
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
                    <th>Areia (m³)</th> 
                    <th>Pedra britada (m³)</th> 
                    <th>Água (Litros)</th>  
                </tr>                     
            </thead>
            <tbody>
                <!-- Cada <tr> é uma linha da lista de materiais --> 
                 <tr>
                    <td>Concreto</td>
                    <td>Contrapiso</td>
                    <td>1:3:6</td>
                    <td>4,20</td>
                    <td>-</td>
                    <td>0,564</td>
                    <td>0,441</td>
                    <td>198</td>
                 </tr>

                 <tr>
                     <td>Argamassa</td>
                     <td>Contrapiso</td>
                     <td>1:0:6</td>
                     <td>10</td>
                     <td>-</td>
                     <td>1,080</td>
                     <td>-</td>
                     <td>-</td>
                 </tr>

                 <tr>
                     <td>Argamassa</td>
                     <td>Assentamento</td>
                     <td>1:4:16</td>
                     <td>3,65</td>
                     <td>9</td>
                     <td>1,400</td>
                     <td>-</td>
                     <td>-</td>
                 </tr>

                 <tr>
                     <td>Argamassa</td>
                     <td>Chapisco</td>
                     <td>1:0:8</td>
                     <td>7,40</td>
                     <td>-</td>
                     <td>1,100</td>
                     <td>-</td>
                     <td>-</td>
                 </tr>

                 <tr>
                     <td>Argamassa</td>
                     <td>Emboço</td>
                     <td>1:1:12</td>
                     <td>4,90</td>
                     <td>2,900</td>
                     <td>1,100</td>
                     <td>-</td>
                     <td>-</td>
                 </tr>

                 <tr>
                     <td>Argamassa</td>
                     <td>Reboco</td>
                     <td>1:4:8</td>
                     <td>3,30</td>
                     <td>7,800</td>
                     <td>1,100</td>
                     <td>-</td>
                     <td>-</td>
                 </tr>
                
            </tbody>
        </table>
    </div><!-- /.col -->
    </div>
         </div>' ;
$mpdf->WriteHTML($pagina);
$mpdf->Output();

?>