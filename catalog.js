document.addEventListener('DOMContentLoaded', () => {
    const modelGrid = document.querySelector('.model-grid');
    const modelViewer = document.getElementById('model-viewer');
    const closeViewer = document.getElementById('close-viewer');
    const modelViewerElement = modelViewer.querySelector('model-viewer');
    const spinner = document.getElementById('spinner');
    const categoryButtons = document.querySelectorAll('.button');

    const pageName = document.body.getAttribute('data-page');
    const jsonUrl = `../assets/dane/${pageName}.json`;
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

            const desc = model.description?.toLowerCase() || "";

		// Wyciągnij liczby po "siła:" i "zręczność:"
		const strMatch = desc.match(/siła\s*[:\-]?\s*(\d+)/i);
		const dexMatch = desc.match(/zręczność\s*[:\-]?\s*(\d+)/i);

		const strValue = strMatch ? parseInt(strMatch[1]) : 0;
		const dexValue = dexMatch ? parseInt(dexMatch[1]) : 0;

		if (strValue > dexValue) {
			card.setAttribute("data-stat", "STR");
		} else if (dexValue > strValue) {
			card.setAttribute("data-stat", "DEX");
		} else if (strValue === dexValue && strValue > 0) {
			card.setAttribute("data-stat", "BOTH");
		}

		


            if (desc.includes("sieczne")) card.setAttribute("data-dmg", "CUT");
            else if (desc.includes("kłute")) card.setAttribute("data-dmg", "PRC");
            else if (desc.includes("obuchowe")) card.setAttribute("data-dmg", "BLT");

            if (model.tier) card.setAttribute("data-tier", model.tier);
            if (model.hands) card.setAttribute("data-hands", model.hands);

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
                document.body.classList.add('viewer-open');
            });
        });

        applyAllFilters(); // filtruj po renderze
    }

    // FILTRY
    let activeTier = null;
    let activeHands = null;
    let activeStat = null;
    let activeDmg = null;

    document.querySelectorAll('.filter-button[data-tier]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-button[data-tier]').forEach(b => b.classList.remove('active'));
            activeTier = (activeTier === button.dataset.tier) ? null : button.dataset.tier;
            if (activeTier) button.classList.add('active');
            applyAllFilters();
        });
    });

    document.querySelectorAll('.filter-button[data-hands]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-button[data-hands]').forEach(b => b.classList.remove('active'));
            activeHands = (activeHands === button.dataset.hands) ? null : button.dataset.hands;
            if (activeHands) button.classList.add('active');
            applyAllFilters();
        });
    });

    document.querySelectorAll('.filter-button[data-stat]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-button[data-stat]').forEach(b => b.classList.remove('active'));
            activeStat = (activeStat === button.dataset.stat) ? null : button.dataset.stat;
            if (activeStat) button.classList.add('active');
            applyAllFilters();
        });
    });

    document.querySelectorAll('.filter-button[data-dmg]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-button[data-dmg]').forEach(b => b.classList.remove('active'));
            activeDmg = (activeDmg === button.dataset.dmg) ? null : button.dataset.dmg;
            if (activeDmg) button.classList.add('active');
            applyAllFilters();
        });
    });

    function applyAllFilters() {
        const query = document.getElementById('search-bar').value.toLowerCase().trim();
        const cards = document.querySelectorAll('.main-card');
        let visible = 0;

        cards.forEach(card => {
            const title = card.dataset.title || "";
            const thumb = card.querySelector('img')?.src || "";
            const modelPath = card.dataset.model || "";

            const matchSearch = title.includes(query) || thumb.includes(query) || modelPath.includes(query);
            const matchTier = !activeTier || card.dataset.tier === activeTier;
            const matchHands = !activeHands || card.dataset.hands === activeHands;
            const matchStat = !activeStat || card.dataset.stat === activeStat;
            const matchDmg = !activeDmg || card.dataset.dmg === activeDmg;

            const match = matchSearch && matchTier && matchHands && matchStat && matchDmg;

            card.style.display = match ? "block" : "none";
            if (match) visible++;
        });

        document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
        const searchStatus = document.getElementById('search-status');
        if (searchStatus) {
            searchStatus.textContent = query ? `Znaleziono: ${visible} / ${cards.length}` : '';
        }
    }

    const searchInput = document.getElementById('search-bar');
    if (searchInput) {
        searchInput.addEventListener('input', applyAllFilters);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = "";
                applyAllFilters();
            }
        });
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            if (category === 'all') {
                displayModels(models);
            } else {
                const filtered = models.filter(model => model.category === category);
                displayModels(filtered);
            }
        });
    });

    closeViewer.addEventListener('click', () => {
        modelViewer.style.display = 'none';
        document.body.classList.remove('viewer-open');
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (document.body.classList.contains('viewer-open')) return;
        document.body.classList.add('scrolling-hide');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling-hide');
        }, 200);
    });

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
	const toggleTab = document.getElementById('filter-toggle-tab');
const sideFilters = document.getElementById('side-filters');

toggleTab.addEventListener('click', () => {
  sideFilters.classList.toggle('open');
});

});
