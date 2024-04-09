var firebaseConfig = {
    apiKey: "AIzaSyAz0udSHQ99dqllgzo3QuRU9YOyd1gO0oM",
    authDomain: "kwitterclass-44a21.firebaseapp.com",
    databaseURL: "https://kwitterclass-44a21-default-rtdb.firebaseio.com",
    projectId: "kwitterclass-44a21",
    storageBucket: "kwitterclass-44a21.appspot.com",
    messagingSenderId: "464151707181",
    appId: "1:464151707181:web:20402cb5e55250c04182a4",
    measurementId: "G-S50EDR8MJL"
};

firebase.initializeApp(firebaseConfig);
var room_name = localStorage.getItem("room_name");
var user_name = localStorage.getItem("user_name");
function send() {
    var message = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: message,
        like: 0
    });
    message = " ";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                name = message_data["name"];
                message = message_data["message"];
                like = message_data["like"];
                console.log("name = " + name);
                console.log("message is " + message);
                console.log("likes = " + like);
                namewithtag = "<h4>"+ name +"<img src='tick.png' class='user_tick'></h4>";
                messagewithtag = "<h4 class='message_h4'>" + message + "</h4>";
                likewithtag = "<button  class='btn btn-warning' id=" +firebase_message_id+" value="+ like +" onclick='updatelike(this.id)'>";
                spanwithtag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+ like + "</span></button> <hr>";
                row = namewithtag + messagewithtag + likewithtag + spanwithtag;
                document.getElementById("output").innerHTML =row;
                //End code

        
            }
        });
    })
}
getData();

function updatelike(message_id){
    console.log("clicked on message button" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updatedlikes = Number(likes)+1;
    console.log("updated likes = " + updatedlikes);
    firebase.database().ref(room_name).child(message_id).update({
        like: updatedlikes
    });
}