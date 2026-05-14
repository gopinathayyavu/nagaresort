const roomsDetailedContainer = document.getElementById('roomsDetailedContainer');

function loadDetailedRooms() {

    db.ref('rooms').on('value', snapshot => {

        roomsDetailedContainer.innerHTML = '';

        snapshot.forEach(childSnapshot => {

            const room = childSnapshot.val();

            roomsDetailedContainer.innerHTML += `

                <div class="room-detailed-card">

                    <div class="room-detailed-img">

                        <img 
                            src="${room.image}" 
                            alt="${room.name}"
                        >

                    </div>

                    <div class="room-detailed-info">

                        <h2>${room.name}</h2>

                        <div class="price">

                            ₹${room.price}

                            <span>/ night</span>

                        </div>

                        <p>

                            Experience luxury and comfort at 
                            Naga Resort Kodaikanal with stunning
                            valley views and premium hospitality.

                        </p>

                        <div class="room-features-list">

                            <span>
                                <i class="fas fa-wifi"></i>
                                High-speed WiFi
                            </span>

                            <span>
                                <i class="fas fa-mountain"></i>
                                Valley View
                            </span>

                            <span>
                                <i class="fas fa-coffee"></i>
                                Tea/Coffee Maker
                            </span>

                            <span>
                                <i class="fas fa-tv"></i>
                                Smart TV
                            </span>

                            <span>
                                <i class="fas fa-shower"></i>
                                Rain Shower
                            </span>

                        </div>

                        <p style="margin-top:15px;">

                            <strong>Total Rooms:</strong>
                            ${room.totalRooms}

                        </p>

                        <p>

                            <strong>Available Rooms:</strong>
                            ${room.availableRooms}

                        </p>

                        <button class="btn-gold book-room-btn">

                            Book Now

                        </button>

                    </div>

                </div>

            `;
        });
    });
}

loadDetailedRooms();