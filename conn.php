<?php 
$servidor = 'localhost' ;
$usuario = 'root' ;
$senha = '';
$banco = 'biblioteca' ;
$conn = mysqli_connect($servidor , $usuario , $senha , $banco);

if (!$conn) {
    // echo "negativo";
}else {
    // echo "positivo" ;
}
?>