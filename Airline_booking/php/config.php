<?php
$servername = "localhost";
$username = "my_airline_app";  //  The username you created
$password = "asdfghjkl"; //  The password you set
$dbname = "airline_booking";  //  Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to sanitize input to prevent SQL injection
function sanitize_input($data) {
    global $conn;
    return mysqli_real_escape_string($conn, trim($data));
}
?>