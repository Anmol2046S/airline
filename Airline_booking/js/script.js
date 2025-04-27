// Common functionality across all pages - Consider it Straw Hat Luffy style!
$(document).ready(function() {
    // Initialize tooltips - Like spotting treasure with keen eyes!
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Format credit card input - Making sure the treasure map (card number) is readable!
    $('#cardNumber').on('input', function() {
        let value = $(this).val().replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        $(this).val(value);
    });

    // Form validation (Basic - enhance as needed) - Gotta make sure the crew (data) is in order before setting sail!
    $('form').submit(function(e) {
        let valid = true;
        $(this).find('[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid'); // Mark the spot if something's missing!
                valid = false;
            } else {
                $(this).removeClass('is-invalid'); // All clear, matey!
            }
        });
        if (!valid) {
            e.preventDefault(); // Hold the ship if not ready!
            return false;
        }
    });

    // Remove invalid class when user starts typing - Clearing the path as we go!
    $('input, select').on('input change', function() {
        if ($(this).val()) {
            $(this).removeClass('is-invalid');
        }
    });

    // **Straw Hat Crew's AJAX Actions Begin!**

    // Initially hide the registration form if we are on the login/registration page
    if ($('.login-section').length > 0) { // Check if we are on a page with login sections
        $('.registration-section').hide();

        // Toggle between login and registration forms
        $('#showRegister').click(function(e) {
            e.preventDefault();
            $('#loginForm').hide();
            $('.registration-section').show();
        });

        $('#showLogin').click(function(e) {
            e.preventDefault();
            $('.registration-section').hide();
            $('#loginForm').show();
        });
    }

    // ----------------------
    //  1. Joining the Crew (Registration Form)
    // ----------------------
    $('#registrationForm').submit(function(e) {
        e.preventDefault();

        // Basic client-side validation (you can enhance this) - Making sure the new recruit is somewhat decent!
        if (!$(this).find('[required]:valid').length === $(this).find('[required]').length) {
            return; // Not quite ready to join, captain!
        }

        let regName = $('#regName').val(); // New crew member's name!
        let regEmail = $('#regEmail').val(); // Their way to contact the ship!
        let regPassword = $('#regPassword').val(); // The secret handshake!

        $.ajax({
            url: 'php/register.php', // Sending the request to the ship's log!
            method: 'POST', // Sending the info securely!
            data: { regName: regName, regEmail: regEmail, regPassword: regPassword }, // The recruit's details!
            dataType: 'json', // Expecting a message back from the log!
            success: function(response) {
                if (response.success) {
                    alert(response.message); // Hooray! They're in!
                    $('#registrationForm')[0].reset(); // Clear the form for the next one!
                    // Optionally, move to the login form after successful registration
                    $('#registrationForm').hide();
                    $('#loginForm').show();
                } else {
                    alert(response.message); // Uh oh, something went wrong!
                }
            },
            error: function(xhr, status, error) {
                console.error('Registration Error:', error); // The log had an error!
                alert('An error occurred during registration.'); // Let the user know!
            }
        });
    });

    // ----------------------
    //  2. Logging into the Ship (Login Form)
    // ----------------------
    $('#loginForm').submit(function(e) {
        e.preventDefault();

        // Basic client-side validation - Making sure the password matches the handshake!
        if (!$(this).find('[required]:valid').length === $(this).find('[required]').length) {
            return; // Wrong handshake!
        }

        let email = $('#email').val(); // Their contact to check!
        let password = $('#password').val(); // The attempted secret handshake!

        $.ajax({
            url: 'php/login.php', // Checking with the ship's log!
            method: 'POST',
            data: { email: email, password: password },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    alert(response.message); // Welcome aboard, matey!
                    window.location.href = 'dashboard.html'; // Head to the deck!
                } else {
                    alert(response.message); // Incorrect login details!
                }
            },
            error: function(xhr, status, error) {
                console.error('Login Error:', error); // Log error!
                alert('An error occurred during login.');
            }
        });
    });
    
    // ----------------------
    //  3. Searching for Islands (Flight Search Form)
    // ----------------------
    $('#flightSearchForm').submit(function(e) {
        e.preventDefault();

        // Basic client-side validation - Need a destination and departure point!
        if (!$(this).find('[required]:valid').length === $(this).find('[required]').length) {
            return; // Where are we going, and where are we leaving from?!
        }

        let fromCity = $('#fromCity').val(); // Starting island!
        let toCity = $('#toCity').val(); // Destination island!
        let departureDate = $('#departureDate').val(); // When we set sail!
        let returnDate = $('#returnDate').val(); // When we plan to return (if applicable)!

        $.ajax({
            url: 'php/get_flights.php', // Asking the navigator for routes!
            method: 'GET', // Or POST, depending on your PHP
            data: { fromCity: fromCity, toCity: toCity, departureDate: departureDate, returnDate: returnDate }, // The journey details!
            dataType: 'json', // Expecting route information!
            success: function(response) {
                displayFlightResults(response); // Show the possible islands!
            },
            error: function(xhr, status, error) {
                console.error('Flight Search Error:', error); // Navigator had a problem!
                alert('An error occurred while searching for flights.');
            }
        });
    });

    function displayFlightResults(flights) {
        let resultsDiv = $('#flightResults'); // Where the island results will appear!
        if (!resultsDiv.length) {
            resultsDiv = $('#flightResultsSection'); // Alternative spot for results!
        }
        resultsDiv.empty(); // Clear any old maps!

        if (flights.length > 0) {
            let resultsHtml = '<h4>Island Results!</h4>'; // Found some islands!
            resultsHtml += '<div class="row">';
            flights.forEach(flight => {
                resultsHtml += `
                    <div class="col-md-4 mb-3">
                        <div class="card flight-card">
                            <div class="card-body">
                                <h5 class="card-title">${flight.departure_city} to ${flight.arrival_city}</h5>
                                <p class="card-text">
                                    Departure: ${flight.departure_time}<br>
                                    Arrival: ${flight.arrival_time}<br>
                                    Price: $${flight.price} (Bellys!)
                                </p>
                                <button class="btn btn-primary book-flight" data-flight-id="${flight.flight_id}">Set Sail!</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            resultsHtml += '</div>';
            resultsDiv.html(resultsHtml);

            // Event listener for "Set Sail!" buttons
            $('.book-flight').on('click', function() {
                const flightId = $(this).data('flight-id'); // The chosen route!
                window.location.href = `payment.html?flightId=${flightId}`; // Time to pay the fare!
            });
        } else {
            resultsDiv.html('<p>No islands found with those coordinates!</p>'); // Empty sea!
        }
    }

    // ----------------------
    //  4. Paying the Fare (Payment Form)
    // ----------------------
    $('#paymentForm').submit(function(e) {
        e.preventDefault();

        // Basic client-side validation - Gotta have the Berries ready!
        if (!$(this).find('[required]:valid').length === $(this).find('[required]').length) {
            return; // Not enough Berries!
        }

        let cardNumber = $('#cardNumber').val(); // The treasure chest number!
        let expiryDate = $('#expiryDate').val(); // When the Berries expire!
        let cvv = $('#cvv').val(); // The secret code!
        let cardHolderName = $('#cardHolderName').val(); // Whose treasure is this?!

        // Get flight ID from URL - Which journey are we paying for?
        const urlParams = new URLSearchParams(window.location.search);
        const flightId = urlParams.get('flightId');

        $.ajax({
            url: 'php/create_booking.php', // Sending the Berries to the quartermaster!
            method: 'POST',
            data: {
                flightId: flightId,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                cardHolderName: cardHolderName
            },
            dataType: 'json', // Expecting a confirmation!
            success: function(response) {
                if (response.success) {
                    alert(response.message); // Payment received!
                    window.location.href = 'booking_confirmation.html'; // Here's your boarding pass!
                } else {
                    alert(response.message); // Transaction failed!
                }
            },
            error: function(xhr, status, error) {
                console.error('Payment Error:', error); // Quartermaster had a problem!
                alert('An error occurred during payment.');
            }
        });
    });

    // ----------------------
    //  5. Checking the Bounties (Dashboard - Fetch User Data)
    // ----------------------
    if ($('#userFullName').length) { // If we're on the Bounty Board (dashboard)!
        $.ajax({
            url: 'php/get_user_data.php', // Asking for the pirate's info!
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $('#userFullName').text(response.name); // Display the pirate's name!
                    $('#userEmail').text(response.email); // Their contact info!
                    $('#userPhone').text(response.phone);   // Their den-den mushi number!
                } else {
                    alert(response.message); // Couldn't retrieve the bounty info!
                }
            },
            error: function(xhr, status, error) {
                console.error('Dashboard Error:', error); // Bounty Board had an issue!
                alert('An error occurred while fetching user data.');
            }
        });

        // ----------------------
        //  6. History of Adventures (Dashboard - Fetch Booking History)
        // ----------------------
        $.ajax({
            url: 'php/get_booking_history.php', // Asking for past voyages!
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    displayBookingHistory(response.bookings); // Show the log of past adventures!
                } else {
                    alert(response.message); // Couldn't get the history!
                }
            },
            error: function(xhr, status, error) {
                console.error('Booking History Error:', error); // The logbook had an error!
                alert('An error occurred while fetching booking history.');
            }
        });

        function displayBookingHistory(bookings) {
            const bookingTable = $('#bookingHistoryTable'); // Where the adventure log will appear!
            bookingTable.empty(); // Clear any old entries!

            if (bookings.length > 0) {
                bookings.forEach(booking => {
                    bookingTable.append(`
                        <tr>
                            <td>${booking.booking_id}</td>
                            <td>${booking.flight_details}</td>
                            <td>${booking.booking_date}</td>
                            <td><span class="badge bg-${booking.status === 'Confirmed' ? 'success' : 'warning'}">${booking.status}</span></td>
                            <td><a href="#" class="btn btn-sm btn-outline-primary">View Details</a></td>
                        </tr>
                    `);
                });
            } else {
                bookingTable.append('<tr><td colspan="5">No past adventures recorded yet!</td></tr>'); // Empty logbook!
            }
        }
    }
});