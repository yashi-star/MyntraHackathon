<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contest";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, name, profile, likes FROM contestants ORDER BY likes DESC LIMIT 1";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    $data['winner'] = $result->fetch_assoc();
}

$conn->close();

echo json_encode($data);
?>


<?php
$likes = json_decode(file_get_contents('likes.json'), true);
arsort($likes);
$winnerId = array_key_first($likes);
$contestants = [
    1 => ['name' => 'Yashi Pant', 'profile' => 'user1.png'],
    // Add other contestants here
];
$winner = $contestants[$winnerId];
echo json_encode(['winner' => $winner]);
?>
