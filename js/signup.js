let emailInputElement = document.getElementById('email');
let nameInputElement = document.getElementById('fullName');
let phoneInputElement = document.getElementById('phone');
let ageInputElement = document.getElementById('age');
let addressInputElement = document.getElementById('address');
let duplicateDiv = document.getElementById('duplicate-alert');
let failureDiv = document.getElementById('failure-alert');
let successDiv = document.getElementById('success-alert');

document.querySelector('form').addEventListener('submit', validateNewUser);

const params = new URLSearchParams(window.location.search);
const editIndexRaw = params.get("edit");
const editIndex = editIndexRaw !== null ? Number(editIndexRaw) : null;

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

document.addEventListener("DOMContentLoaded", function () {
    prefillFormIfEditMode();
});

function prefillFormIfEditMode() {
    if (editIndex === null || Number.isNaN(editIndex)) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users[editIndex];

    if (!user) {
        alert("Invalid edit link. Returning to home.");
        window.location.href = "index.html";
        return;
    }

    nameInputElement.value = user.name || "";
    emailInputElement.value = user.email || "";
    phoneInputElement.value = user.phone || "";
    ageInputElement.value = user.age || "";
    addressInputElement.value = user.address || "";

    const headers = document.querySelectorAll("h5");
    headers.forEach(h => {
        if (h.textContent.trim().toLowerCase() === "new account") {
            h.textContent = "Update Account";
        }
    });

    const btn = document.getElementById("submitBtn");
    if (btn) btn.textContent = "Update";
}

function validateNewUser(event) {
    resetFormInputStyles();
    event.preventDefault();
    let invalidInput = false;

    const newUser = new User(
        nameInputElement.value.trim(),
        emailInputElement.value.trim(),
        phoneInputElement.value.trim(),
        ageInputElement.value.trim(),
        addressInputElement.value.trim(),
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

    
    if (!invalidInput) {
        const success = saveUser(newUser);
        if (success) {
            successDiv.classList.remove('d-none');
            setTimeout(() => window.location.href = "index.html", 600);
        } else {
            duplicateDiv.classList.remove('d-none');
        }
    } else {
        failureDiv.classList.remove('d-none');
    }
}

function validateName(name) {
    return name.length > 0;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
}

function validateAge(age) {
    return !isNaN(age) && Number(age) > 0;
}

function validateAddress(address) {
    return address.length > 0;
}

function resetFormInputStyles() {
    emailInputElement.classList.remove('is-invalid');
    nameInputElement.classList.remove('is-invalid');
    phoneInputElement.classList.remove('is-invalid');
    ageInputElement.classList.remove('is-invalid');
    addressInputElement.classList.remove('is-invalid');

    emailInputElement.classList.remove('text-danger');
    nameInputElement.classList.remove('text-danger');
    phoneInputElement.classList.remove('text-danger');
    ageInputElement.classList.remove('text-danger');
    addressInputElement.classList.remove('text-danger');

    duplicateDiv.classList.add('d-none');
    failureDiv.classList.add('d-none');
    successDiv.classList.add('d-none');
}

function saveUser(newUser) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (editIndex !== null && !Number.isNaN(editIndex)) {
        if (!users[editIndex]) return false;

        const isDuplicate = users.some((storedUser, idx) =>
            idx !== editIndex && storedUser.email === newUser.email
        );

        if (isDuplicate) return false;

        users[editIndex] = newUser;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    const isDuplicate = users.some((storedUser) => storedUser.email === newUser.email);

    if (isDuplicate) {
        return false;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}