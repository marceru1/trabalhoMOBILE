<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require ('conn.php');

// Pega os dados da requisição
$data = json_decode(file_get_contents('php://input'), true);

$cpf = $data['cpf'];
$senha = $data['senha'];

// Verifica se o usuário existe no banco de dados
$sql = "SELECT * FROM usuario WHERE cpf = '$cpf' AND senha = '$senha'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Gera um token para o usuário
  $token = bin2hex(random_bytes(32));

  // Salva o token no banco de dados
  $sql = "UPDATE usuarios SET token = '$token' WHERE cpf = '$cpf'";
  $conn->query($sql);

  // Retorna o token para o cliente
  echo json_encode(array('sucesso' => true, 'token' => $token));
} else {
  echo json_encode(array('sucesso' => false));
}

$conn->close();
?>