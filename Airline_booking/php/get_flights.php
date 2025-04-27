<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $fromCity = $_GET['fromCity'];  //  Get search parameters
    $toCity = $_GET['toCity'];
    $departureDate = $_GET['departureDate'];

    //  **Sanitize input!** Use prepared statements to prevent SQL injection
    $sql = "SELECT * FROM flights WHERE departure_city = ? AND arrival_city = ? AND departure_time >= ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $fromCity, $toCity, $departureDate);
    $stmt->execute();
    $result = $stmt->get_result();

    $flights = [];
    while ($row = $result->fetch_assoc()) {
        $flights[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($flights);

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>