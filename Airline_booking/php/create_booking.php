<?php
include 'config.php';
session_start(); //   You'll need this on any page that accesses $_SESSION

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //   ...   Get booking data from $_POST (user_id, flight_id, etc.)
    $userId = $_SESSION['user_id'];   //   Get user ID from session
    $flightId = $_POST['flightId'];
    $numberOfPassengers = $_POST['passengers'];
    $class = $_POST['class'];
    $totalPrice = $_POST['totalPrice'];   //   Calculate this on the server!

    //   **Validate data!**

    $sql = "INSERT INTO bookings (user_id, flight_id, number_of_passengers, class, total_price) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiisi", $userId, $flightId, $numberOfPassengers, $class, $totalPrice);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Booking created']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Booking failed: ' . $conn->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>