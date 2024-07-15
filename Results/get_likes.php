<?php
header('Content-Type: application/json');

// Assuming you have a database connection
$conn = new mysqli('localhost', 'root', '', 'contest');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT id, likes FROM contestants");

$likesData = [];
while ($row = $result->fetch_assoc()) {
    $likesData[] = $row;
}

echo json_encode($likesData);

$result->free();
$conn->close();
?>
