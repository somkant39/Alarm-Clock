
// DOM Elements
    document.addEventListener("DOMContentLoaded", function() {
        const timeDisplay = document.getElementById("time");
        const setAlarmButton = document.getElementById("setAlarm");
        const alarmList = document.getElementById("alarmList");

    // Update clock for each and every second...
        setInterval(updateClock, 1000);

        
    // Handle setting alarms
        setAlarmButton.addEventListener("click", setAlarm);

    // Function to convert time into 12 hrs format and update meridiem according to the time...
        function updateClock() {
            const now = new Date();
        // Converts hrs 0 to 12...
            const hours = now.getHours() % 12 || 12; 
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const meridiem = now.getHours() >= 12 ? "PM" : "AM";

            timeDisplay.textContent = `${hours}:${minutes}:${seconds} ${meridiem}`;
        }

    // Function to set the Alarms...
        function setAlarm() {
            const hour = document.getElementById("hour").value;
            const minute = document.getElementById("minute").value;
            const second = document.getElementById("second").value;
            const meridiem = document.getElementById("meridiem").value;
            const alarmName = document.getElementById("alarmName").value;

            if (!isValidTime(hour, minute, second)) {
                alert("Please enter a valid input.");
                return;
            }

        // To display the time in the following format...
            const alarmTime = `${hour}:${minute}:${second} ${meridiem}`;
            const li = document.createElement("li");
            
            if (alarmName) {
                li.innerHTML = `<strong>${alarmName}:</strong> ${alarmTime}`;
            } else {
                li.textContent = alarmTime;
            }
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", () => {
                li.remove();
            });
            li.appendChild(deleteButton);
            alarmList.appendChild(li);

        // Clear the input fields
            document.getElementById("hour").value = "";
            document.getElementById("minute").value = "";
            document.getElementById("second").value = "";
            document.getElementById("alarmName").value = "";

        // Set a timeout to trigger the alarm
            setTimeout(() => {
                alert(`Alarm for ${alarmName || 'Unnamed Alarm'} at - ${alarmTime}`);
            }, calculateTimeToAlarm(hour, minute, second, meridiem));
        }

    // Function to validate input time's values
        function isValidTime(hour, minute, second) {
            return (
                hour >= 1 && hour <= 12 &&
                minute >= 0 && minute <= 59 &&
                second >= 0 && second <= 59
            );
        }

    // Function to calculate the time until the alarm should go off
        function calculateTimeToAlarm(hour, minute, second, meridiem) {
            const now = new Date();
            const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), convertHourTo24Hour(hour, meridiem), minute, second, 0);
            const timeDifference = alarmTime - now;
            return timeDifference > 0 ? timeDifference : 0;
        }

    // Function to convert the time into 24 hrs format...
        function convertHourTo24Hour(hour, meridiem) {
            if (meridiem === "AM" && hour === "12") {
                return 0;
            } else if (meridiem === "PM" && hour !== "12") {
                return parseInt(hour) + 12;
            } else {
                return parseInt(hour);
            }
        }
    });