<?php
include 'config.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the user is logged in (user_id is set in the session)
    if (isset($_SESSION['user_id'])) {
        $userId = $_SESSION['user_id'];

        $sql = "SELECT full_name, email, phone FROM users WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $stmt->bind_result($fullName, $email, $phone); // Bind all columns you want to retrieve

        if ($stmt->fetch()) {
            // User data found, send it as JSON
            $userData = [
                'success' => true,
                'name' => $fullName,
                'email' => $email,
                'phone' => $phone // Include phone if you have it
            ];
            header('Content-Type: application/json');
            echo json_encode($userData);
        } else {
            // User not found (this shouldn't happen if the session is valid)
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }

        $stmt->close();
        $conn->close();
    } else {
        // User is not logged in
        echo json_encode(['success' => false, 'message' => 'Not logged in']);
    }
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>