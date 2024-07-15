<?php
if (isset($_POST['postId']) && isset($_POST['likes'])) {
    $postId = intval($_POST['postId']);
    $likes = intval($_POST['likes']);

    // Assuming you have a database connection
    $conn = new mysqli('localhost', 'root', '', 'contest');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("UPDATE contestants SET likes = ? WHERE id = ?");
    $stmt->bind_param("ii", $likes, $postId);

    if ($stmt->execute()) {
        echo "Likes updated successfully.";
    } else {
        echo "Error updating likes: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
