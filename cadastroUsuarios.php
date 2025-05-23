<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require "conn.php";

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $rawPostData = file_get_contents('php://input');
    $postData = json_decode($rawPostData, true);

    if ($postData) {
        $nome = $postData['nome'];
        $cpf = $postData['cpf'];
        $senha = $postData['senha'];

        $query = "INSERT INTO usuario (cpf, nome, senha)
                    VALUES ('$nome' , '$cpf' , '$senha')";

        if (mysqli_query($conn , $query)) {
            echo "Dados Inseridos";
        }
    }
}
?>