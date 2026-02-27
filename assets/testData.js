// ============================================================
// testData.js
// This set of entries can be used to test various data classes
// without the need to manually fill out various forms.
// Note: this file must be run on a project page, not an arbitrary browser tab,
// as it depends on the ConferenceEntry and User classes being defined.
//
// To use this data:
// 1. Open the project in your browser to any page
// 2. Open DevTools (usually f12)
// 3. Go to the Console tab
// 4. Copy all contents of this file and paste them into the console and press enter.
// 5. You should see "Test data loaded: 6 entries, 5 users" or some such similar message.
//
// To confirm that this data has successfully been loaded:
// 1. Open DevTools
// 2. Go to the Application tab
// 3. In the left sidebar, look under Storage for Local Storage
// 4. Expand Local storage and you should see "http://localhost:63342" or whatever your localhost URI is.
// ============================================================
const testEntries = [
    {
        id: "1",
        title: "Introduction to Web Development",
        description: "A beginner-friendly workshop covering the fundamentals of HTML, CSS, and JavaScript. No prior experience required.",
        category: "Workshop",
        format: "In-Person",
        entryPrice: "0.00",
        additionalInfo: "Please bring a laptop with a modern browser installed."
    },
    {
        id: "2",
        title: "AI in Healthcare",
        description: "An in-depth keynote exploring how artificial intelligence is transforming diagnostics, treatment planning, and patient care.",
        category: "Keynote",
        format: "Hybrid",
        entryPrice: "25.00",
        additionalInfo: "Recording will be available to virtual attendees after the event."
    },
    {
        id: "3",
        title: "The Future of Remote Work",
        description: "A panel discussion featuring industry leaders sharing insights on remote work culture, tooling, and team management.",
        category: "Panel Discussion",
        format: "Virtual",
        entryPrice: "10.00",
        additionalInfo: ""
    },
    {
        id: "4",
        title: "Cybersecurity Best Practices",
        description: "A general session covering the latest threats and how organizations can protect themselves in an increasingly connected world.",
        category: "General Session",
        format: "In-Person",
        entryPrice: "15.00",
        additionalInfo: "Recommended for IT staff and managers."
    },
    {
        id: "5",
        title: "Opening Night Networking Mixer",
        description: "Kick off the conference with drinks, snacks, and the chance to meet fellow attendees, speakers, and sponsors.",
        category: "Networking",
        format: "In-Person",
        entryPrice: "0.00",
        additionalInfo: "Light refreshments provided. Badge required for entry."
    },
    {
        id: "6",
        title: "Agile Project Management Deep Dive",
        description: "A hands-on workshop walking through sprint planning, retrospectives, and agile tooling with real world examples.",
        category: "Workshop",
        format: "Hybrid",
        entryPrice: "20.00",
        additionalInfo: "Participants will leave with a ready-to-use sprint template."
    }
];

const testUsers = [
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "555-123-4567",
        age: "34",
        address: "123 Maple St, State College, PA"
    },
    {
        name: "Bob Martinez",
        email: "bob.martinez@example.com",
        phone: "555-234-5678",
        age: "28",
        address: "Penn State University"
    },
    {
        name: "Carol White",
        email: "carol.white@example.com",
        phone: "",
        age: "Junior",
        address: "456 Oak Ave, Bellefonte, PA"
    },
    {
        name: "David Kim",
        email: "david.kim@example.com",
        phone: "555-345-6789",
        age: "22",
        address: "Penn State University"
    },
    {
        name: "Eva Nguyen",
        email: "eva.nguyen@example.com",
        phone: "555-456-7890",
        age: "45",
        address: "789 Pine Rd, Altoona, PA"
    }
];

localStorage.setItem('entries', JSON.stringify(testEntries));
localStorage.setItem('users', JSON.stringify(testUsers));

console.log(`Test data loaded: ${testEntries.length} entries, ${testUsers.length} users.`);