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
// change the form if there was a param
if (editId) {
    loadEntryForEditing(editId);
}

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

/**
 * Grabs an existing conference from localStorage if one exists and fill in the form details with that object.
 * Also changes relevant text on the page to signal the user is now editing and not creating with the form.
 * @param id The id of the ConferenceEntry object being edited.
 */
function loadEntryForEditing(id) {
    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    const entryToEdit = entries.find(e => e.id === id);

    if (entryToEdit) {
        // update the UI text to indicate "Edit Mode"
        $('#conference-entry-info h5').text('Edit Conference Entry');
        $('#conference-entry-info p').text('Update the details for this existing conference.');
        $('button[type="submit"]').text('Update Entry');

        // populate the standard text inputs
        $entryId.val(entryToEdit.id).prop('readonly', true); // Make ID read-only so they don't break the reference
        $title.val(entryToEdit.title);
        $description.val(entryToEdit.description);
        $entryPrice.val(entryToEdit.entryPrice);
        $additionalInfo.val(entryToEdit.additionalInfo);

        // populate the radio buttons
        $(`input[name="category"][value="${entryToEdit.category}"]`).prop('checked', true);
        $(`input[name="format"][value="${entryToEdit.format}"]`).prop('checked', true);
    } else {
        // id in the URL doesn't exist in local storage
        alert("We couldn't find an entry with that ID.");
    }
}