// ============================================================
// testApiData.js
// Populates the REST API at localhost:3030 with test data.
//
// To use this data:
// 1. Make sure the API server is running (npm run api or node api/server.js)
// 2. Open any page from the project in your browser
// 3. Open DevTools (usually F12)
// 4. Go to the Console tab
// 5. Copy all contents of this file, paste into the console, and press Enter.
// 6. You should see a summary of what was loaded.
//
// To confirm the data loaded, visit http://localhost:3030/users,
// http://localhost:3030/conferences, http://localhost:3030/products,
// or http://localhost:3030/conference-signups in your browser.
// ============================================================

(async () => {
    const BASE = 'http://localhost:3030';

    async function post(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(`POST ${url} failed: ${body.error || res.status}`);
        }
        return res.json();
    }

    // ---- Users ----
    const testUsers = [
        {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            phone: "555-123-4567",
            age: 34,
            address: "123 Maple St, State College, PA"
        },
        {
            name: "Bob Martinez",
            email: "bob.martinez@example.com",
            phone: "555-234-5678",
            age: 28,
            address: "Penn State University"
        },
        {
            name: "Carol White",
            email: "carol.white@example.com",
            phone: "",
            age: 21,
            address: "456 Oak Ave, Bellefonte, PA"
        },
        {
            name: "David Kim",
            email: "david.kim@example.com",
            phone: "555-345-6789",
            age: 22,
            address: "Penn State University"
        },
        {
            name: "Eva Nguyen",
            email: "eva.nguyen@example.com",
            phone: "555-456-7890",
            age: 45,
            address: "789 Pine Rd, Altoona, PA"
        }
    ];

    // ---- Conferences ----
    const testConferences = [
        {
            title: "Introduction to Web Development",
            description: "A beginner-friendly workshop covering the fundamentals of HTML, CSS, and JavaScript. No prior experience required.",
            category: "Workshop",
            format: "In-Person",
            entryPrice: 0.00,
            additionalInfo: "Please bring a laptop with a modern browser installed."
        },
        {
            title: "AI in Healthcare",
            description: "An in-depth keynote exploring how artificial intelligence is transforming diagnostics, treatment planning, and patient care.",
            category: "Keynote",
            format: "Hybrid",
            entryPrice: 25.00,
            additionalInfo: "Recording will be available to virtual attendees after the event."
        },
        {
            title: "The Future of Remote Work",
            description: "A panel discussion featuring industry leaders sharing insights on remote work culture, tooling, and team management.",
            category: "Panel Discussion",
            format: "Virtual",
            entryPrice: 10.00,
            additionalInfo: ""
        },
        {
            title: "Cybersecurity Best Practices",
            description: "A general session covering the latest threats and how organizations can protect themselves in an increasingly connected world.",
            category: "General Session",
            format: "In-Person",
            entryPrice: 15.00,
            additionalInfo: "Recommended for IT staff and managers."
        },
        {
            title: "Opening Night Networking Mixer",
            description: "Kick off the conference with drinks, snacks, and the chance to meet fellow attendees, speakers, and sponsors.",
            category: "Networking",
            format: "In-Person",
            entryPrice: 0.00,
            additionalInfo: "Light refreshments provided. Badge required for entry."
        },
        {
            title: "Agile Project Management Deep Dive",
            description: "A hands-on workshop walking through sprint planning, retrospectives, and agile tooling with real world examples.",
            category: "Workshop",
            format: "Hybrid",
            entryPrice: 20.00,
            additionalInfo: "Participants will leave with a ready-to-use sprint template."
        }
    ];

    // ---- Products ----
    const testProducts = [
        {
            name: "Conference T-Shirt",
            image: "",
            description: "Official conference branded t-shirt available in sizes S-XXL.",
            category: "Apparel",
            specifications: "100% cotton, unisex fit",
            price: 24.99,
            additionalInfo: "Available in black and white."
        },
        {
            name: "Wireless Presenter Remote",
            image: "",
            description: "Compact wireless presenter with laser pointer, perfect for keynote speakers.",
            category: "Electronics",
            specifications: "2.4GHz wireless, USB receiver, 30ft range",
            price: 34.99,
            additionalInfo: "Batteries included."
        },
        {
            name: "Conference Notebook Bundle",
            image: "",
            description: "Set of 3 lined notebooks with conference branding for note-taking during sessions.",
            category: "Stationery",
            specifications: "A5 size, 80 pages each, ruled",
            price: 12.50,
            additionalInfo: "Includes one pen."
        }
    ];

    // ---- POST everything ----
    const results = { users: 0, conferences: 0, products: 0, signups: 0 };

    for (const user of testUsers) {
        try {
            await post(`${BASE}/users`, user);
            results.users++;
        } catch (e) {
            console.warn(`Skipped user ${user.email}: ${e.message}`);
        }
    }

    const createdConferences = [];
    for (const conf of testConferences) {
        try {
            const created = await post(`${BASE}/conferences`, conf);
            createdConferences.push(created);
            results.conferences++;
        } catch (e) {
            console.warn(`Skipped conference "${conf.title}": ${e.message}`);
        }
    }

    for (const prod of testProducts) {
        try {
            await post(`${BASE}/products`, prod);
            results.products++;
        } catch (e) {
            console.warn(`Skipped product "${prod.name}": ${e.message}`);
        }
    }

    // ---- Conference Signups (link some users to conferences) ----
    const testSignups = [
        { userId: "1", userEmail: "alice.johnson@example.com", conferenceId: createdConferences[0]?.id, signupData: { dietaryRestrictions: "none" } },
        { userId: "2", userEmail: "bob.martinez@example.com", conferenceId: createdConferences[0]?.id, signupData: { dietaryRestrictions: "vegetarian" } },
        { userId: "1", userEmail: "alice.johnson@example.com", conferenceId: createdConferences[1]?.id, signupData: { attendanceMode: "virtual" } },
        { userId: "4", userEmail: "david.kim@example.com", conferenceId: createdConferences[3]?.id, signupData: { role: "IT staff" } },
    ];

    for (const signup of testSignups) {
        if (!signup.conferenceId) continue;
        try {
            await post(`${BASE}/conference-signups`, signup);
            results.signups++;
        } catch (e) {
            console.warn(`Skipped signup: ${e.message}`);
        }
    }

    console.log(`Test data loaded: ${results.users} users, ${results.conferences} conferences, ${results.products} products, ${results.signups} signups.`);
})();
