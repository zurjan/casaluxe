// top navbar

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}


//accordeon menu
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


document.getElementById('filter-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Hämta valda värden
  let sort = document.getElementById('sort').value;
  let color = document.getElementById('color').value;

  // Bygg URL-sträng med parametrar
  let queryString = "?";
  if (sort) queryString += `sort=${sort}&`;
  if (color) queryString += `color=${color}`;

  // Navigera till ny URL med filter och sortering
  window.location.href = queryString;
});