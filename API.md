# API Documentation

## Base URL
```
http://localhost/airline/airline/
```

## Authentication
Currently no authentication required. (Recommended for future versions)

## Endpoints

### 1. Get All Destinations

**Endpoint:** `GET /get_destinations.php`

**Description:** Retrieve all available flight destinations

**Response:**
```json
[
  {
    "id": 1,
    "flight_number": "AI101",
    "departure_city": "New York",
    "arrival_city": "Los Angeles",
    "departure_time": "2024-08-15 08:00:00",
    "arrival_time": "2024-08-15 11:00:00",
    "available_seats": 150,
    "price": 299.99,
    "airline_name": "Air India"
  }
]
```

---

### 2. Get Bookings

**Endpoint:** `GET /get_bookings.php`

**Description:** Retrieve bookings (requires passenger email parameter)

**Query Parameters:**
- `email` (string): Passenger email address

**Example:**
```
GET /get_bookings.php?email=user@example.com
```

**Response:**
```json
[
  {
    "id": 1,
    "booking_reference": "BK202408151234567",
    "passenger_name": "John Doe",
    "passenger_email": "john@example.com",
    "flight_id": 1,
    "booking_date": "2024-08-15 10:30:00",
    "status": "confirmed",
    "seats_booked": 2,
    "total_price": 599.98
  }
]
```

---

### 3. Book Flight

**Endpoint:** `POST /process_booking.php`

**Description:** Create a new flight booking

**Content-Type:** `application/x-www-form-urlencoded`

**Request Parameters:**
- `flight_id` (integer): ID of the flight to book
- `passenger_name` (string): Full name of passenger
- `passenger_email` (string): Email address
- `passenger_phone` (string): Phone number
- `seats` (integer): Number of seats to book

**Example:**
```bash
curl -X POST http://localhost/airline/airline/process_booking.php \
  -d "flight_id=1&passenger_name=John Doe&passenger_email=john@example.com&passenger_phone=1234567890&seats=2"
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Booking confirmed",
  "booking_reference": "BK202408151234567",
  "total_price": 599.98
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Not enough seats available"
}
```

---

### 4. Track Flight

**Endpoint:** `GET /api.php?action=track&flight=FLIGHT_NUMBER`

**Description:** Get flight tracking information

**Query Parameters:**
- `action` (string): Must be "track"
- `flight` (string): Flight number to track

**Example:**
```
GET /api.php?action=track&flight=AI101
```

**Response:**
```json
{
  "flight_number": "AI101",
  "status": "departed",
  "departure_time": "2024-08-15 08:00:00",
  "arrival_time": "2024-08-15 11:00:00",
  "current_location": "Over Atlantic Ocean",
  "altitude": "35000 ft",
  "speed": "450 mph"
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | Success | Request processed successfully |
| 400 | Bad Request | Invalid parameters |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |
| 422 | Unprocessable Entity | Validation failed |

---

## Rate Limiting

Currently no rate limiting implemented. Recommended for production.

---

## Request Examples

### Using JavaScript Fetch API

```javascript
// Get destinations
fetch('http://localhost/airline/airline/get_destinations.php')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Book flight
fetch('http://localhost/airline/airline/process_booking.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    flight_id: 1,
    passenger_name: 'John Doe',
    passenger_email: 'john@example.com',
    passenger_phone: '1234567890',
    seats: 2
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Using cURL

```bash
# Get destinations
curl -X GET "http://localhost/airline/airline/get_destinations.php"

# Book flight
curl -X POST "http://localhost/airline/airline/process_booking.php" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "flight_id=1&passenger_name=John Doe&passenger_email=john@example.com&passenger_phone=1234567890&seats=2"

# Track flight
curl -X GET "http://localhost/airline/airline/api.php?action=track&flight=AI101"
```

---

## Response Format

All responses are in JSON format with the following structure:

**Success:**
```json
{
  "success": true,
  "data": {...}
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## CORS Headers

Add these headers to your API responses for cross-origin requests:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
```

---

## Testing

Use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- cURL command line
- Browser console (for GET requests)

---

## Future Enhancements

- [ ] Authentication tokens
- [ ] API versioning (v1, v2)
- [ ] Rate limiting
- [ ] Webhook support
- [ ] GraphQL endpoint
- [ ] OpenAPI/Swagger documentation
