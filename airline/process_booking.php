<?php
// Database connection details
$servername = "localhost";  // Replace with your database server name
$username = "root";      // Replace with your database username
$password = "";      // Replace with your database password
$dbname = "flight_booking";          // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("success" => false, "message" => "Connection failed: " . $conn->connect_error)));
}

// Get data from the POST request
$bookingId = $_POST['booking_id'];
$firstName = $_POST['first_name'];
$lastName = $_POST['last_name'];
$email = $_POST['email'];
$departureLocation = $_POST['departure_location'];
$arrivalLocation = $_POST['arrival_location'];
$departureDate = $_POST['departure_date'];
$returnDate = $_POST['return_date'];
$passengers = $_POST['passengers'];
$flightClass = $_POST['flight_class'];
$totalPrice = $_POST['total_price'];

// Prepare SQL statement to insert data into the bookings table
$sql = "INSERT INTO bookings (booking_id, first_name, last_name, email, departure_location, arrival_location, departure_date, return_date, passengers, flight_class, total_price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Use prepared statement to prevent SQL injection
$stmt = $conn->prepare($sql);
if ($stmt === false) {
     die(json_encode(array("success" => false, "message" => "Error preparing statement: " . $conn->error)));
}

$stmt->bind_param("sssssssssss", $bookingId, $firstName, $lastName, $email, $departureLocation, $arrivalLocation, $departureDate, $returnDate, $passengers, $flightClass, $totalPrice);

// Execute the statement
if ($stmt->execute()) {
    echo json_encode(array("success" => true, "message" => "Booking successful"));
} else {
    echo json_encode(array("success" => false, "message" => "Error: " . $stmt->error));
}

// Close connection
$stmt->close();
$conn->close();
?>
