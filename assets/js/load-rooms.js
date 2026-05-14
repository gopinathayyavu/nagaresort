const roomsContainer = document.getElementById('roomsContainer');

function loadRooms() {

    db.ref('rooms').on('value', snapshot => {

        roomsContainer.innerHTML = '';

        snapshot.forEach(childSnapshot => {

            const room = childSnapshot.val();

            roomsContainer.innerHTML += `

                <div class="room-card">

                    <img 
                        src="${room.image}" 
                        alt="${room.name}" 
                        loading="lazy"
                    >

                    <div class="room-info">

                        <h3>${room.name}</h3>

                        <div class="price">
                            ₹${room.price}
                            <span style="font-size:1rem;"> / night</span>
                        </div>

                        <p>
                            Available Rooms: 
                            <strong>${room.availableRooms}</strong>
                        </p>

                        <p>
                            Total Rooms: 
                            <strong>${room.totalRooms}</strong>
                        </p>

                        <a href="rooms.html" target="_blank">

                            <button class="btn-view">
                                View Details
                            </button>

                        </a>

                    </div>

                </div>

            `;
        });
    });
}

loadRooms();