const STORAGE_KEY = "entries";

function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function render(entries) {
  const body = $("#entriesBody");
  body.empty();

  entries.forEach(e => {
    body.append(`
      <tr>
        <td>${e.id}</td>
        <td>${e.title}</td>
        <td>${e.category}</td>
        <td>${e.format}</td>
        <td>${e.entryPrice}</td>
        <td>
          <a href="conference-details.html?id=${e.id}" class="btn btn-sm btn-info">View</a>
          <a href="conference-entry.html?id=${e.id}" class="btn btn-sm btn-warning">Edit</a>
          <button class="btn btn-sm btn-danger deleteBtn" data-id="${e.id}">Delete</button>
        </td>
      </tr>
    `);
  });
}

$(document).ready(function () {
  let entries = loadEntries();
  render(entries);

  $("#searchInput").on("input", function () {
    const value = $(this).val().toLowerCase();
    const filtered = entries.filter(e =>
      e.title.toLowerCase().includes(value) ||
      e.category.toLowerCase().includes(value)
    );
    render(filtered);
  });

$("#entriesBody").on("click", ".deleteBtn", function () {
  const id = String($(this).data("id")); // force string

  entries = entries.filter(e => String(e.id) !== id);

  saveEntries(entries);
  render(entries);
});
});