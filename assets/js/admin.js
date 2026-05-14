const token = localStorage.getItem('adminToken');

if (!token) {

    window.location.href = 'login.html';
}

firebase.auth().onAuthStateChanged(user => {

    if (!user) {

        window.location.href = 'login.html';
    }
});

const saveRoomBtn = document.getElementById('saveRoomBtn');

const roomsContainer = document.getElementById('roomsContainer');

const messagesContainer = document.getElementById('messagesContainer');

let editingRoomId = null;

saveRoomBtn.addEventListener('click', () => {

    const roomName = document.getElementById('roomName').value;

    const roomPrice = document.getElementById('roomPrice').value;

    const totalRooms = document.getElementById('totalRooms').value;

    const availableRooms = document.getElementById('availableRooms').value;

    const roomImage = document.getElementById('roomImage').value;

    if (
        roomName === '' ||
        roomPrice === '' ||
        totalRooms === '' ||
        availableRooms === ''
    ) {

        alert('Please fill all fields');

        return;
    }

    let roomId;

    if (editingRoomId) {

        roomId = editingRoomId;

    } else {

        roomId = roomName
            .toLowerCase()
            .replace(/\s+/g, '-');
    }

    db.ref('rooms/' + roomId).set({

        name: roomName,

        price: roomPrice,

        totalRooms: totalRooms,

        availableRooms: availableRooms,

        image: roomImage

    })

    .then(() => {

        alert(editingRoomId ? 'Room Updated Successfully' : 'Room Saved Successfully');

        clearForm();

        editingRoomId = null;

        saveRoomBtn.innerText = 'Save Room';

    })

    .catch(error => {

        alert(error.message);
    });
});

function clearForm() {

    document.getElementById('roomName').value = '';

    document.getElementById('roomPrice').value = '';

    document.getElementById('totalRooms').value = '';

    document.getElementById('availableRooms').value = '';

    document.getElementById('roomImage').value = '';
}

function loadRooms() {

    db.ref('rooms').on('value', snapshot => {

        roomsContainer.innerHTML = '';

        snapshot.forEach(childSnapshot => {

            const roomId = childSnapshot.key;

            const room = childSnapshot.val();

            roomsContainer.innerHTML += `

                <div class="room-item">

                    <h3>${room.name}</h3>

                    <p><strong>Price:</strong> ₹${room.price}</p>

                    <p><strong>Total Rooms:</strong> ${room.totalRooms}</p>

                    <p><strong>Available Rooms:</strong> ${room.availableRooms}</p>

                    <img 
                        src="${room.image}" 
                        width="200"
                        style="border-radius:8px;margin-top:10px;"
                    >

                    <div style="margin-top:15px;">

                        <button onclick="editRoom('${roomId}')">
                            Edit
                        </button>

                        <button 
                            onclick="deleteRoom('${roomId}')"
                            style="background:red;color:white;margin-left:10px;"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            `;
        });
    });
}

function editRoom(roomId) {

    db.ref('rooms/' + roomId).once('value')

    .then(snapshot => {

        const room = snapshot.val();

        document.getElementById('roomName').value = room.name;

        document.getElementById('roomPrice').value = room.price;

        document.getElementById('totalRooms').value = room.totalRooms;

        document.getElementById('availableRooms').value = room.availableRooms;

        document.getElementById('roomImage').value = room.image;

        editingRoomId = roomId;

        saveRoomBtn.innerText = 'Update Room';

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function deleteRoom(roomId) {

    const confirmDelete = confirm('Delete this room?');

    if (!confirmDelete) return;

    db.ref('rooms/' + roomId).remove()

    .then(() => {

        alert('Room Deleted Successfully');
    });
}

function loadMessages() {

    db.ref('messages').on('value', snapshot => {

        messagesContainer.innerHTML = '';

        snapshot.forEach(childSnapshot => {

            const msg = childSnapshot.val();

            messagesContainer.innerHTML += `

                <div class="message-item">

                    <h3>${msg.name}</h3>

                    <p><strong>Email:</strong> ${msg.email}</p>

                    <p><strong>Phone:</strong> ${msg.phone}</p>

                    <p><strong>Message:</strong> ${msg.message}</p>

                </div>
            `;
        });
    });
}

loadRooms();

loadMessages();

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {

    firebase.auth().signOut()

    .then(() => {

        localStorage.removeItem('adminToken');

        window.location.href = 'login.html';
    });
});