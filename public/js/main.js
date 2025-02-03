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

//slideshow
document.querySelectorAll("#nslides img").forEach((img, index) => {
  const slugs = [
    "morkgra", "ljusgra", "rod", "beige",
    "bla", "svart", "vit", "svart2"
];
  
  img.addEventListener("click", () => {
      window.location.href = `Nyprodukt?slug=${slugs[index]}`;
  });
});



