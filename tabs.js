document.getElementById("defaultOpen").click();

function openTab(event, tabName) {
  // Declare all variables
  let i, tabContent, tablinks;

  // Get all elements with class="tabContent" and hide them
  tabContent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}
