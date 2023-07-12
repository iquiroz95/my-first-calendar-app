document.addEventListener("DOMContentLoaded", function() {
    // Get the necessary elements
    const monthsList = document.querySelector(".months");
    const daysList = document.querySelector(".days");
    const forwardButton = document.getElementById("Forward");
    const backButton = document.getElementById("Back");
  
    // Initial month index
    let currentMonthIndex = 0;
  
    // Function to display the current month
    function displayCurrentMonth() {
      // Hide all months
      const allMonths = monthsList.querySelectorAll("li");
      allMonths.forEach(month => {
        month.style.display = "none";
      });
  
      // Show the current month
      const currentMonth = monthsList.querySelector(`li:nth-child(${currentMonthIndex + 1})`);
      currentMonth.style.display = "block";
    }
  
    // Function to update the days based on the selected month
    function updateDays() {
      // Clear the days list
      daysList.innerHTML = "";
  
      // Get the number of days in the selected month
      const currentMonth = monthsList.querySelector(`li:nth-child(${currentMonthIndex + 1})`);
      const daysInMonth = new Date(new Date().getFullYear(), currentMonthIndex + 1, 0).getDate();
  
      // Add the days to the list
      for (let i = 1; i <= daysInMonth; i++) {
        const dayItem = document.createElement("li");
        dayItem.textContent = i < 10 ? `0${i}` : i;
        daysList.appendChild(dayItem);
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
    }
  
    // Add event listeners to the button
    forwardButton.addEventListener("click", handleForwardButtonClick);
    backButton.addEventListener("click", handleBackButtonClick);
  
    // Display the initial month and update the days
    displayCurrentMonth();
    updateDays();
  });