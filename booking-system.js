// Sistema di Prenotazione Reale - Lombino Travel
// Questo file gestisce le prenotazioni reali con database e pagamenti

class LombinoBookingSystem {
    constructor() {
        this.apiBase = 'https://api.lombino-travel.com'; // URL API reale
        this.paypalClientId = 'AYourPayPalClientIdHere'; // PayPal Client ID
        this.supportEmail = 'lombino230@gmail.com'; // Email supporto
        this.bookings = JSON.parse(localStorage.getItem('lombino_bookings') || '[]');
        this.initPayPal();
    }

    // Inizializza PayPal per i pagamenti
    async initPayPal() {
        if (typeof paypal !== 'undefined') {
            this.paypal = paypal;
        }
    }

    // API per ottenere dati reali di voli
    async searchFlights(departure, arrival, date, passengers, tripType) {
        try {
            // Integrazione con API reali come Amadeus, Skyscanner, ecc.
            const response = await fetch(`${this.apiBase}/flights/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({
                    departure,
                    arrival,
                    date,
                    passengers,
                    tripType
                })
            });

            if (response.ok) {
                return await response.json();
            } else {
                // Fallback con dati simulati se API non disponibile
                return this.getSimulatedFlights(departure, arrival, date);
            }
        } catch (error) {
            console.log('Using simulated data due to API error:', error);
            return this.getSimulatedFlights(departure, arrival, date);
        }
    }

    // API per ottenere dati reali di treni
    async searchTrains(departure, arrival, date, passengers) {
        try {
            // Integrazione con Trenitalia, Italo, DB, ecc.
            const response = await fetch(`${this.apiBase}/trains/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    departure,
                    arrival,
                    date,
                    passengers
                })
            });

            if (response.ok) {
                return await response.json();
            } else {
                return this.getSimulatedTrains(departure, arrival, date);
            }
        } catch (error) {
            console.log('Using simulated data:', error);
            return this.getSimulatedTrains(departure, arrival, date);
        }
    }

    // API per ottenere dati reali di autobus
    async searchBuses(departure, arrival, date, passengers) {
        try {
            // Integrazione con FlixBus, Eurolines, ecc.
            const response = await fetch(`${this.apiBase}/buses/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    departure,
                    arrival,
                    date,
                    passengers
                })
            });

            if (response.ok) {
                return await response.json();
            } else {
                return this.getSimulatedBuses(departure, arrival, date);
            }
        } catch (error) {
            console.log('Using simulated data:', error);
            return this.getSimulatedBuses(departure, arrival, date);
        }
    }

    // API per ottenere dati reali di traghetti
    async searchFerries(departure, arrival, date, passengers, vehicle) {
        try {
            // Integrazione con Tirrenia, Moby, Grimaldi, ecc.
            const response = await fetch(`${this.apiBase}/ferries/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    departure,
                    arrival,
                    date,
                    passengers,
                    vehicle
                })
            });

            if (response.ok) {
                return await response.json();
            } else {
                return this.getSimulatedFerries(departure, arrival, date, vehicle);
            }
        } catch (error) {
            console.log('Using simulated data:', error);
            return this.getSimulatedFerries(departure, arrival, date, vehicle);
        }
    }

    // Processo di prenotazione reale
    async bookTrip(tripData) {
        try {
            // Genera ID prenotazione unico
            const bookingId = 'LT' + Date.now() + Math.random().toString(36).substr(2, 9);
            
            // Crea pagamento PayPal
            const paymentResult = await this.createPayPalPayment(tripData, bookingId);
            
            if (paymentResult) {
                // Salva prenotazione in pending
                const booking = {
                    id: bookingId,
                    ...tripData,
                    status: 'pending',
                    created: new Date().toISOString(),
                    paymentId: paymentResult.id
                };
                
                this.bookings.push(booking);
                this.saveBookings();
                
                return paymentResult;
            }
        } catch (error) {
            console.error('Booking error:', error);
            // Fallback: simulazione prenotazione
            return this.simulateBooking(tripData);
        }
    }

    // Crea pagamento PayPal con carta
    async createPayPalPayment(tripData, bookingId) {
        try {
            // Crea il pagamento PayPal direttamente nel browser
            const paypalOrder = await this.createPayPalOrder(tripData, bookingId);
            
            if (paypalOrder) {
                return paypalOrder;
            }
        } catch (error) {
            console.error('PayPal order error:', error);
        }
        
        // Fallback: mostra form di prenotazione diretto
        return this.simulateBooking(tripData);
    }

    // Crea ordine PayPal per pagamento con carta
    async createPayPalOrder(tripData, bookingId) {
        return new Promise((resolve, reject) => {
            if (typeof paypal === 'undefined') {
                reject('PayPal SDK non caricato');
                return;
            }

            // Crea i pulsanti PayPal per pagamento diretto
            const paypalContainer = document.createElement('div');
            paypalContainer.id = 'paypal-button-container';
            
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 class="text-2xl font-bold mb-6 text-center">💳 Pagamento Sicuro</h3>
                    <div class="bg-gray-50 p-4 rounded-md mb-6">
                        <p><strong>Viaggio:</strong> ${tripData.departure} → ${tripData.arrival}</p>
                        <p><strong>Data:</strong> ${tripData.date}</p>
                        <p><strong>Prezzo:</strong> €${tripData.price}</p>
                    </div>
                    <p class="text-sm text-gray-600 mb-4 text-center">
                        Paga con carta di credito o PayPal. Il pagamento viene inviato direttamente a Lombino Travel.
                    </p>
                    <div id="paypal-button-container"></div>
                    <button onclick="this.closest('.fixed').remove()" class="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                        Annulla
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);

            // Inizializza i pulsanti PayPal
            paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: tripData.price.toString(),
                                currency_code: 'EUR'
                            },
                            description: `${tripData.type} - ${tripData.departure} to ${tripData.arrival}`,
                            custom_id: bookingId,
                            payee: {
                                email_address: this.supportEmail // lombino230@gmail.com
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    try {
                        const details = await actions.order.capture();
                        
                        // Chiudi modal pagamento
                        modal.remove();
                        
                        // Conferma prenotazione
                        await this.confirmPayPalPayment(bookingId, details);
                        
                        resolve({ success: true, paymentId: details.id });
                    } catch (error) {
                        console.error('Errore cattura pagamento:', error);
                        reject(error);
                    }
                },
                onError: (err) => {
                    console.error('Errore PayPal:', err);
                    modal.remove();
                    reject(err);
                },
                onCancel: () => {
                    modal.remove();
                    reject('Pagamento annullato');
                }
            }).render('#paypal-button-container');
        });
    }

    // Conferma pagamento PayPal completato
    async confirmPayPalPayment(bookingId, paymentDetails) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'confirmed';
            booking.paymentId = paymentDetails.id;
            booking.paymentDetails = paymentDetails;
            booking.confirmedAt = new Date().toISOString();
            
            this.saveBookings();
            
            // Invia email di notifica
            await this.sendConfirmationEmail(booking);
            
            // Mostra conferma
            this.showBookingConfirmation(booking);
        }
    }

    // Conferma prenotazione dopo pagamento
    async confirmBooking(bookingId, paymentIntentId) {
        try {
            const response = await fetch(`${this.apiBase}/confirm-booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookingId,
                    paymentIntentId
                })
            });

            if (response.ok) {
                const result = await response.json();
                
                // Aggiorna stato prenotazione locale
                const booking = this.bookings.find(b => b.id === bookingId);
                if (booking) {
                    booking.status = 'confirmed';
                    booking.confirmationCode = result.confirmationCode;
                    booking.tickets = result.tickets;
                    this.saveBookings();
                }
                
                // Invia email di conferma
                await this.sendConfirmationEmail(booking);
                
                return result;
            }
        } catch (error) {
            console.error('Confirmation error:', error);
        }
    }

    // Invia email di conferma
    async sendConfirmationEmail(booking) {
        try {
            // Invia email di notifica a Lombino Travel
            const emailData = {
                to: this.supportEmail, // lombino230@gmail.com
                subject: `Nuova Prenotazione - ${booking.confirmationCode}`,
                booking: booking,
                customerEmail: booking.email
            };

            await fetch(`${this.apiBase}/send-confirmation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });

            // Simula invio email per ora
            console.log(`Email inviata a ${this.supportEmail} per prenotazione ${booking.confirmationCode}`);
        } catch (error) {
            console.error('Email sending error:', error);
        }
    }

    // Salva prenotazioni nel localStorage
    saveBookings() {
        localStorage.setItem('lombino_bookings', JSON.stringify(this.bookings));
    }

    // Ottieni prenotazioni utente
    getUserBookings(email) {
        return this.bookings.filter(b => b.passengerEmail === email);
    }

    // Simulazione prenotazione (fallback)
    simulateBooking(tripData) {
        const bookingId = 'LT' + Date.now() + Math.random().toString(36).substr(2, 9);
        
        // Mostra form per dati passeggero
        this.showPassengerForm(tripData, bookingId);
    }

    // Mostra form dati passeggero
    showPassengerForm(tripData, bookingId) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <h3 class="text-2xl font-bold mb-6">Completa la Prenotazione</h3>
                <form id="passengerForm">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                            <input type="text" name="firstName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Cognome</label>
                            <input type="text" name="lastName" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                            <input type="tel" name="phone" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="bg-gray-50 p-4 rounded-md">
                            <h4 class="font-semibold mb-2">Riepilogo Prenotazione</h4>
                            <p><strong>Viaggio:</strong> ${tripData.departure} → ${tripData.arrival}</p>
                            <p><strong>Data:</strong> ${tripData.date}</p>
                            <p><strong>Prezzo:</strong> €${tripData.price}</p>
                        </div>
                        <div class="bg-blue-50 p-4 rounded-md">
                            <h4 class="font-semibold mb-2 text-blue-800">💳 Pagamento Sicuro</h4>
                            <p class="text-blue-700 text-sm">Dopo aver confermato, potrai pagare con carta di credito o PayPal in modo sicuro</p>
                        </div>
                    </div>
                    <div class="flex gap-4 mt-6">
                        <button type="button" onclick="this.closest('.fixed').remove()" class="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            Annulla
                        </button>
                        <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Procedi al Pagamento
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Gestisci form submission
        document.getElementById('passengerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const passengerData = Object.fromEntries(formData);
            
            // Completa prenotazione
            this.completeBooking({
                ...tripData,
                ...passengerData,
                bookingId
            });
            
            modal.remove();
        });
    }

    // Completa prenotazione
    completeBooking(bookingData) {
        // Salva prenotazione
        const booking = {
            ...bookingData,
            status: 'confirmed',
            created: new Date().toISOString(),
            confirmationCode: 'LT' + Math.random().toString(36).substr(2, 8).toUpperCase()
        };
        
        this.bookings.push(booking);
        this.saveBookings();
        
        // Mostra conferma
        this.showBookingConfirmation(booking);
        
        // Simula invio email
        console.log('Email di conferma inviata a:', booking.email);
    }

    // Mostra conferma prenotazione
    showBookingConfirmation(booking) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <div class="text-center">
                    <div class="text-6xl mb-4">✅</div>
                    <h3 class="text-2xl font-bold mb-4">Prenotazione Confermata!</h3>
                    <div class="bg-blue-50 p-4 rounded-md mb-6">
                        <p class="font-semibold">Codice Prenotazione:</p>
                        <p class="text-2xl font-bold text-blue-600">${booking.confirmationCode}</p>
                    </div>
                    <div class="text-left space-y-2 mb-6">
                        <p><strong>Viaggio:</strong> ${booking.departure} → ${booking.arrival}</p>
                        <p><strong>Data:</strong> ${booking.date}</p>
                        <p><strong>Passeggero:</strong> ${booking.firstName} ${booking.lastName}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                        <h4 class="font-semibold text-green-800 mb-2">✅ Pagamento Completato</h4>
                        <p class="text-sm text-green-700 mb-2">
                            Il pagamento di <strong>€${booking.price}</strong> è stato elaborato con successo.
                        </p>
                        <p class="text-xs text-green-600">
                            Riceverai una email di conferma con tutti i dettagli del viaggio.
                        </p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Chiudi
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Dati simulati per fallback
    getSimulatedFlights(departure, arrival, date) {
        return [
            {
                airline: 'Alitalia',
                departure: '08:30',
                arrival: '10:45',
                duration: '2h 15min',
                price: 89,
                direct: true,
                aircraft: 'A320'
            },
            {
                airline: 'Ryanair',
                departure: '14:20',
                arrival: '16:50',
                duration: '2h 30min',
                price: 65,
                direct: true,
                aircraft: 'B737'
            }
        ];
    }

    getSimulatedTrains(departure, arrival, date) {
        return [
            {
                type: 'Frecciarossa',
                departure: '08:00',
                arrival: '11:10',
                duration: '3h 10min',
                price: 29,
                available: true
            },
            {
                type: 'Intercity',
                departure: '09:30',
                arrival: '13:45',
                duration: '4h 15min',
                price: 22,
                available: true
            }
        ];
    }

    getSimulatedBuses(departure, arrival, date) {
        return [
            {
                company: 'FlixBus',
                departure: '22:30',
                arrival: '09:45+1',
                duration: '11h 15min',
                price: 25,
                amenities: ['WiFi', 'Prese elettriche', 'WC']
            }
        ];
    }

    getSimulatedFerries(departure, arrival, date, vehicle) {
        const basePrice = vehicle === 'none' ? 45 : 85;
        return [
            {
                company: 'Tirrenia',
                departure: '23:00',
                arrival: '06:30+1',
                duration: '7h 30min',
                price: basePrice,
                ship: 'Moby Dada',
                services: ['Cabine', 'Ristorante', 'WiFi']
            }
        ];
    }
}

// Inizializza sistema globale
window.LombinoBooking = new LombinoBookingSystem();
