// ---------- Sample data (temporary; the FastAPI backend will replace this) ----------
const items = [
    { id: 1, title: "Black Leather Wallet", category: "Accessories", status: "Lost",  location: "Library, Ground Floor", date: "Nov 9",  icon: "👛" },
    { id: 2, title: "iPhone 13 (Blue)",     category: "Electronics", status: "Found", location: "Cafeteria",             date: "Nov 10", icon: "📱" },
    { id: 3, title: "Data Structures Book", category: "Books",       status: "Lost",  location: "Block C, Room 204",     date: "Nov 8",  icon: "📘" },
    { id: 4, title: "Wireless Earbuds",     category: "Electronics", status: "Found", location: "Main Gate",             date: "Nov 10", icon: "🎧" },
    { id: 5, title: "Silver Wrist Watch",   category: "Accessories", status: "Lost",  location: "Sports Ground",         date: "Nov 7",  icon: "⌚" },
    { id: 6, title: "Physics Notebook",     category: "Books",       status: "Found", location: "Seminar Hall",          date: "Nov 9",  icon: "📓" }
];

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
                <h3>${item.title}</h3>
                <p class="item-meta">📍 ${item.location}</p>
                <p class="item-meta">🗓️ ${item.date} · ${item.category}</p>
            </article>
        `;
    }).join("");

    emptyMessage.hidden = filtered.length > 0;
}

// ---------- Events: what happens when the user does something ----------
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