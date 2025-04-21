const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');

// Basic configuration
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Session and flash messages
app.use(session({
  secret: 'your-secret-key-here',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Global variables for templates
app.use((req, res, next) => {
  res.locals.firmName = "Wlies Associates";
  res.locals.currentYear = new Date().getFullYear();
  res.locals.messages = req.flash();
  next();
});

// Routes
app.get('/', (req, res) => {
  const lawyer = {
    name: "Perious Wlies",
    title: "Senior Attorney at Law",
    description: "Experienced attorney specializing in corporate and criminal law.",
    email: "pwlies2002@gmail.com",
    phone: "+231 0777518216",
    location: "AB Tober Road, Liberia",
    experience: "10+ years",
    specialties: ["Criminal Law", "Civil Rights", "Personal Injury"],
    awards: ["Best Lawyer 2023", "Top Attorney 2021"],
    education: ["Zion Law School", "University of the people"],
    image: "/image/Babe1.jpeg"
  };
  res.render('profile', { 
    title: `${lawyer.name} - Profile`, 
    lawyer 
  });
});

app.get('/about', (req, res) => {
  const teamMembers = [
    {
      name: 'Kelvin O.J Willie',
      title: 'Senior Partner',
      image: '/image/kelvin.jpg',
      education: 'LLB, Harvard Law',
      bio: 'Kelvin brings extensive experience in litigation and business law.',
      slug: 'kelvin-willie',
      linkedin: 'https://linkedin.com/in/kelvin',
      email: 'kelvin@example.com'
    },
    {
      name: 'Nabu Thouth',
      title: 'Lead Attorney',
      image: '/image/Babe1.jpeg',
      education: 'JD, Oxford University',
      bio: 'Nabu specializes in civil rights and criminal defense.',
      slug: 'nabu-thouth',
      linkedin: 'https://linkedin.com/in/nabu',
      email: 'nabu@example.com'
    }
  ];

  const practiceAreas = [
    'Criminal Defense',
    'Civil Litigation',
    'Family Law',
    'Corporate Law',
    'Intellectual Property',
    'Employment Law'
  ];

  const yearsExperience = 5;
  const casesHandled = 10;
  const attorneyCount = teamMembers.length;

  res.render('about', {
    title: 'About Us',
    teamMembers,
    practiceAreas,
    yearsExperience,
    casesHandled,
    attorneyCount
  });
});


app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us' 
  });
});

app.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    req.flash('error', 'Please fill in all required fields');
    return res.redirect('/contact');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    req.flash('error', 'Please enter a valid email address');
    return res.redirect('/contact');
  }

  // Process the form (in real app, save to database)
  console.log('New contact submission:', req.body);
  
  req.flash('success', 'Thank you for your message. We will contact you shortly.');
  res.redirect('/contact-success');
});

app.get('/contact-success', (req, res) => {
  res.render('contact-success', { 
    title: 'Message Received' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});