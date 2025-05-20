
<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST , OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require "conn.php";
$produtos = [];

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $nome = $_POST['nome'] ?? '';
    $descricao = $_POST['descricao'] ?? '';
    $preco = $_POST['preco'] ?? '';
    $categoria = $_POST['categoria'] ?? '';

    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === 0) {
        $nomeImagem = basename($_FILES['imagem']['name']); // segurança
        $caminhoRelativo = '/biblioteca/imagens/' . $nomeImagem;
        $destino = $_SERVER['DOCUMENT_ROOT'] . $caminhoRelativo;

        if (move_uploaded_file($_FILES['imagem']['tmp_name'], $destino)) {
            $query = "INSERT INTO produtos (nome, descr, preco, cat, imagem) 
                      VALUES ('$nome', '$descricao', '$preco', '$categoria', '$caminhoRelativo')";

            if (mysqli_query($conn, $query)) {
                echo "Produto inserido com sucesso!";
            } else {
                echo "Erro no banco.";
            }
        } else {
            echo "Falha ao mover imagem.";
        }
    } else {
        echo "Erro no upload da imagem.";
    }
}

// if ($_SERVER['REQUEST_METHOD'] === "POST") {
//     $rawPostData = file_get_contents('php://input');
//     $postData = json_decode($rawPostData, true);

//     if ($postData) {
//         $nome = $postData['nome'];
//         $descricao = $postData['descricao'];
//         $preco = $postData['preco'];
//         $categoria = $postData['categoria'];
//         $imagem = $postData['imagem'];
        

//         $query = "INSERT INTO produtos (nome,descr,preco, cat,imagem)
//                     VALUES ('$nome' , '$descricao' , '$preco', '$categoria', '$imagem')";

//         if (mysqli_query($conn , $query)) {
//             echo "Dados Inseridos";
//         }
//     }
// }

if($_SERVER['REQUEST_METHOD'] === "GET") {
    $query = "SELECT * FROM produtos";
    if ($is_query_run = mysqli_query($conn , $query)) {
        while($query_executed = mysqli_fetch_assoc($is_query_run)){
            $produtos[] = $query_executed;
        }
    }

    echo json_encode($produtos);
}

?>