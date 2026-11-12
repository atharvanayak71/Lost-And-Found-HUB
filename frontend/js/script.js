// ---------- Sample data (temporary; the FastAPI backend will replace this) ----------
const items = [
    { id: 1, title: "Black Leather Wallet", category: "Accessories", status: "Lost",  location: "Library, Ground Floor", date: "Nov 9",  icon: "👛" },
    { id: 2, title: "iPhone 13 (Blue)",     category: "Electronics", status: "Found", location: "Cafeteria",             date: "Nov 10", icon: "📱" },
    { id: 3, title: "Data Structures Book", category: "Books",       status: "Lost",  location: "Block C, Room 204",     date: "Nov 8",  icon: "📘" },
    { id: 4, title: "Wireless Earbuds",     category: "Electronics", status: "Found", location: "Main Gate",             date: "Nov 10", icon: "🎧" },
    { id: 5, title: "Silver Wrist Watch",   category: "Accessories", status: "Lost",  location: "Sports Ground",         date: "Nov 7",  icon: "⌚" },
    { id: 6, title: "Physics Notebook",     category: "Books",       status: "Found", location: "Seminar Hall",          date: "Nov 9",  icon: "📓" },
    { id: 7, title: "Calculus Textbook",    category: "Books",       status: "Lost",  location: "Block A, Room 101",     date: "Nov 6",  icon: "📘" }
];

// ---------- Makes user-typed text safe to insert into HTML ----------
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ---------- Grab the elements we need from the page ----------
const itemsContainer = document.getElementById("itemsContainer");
const emptyMessage = document.getElementById("emptyMessage");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---------- App state ----------
let activeCategory = "All";

// ---------- Draw the cards on the page ----------
function renderItems() {
    const query = searchInput.value.trim().toLowerCase();

    const filtered = items.filter(function (item) {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    itemsContainer.innerHTML = filtered.map(function (item) {
        return `
            <article class="item-card">
                <div class="item-top">
                    <span class="item-icon">${item.icon}</span>
                    <span class="badge badge-${item.status.toLowerCase()}">${item.status}</span>
                </div>
                <h3>${escapeHTML(item.title)}</h3>
                <p class="item-meta">📍 ${escapeHTML(item.location)}</p>
                <p class="item-meta">🗓️ ${escapeHTML(item.date)} · ${item.category}</p>
                ${item.contact ? `<p class="item-meta">📞 ${escapeHTML(item.contact)}</p>` : ""}
            </article>
        `;
    }).join("");

    emptyMessage.hidden = filtered.length > 0;
}

// ---------- Filter and search events ----------
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (b) { b.classList.remove("active"); });
        button.classList.add("active");
        activeCategory = button.dataset.category;
        renderItems();
    });
});

searchInput.addEventListener("input", renderItems);
searchBtn.addEventListener("click", renderItems);

// ---------- First draw when the page loads ----------
renderItems();

// ---------- Report modal ----------
const reportModal = document.getElementById("reportModal");
const reportForm = document.getElementById("reportForm");
const modalTitle = document.getElementById("modalTitle");
const reportStatus = document.getElementById("reportStatus");

const categoryIcons = { Electronics: "📱", Accessories: "👜", Books: "📚" };

function openModal(status) {
    reportStatus.value = status;
    modalTitle.textContent = status === "Lost" ? "Report a lost item" : "Report a found item";
    reportModal.hidden = false;
}

function closeModal() {
    reportModal.hidden = true;
    reportForm.reset();
}

document.getElementById("lostBtn").addEventListener("click", function () { openModal("Lost"); });
document.getElementById("foundBtn").addEventListener("click", function () { openModal("Found"); });
document.querySelector(".nav-btn").addEventListener("click", function () { openModal("Lost"); });
document.getElementById("closeModal").addEventListener("click", closeModal);

// Clicking the dark area outside the box closes the modal
reportModal.addEventListener("click", function (event) {
    if (event.target === reportModal) {
        closeModal();
    }
});

reportForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the browser from reloading the page

    const category = document.getElementById("itemCategory").value;
    const rawDate = document.getElementById("itemDate").value;

    const newItem = {
        id: Date.now(),
        title: document.getElementById("itemTitle").value.trim(),
        category: category,
        status: reportStatus.value,
        location: document.getElementById("itemLocation").value.trim(),
        date: new Date(rawDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        description: document.getElementById("itemDescription").value.trim(),
        contact: document.getElementById("itemContact").value.trim(),
        icon: categoryIcons[category]
    };

    items.unshift(newItem); // add to the START of the array
    closeModal();
    renderItems();
});