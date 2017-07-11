 


 var config = {
    apiKey: "AIzaSyCPeD_m4M-00LiLAVvRE7Gzdizim2qDD4A",
    authDomain: "anaproject-4cb91.firebaseapp.com",
    databaseURL: "https://anaproject-4cb91.firebaseio.com",
    projectId: "anaproject-4cb91",
    storageBucket: "anaproject-4cb91.appspot.com",
    messagingSenderId: "78796771551"
  };
  firebase.initializeApp(config);


var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
 
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = $("#train-time-input").val().trim();
  var tFrequency = $("#frequency-input").val().trim();
  console.log(firstTime);

   
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     var nextArrival=moment(nextTrain).format("hh:mm")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   $(".form-control").val("");
 
  var newTrain = {
    name: trainName,
    destination: destination,   
   frequency: tFrequency,
   nextArrival:nextArrival,
   minutesAway:tMinutesTillTrain
  };

  
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain. destination);
  console.log(newTrain.frequency);
  
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
  
  var trainame = childSnapshot.val().name;
  var traindest= childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var arrival=childSnapshot.val().nextArrival;
  var minutes=childSnapshot.val().minutesAway;

  
  $("#train-table > tbody").append("<tr><td>" +  trainame  + "</td><td>" + traindest + "</td><td>"
   + trainFrequency +"</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
});
