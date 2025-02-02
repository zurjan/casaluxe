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

//Nya produkter

 const products = [
  { slug: "morkgra", img: "/img/uppload/image1.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Mörkgrå" },

  { slug: "ljusgra", img: "/img/uppload/image2.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Ljusgrå" },

  { slug: "rod", img: "/img/uppload/image3.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Röd" },

  { slug: "beige", img: "/img/uppload/image4.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Beige" },

  { slug: "bla", img: "/img/uppload/image5.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Blå" },

  { slug: "svart", img: "/img/uppload/image6.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Svart" },

  { slug: "vit", img: "/img/uppload/image7.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Vit" },

  { slug: "svart2", img: "/img/uppload/image8.jpg", name: "Nya Möbler", desc: "Smartphone XYZ är den senaste modellen från Brand XYZ. Den har en 6,5-tums AMOLED-skärm, en kraftfull Snapdragon 888-processor och ett 48 MP kamerasystem. Perfekt för både arbete och underhållning, med lång batteritid och snabb laddning.", brand: "Casa Luxe", price: "1990 SEK", color: "Svart2" }
];


// urlslug
const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

const product = products.find(p => p.slug === slug);

if (product) {
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-img").src = product.img;
  document.getElementById("product-img").alt = product.name;
  document.getElementById("product-brand").textContent = "Märke: " + product.brand;
  document.getElementById("product-price").textContent = "Pris: " + product.price;
  document.getElementById("product-desc").textContent = product.desc;
} else {
  document.getElementById("nyproduct").innerHTML = "<p>Produkten hittades inte.</p>";
}

// random
function getRandomProducts(excludeSlug, count = 3) {
  const filteredProducts = products.filter(p => p.slug !== excludeSlug);
  return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, count);
}

const relatedProducts = getRandomProducts(slug);
const relatedContainer = document.getElementById("related-products");

relatedProducts.forEach(p => {
  const link = document.createElement("a");
  link.href = `Nyproduct.html?slug=${p.slug}`;

  const img = document.createElement("img");
  img.src = p.img;
  img.alt = p.name;

  link.appendChild(img);
  relatedContainer.appendChild(link);
});