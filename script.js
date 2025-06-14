
        // Mock restaurant data
        const restaurants = [
            {
                id: 1,
                name: "Amar Punjabi Dhaba",
                rating: 4.8,
                cuisine: "Indian",
                distance: "180 km from route",
                chargerType: "DC Fast (150kW)",
                chargingTime: "30-45 min",
                avgCost: "₹350",
                image: "/images/amarpunjabi.png",
                price: "₹₹₹",
                specialties: ["Kadhai Paneer", "Malai Pyaaz", "Butter Garlic Naan"],
                description: "Authentic Punjabi cuisine with tandoor-fired delights and rich, homemade curries.",
                chargingSpots: 8,
                hours: "11:00 AM - 12:00 PM"
            },
            {
                id: 2,
                name: "Sharma Ji Ka Dhaba",
                rating: 5,
                cuisine: "Indian",
                distance: "280 km from route",
                chargerType: "DC Fast (100kW)",
                chargingTime: "45-60 min",
                avgCost: "₹400",
                image: "/images/sharmaji.png",
                price: "₹₹",
                specialties: ["Sarso Ka Saag", "Makke ki Roti", "Besan Gatta Sabji"],
                description: "Authentic Rajasthani culinary journey with royal thalis, tandoori breads, hearty curries, and traditional village-style flavors.",
                chargingSpots: 12,
                hours: "9:00 AM - 12:00 PM"
            },
            {
                id: 3,
                name: "Maheswari Pure Veg Restaurant",
                rating: 4.7,
                cuisine: "Indian Vegetarian",
                distance: "305 km from route",
                chargerType: "DC Fast (120kW)",
                chargingTime: "35-50 min",
                avgCost: "₹700",
                image: "/images/maheswari.png",
                price: "₹₹",
                specialties: ["South Indian Thali", "Paneer Specialties", "Fresh Juices"],
                description: "Pure vegetarian restaurant serving authentic Indian cuisine.",
                chargingSpots: 6,
                hours: "8:00 AM - 10:00 PM"
            },
            {
                id: 4,
                name: "Italian Special Pizza",
                rating: 4.5,
                cuisine: "Italian Cuisine",
                distance: "366 km from route",
                chargerType: "DC Fast (80kW)",
                chargingTime: "60-75 min",
                avgCost: "₹900",
                image: "/images/italianpizza.png",
                price: "₹₹₹",
                specialties: ["Italian Pizza's", "Sandwiches", "Healthy Bowls"],
                description: "Modern cafe with Italian Pizza's and healthy food options.",
                chargingSpots: 4,
                hours: "9:00 AM - 11:00 PM"
            }
        ];

        let searchData = { from: '', to: '' };
        let reservations = [];
        let currentPage = 'home'; // Track current page for back button logic

        // DOM elements
        const homePage = document.getElementById('homePage');
        const resultsPage = document.getElementById('resultsPage');
        const upcomingTripsPage = document.getElementById('upcomingTripsPage');
        const aboutUsPage = document.getElementById('aboutUsPage');
        const searchForm = document.getElementById('searchForm');
        const fromInput = document.getElementById('fromInput');
        const toInput = document.getElementById('toInput');
        const backBtn = document.getElementById('backBtn');
        const tripsBtn = document.getElementById('tripsBtn');
        const aboutBtn = document.getElementById('aboutBtn');
        const backFromTripsBtn = document.getElementById('backFromTripsBtn');
        const backFromAboutBtn = document.getElementById('backFromAboutBtn');
        const routeInfo = document.getElementById('routeInfo');
        const restaurantsGrid = document.getElementById('restaurantsGrid');
        const tripsBadge = document.getElementById('tripsBadge');
        const resultsSubtitle = document.getElementById('resultsSubtitle');
        const reservationsList = document.getElementById('reservationsList');
        const upcomingTripsSubtitle = document.getElementById('upcomingTripsSubtitle');
        const darkModeToggle = document.getElementById('darkModeToggle');

        // New mobile navigation elements
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const mobileNavCloseBtn = document.getElementById('mobileNavCloseBtn');
        const mobileHowItWorksBtn = document.getElementById('mobileHowItWorksBtn');
        const mobileTripsBtn = document.getElementById('mobileTripsBtn');
        const mobileTripsBadge = document.getElementById('mobileTripsBadge');
        const mobileAboutBtn = document.getElementById('mobileAboutBtn');
        const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');


        // Event listeners
        searchForm.addEventListener('submit', handleSearch);
        backBtn.addEventListener('click', showHomePage);
        tripsBtn.addEventListener('click', showUpcomingTripsPage);
        aboutBtn.addEventListener('click', showAboutUsPage);
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Mobile navigation event listeners
        hamburgerBtn.addEventListener('click', toggleMobileNav);
        mobileNavCloseBtn.addEventListener('click', closeMobileNav); // Use dedicated close function
        mobileHowItWorksBtn.addEventListener('click', () => {
            // In a real app, this would navigate to a "How it Works" page
            showCustomAlert("How it Works functionality would be implemented here!");
            closeMobileNav(); // Close menu after click
        });
        mobileTripsBtn.addEventListener('click', () => {
            showUpcomingTripsPage();
            closeMobileNav(); // Close menu after click
        });
        mobileAboutBtn.addEventListener('click', () => {
            showAboutUsPage();
            closeMobileNav(); // Close menu after click
        });
        mobileDarkModeToggle.addEventListener('click', () => {
            toggleDarkMode();
            // Update the main dark mode toggle icon as well
            updateDarkModeToggleIcon(document.body.classList.contains('dark-mode'));
        });


        // Back button logic for Upcoming Trips page
        backFromTripsBtn.addEventListener('click', () => {
            if (currentPage === 'results') {
                showResultsPage(false);
            } else {
                showHomePage();
            }
        });

        // Back button logic for About Us page
        backFromAboutBtn.addEventListener('click', () => {
            if (currentPage === 'results') {
                showResultsPage(false);
            } else if (currentPage === 'trips') {
                showUpcomingTripsPage();
            }
            else {
                showHomePage();
            }
        });

        /**
         * Toggles the visibility of the mobile navigation overlay.
         */
        function toggleMobileNav() {
            mobileNavOverlay.classList.toggle('active');
            const isOpen = mobileNavOverlay.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent scrolling when menu is open
            updateTripsBadge(); // Update badge in mobile menu
        }

        /**
         * Explicitly closes the mobile navigation overlay.
         */
        function closeMobileNav() {
            mobileNavOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', false);
            document.body.style.overflow = ''; // Restore scrolling
        }

        /**
         * Toggles dark mode on and off.
         * Persists the preference in localStorage.
         */
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            updateDarkModeToggleIcon(isDarkMode);
            // Also update the mobile toggle icon
            mobileDarkModeToggle.innerHTML = isDarkMode ? '🌙' : '☀️';
            mobileDarkModeToggle.setAttribute('aria-label', isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode');
        }

        /**
         * Updates the dark mode toggle icon based on the current mode.
         * @param {boolean} isDarkMode - True if dark mode is active, false otherwise.
         */
        function updateDarkModeToggleIcon(isDarkMode) {
            darkModeToggle.innerHTML = isDarkMode ? '🌙' : '☀️';
            darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode');
        }

        /**
         * Applies the saved dark mode preference on page load.
         */
        function applySavedDarkModePreference() {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode === 'true') {
                document.body.classList.add('dark-mode');
                updateDarkModeToggleIcon(true);
            } else {
                updateDarkModeToggleIcon(false);
            }
        }

        /**
         * Hides all main content pages.
         */
        function hideAllPages() {
            homePage.classList.add('hidden');
            resultsPage.classList.add('hidden');
            upcomingTripsPage.classList.add('hidden');
            aboutUsPage.classList.add('hidden');
            closeModal(); // Ensure any open modals are closed
            closeMobileNav(); // Ensure mobile nav is closed
        }

        /**
         * Handles the search form submission.
         * Prevents default form behavior, captures input values, and displays results.
         * @param {Event} e - The submit event object.
         */
        function handleSearch(e) {
            e.preventDefault();
            const from = fromInput.value.trim();
            const to = toInput.value.trim();
            
            if (from && to) {
                searchData = { from, to };
                showResultsPage(true);
            } else {
                showCustomAlert('Please enter both "From" and "To" locations.');
            }
        }

        /**
         * Hides current page and shows the home page.
         */
        function showHomePage() {
            hideAllPages();
            homePage.classList.remove('hidden');
            currentPage = 'home';
            fromInput.value = '';
            toInput.value = '';
        }

        /**
         * Hides current page and shows the results page.
         * Also updates the route information and renders all restaurants.
         * @param {boolean} isNewSearch - True if this is a new search, false if returning from another page.
         */
        function showResultsPage(isNewSearch = false) {
            hideAllPages();
            resultsPage.classList.remove('hidden');
            currentPage = 'results';
            routeInfo.textContent = `Route: ${searchData.from} → ${searchData.to}`;
            if (isNewSearch) {
                renderRestaurants();
            }
        }

        /**
         * Shows the upcoming trips page and renders the list of reservations.
         */
        function showUpcomingTripsPage() {
            hideAllPages();
            upcomingTripsPage.classList.remove('hidden');
            renderUpcomingTrips();
        }

        /**
         * Shows the About Us page.
         */
        function showAboutUsPage() {
            hideAllPages();
            aboutUsPage.classList.remove('hidden');
        }

        /**
         * Renders the list of all mock restaurants.
         */
        function renderRestaurants() {
            const restaurantsToDisplay = restaurants; 
            resultsSubtitle.textContent = `Found ${restaurantsToDisplay.length} restaurants with DC fast chargers along your route`;
            restaurantsGrid.innerHTML = restaurantsToDisplay.map(restaurant => `
                <div class="restaurant-card">
                    <div class="restaurant-content">
                        <img 
                            src="${restaurant.image}" 
                            alt="${restaurant.name}"
                            class="restaurant-image"
                            onerror="this.onerror=null;this.src='https://placehold.co/400x300/e0e0e0/000000?text=Image+Not+Found';"
                        />
                        <div class="restaurant-info">
                            <div class="restaurant-header">
                                <div>
                                    <h3 class="restaurant-name">${restaurant.name}</h3>
                                    <p class="restaurant-cuisine">${restaurant.cuisine} • ${restaurant.price}</p>
                                    <div class="restaurant-meta">
                                        <span class="meta-item">
                                            📍 ${restaurant.distance}
                                        </span>
                                        <span class="meta-item">
                                            <span style="color: #10b981; font-weight: 600;">${restaurant.avgCost}</span>
                                            <span style="margin-left: 0.25rem;">for 2 people</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="rating-badge">
                                    <span class="rating-star">⭐</span>
                                    <span class="rating-text">${restaurant.rating}</span>
                                </div>
                            </div>

                            <div class="info-grid">
                                <div class="info-card charging-info">
                                    <div class="charging-header">
                                        <span class="charging-icon">⚡</span>
                                        <span class="charging-title">Charging Info</span>
                                    </div>
                                    <p class="charging-type">${restaurant.chargerType}</p>
                                    <div class="charging-time">
                                        <span>🕐</span>
                                        ${restaurant.chargingTime}
                                    </div>
                                </div>
                                <div class="info-card specialties-info">
                                    <div class="specialties-header">
                                        <span class="specialties-icon">👨‍🍳</span>
                                        <span class="specialties-title">Specialties</span>
                                    </div>
                                    <div class="specialties-text">
                                        ${restaurant.specialties.join(' • ')}
                                    </div>
                                </div>
                            </div>

                            <div class="restaurant-actions">
                                <button class="btn-primary" onclick="showReservationModal(${restaurant.id})">
                                    Reserve Table & Charger
                                </button>
                                <button class="btn-secondary" onclick="viewDetails(${restaurant.id})">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        /**
         * Renders the list of upcoming reservations.
         */
        function renderUpcomingTrips() {
            if (reservations.length === 0) {
                upcomingTripsSubtitle.textContent = "You have no upcoming reservations.";
                reservationsList.innerHTML = '';
                // Also update mobile badge
                mobileTripsBadge.classList.add('hidden');
                tripsBadge.classList.add('hidden');
                return;
            }

            upcomingTripsSubtitle.textContent = `You have ${reservations.length} upcoming reservation(s).`;
            reservations.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)); // Sort by date and time
            reservationsList.innerHTML = reservations.map(reservation => `
                <div class="reservation-card">
                    <h3>${reservation.restaurant.name}</h3>
                    <div class="reservation-details">
                        <p><strong>Cuisine:</strong> ${reservation.restaurant.cuisine}</p>
                        <p><strong>Date:</strong> ${reservation.date}</p>
                        <p><strong>Time:</strong> ${reservation.time}</p>
                        <p><strong>Guests:</strong> ${reservation.guests}</p>
                        <p class="reservation-route"><strong>Route:</strong> ${reservation.route.from} → ${reservation.route.to}</p>
                    </div>
                </div>
            `).join('');
            // Update mobile badge
            mobileTripsBadge.textContent = reservations.length;
            mobileTripsBadge.classList.remove('hidden');
        }


        /**
         * Displays a modal for selecting reservation date and time.
         * @param {number} restaurantId - The ID of the restaurant for reservation.
         */
        function showReservationModal(restaurantId) {
            const restaurant = restaurants.find(r => r.id === restaurantId);
            if (!restaurant) return;

            closeModal(); 

            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header">
                        <h2>Reserve at ${restaurant.name}</h2>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body reservation-modal-body">
                        <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
                        <p><strong>Avg. Cost:</strong> ${restaurant.avgCost} for 2 people</p>
                        <p><strong>Charger Type:</strong> ${restaurant.chargerType}</p>
                        <div class="input-group">
                            <label for="reservationDate" class="input-label">Date</label>
                            <input type="date" id="reservationDate" class="input-field" required>
                        </div>
                        <div class="input-group">
                            <label for="reservationTime" class="input-label">Time</label>
                            <input type="time" id="reservationTime" class="input-field" required>
                        </div>
                        <div class="input-group">
                            <label for="reservationGuests" class="input-label">Number of Guests</label>
                            <input type="number" id="reservationGuests" class="input-field" value="2" min="1" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary" onclick="closeModal()">Cancel</button>
                        <button class="btn-primary" 
                                onclick="confirmReservation(${restaurant.id}, 
                                document.getElementById('reservationDate').value, 
                                document.getElementById('reservationTime').value,
                                document.getElementById('reservationGuests').value)">
                            Confirm Reservation
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            document.getElementById('reservationDate').value = `${year}-${month}-${day}`;
        }

        /**
         * Confirms the reservation after date and time are selected.
         * @param {number} restaurantId - The ID of the restaurant.
         * @param {string} date - The selected date string.
         * @param {string} time - The selected time string.
         * @param {string} guests - The number of guests.
         */
        function confirmReservation(restaurantId, date, time, guests) {
            if (!date || !time || !guests || parseInt(guests) < 1) {
                showCustomAlert('Please select a valid date, time, and number of guests.');
                return;
            }

            const restaurant = restaurants.find(r => r.id === restaurantId);
            if (restaurant) {
                const newReservation = {
                    id: Date.now(),
                    restaurant: restaurant,
                    date: date,
                    time: time,
                    guests: parseInt(guests),
                    route: searchData,
                    status: 'confirmed'
                };
                
                reservations.push(newReservation);
                updateTripsBadge();
                closeModal();
                showCustomAlert(`Reservation confirmed at ${restaurant.name} for ${date} at ${time} for ${guests} guests.`);
            }
        }

        /**
         * Displays a modal with detailed information about a selected restaurant.
         * @param {number} restaurantId - The ID of the restaurant to view details for.
         */
        function viewDetails(restaurantId) {
            const restaurant = restaurants.find(r => r.id === restaurantId);
            if (restaurant) {
                closeModal(); 
                showDetailsModal(restaurant);
            }
        }

        /**
         * Creates and displays a custom modal for restaurant details.
         * @param {Object} restaurant - The restaurant object to display details for.
         */
        function showDetailsModal(restaurant) {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${restaurant.name}</h2>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <img 
                            src="${restaurant.image}" 
                            alt="${restaurant.name}" 
                            class="modal-image"
                            onerror="this.onerror=null;this.src='https://placehold.co/600x200/e0e0e0/000000?text=Image+Not+Found';"
                        >
                        <div class="modal-info">
                            <div class="modal-section">
                                <h3>About</h3>
                                <p>${restaurant.description}</p>
                            </div>
                            <div class="modal-section">
                                <h3>Charging Details</h3>
                                <p><strong>Charger Type:</strong> ${restaurant.chargerType}</p>
                                <p><strong>Charging Time:</strong> ${restaurant.chargingTime}</p>
                                <p><strong>Available Spots:</strong> ${restaurant.chargingSpots}</p>
                            </div>
                            <div class="modal-section">
                                <h3>Restaurant Info</h3>
                                <p><strong>Hours:</strong> ${restaurant.hours}</p>
                                <p><strong>Average Cost:</strong> ${restaurant.avgCost} for 2 people</p>
                                <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
                            </div>
                            <div class="modal-section">
                                <h3>Specialties</h3>
                                <div class="specialties-list">
                                    ${restaurant.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary" onclick="showReservationModal(${restaurant.id});">
                            Reserve Table & Charger
                        </button>
                        <button class="btn-secondary" onclick="closeModal()">Close</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        }

        /**
         * Closes any open modal.
         */
        function closeModal() {
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                modal.remove();
            }
        }

        /**
         * Displays a custom alert message using a modal.
         * @param {string} message - The message to display.
         */
        function showCustomAlert(message) {
            const alertModal = document.createElement('div');
            alertModal.className = 'modal-overlay';
            alertModal.innerHTML = `
                <div class="modal-content" style="max-width: 400px; text-align: center;">
                    <div class="modal-header">
                        <h2>Notification</h2>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${message.replace(/\n/g, '<br>')}</p>
                    </div>
                    <div class="modal-footer" style="justify-content: center;">
                        <button class="btn-primary" onclick="closeModal()">OK</button>
                    </div>
                </div>
            `;
            document.body.appendChild(alertModal);
        }

        /**
         * Updates the number displayed on the "Upcoming Trips" badge.
         */
        function updateTripsBadge() {
            if (reservations.length > 0) {
                tripsBadge.textContent = reservations.length;
                tripsBadge.classList.remove('hidden');
                mobileTripsBadge.textContent = reservations.length;
                mobileTripsBadge.classList.remove('hidden');
            } else {
                tripsBadge.classList.add('hidden');
                mobileTripsBadge.classList.add('hidden');
            }
        }

        // Initialize the app by updating the trips badge and applying dark mode preference on load
        updateTripsBadge();
        applySavedDarkModePreference();
    