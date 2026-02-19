let emailInputElement = document.getElementById('email');
let nameInputElement = document.getElementById('fullName');
let phoneInputElement = document.getElementById('phone');
let ageInputElement = document.getElementById('age');
let addressInputElement = document.getElementById('address');
let duplicateDiv = document.getElementById('duplicate-alert');

document.querySelector('form').addEventListener('submit', validateNewUser);

class User {
    email;
    name;
    phone;
    age;
    address;

    constructor(name, email, phone, age, address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.address = address;
    }
}

/**
 * Checks all signup form input fields for valid input.
 * If any input is invalid, the submission is stopped and the page is updated to inform the user of the mistake.
 * @param event The submission button click event on the signup form.
 */
function validateNewUser(event) {
    resetFormInputStyles();
    let invalidInput = false;

    const newUser = new User(
        nameInputElement.value,
        emailInputElement.value,
        phoneInputElement.value,
        ageInputElement.value,
        addressInputElement.value,
    );

    if (!validateName(newUser.name)) {
        nameInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (!validateEmail(newUser.email)) {
        emailInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (newUser.phone && !validatePhone(newUser.phone)) {
        phoneInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (!validateAge(newUser.age)) {
        ageInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (!validateAddress(newUser.address)) {
        addressInputElement.classList.add('is-invalid');
        invalidInput = true;
    }

    if (invalidInput) {
        event.preventDefault();
    }
}

/**
 * Validates that the user input a name of at least one character.
 * @param name The input name.
 * @returns {boolean} True if the input name is at least one character long. False otherwise.
 */
function validateName(name) {
    return name.length > 0;
}

/**
 * Validates that the user input a valid email address.
 * Valid emails are of the format example@example.com.
 * In other words, a valid email is three sections of characters separated by @ and .
 * @param email The input email address.
 * @returns {boolean} True if the input email address matches format specifications. False otherwise.
 */
function validateEmail(email) {
    // this regex validates basic email format (local@domain.tld)
    // it ensures three parts separated by @ and .
    // each part must be one or more characters that are not whitespace or @
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates that the user input a valid phone number.
 * Valid phone numbers are of the format ###-###-#### and may only be numbers.
 * @param phone The input phone number.
 * @returns {boolean} True if the input phone number matches format and is all numerical. False otherwise.
 */
function validatePhone(phone) {
    // this regex validates a phone number in the format (###-###-####) only
    // it ensures three parts separated by -
    // the first part must be three digits, middle part must be three digits, and ending must be four digits
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
}

/**
 * Validates that the user input a valid age that is a positive number.
 * @param age The input age.
 * @returns {boolean} True if the input age is a positive number. False if NaN or negative.
 */
function validateAge(age) {
    return !isNaN(age) && age > 0;
}

/**
 * Validates that the user put in a string of at least one character.
 * @param address The input email address.
 * @returns {boolean} True if the input email address string is at least one character long. False if empty.
 */
function validateAddress(address) {
    return address.length > 0;
}

/**
 * Removes all bootstrap alert classes from all signup form input fields.
 */
function resetFormInputStyles() {
    // is-invalid adds a red border to input fields
    emailInputElement.classList.remove('is-invalid');
    nameInputElement.classList.remove('is-invalid');
    phoneInputElement.classList.remove('is-invalid');
    ageInputElement.classList.remove('is-invalid');
    addressInputElement.classList.remove('is-invalid');

    // text-danger makes text red
    emailInputElement.classList.remove('text-danger');
    nameInputElement.classList.remove('text-danger');
    phoneInputElement.classList.remove('text-danger');
    ageInputElement.classList.remove('text-danger');
    addressInputElement.classList.remove('text-danger');

    // d-none hides the duplicate div
    duplicateDiv.classList.add('d-none');
}

/**
 * Attempts to save a validated user object to localStorage.
 * Duplicate users are not allowed. A duplicate user would be a user trying to create a new user with an email address
 * that is already being stored in localStorage.
 * @param newUser The user object to save to localStorage.
 * @returns {boolean} True if this is a new unique user object. False if there is already a user object in localStorage
 * using the given user.email.
 */
function saveUser(newUser) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // duplicate users are determined by email, one email = one user
    const isDuplicate = users.some((storedUser) => storedUser.email === newUser.email);

    if (isDuplicate) {
        // d-none hides the duplicate div
        duplicateDiv.classList.remove('d-none');
        return false;
    } else {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
}