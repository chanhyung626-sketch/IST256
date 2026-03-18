const BASE_URL = `http://localhost:3030`;
const USERS_URL = `${BASE_URL}/users`;
const CONFERENCES_URL = `${BASE_URL}/conferences`;
const CONFERENCE_SIGNUPS_URL = `${BASE_URL}/conference-signups`;
const PRODUCTS_URL = `${BASE_URL}/products`;

async function handleResponse(res) {
    if (res.status === 204) return null;
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed with status ${res.status}`);
    }
    return res.json();
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handleResponse);
}

function put(url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(handleResponse);
}

function del(url) {
    return fetch(url, { method: 'DELETE' }).then(handleResponse);
}

// ========================================
// User Functions
// ========================================

/**
 * @returns {Promise<Array<{ name: string, email: string, phone: string, age: number, address: string }>>}
 */
export function getAllUsers() {
    return fetch(USERS_URL).then(handleResponse);
}

/**
 * @param {string} email - The user's email (acts as the unique key)
 * @returns {Promise<{ name: string, email: string, phone: string, age: number, address: string }>}
 */
export function getUser(email) {
    return fetch(`${USERS_URL}/${encodeURIComponent(email)}`).then(handleResponse);
}

/**
 * @param {{ name: string, email: string, phone: string, age: number, address: string }} userData
 * @returns {Promise<{ name: string, email: string, phone: string, age: number, address: string }>} The created user
 */
export function createUser(userData) {
    return post(USERS_URL, userData);
}

/**
 * @param {string} email - The email of the user to update
 * @param {{ name?: string, phone?: string, age?: number, address?: string }} userData - Only include fields you want to change
 * @returns {Promise<{ name: string, email: string, phone: string, age: number, address: string }>} The updated user
 */
export function updateUser(email, userData) {
    return put(`${USERS_URL}/${encodeURIComponent(email)}`, userData);
}

/**
 * @param {string} email - The email of the user to delete
 * @returns {Promise<null>}
 */
export function deleteUser(email) {
    return del(`${USERS_URL}/${encodeURIComponent(email)}`);
}

// ========================================
// Conference Functions
// ========================================

/**
 * @returns {Promise<Array<{ id: number, title: string, description: string, category: string, format: string, entryPrice: number, additionalInfo: string }>>}
 */
export function getAllConferences() {
    return fetch(CONFERENCES_URL).then(handleResponse);
}

/**
 * @param {number} id - The conference ID
 * @returns {Promise<{ id: number, title: string, description: string, category: string, format: string, entryPrice: number, additionalInfo: string }>}
 */
export function getConference(id) {
    return fetch(`${CONFERENCES_URL}/${id}`).then(handleResponse);
}

/**
 * @param {{ title: string, description: string, category: string, format: string, entryPrice: number, additionalInfo: string }} conferenceData - ID is assigned automatically by the server
 * @returns {Promise<{ id: number, title: string, description: string, category: string, format: string, entryPrice: number, additionalInfo: string }>} The created conference (includes the assigned id)
 */
export function createConference(conferenceData) {
    return post(CONFERENCES_URL, conferenceData);
}

/**
 * @param {number} id - The conference ID to update
 * @param {{ title?: string, description?: string, category?: string, format?: string, entryPrice?: number, additionalInfo?: string }} conferenceData - Only include fields you want to change
 * @returns {Promise<{ id: number, title: string, description: string, category: string, format: string, entryPrice: number, additionalInfo: string }>} The updated conference
 */
export function updateConference(id, conferenceData) {
    return put(`${CONFERENCES_URL}/${id}`, conferenceData);
}

/**
 * @param {number} id - The conference ID to delete
 * @returns {Promise<null>}
 */
export function deleteConference(id) {
    return del(`${CONFERENCES_URL}/${id}`);
}

// ========================================
// Product Functions
// ========================================

/**
 * @returns {Promise<Array<{ id: number, name: string, image: string, description: string, category: string, specifications: string, price: number, additionalInfo: string }>>}
 */
export function getAllProducts() {
    return fetch(PRODUCTS_URL).then(handleResponse);
}

/**
 * @param {number} id - The product ID
 * @returns {Promise<{ id: number, name: string, image: string, description: string, category: string, specifications: string, price: number, additionalInfo: string }>}
 */
export function getProduct(id) {
    return fetch(`${PRODUCTS_URL}/${id}`).then(handleResponse);
}

/**
 * @param {{ name: string, image: string, description: string, category: string, specifications: string, price: number, additionalInfo: string }} productData - ID is assigned automatically by the server
 * @returns {Promise<{ id: number, name: string, image: string, description: string, category: string, specifications: string, price: number, additionalInfo: string }>} The created product (includes the assigned id)
 */
export function createProduct(productData) {
    return post(PRODUCTS_URL, productData);
}

/**
 * @param {number} id - The product ID to update
 * @param {{ name?: string, image?: string, description?: string, category?: string, specifications?: string, price?: number, additionalInfo?: string }} productData - Only include fields you want to change
 * @returns {Promise<{ id: number, name: string, image: string, description: string, category: string, specifications: string, price: number, additionalInfo: string }>} The updated product
 */
export function updateProduct(id, productData) {
    return put(`${PRODUCTS_URL}/${id}`, productData);
}

/**
 * @param {number} id - The product ID to delete
 * @returns {Promise<null>}
 */
export function deleteProduct(id) {
    return del(`${PRODUCTS_URL}/${id}`);
}

// ========================================
// Conference Signup Functions
// ========================================

/**
 * @returns {Promise<Array<{ id: number, userId: string, userEmail: string, conferenceId: number, signupData: object }>>}
 */
export function getAllSignups() {
    return fetch(CONFERENCE_SIGNUPS_URL).then(handleResponse);
}

/**
 * @param {number} id - The signup ID
 * @returns {Promise<{ id: number, userId: string, userEmail: string, conferenceId: number, signupData: object }>}
 */
export function getSignup(id) {
    return fetch(`${CONFERENCE_SIGNUPS_URL}/${id}`).then(handleResponse);
}

/**
 * @param {number} conferenceId - The conference ID to filter signups by
 * @returns {Promise<Array<{ id: number, userId: string, userEmail: string, conferenceId: number, signupData: object }>>}
 */
export function getSignupsByConference(conferenceId) {
    return fetch(`${CONFERENCE_SIGNUPS_URL}?conferenceId=${conferenceId}`).then(handleResponse);
}

/**
 * @param {string} userEmail - The user's email to filter signups by
 * @returns {Promise<Array<{ id: number, userId: string, userEmail: string, conferenceId: number, signupData: object }>>}
 */
export function getSignupsByUser(userEmail) {
    return fetch(`${CONFERENCE_SIGNUPS_URL}?userEmail=${encodeURIComponent(userEmail)}`).then(handleResponse);
}

/**
 * @param {{ userId: string, userEmail: string, conferenceId: number, signupData: object }} signupData - ID is assigned automatically by the server
 * @returns {Promise<{ id: number, userId: string, userEmail: string, conferenceId: number, signupData: object }>} The created signup (includes the assigned id)
 */
export function createSignup(signupData) {
    return post(CONFERENCE_SIGNUPS_URL, signupData);
}

/**
 * @param {number} id - The signup ID to update
 * @param {{ signupData?: object }} signupData - Only include fields you want to change
 * @returns {Promise<{ id: number, userId: string, userEmail: string, conferenceId: number, signupData: object }>} The updated signup
 */
export function updateSignup(id, signupData) {
    return put(`${CONFERENCE_SIGNUPS_URL}/${id}`, signupData);
}

/**
 * @param {number} id - The signup ID to delete
 * @returns {Promise<null>}
 */
export function deleteSignup(id) {
    return del(`${CONFERENCE_SIGNUPS_URL}/${id}`);
}
