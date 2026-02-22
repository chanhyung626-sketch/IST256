function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers() {
  const users = getUsers();
  const tbody = document.getElementById("memberTableBody");
  const emptyMsg = document.getElementById("emptyMsg");

  tbody.innerHTML = "";

  if (users.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  users.forEach((u, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${u.name ?? ""}</td>
      <td>${u.email ?? ""}</td>
      <td>${u.age ?? ""}</td>
      <td>${u.address ?? ""}</td>
      <td>${u.phone ?? ""}</td>
      <td class="text-end">
        <a class="btn btn-sm btn-outline-primary" href="signup.html?edit=${index}">Edit</a>
        <button class="btn btn-sm btn-outline-danger ms-1" data-index="${index}">Delete</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  tbody.querySelectorAll("button[data-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-index"));
      deleteUser(idx);
    });
  });
}

function deleteUser(index) {
  const users = getUsers();
  if (!users[index]) return;

  const ok = confirm(`Delete "${users[index].name}"?`);
  if (!ok) return;

  users.splice(index, 1);
  saveUsers(users);
  renderUsers();
}

document.addEventListener("DOMContentLoaded", renderUsers);