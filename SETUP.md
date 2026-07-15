# Setup Guide - Airline Booking System

Complete step-by-step guide to set up the Airline Booking System on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have:
- **XAMPP** or **WAMP** (Apache + PHP + MySQL)
- **PHP 7.0+** 
- **MySQL 5.7+**
- **Git**
- **Text Editor** (VSCode, Sublime, etc.)
- **Web Browser** (Chrome, Firefox, etc.)

## 🔧 Installation Steps

### Step 1: Download & Setup XAMPP (if not already installed)

1. Download XAMPP from https://www.apachefriends.org/
2. Install and run XAMPP Control Panel
3. Start Apache and MySQL services
4. Verify installation at `http://localhost/phpmyadmin`

### Step 2: Clone the Repository

```bash
# Navigate to XAMPP htdocs directory
cd C:\xampp\htdocs        # Windows
cd /Applications/XAMPP/htdocs  # Mac
cd /opt/lampp/htdocs      # Linux

# Clone the repository
git clone https://github.com/Anmol2046S/airline.git
cd airline
```

### Step 3: Create Database

#### Option A: Using phpMyAdmin (GUI)

1. Open `http://localhost/phpmyadmin`
2. Click "New" on the left sidebar
3. Create database named: `airline_db`
4. Set collation to: `utf8mb4_unicode_ci`
5. Click "Create"

#### Option B: Using Command Line

```bash
mysql -u root -p

# Type password (default is blank, just press Enter)

CREATE DATABASE airline_db;
CREATE USER 'airline_user'@'localhost' IDENTIFIED BY 'airline_password';
GRANT ALL PRIVILEGES ON airline_db.* TO 'airline_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 4: Import Database Tables

#### Option A: Using phpMyAdmin

1. Open `http://localhost/phpmyadmin`
2. Select `airline_db`
3. Click "Import" tab
4. Upload `database.sql` (if available in repo)
5. Click "Go"

#### Option B: Using Command Line

```bash
mysql -u root -p airline_db < database.sql
```

#### Option C: Manual Table Creation

If `database.sql` is not available, run this SQL:

```sql
-- Destinations Table
CREATE TABLE destinations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    flight_number VARCHAR(20) UNIQUE NOT NULL,
    departure_city VARCHAR(100) NOT NULL,
    arrival_city VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    available_seats INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    airline_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    passenger_name VARCHAR(100) NOT NULL,
    passenger_email VARCHAR(100),
    passenger_phone VARCHAR(20),
    flight_id INT NOT NULL,
    booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'confirmed',
    seats_booked INT DEFAULT 1,
    total_price DECIMAL(10, 2),
    FOREIGN KEY (flight_id) REFERENCES destinations(id),
    INDEX (flight_id),
    INDEX (passenger_email)
);

-- Sample Data
INSERT INTO destinations (flight_number, departure_city, arrival_city, departure_time, arrival_time, available_seats, price, airline_name) VALUES
('AI101', 'New York', 'Los Angeles', '2024-08-01 08:00:00', '2024-08-01 11:00:00', 150, 299.99, 'Air India'),
('AI102', 'New York', 'Chicago', '2024-08-01 09:00:00', '2024-08-01 11:30:00', 120, 199.99, 'Air India'),
('BA201', 'London', 'Paris', '2024-08-01 10:00:00', '2024-08-01 11:30:00', 180, 149.99, 'British Airways'),
('UA301', 'Chicago', 'Miami', '2024-08-01 14:00:00', '2024-08-01 17:00:00', 100, 249.99, 'United Airlines');
```

### Step 5: Configure Database Connection

1. Open `airline/db.php` in your text editor
2. Update credentials:

```php
<?php
// Database Connection
$host = "localhost";
$user = "airline_user";          // or "root"
$password = "airline_password";  // or "" if root has no password
$database = "airline_db";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8
$conn->set_charset("utf8");
?>
```

### Step 6: Verify Installation

1. Open your browser
2. Navigate to: `http://localhost/airline/airline/index.html`
3. You should see the Airline Booking homepage

## ✅ Testing Features

### Test Flight Booking
1. Click "Book Flight"
2. Select a destination
3. Fill in passenger details
4. Complete booking
5. Check database: `SELECT * FROM bookings;`

### Test Flight Tracking
1. Go to "Track Flight"
2. Enter flight number (e.g., "AI101")
3. View flight details

### Test My Bookings
1. Click "My Bookings"
2. View your recent bookings

### Test Destinations
1. Click "Destinations"
2. Browse available routes

## 🐛 Troubleshooting

### Issue: "Connection failed" error
**Solution:**
- Check MySQL is running in XAMPP Control Panel
- Verify database credentials in `db.php`
- Ensure database `airline_db` exists

### Issue: Pages show code instead of rendering
**Solution:**
- Check Apache is running
- Ensure files are in `htdocs/airline` folder
- Restart Apache service

### Issue: 404 Not Found error
**Solution:**
- Verify correct URL path
- Check file names match exactly (case-sensitive on Linux)
- Ensure all files are in correct folders

### Issue: Database tables not created
**Solution:**
- Verify you're in `airline_db` database
- Check SQL syntax
- Use phpMyAdmin "SQL" tab for manual queries

### Issue: Cannot upload files
**Solution:**
- Check PHP file upload settings in `php.ini`
- Ensure upload directory has write permissions
- Verify `upload_max_filesize` is sufficient

## 🔐 Security Setup (Optional)

### Set File Permissions
```bash
# On Linux/Mac
chmod 755 airline/
chmod 644 airline/*.php
chmod 644 airline/*.html

# Create uploads directory
mkdir -p airline/uploads
chmod 777 airline/uploads
```

### Create .env File (for sensitive data)
Create `airline/.env`:
```env
DB_HOST=localhost
DB_USER=airline_user
DB_PASSWORD=airline_password
DB_NAME=airline_db
```

Then update `db.php` to use it:
```php
require_once '.env';
$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME']);
```

## 📊 Database Verification

Verify tables are created:
```sql
SHOW TABLES;
DESCRIBE destinations;
DESCRIBE bookings;
```

## 🚀 Next Steps

1. Customize the airline name and branding
2. Add more flights to the database
3. Implement user authentication
4. Add payment gateway integration
5. Deploy to a live server

## 📞 Need Help?

- Check the README.md for features overview
- Review the CONTRIBUTING.md for code standards
- Create an issue on GitHub for bugs
- Join discussions for questions

---

**Setup complete! Start booking flights! ✈️**
