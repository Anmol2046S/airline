<?php
// get_destinations.php

include 'db.php';

$sql = "SELECT arrival_location, COUNT(*) AS visit_count FROM bookings GROUP BY arrival_location ORDER BY visit_count DESC LIMIT 4";
$result = $conn->query($sql);

$destinations = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $destinations[] = $row;
    }
}

echo json_encode($destinations);

$conn->close();
?>
