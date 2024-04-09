var firebaseConfig = {
    apiKey: "AIzaSyB5liOxw1oZy1LXRzbDz5xZoqNJTbAK13U",
    authDomain: "letschat94-91eaa.firebaseapp.com",
    databaseURL: "https://letschat94-91eaa-default-rtdb.firebaseio.com",
    projectId: "letschat94-91eaa",
    storageBucket: "letschat94-91eaa.appspot.com",
    messagingSenderId: "1023636996715",
    appId: "1:1023636996715:web:7cbb5d398ece45dd32672e"
  };
  
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });

}

getData();

function redirectToRoomName(Room_names) {
    console.log(Room_names);
    localStorage.setItem("Room_names", Room_names);
    window.location = "kwitter_page.html";
}