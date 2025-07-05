document.addEventListener('DOMContentLoaded', () => {
    const modelGrid = document.querySelector('.model-grid');
    const modelViewer = document.getElementById('model-viewer');
    const closeViewer = document.getElementById('close-viewer');
    const modelViewerElement = modelViewer.querySelector('model-viewer');
    const spinner = document.getElementById('spinner');
    const categoryButtons = document.querySelectorAll('.button');

    const pageName = document.body.getAttribute('data-page');
    const jsonUrl = `../assets/dane/${pageName}.json`;

    // Dodajemy base path zależnie od lokalizacji strony
    const basePath = window.location.pathname.includes('/zawody/') ? '../' : '';

    let models = [];

    async function fetchModels() {
        try {
            const response = await fetch(jsonUrl);
            models = await response.json();
            displayModels(models);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
        }
    }

function displayModels(modelsToDisplay) {
    modelGrid.innerHTML = '';
    modelsToDisplay.forEach(model => {
        const card = document.createElement('div');
        card.classList.add('model-card', 'main-card');
        card.setAttribute('data-title', model.title.toLowerCase());
        card.setAttribute('data-model', (basePath + model.model).toLowerCase());

        const img = document.createElement('img');
        img.src = basePath + model.thumbnail;
        img.alt = model.title;

        const title = document.createElement('h2');
        title.textContent = model.title;

        if (model.hands) {
            const handsTag = document.createElement('div');
            handsTag.classList.add('hands-tag');
            handsTag.textContent = model.hands === "1H" ? "Jednoręczna" : "Dwuręczna";
            handsTag.classList.add(model.hands === "1H" ? "one-handed" : "two-handed");
            card.appendChild(handsTag);
        }
        if (model.tier) {
            const tierTag = document.createElement('div');
            tierTag.classList.add('tier-tag');
            tierTag.textContent = model.tier;
            tierTag.classList.add(`tier-${model.tier.toLowerCase()}`);
            card.appendChild(tierTag);
        }

        card.appendChild(img);
        card.appendChild(title);
        modelGrid.appendChild(card);

        card.addEventListener('click', () => {
            document.getElementById('model-title').textContent = model.title;
            document.getElementById('model-description').textContent = model.description;
            spinner.style.display = 'block';
            const modelSrc = basePath + model.model;
            if (modelViewerElement.getAttribute('src') === modelSrc) {
                spinner.style.display = 'none'; 
            } else {
                modelViewerElement.setAttribute('src', ''); 
                setTimeout(() => {
                    modelViewerElement.setAttribute('src', modelSrc);
                }, 50);
            }
            modelViewer.style.display = 'flex';
        });
    });
}

	
	function filterCards() {
    const query = document.getElementById('search-bar').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.main-card');

    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.dataset.title || "";
        const thumb = card.querySelector('img')?.src || "";
        const modelPath = card.dataset.model || "";

        const match = title.includes(query) || thumb.includes(query) || modelPath.includes(query);
        card.style.display = match ? "block" : "none";
        if (match) visibleCount++;
    });

    // update licznik
    const searchStatus = document.getElementById('search-status');
    if (searchStatus) {
        searchStatus.textContent = query ? `Znaleziono: ${visibleCount} / ${cards.length}` : '';
    }

    // brak wyników
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = (query && visibleCount === 0) ? 'block' : 'none';
    }
}




    modelViewerElement.addEventListener('load', () => {
        spinner.style.display = 'none';
        const materials = modelViewerElement.model?.materials;
        if (materials) {
            materials.forEach(material => {
                material.pbrMetallicRoughness.setMetallicFactor(-2);
                material.pbrMetallicRoughness.setRoughnessFactor(1);
            });
        }
    });

    fetchModels();
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            if (category === 'all') {
                displayModels(models);
            } else {
                const filteredModels = models.filter(model => model.category === category);
                displayModels(filteredModels);
            }
        });
    });

    closeViewer.addEventListener('click', () => {
        modelViewer.style.display = 'none';
    });
	const searchInput = document.getElementById('search-bar');
if (searchInput) {
    searchInput.addEventListener('input', filterCards);

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = "";
            filterCards();
        }
    });
}

});
