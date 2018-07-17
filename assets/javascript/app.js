var config = {
    apiKey: "AIzaSyCMB_usSbI92Hset-ICSZNpOu_3kVldOtI",
    authDomain: "trainscheduler-e2d1f.firebaseapp.com",
    databaseURL: "https://trainscheduler-e2d1f.firebaseio.com",
    projectId: "trainscheduler-e2d1f",
    storageBucket: "",
    messagingSenderId: "645840782552"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainButton").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: firstTrain,
        frequency: trainFrequency
    }

    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
});

database.ref().on("child_added", function(snapshot) {
    var tName = snapshot.val().name;
    var tDestination = snapshot.val().destination;
    var tFirst = snapshot.val().start;
    var tFrequency = snapshot.val().frequency;

    var firstTimeConverted = moment(tFirst, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutes = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutes, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFirst),
        $("<td>").text(tFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutes)
    );

    $("#trainTable > tbody").append(newRow);
});