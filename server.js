const express = require('express');
const path = require('path'); // Import the path module
const app = express();
const port = 3000;

// app.set('views', path.join(__dirname, 'views')); // Views directory
app.set('view engine', 'ejs'); 
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const lawyer = {
      name: "Perious Wise",
      title: "Criminal Defense Attorney",
      description: "Experienced lawyer with a focus on criminal defense and civil rights cases. Known for being a strong advocate in court, protecting client rights passionately.",
      email: "misswise@gmail.com",
      phone: "+231 0770381510",
      location: "liberia AB tober Road",
      experience: "3 moth",
      specialties: ["Criminal Defense", "Civil Rights", "Personal Injury", "Family Law"],
      education: ["Zion Law School", "Yale University"],
      awards: ["Best Lawyer 2023", "Top 100 Trial Lawyers"],
      image: "/image/queen.jpg" // Path to the lawyer's image
    };
    
    res.render('profile', { lawyer }); // Render the profile.ejs template
});

// Listen to the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
