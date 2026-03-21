import { getAllConferences, createSignup } from "/api/service.js";

const { useState, useEffect } = React;

function ConferenceSignup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [conferenceId, setConferenceId] = useState("");
    const [participationType, setParticipationType] = useState("");
    const [notes, setNotes] = useState("");

    const [conferences, setConferences] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllConferences()
            .then((data) => setConferences(Array.isArray(data) ? data : []))
            .catch(() => setError("Could not load conferences."));
    }, []);

    function validateEmail(value) {
        return /\S+@\S+\.\S+/.test(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!fullName.trim() || !email.trim() || !conferenceId || !participationType) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        const payload = {
            fullName: fullName.trim(),
            email: email.trim(),
            conferenceId,
            participationType,
            notes: notes.trim()
        };

        setLoading(true);

        createSignup(payload)
            .then(() => {
                setSuccess("Registration submitted successfully!");
                setFullName("");
                setEmail("");
                setConferenceId("");
                setParticipationType("");
                setNotes("");
            })
            .catch(() => {
                setError("Something went wrong. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Conference *</label>
                <select
                    className="form-select"
                    value={conferenceId}
                    onChange={(e) => setConferenceId(e.target.value)}
                >
                    <option value="">Select Conference</option>
                    {conferences.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.title ?? c.name ?? `Conference ${c.id}`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label d-block">Participation Type *</label>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="in-person"
                        value="in-person"
                        checked={participationType === "in-person"}
                        onChange={(e) => setParticipationType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="in-person">
                        In-person
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="virtual"
                        value="virtual"
                        checked={participationType === "virtual"}
                        onChange={(e) => setParticipationType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="virtual">
                        Virtual
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        id="vip"
                        value="vip"
                        checked={participationType === "vip"}
                        onChange={(e) => setParticipationType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="vip">
                        VIP
                    </label>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                    className="form-control"
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit Registration"}
            </button>
        </form>
    );
}

ReactDOM.createRoot(document.getElementById("react-signup-root")).render(<ConferenceSignup />);
