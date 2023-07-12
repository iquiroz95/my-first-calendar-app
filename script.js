document.addEventListener("DOMContentLoaded", function() {
    // Get the necessary elements
    const monthsList = document.querySelector(".months");
    const daysList = document.querySelector(".days");
    const forwardButton = document.getElementById("Forward");
    const backButton = document.getElementById("Back");
    const calendar = document.querySelector(".calendar");
    const notesList = document.querySelector(".notes-list");
    const notes = [];
    let entryList = null;
  
    // Initial month index
    let currentMonthIndex = 0;
    let currentDateItem = null; // Store the current date item
  
    function displayCurrentMonth() {
      // Hide all months
      const allMonths = monthsList.querySelectorAll("li");
      allMonths.forEach((month, index) => {
        month.style.display = index === currentMonthIndex ? "block" : "none";
      });
    }
  
    // Function to update the days based on the selected month
    function updateDays() {
      // Clear the days list
      daysList.innerHTML = "";
  
      // Get the number of days in the selected month
      const currentMonth = monthsList.querySelector(`li:nth-child(${currentMonthIndex + 1})`);
      const monthIndex = currentMonthIndex + 1; // Adjust month index to match JavaScript Date object format
      const daysInMonth = new Date(new Date().getFullYear(), currentMonthIndex + 1, 0).getDate();
  
      // Get the starting day of the month
      const firstDay = new Date(new Date().getFullYear(), currentMonthIndex, 1).getDay();
  
      // Add empty list items for the days before the starting day
      for (let i = 0; i < firstDay; i++) {
        const emptyDayItem = document.createElement("li");
        daysList.appendChild(emptyDayItem);
      }
  
      // Add the days to the list
      for (let i = 1; i <= daysInMonth; i++) {
        const dayItem = document.createElement("li");
        dayItem.textContent = i < 10 ? `0${i}` : i;
        daysList.appendChild(dayItem);
  
        // Check if the day item corresponds to today's date
        const currentDate = new Date();
        if (
          currentDate.getFullYear() === new Date().getFullYear() &&
          currentDate.getMonth() === currentMonthIndex &&
          i === currentDate.getDate()
        ) {
          dayItem.classList.add("current-date");
          currentDateItem = dayItem; // Store the current date item
        }
  
        // Add click event listener to each day item
        dayItem.addEventListener("click", handleDayItemClick);
      }
    }
  
    // Function to handle the "Forward" button click
    function handleForwardButtonClick() {
      if (currentMonthIndex < 11 - 1) {
        currentMonthIndex++;
      } else {
        currentMonthIndex = 0;
      }
      displayCurrentMonth();
      updateDays();
  
      // Highlight the current date after navigation
      if (currentDateItem) {
        currentDateItem.classList.add("current-date");
      }
    }

    function closeList() {
        // Get the notes list element
        const notesList = document.querySelector(".notes-list");
      
        // Close the list
        notesList.classList.remove("show");
      }
      
      // Add the closeList() function to the day item click event listener
      daysList.addEventListener("click", handleDayItemClick);
      
      // Function to handle day item click
      function handleDayItemClick(event) {
    // Get the day item that was clicked
        const dayItem = event.target;
  
    // Call the resetNotes() function
        resetNotes(dayItem);
  
    // Toggle the visibility of the entry list
        entryList.classList.toggle("show");
  }
  
    // Function to handle the "Back" button click
    function handleBackButtonClick() {
      if (currentMonthIndex > 0) {
        currentMonthIndex--;
      } else {
        currentMonthIndex = 11 - 1;
      }
      displayCurrentMonth();
      updateDays();
  
      // Highlight the current date after navigation
      if (currentDateItem) {
        currentDateItem.classList.add("current-date");
      }
    }
  
    // Function to handle day item click
    function handleDayItemClick(event) {
      if (!entryList) {
        // Create the list of AM and PM hours
        entryList = document.createElement("ul");
        entryList.classList.add("entry-list");
  
        for (let i = 0; i < 24; i++) {
          const hourItem = document.createElement("li");
          const hour = i % 12 || 12;
          const dayItem = event.target;
          const period = i < 12 ? "AM" : "PM";
          hourItem.textContent = `${hour}:00 ${period}`;
          hourItem.addEventListener("click", handleHourItemClick);
          entryList.appendChild(hourItem);
        }
        // Possible to style here?
        entryList.style.position = "fixed";
        entryList.style.left = "10px";
        entryList.style.top = "10px";
  
        // Append the list to the calendar div
        const calendar = document.querySelector(".calendar");
        calendar.appendChild(entryList);
  
        // Close the entry list on double click
        entryList.addEventListener("dblclick", function() {
          entryList.classList.remove("show");
        });
      } else {
        // Toggle the visibility of the entry list
        entryList.classList.toggle("show");
      }
    }
    //handleHourItemClick
    function handleHourItemClick(event) {
  const clickedHour = event.target.textContent;
  const note = prompt("Enter your note:");

  if (note) {
    // Create a new note element
    const noteElement = document.createElement("li");
    noteElement.classList.add("note");
    noteElement.innerHTML = `
      <p class="note-time">${clickedHour}</p>
      <p class="note-text">${note}</p>
    `;

    // Append the note to the notes list
    const notesList = document.querySelector(".notes-list");
    notesList.appendChild(noteElement);
  }
}
  
    // Function to handle new entry button click
    function handleNewEntryButtonClick() {
      if (!entryList) {
        // Create the list of 24 hours
        entryList = document.createElement("ul");
        entryList.classList.add("entry-list");
        entryList.innerHTML = `
          <li>00:00</li>
          <li>01:00</li>
          <li>02:00</li>
          <li>03:00</li>
          <li>04:00</li>
          <li>05:00</li>
          <li>06:00</li>
          <li>07:00</li>
          <li>08:00</li>
          <li>09:00</li>
          <li>10:00</li>
          <li>11:00</li>
          <li>12:00</li>
          <li>13:00</li>
          <li>14:00</li>
          <li>15:00</li>
          <li>16:00</li>
          <li>17:00</li>
          <li>18:00</li>
          <li>19:00</li>
          <li>20:00</li>
          <li>21:00</li>
          <li>22:00</li>
          <li>23:00</li>
        `;
        // Append the list to the calendar div
        const calendar = document.querySelector(".calendar");
        calendar.appendChild(entryList);
      } else {
        // Toggle the visibility of the entry list
        entryList.classList.toggle("show");
      }
    }
  
    // Add event listeners to the buttons
    forwardButton.addEventListener("click", handleForwardButtonClick);
    backButton.addEventListener("click", handleBackButtonClick);
  
    // Display the initial month and update the days?
    displayCurrentMonth();
    updateDays();
  
    // Highlight today's date?
    if (currentDateItem) {
      currentDateItem.classList.add("current-date");
    }

    
    
    

      // Attaching the resetNotes() function to the day item click event
      dayItem.addEventListener("click", resetNotes);
      dayItem.addEventListener("click", handleDayItemClick)
  });