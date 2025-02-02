const express = require('express');
const router = express.Router();


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


router.get('/Nyproduct', function(req, res, next) {
  const slug = req.query.slug;  
  
  
  const product = products.find(p => p.slug === slug);
  
 
  if (product) {
    res.render('Nyproduct', { 
      title: product.name, 
      product: product  
    });
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;



