const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  const lawyer = {
      name: "Perious Wlies",
      title: "Learning Law",
      description: "Experienced attorney specializing in criminal law.",
      email: "pwlies2002@gmail.com",
      phone: "+231 0777518216",
      location: "AB Tober Road, Liberia",
      experience: "3 month",
      specialties: ["Criminal Law", "Civil Rights", "Personal Injury"],
      awards: ["Best Lawyer 2023", "Top Attorney 2021"],
      education: ["Zion Law School", "University of the people"]
  };
  res.render('profile', { title: `${lawyer.name} - Profile`, lawyer });
});

app.get('/about', (req, res) => {
  const teamMembers = [
    { name: 'Kelvin O.J Willie', title: 'Senior Partner', image: '/image/kelvin.jpg' },
    { name: 'Nabu Thouth', title: 'Lead Attorney', image: '/image/Sirkel.jpg' }
  ];
  res.render('about', { title: 'About Us', teamMembers });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

app.post('/submit-contact', (req,res)=>{
res.redirect('/')
console.log(req.body)
})



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

