<?php 
$servidor = 'localhost' ;
$usuario = 'root' ;
$senha = '';
$banco = 'produtos_db' ;
$conn = mysqli_connect($servidor , $usuario , $senha , $banco);

if (!$conn) {
    
    // echo "negativo";
}else {
    // echo "positivo" ;
}
?>