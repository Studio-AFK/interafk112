let editIndex = null;

// Wyszukiwarka dla podejrzanych
function searchFunction() {
    const input = document.getElementById("search").value.toLowerCase();
    const cards = document.querySelectorAll("#suspectList .card");

    cards.forEach(card => {
        const name = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = name.includes(input) ? "" : "none";
    });
}

// Dodawanie nowego podejrzanego
document.getElementById('addSuspectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('suspectName').value;
    const description = document.getElementById('suspectDescription').value;
    const image = document.getElementById('suspectImage').value;

    const newCard = createCard(name, description, image);
    document.getElementById('suspectList').appendChild(newCard);

    document.getElementById('addSuspectForm').reset();
});

function createCard(name, description, image) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="actions">
            <button class="btn edit-btn" onclick="editSuspect(this)">Edytuj</button>
            <button class="btn delete-btn" onclick="deleteSuspect(this)">Usuń</button>
        </div>
    `;
    return card;
}

// Edytowanie podejrzanego
function editSuspect(button) {
    const card = button.closest('.card');
    const name = card.querySelector('h3').innerText;
    const description = card.querySelector('p').innerText;
    const image = card.querySelector('img').src;

    document.getElementById('editSuspectName').value = name;
    document.getElementById('editSuspectDescription').value = description;
    document.getElementById('editSuspectImage').value = image;

    document.getElementById('editSuspectForm').style.display = 'block';
    document.getElementById('addSuspectForm').style.display = 'none';

    editIndex = [...card.parentNode.children].indexOf(card); // Zapisz indeks edytowanej karty
}

// Zaktualizowanie podejrzanego
document.getElementById('editSuspectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('editSuspectName').value;
    const description = document.getElementById('editSuspectDescription').value;
    const image = document.getElementById('editSuspectImage').value;

    const card = document.querySelectorAll('#suspectList .card')[editIndex];
    card.querySelector('h3').innerText = name;
    card.querySelector('p').innerText = description;
    card.querySelector('img').src = image;

    cancelEdit(); // Powrót do dodawania nowych podejrzanych
});

// Anulowanie edytowania
function cancelEdit() {
    document.getElementById('editSuspectForm').style.display = 'none';
    document.getElementById('addSuspectForm').style.display = 'block';
    document.getElementById('editSuspectForm').reset();
}

// Usuwanie podejrzanego
function deleteSuspect(button) {
    const card = button.closest('.card');
    card.remove();
}
// Funkcja dodająca dowód
document.getElementById('addEvidenceForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Zapobiega przeładowaniu strony
    
    // Pobieranie wartości z formularza
    const evidenceName = document.getElementById('evidenceName').value;
    const evidenceImage = document.getElementById('evidenceImage').value;
    const evidenceDate = document.getElementById('evidenceDate').value;
    const evidenceDescription = document.getElementById('evidenceDescription').value;

    // Tworzenie nowej karty dowodu
    const evidenceGrid = document.getElementById('evidenceGrid');
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${evidenceImage}" alt="${evidenceName}">
        <h3>${evidenceName}</h3>
        <p>${evidenceDescription}</p>
        <p><strong>Data: </strong>${evidenceDate}</p>
        <button class="edit-button">Edytuj</button>
        <button class="delete-button">Usuń</button>
    `;

    evidenceGrid.appendChild(card);

    // Resetuj formularz
    this.reset();
});

// Funkcjonalność usuwania dowodów
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {
        const card = e.target.parentElement; // Pobranie karty
        card.remove(); // Usunięcie karty
    }
});

// Funkcjonalność edytowania dowodów
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-button')) {
        const card = e.target.parentElement;
        const name = card.querySelector('h3').innerText;
        const description = card.querySelector('p').innerText;
        const date = card.querySelector('p strong').nextSibling.textContent.trim();
        const imageUrl = card.querySelector('img').src;

        // Wstawianie wartości do formularza
        document.getElementById('evidenceName').value = name;
        document.getElementById('evidenceImage').value = imageUrl;
        document.getElementById('evidenceDate').value = date;
        document.getElementById('evidenceDescription').value = description;

        // Usunięcie karty przed edytowaniem
        card.remove();
    }
});

// Funkcjonalność wyszukiwania
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('h3').innerText.toLowerCase();
        const date = card.querySelector('p strong').nextSibling.textContent.trim().toLowerCase();
        if (name.includes(searchTerm) || date.includes(searchTerm)) {
            card.style.display = 'block'; // Pokaż kartę
        } else {
            card.style.display = 'none'; // Ukryj kartę
        }
    });
});
// Funkcja dodająca odcisk palca
document.getElementById('addFingerprintForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    // Pobieranie wartości z formularza
    const fingerprintName = document.getElementById('fingerprintName').value;
    const fingerprintImage = document.getElementById('fingerprintImage').value;
    const fingerprintDescription = document.getElementById('fingerprintDescription').value;

    // Tworzenie nowej karty odcisku palca
    const fingerprintList = document.getElementById('fingerprintList');

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${fingerprintImage}" alt="${fingerprintName}">
        <h3>${fingerprintName}</h3>
        <p>${fingerprintDescription}</p>
        <button class="delete-button">Usuń</button>
    `;

    fingerprintList.appendChild(card);

    // Resetuj formularz
    this.reset();
});

// Funkcjonalność usuwania odcisków palców
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-button')) {
        const card = e.target.parentElement; // Pobranie karty
        card.remove(); // Usunięcie karty
    }
});
