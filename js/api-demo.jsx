const { useState, useEffect } = React;

function ApiDemo() {
    const [users, setUsers] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [products, setProducts] = useState([]);
    const [signups, setSignups] = useState([]);

    useEffect(() => {
        async function seedAndLoad() {
            const S = window.Service;

            // creating a couple of sample objects for testing
            await S.createUser({ name: 'Alice', email: 'alice@example.com', phone: '555-0001', age: 28, address: '100 Main St' });
            await S.createUser({ name: 'Bob', email: 'bob@example.com', phone: '555-0002', age: 34, address: '200 Oak Ave' });
            await S.createConference({ title: 'React Basics', description: 'Intro to React', category: 'Tech', format: 'Virtual', entryPrice: 0, additionalInfo: '' });
            await S.createConference({ title: 'Node Workshop', description: 'Express & APIs', category: 'Tech', format: 'In-Person', entryPrice: 25, additionalInfo: '' });
            await S.createProduct({ name: 'T-Shirt', image: '', description: 'Conference tee', category: 'Merch', specifications: 'Size: M', price: 19.99, additionalInfo: '' });
            await S.createSignup({ userId: 'alice@example.com', userEmail: 'alice@example.com', conferenceId: 1, signupData: { notes: 'Excited!' } });

            // fetch everything back from the API and put it into state
            setUsers(await S.getAllUsers());
            setConferences(await S.getAllConferences());
            setProducts(await S.getAllProducts());
            setSignups(await S.getAllSignups());
        }

        seedAndLoad();
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(u => (
                    <li key={u.email}>{u.name} — {u.email} — Age: {u.age}</li>
                ))}
            </ul>

            <h2>Conferences</h2>
            <ul>
                {conferences.map(c => (
                    <li key={c.id}>{c.title} ({c.format}) — ${c.entryPrice}</li>
                ))}
            </ul>

            <h2>Products</h2>
            <ul>
                {products.map(p => (
                    <li key={p.id}>{p.name} — ${p.price}</li>
                ))}
            </ul>

            <h2>Signups</h2>
            <ul>
                {signups.map(s => (
                    <li key={s.id}>{s.userEmail} signed up for conference #{s.conferenceId}</li>
                ))}
            </ul>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(<ApiDemo />);
