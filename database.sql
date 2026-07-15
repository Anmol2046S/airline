-- Airline Booking System Database
-- This SQL file creates all necessary tables for the system

-- Create Database
CREATE DATABASE IF NOT EXISTS airline_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE airline_db;

-- ============================================
-- DESTINATIONS TABLE
-- ============================================
-- Stores available flights and routes

CREATE TABLE IF NOT EXISTS destinations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flight_number VARCHAR(20) UNIQUE NOT NULL COMMENT 'Unique flight identifier',
    departure_city VARCHAR(100) NOT NULL COMMENT 'Origin city',
    arrival_city VARCHAR(100) NOT NULL COMMENT 'Destination city',
    departure_time DATETIME NOT NULL COMMENT 'Scheduled departure time',
    arrival_time DATETIME NOT NULL COMMENT 'Scheduled arrival time',
    available_seats INT NOT NULL COMMENT 'Number of available seats',
    price DECIMAL(10, 2) NOT NULL COMMENT 'Price per seat in USD',
    airline_name VARCHAR(100) COMMENT 'Airline company name',
    aircraft_type VARCHAR(50) COMMENT 'Type of aircraft',
    duration_minutes INT COMMENT 'Flight duration in minutes',
    status VARCHAR(50) DEFAULT 'scheduled' COMMENT 'Flight status: scheduled, boarding, departed, delayed, cancelled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_departure_city (departure_city),
    INDEX idx_arrival_city (arrival_city),
    INDEX idx_departure_time (departure_time),
    INDEX idx_flight_number (flight_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- BOOKINGS TABLE
-- ============================================
-- Stores customer flight bookings

CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(20) UNIQUE NOT NULL COMMENT 'Unique booking reference',
    passenger_name VARCHAR(100) NOT NULL COMMENT 'Passenger full name',
    passenger_email VARCHAR(100) COMMENT 'Passenger email address',
    passenger_phone VARCHAR(20) COMMENT 'Passenger phone number',
    passenger_id_number VARCHAR(50) COMMENT 'Passport or ID number',
    flight_id INT NOT NULL COMMENT 'Reference to destinations table',
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'confirmed' COMMENT 'Status: confirmed, pending, cancelled',
    seats_booked INT DEFAULT 1 COMMENT 'Number of seats booked',
    total_price DECIMAL(10, 2) COMMENT 'Total booking price',
    payment_status VARCHAR(50) DEFAULT 'pending' COMMENT 'Payment status: pending, completed, refunded',
    seat_numbers VARCHAR(255) COMMENT 'Comma-separated seat numbers',
    special_requests TEXT COMMENT 'Special requests or notes',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (flight_id) REFERENCES destinations(id) ON DELETE CASCADE,
    INDEX idx_passenger_email (passenger_email),
    INDEX idx_flight_id (flight_id),
    INDEX idx_booking_reference (booking_reference),
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Insert sample destinations
INSERT INTO destinations (flight_number, departure_city, arrival_city, departure_time, arrival_time, available_seats, price, airline_name, aircraft_type, status) VALUES
('AI101', 'New York', 'Los Angeles', '2024-08-15 08:00:00', '2024-08-15 11:00:00', 150, 299.99, 'Air India', 'Boeing 777', 'scheduled'),
('AI102', 'New York', 'Chicago', '2024-08-15 09:00:00', '2024-08-15 11:30:00', 120, 199.99, 'Air India', 'Airbus A320', 'scheduled'),
('BA201', 'London', 'Paris', '2024-08-15 10:00:00', '2024-08-15 11:30:00', 180, 149.99, 'British Airways', 'Boeing 747', 'scheduled'),
('UA301', 'Chicago', 'Miami', '2024-08-15 14:00:00', '2024-08-15 17:00:00', 100, 249.99, 'United Airlines', 'Airbus A350', 'scheduled'),
('DL401', 'Atlanta', 'Dallas', '2024-08-15 11:00:00', '2024-08-15 13:00:00', 160, 179.99, 'Delta Airlines', 'Boeing 737', 'scheduled'),
('SW501', 'Los Angeles', 'San Francisco', '2024-08-15 15:00:00', '2024-08-15 16:30:00', 140, 129.99, 'Southwest Airlines', 'Boeing 737', 'scheduled'),
('AA601', 'Boston', 'Washington DC', '2024-08-15 07:00:00', '2024-08-15 09:00:00', 130, 159.99, 'American Airlines', 'Airbus A321', 'scheduled'),
('JL701', 'Tokyo', 'Seoul', '2024-08-15 18:00:00', '2024-08-15 21:00:00', 200, 349.99, 'Japan Airlines', 'Boeing 787', 'scheduled');

-- ============================================
-- VIEWS (Optional - for common queries)
-- ============================================

-- View for available flights
CREATE VIEW IF NOT EXISTS available_flights AS
SELECT 
    id,
    flight_number,
    departure_city,
    arrival_city,
    departure_time,
    arrival_time,
    available_seats,
    price,
    airline_name,
    status
FROM destinations
WHERE available_seats > 0 AND status = 'scheduled'
ORDER BY departure_time;

-- View for booking statistics
CREATE VIEW IF NOT EXISTS booking_statistics AS
SELECT 
    d.flight_number,
    d.departure_city,
    d.arrival_city,
    COUNT(b.id) as total_bookings,
    SUM(b.seats_booked) as total_seats_booked,
    SUM(b.total_price) as total_revenue,
    d.available_seats,
    (d.available_seats - COALESCE(SUM(b.seats_booked), 0)) as remaining_seats
FROM destinations d
LEFT JOIN bookings b ON d.id = b.flight_id AND b.status != 'cancelled'
GROUP BY d.id, d.flight_number;

-- ============================================
-- STORED PROCEDURES (Optional)
-- ============================================

-- Procedure to book a flight
DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS book_flight(
    IN p_flight_id INT,
    IN p_passenger_name VARCHAR(100),
    IN p_passenger_email VARCHAR(100),
    IN p_seats_count INT,
    OUT p_booking_reference VARCHAR(20),
    OUT p_success INT
)
BEGIN
    DECLARE v_available_seats INT;
    DECLARE v_price DECIMAL(10, 2);
    DECLARE v_total_price DECIMAL(10, 2);
    
    -- Check available seats
    SELECT available_seats, price INTO v_available_seats, v_price
    FROM destinations WHERE id = p_flight_id;
    
    IF v_available_seats >= p_seats_count THEN
        -- Generate booking reference
        SET p_booking_reference = CONCAT('BK', DATE_FORMAT(NOW(), '%Y%m%d%H%i%s'));
        SET v_total_price = p_seats_count * v_price;
        
        -- Insert booking
        INSERT INTO bookings (booking_reference, passenger_name, passenger_email, flight_id, seats_booked, total_price, status)
        VALUES (p_booking_reference, p_passenger_name, p_passenger_email, p_flight_id, p_seats_count, v_total_price, 'confirmed');
        
        -- Update available seats
        UPDATE destinations SET available_seats = available_seats - p_seats_count WHERE id = p_flight_id;
        
        SET p_success = 1;
    ELSE
        SET p_success = 0;
    END IF;
END$$

DELIMITER ;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Index for faster search
CREATE INDEX idx_destinations_status ON destinations(status);
CREATE INDEX idx_destinations_airline ON destinations(airline_name);
CREATE INDEX idx_bookings_flight_id ON bookings(flight_id);
CREATE INDEX idx_bookings_passenger_email ON bookings(passenger_email);

-- ============================================
-- END OF SCRIPT
-- ============================================
