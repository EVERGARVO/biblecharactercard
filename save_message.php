<?php
// 데이터베이스 연결 설정
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database";

$conn = new mysqli($servername, $username, $password, $dbname);

// 데이터베이스 연결 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// POST 데이터 받기
$message = $_POST['message'];

// SQL 쿼리 준비
$stmt = $conn->prepare("INSERT INTO messages (content) VALUES (?)");
$stmt->bind_param("s", $message);

// 쿼리 실행
if ($stmt->execute()) {
    echo "Message saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
