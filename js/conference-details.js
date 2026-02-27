const STORAGE_KEY = "entries";

function loadEntries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const entries = loadEntries();
  const entry = entries.find(e => e.id === id);

  if (!entry) {
    $("#notFound").removeClass("d-none");
    return;
  }

  $("#detailsCard").removeClass("d-none");
  $("#detailsId").text(entry.id);
  $("#detailsTitleText").text(entry.title);
  $("#detailsDescription").text(entry.description);
  $("#detailsCategory").text(entry.category);
  $("#detailsFormat").text(entry.format);
  $("#detailsPrice").text(Number(entry.entryPrice).toFixed(2));
  $("#detailsAdditional").text(entry.additionalInfo ? entry.additionalInfo : "N/A");

  $("#editLink").attr("href", `conference-entry.html?id=${entry.id}`);
});