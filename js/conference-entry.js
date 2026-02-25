// form field elements
const $entryId = $('#entryId');
const $title = $('#title');
const $description = $('#description');
const $entryPrice = $('#entryPrice');
const $additionalInfo = $('#additionalInfo');

// form input alerts
const $duplicateAlert = $('#duplicate-alert');
const $successAlert = $('#success-alert');

// read url params for edit mode
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');

class ConferenceEntry {
    id;
    title;
    description;
    category;
    format;
    entryPrice;
    additionalInfo;

    constructor(id, title, description, category, format, entryPrice, additionalInfo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.format = format;
        this.entryPrice = entryPrice;
        this.additionalInfo = additionalInfo;
    }
}

$('#entryForm').on('submit', validateForm);

function validateForm(event) {
    event.preventDefault();
    resetFormStyles();

    let isValid = true;

    if (!validateId($entryId.val())) {
        $entryId.addClass('is-invalid');
        isValid = false;
    }

    if (!validateTitle($title.val())) {
        $title.addClass('is-invalid');
        isValid = false;
    }

    if (!validateDescription($description.val())) {
        $description.addClass('is-invalid');
        isValid = false;
    }

    if (!validateCategory()) {
        $('#categoryError').removeClass('d-none');
        isValid = false;
    }

    if (!validateFormat()) {
        $('#formatError').removeClass('d-none');
        isValid = false;
    }

    if (!validateEntryPrice($entryPrice.val())) {
        $entryPrice.addClass('is-invalid');
        isValid = false;
    }

    if (isValid) {
        saveEntry();
    }
}

function saveEntry() {
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');

    const entry = new ConferenceEntry(
        $entryId.val(),
        $title.val(),
        $description.val(),
        $('input[name="category"]:checked').val(),
        $('input[name="format"]:checked').val(),
        $entryPrice.val(),
        $additionalInfo.val()
    );

    // if ?id=x param was present
    if (editId) {
        const index = entries.findIndex(e => e.id === editId);
        // edit existing entry
        if (index !== -1) {
            entries[index] = entry;
            localStorage.setItem('entries', JSON.stringify(entries));
            $successAlert.removeClass('d-none');
        }
    } else {
        const isDuplicate = entries.some(e => e.id === entry.id);
        if (isDuplicate) {
            $duplicateAlert.removeClass('d-none');
            return;
        }

        // valid new entry
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
        $successAlert.removeClass('d-none');
    }
}

function resetFormStyles() {
    // clear input invalid states
    $('#entryId, #title, #description, #entryPrice').removeClass('is-invalid');

    // clear radio error messages
    $('#categoryError, #formatError').addClass('d-none');

    // clear alerts
    $duplicateAlert.addClass('d-none');
    $successAlert.addClass('d-none');
}

function validateId(id) {
    return id.length > 0;
}

function validateTitle(title) {
    return title.length > 0;
}

function validateDescription(description) {
    return description.length > 0;
}

function validateCategory() {
    return $('input[name="category"]:checked').length > 0;
}

function validateFormat() {
    return $('input[name="format"]:checked').length > 0;
}

function validateEntryPrice(price) {
    return !isNaN(price) && Number(price) >= 0;
}