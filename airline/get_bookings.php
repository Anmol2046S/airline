<?php
// get_bookings.php

include 'db.php';

$sql = "SELECT * FROM bookings";
$result = $conn->query($sql);

$bookings = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }
}

echo json_encode($bookings);

$conn->close();
?>
