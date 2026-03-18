const express = require('express');

const app = express();

// allow cross-origin requests (needed when serving pages from a different port e.g. api on 3030 and http-server on 8080)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use(express.json());

const users = [];
const conferences = [];
const products = [];
const signups = [];

let nextConferenceId = 1;
let nextProductId = 1;
let nextSignupId = 1;

// ========================================
// User Endpoints  (keyed by email)
// ========================================

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:email', (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

app.post('/users', (req, res) => {
    if (users.find(u => u.email === req.body.email)) {
        return res.status(409).json({ error: 'Email already exists' });
    }
    const user = { name: req.body.name, email: req.body.email, phone: req.body.phone, age: req.body.age, address: req.body.address };
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:email', (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (req.body.name !== undefined) {
        user.name = req.body.name;
    }
    if (req.body.phone !== undefined) {
        user.phone = req.body.phone;
    }
    if (req.body.age !== undefined) {
        user.age = req.body.age;
    }
    if (req.body.address !== undefined) {
        user.address = req.body.address;
    }
    res.json(user);
});

app.delete('/users/:email', (req, res) => {
    const idx = users.findIndex(u => u.email === req.params.email);
    if (idx === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(idx, 1);
    res.status(204).end();
});

// ========================================
// Conference Endpoints
// ========================================

app.get('/conferences', (req, res) => {
    res.json(conferences);
});

app.get('/conferences/:id', (req, res) => {
    const conf = conferences.find(c => c.id === Number(req.params.id));
    if (!conf) {
        return res.status(404).json({ error: 'Conference not found' });
    }
    res.json(conf);
});

app.post('/conferences', (req, res) => {
    const conf = { id: nextConferenceId++, title: req.body.title, description: req.body.description, category: req.body.category, format: req.body.format, entryPrice: req.body.entryPrice, additionalInfo: req.body.additionalInfo };
    conferences.push(conf);
    res.status(201).json(conf);
});

app.put('/conferences/:id', (req, res) => {
    const conf = conferences.find(c => c.id === Number(req.params.id));
    if (!conf) {
        return res.status(404).json({ error: 'Conference not found' });
    }
    if (req.body.title !== undefined) {
        conf.title = req.body.title;
    }
    if (req.body.description !== undefined) {
        conf.description = req.body.description;
    }
    if (req.body.category !== undefined) {
        conf.category = req.body.category;
    }
    if (req.body.format !== undefined) {
        conf.format = req.body.format;
    }
    if (req.body.entryPrice !== undefined) {
        conf.entryPrice = req.body.entryPrice;
    }
    if (req.body.additionalInfo !== undefined) {
        conf.additionalInfo = req.body.additionalInfo;
    }
    res.json(conf);
});

app.delete('/conferences/:id', (req, res) => {
    const idx = conferences.findIndex(c => c.id === Number(req.params.id));
    if (idx === -1) {
        return res.status(404).json({ error: 'Conference not found' });
    }
    conferences.splice(idx, 1);
    res.status(204).end();
});

// ========================================
// Product Endpoints
// ========================================

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const prod = products.find(p => p.id === Number(req.params.id));
    if (!prod) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(prod);
});

app.post('/products', (req, res) => {
    const prod = { id: nextProductId++, name: req.body.name, image: req.body.image, description: req.body.description, category: req.body.category, specifications: req.body.specifications, price: req.body.price, additionalInfo: req.body.additionalInfo };
    products.push(prod);
    res.status(201).json(prod);
});

app.put('/products/:id', (req, res) => {
    const prod = products.find(p => p.id === Number(req.params.id));
    if (!prod) {
        return res.status(404).json({ error: 'Product not found' });
    }
    if (req.body.name !== undefined) {
        prod.name = req.body.name;
    }
    if (req.body.image !== undefined) {
        prod.image = req.body.image;
    }
    if (req.body.description !== undefined) {
        prod.description = req.body.description;
    }
    if (req.body.category !== undefined) {
        prod.category = req.body.category;
    }
    if (req.body.specifications !== undefined) {
        prod.specifications = req.body.specifications;
    }
    if (req.body.price !== undefined) {
        prod.price = req.body.price;
    }
    if (req.body.additionalInfo !== undefined) {
        prod.additionalInfo = req.body.additionalInfo;
    }
    res.json(prod);
});

app.delete('/products/:id', (req, res) => {
    const idx = products.findIndex(p => p.id === Number(req.params.id));
    if (idx === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products.splice(idx, 1);
    res.status(204).end();
});

// ========================================
// ConferenceSignup Endpoints
// ========================================

app.get('/conference-signups', (req, res) => {
    if (req.query.conferenceId) {
        return res.json(signups.filter(s => s.conferenceId === Number(req.query.conferenceId)));
    }
    if (req.query.userEmail) {
        return res.json(signups.filter(s => s.userEmail === req.query.userEmail));
    }
    res.json(signups);
});

app.get('/conference-signups/:id', (req, res) => {
    const signup = signups.find(s => s.id === Number(req.params.id));
    if (!signup) {
        return res.status(404).json({ error: 'Signup not found' });
    }
    res.json(signup);
});

app.post('/conference-signups', (req, res) => {
    const signup = { id: nextSignupId++, userId: req.body.userId, userEmail: req.body.userEmail, conferenceId: req.body.conferenceId, signupData: req.body.signupData };
    signups.push(signup);
    res.status(201).json(signup);
});

app.put('/conference-signups/:id', (req, res) => {
    const signup = signups.find(s => s.id === Number(req.params.id));
    if (!signup) {
        return res.status(404).json({ error: 'Signup not found' });
    }
    if (req.body.signupData !== undefined) {
        signup.signupData = req.body.signupData;
    }
    res.json(signup);
});

app.delete('/conference-signups/:id', (req, res) => {
    const idx = signups.findIndex(s => s.id === Number(req.params.id));
    if (idx === -1) {
        return res.status(404).json({ error: 'Signup not found' });
    }
    signups.splice(idx, 1);
    res.status(204).end();
});


// starting on port 3030
app.listen(3030, () => {
    console.log('API server running on http://localhost:3030');
});
