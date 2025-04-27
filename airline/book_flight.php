<?php
// book_flight.php

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['book_flight'])) {
    $departureLocation = $_POST['departure_location'];
    $arrivalLocation = $_POST['arrival_location'];
    $departureDate = $_POST['departure_date'];
    $passengers = $_POST['passengers'];

    $stmt = $conn->prepare("INSERT INTO bookings (departure_location, arrival_location, departure_date, passengers) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $departureLocation, $arrivalLocation, $departureDate, $passengers);

    if ($stmt->execute()) {
        echo "Booking successful!";
    } else {
        echo "Booking failed.";
    }

    $stmt->close();
}

$conn->close();
?>
