document.addEventListener('DOMContentLoaded', () => {
    const modelGrid = document.querySelector('.model-grid');
    const modelViewer = document.getElementById('model-viewer');
    const closeViewer = document.getElementById('close-viewer');
    const modelViewerElement = modelViewer.querySelector('model-viewer');
    const spinner = document.getElementById('spinner');
    const categoryButtons = document.querySelectorAll('.button');

    const modelInstance = document.createElement('p');
    modelInstance.id = 'model-instance';
    modelInstance.classList.add('model-detail-instance');
    document.getElementById('model-info').appendChild(modelInstance);

    const modelInstancesaga3 = document.createElement('p');
    modelInstancesaga3.id = 'model-instancesaga3';
    modelInstancesaga3.classList.add('model-detail-instancesaga3');
    document.getElementById('model-info').appendChild(modelInstancesaga3);

    const modelOpis = document.createElement('p');
    modelOpis.id = 'model-opis';
    modelOpis.classList.add('model-detail-opis');
    document.getElementById('model-info').appendChild(modelOpis);

    const modelWeight = document.createElement('p');
    modelWeight.id = 'model-weight';
    modelWeight.classList.add('model-detail-weight');
    document.getElementById('model-info').appendChild(modelWeight);

    const modelRange = document.createElement('p');
    modelRange.id = 'model-range';
    modelRange.classList.add('model-detail-range');
    document.getElementById('model-info').appendChild(modelRange);

    const modelMagicCircle = document.createElement('p');
    modelMagicCircle.id = 'model-magic_circle';
    modelMagicCircle.classList.add('model-detail-magic_circle');
    document.getElementById('model-info').appendChild(modelMagicCircle);

    const modelManaCost = document.createElement('p');
    modelManaCost.id = 'model-mana_cost';
    modelManaCost.classList.add('model-detail-mana_cost');
    document.getElementById('model-info').appendChild(modelManaCost);

    const modelDurability = document.createElement('p');
    modelDurability.id = 'model-durability';
    modelDurability.classList.add('model-detail-durability');
    document.getElementById('model-info').appendChild(modelDurability);

    const modelHands = document.createElement('p');
    modelHands.id = 'model-hands';
    modelHands.classList.add('model-detail-hands');
    document.getElementById('model-info').appendChild(modelHands);

    const modelUses = document.createElement('p');
    modelUses.id = 'model-uses';
    modelUses.classList.add('model-detail-uses');
    document.getElementById('model-info').appendChild(modelUses);
    
    const modelStaminaPerHit = document.createElement('p');
    modelStaminaPerHit.id = 'model-staminaPerHit';
    modelStaminaPerHit.classList.add('model-detail-staminaPerHit');
    document.getElementById('model-info').appendChild(modelStaminaPerHit);

    const modelHpPerHit = document.createElement('p');
    modelHpPerHit.id = 'model-hpPerHit';
    modelHpPerHit.classList.add('model-detail-hpPerHit');
    document.getElementById('model-info').appendChild(modelHpPerHit);

    const modelManaPerHit = document.createElement('p');
    modelManaPerHit.id = 'model-manaPerHit';
    modelManaPerHit.classList.add('model-detail-manaPerHit');
    document.getElementById('model-info').appendChild(modelManaPerHit);

    const modelStamina = document.createElement('p');
    modelStamina.id = 'model-stamina';
    modelStamina.classList.add('model-detail-stamina');
    document.getElementById('model-info').appendChild(modelStamina);

    const modelHp = document.createElement('p');
    modelHp.id = 'model-hp';
    modelHp.classList.add('model-detail-hp');
    document.getElementById('model-info').appendChild(modelHp);

    const modelMana = document.createElement('p');
    modelMana.id = 'model-mana';
    modelMana.classList.add('model-detail-mana');
    document.getElementById('model-info').appendChild(modelMana);

    const modelDmgType = document.createElement('p');
    modelDmgType.id = 'model-dmgType';
    modelDmgType.classList.add('model-detail-dmgType');
    document.getElementById('model-info').appendChild(modelDmgType);

    const modelDmg = document.createElement('p');
    modelDmg.id = 'model-dmg';
    modelDmg.classList.add('model-detail-dmg');
    document.getElementById('model-info').appendChild(modelDmg);

    const modelStrength = document.createElement('p');
    modelStrength.id = 'model-strength';
    modelStrength.classList.add('model-detail-strength');
    document.getElementById('model-info').appendChild(modelStrength);

    const modelDexterity = document.createElement('p');
    modelDexterity.id = 'model-dexterity';
    modelDexterity.classList.add('model-detail-dexterity');
    document.getElementById('model-info').appendChild(modelDexterity);

    const modelIntelligence = document.createElement('p');
    modelIntelligence.id = 'model-intelligence';
    modelIntelligence.classList.add('model-detail-intelligence');
    document.getElementById('model-info').appendChild(modelIntelligence);
    
    const modelResistanceBlunt = document.createElement('p');
    modelResistanceBlunt.id = 'model-resistance_blunt';
    modelResistanceBlunt.classList.add('model-detail-resistance_blunt');
    document.getElementById('model-info').appendChild(modelResistanceBlunt);

    const modelResistanceProjectile = document.createElement('p');
    modelResistanceProjectile.id = 'model-resistance_projectile';
    modelResistanceProjectile.classList.add('model-detail-resistance_projectile');
    document.getElementById('model-info').appendChild(modelResistanceProjectile);

    const modelResistanceSlash = document.createElement('p');
    modelResistanceSlash.id = 'model-resistance_slash';
    modelResistanceSlash.classList.add('model-detail-resistance_slash');
    document.getElementById('model-info').appendChild(modelResistanceSlash);

    const modelResistanceMagic = document.createElement('p');
    modelResistanceMagic.id = 'model-resistance_magic';
    modelResistanceMagic.classList.add('model-detail-resistance_magic');
    document.getElementById('model-info').appendChild(modelResistanceMagic);

    const modelResistanceFire = document.createElement('p');
    modelResistanceFire.id = 'model-resistance_fire';
    modelResistanceFire.classList.add('model-detail-resistance_fire');
    document.getElementById('model-info').appendChild(modelResistanceFire);

    const modelResistanceFall = document.createElement('p');
    modelResistanceFall.id = 'model-resistance_fall';
    modelResistanceFall.classList.add('model-detail-resistance_fall');
    document.getElementById('model-info').appendChild(modelResistanceFall);
    
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

    function setDetailText(element, label, value) {
        // Nowa, bardziej rygorystyczna walidacja
        if (value !== null && value !== undefined && value !== 'BRAK' && value !== '' && value !== '0') {
            element.textContent = `${label}: ${value}`;
            element.style.display = 'block';
        } else {
            element.textContent = '';
            element.style.display = 'none';
        }
    }

    function displayModels(modelsToDisplay) {
        modelGrid.innerHTML = '';
        modelsToDisplay.forEach(model => {
            const card = document.createElement('div');
            card.classList.add('model-card', 'main-card');

            const isNameAvailable = model.name && model.name.trim() !== "";
            const displayNameForSearch = (isNameAvailable ? model.name : model.title || '').toLowerCase();
            card.setAttribute('data-title', displayNameForSearch);
            card.setAttribute('data-model', (basePath + model.model).toLowerCase());
            card.setAttribute('data-display-source', isNameAvailable ? 'name' : 'title');


            const firstLetter = (isNameAvailable ? model.name : model.title || '').charAt(0).toUpperCase();
            if (firstLetter >= 'A' && firstLetter <= 'Z') {
                card.setAttribute("data-letter", firstLetter);
            } else {
                card.setAttribute("data-letter", "123");
            }

            if (model.instance) {
                card.setAttribute("data-instance", model.instance);
            }

            const desc = model.description?.toLowerCase() || "";

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

            const dmgTypes = {
                CUT: /sieczne\s*[:\-]?\s*(\d+)/i,
                PRC: /kłute\s*[:\-]?\s*(\d+)/i,
                BLT: /obuch\s*[:\-]?\s*(\d+)/i,
                MAG: /magia\s*[:\-]?\s*(\d+)/i,
                BES: /bestie\s*[:\-]?\s*(\d+)/i
            };

            let maxValue = -1;
            let topTypes = [];

            for (const [key, regex] of Object.entries(dmgTypes)) {
                const match = desc.match(regex);
                const value = match ? parseInt(match[1]) : -1;
                if (value > maxValue) {
                    maxValue = value;
                    topTypes = [key];
                } else if (value === maxValue && value > -1) {
                    topTypes.push(key);
                }
            }

            if (topTypes.length > 1) {
                card.setAttribute("data-dmg", "MIX");
            } else if (topTypes.length === 1) {
                card.setAttribute("data-dmg", topTypes[0]);
            }

            if (model.tier) card.setAttribute("data-tier", model.tier);
            if (model.hands) card.setAttribute("data-hands", model.hands);

            if (model.material) {
                if (model.material.toLowerCase() === "skóra") {
                    card.setAttribute("data-visual", "LIGHT");
                } else if (model.material.toLowerCase() === "blacha") {
                    card.setAttribute("data-visual", "HEAVY");
                }
            }

            const img = document.createElement('img');
            img.src = basePath + model.thumbnail;
            img.alt = isNameAvailable ? model.name : model.title;

            const title = document.createElement('h2');
            title.textContent = isNameAvailable ? model.name : model.title;
            
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
                document.getElementById('model-title').textContent = isNameAvailable ? model.name : model.title;
                document.getElementById('model-description').textContent = model.description;

                setDetailText(modelInstance, 'Instancja', model.instance);
                setDetailText(modelInstancesaga3, 'Instancja [Saga3]', model.instancesaga3);
                setDetailText(modelOpis, 'Opis Przedmiotu', model.opis);
                setDetailText(modelWeight, 'Waga', model.weight);
                setDetailText(modelRange, 'Zasięg', model.range);
                setDetailText(modelMagicCircle, 'Magiczny Krąg', model.magicCircle);
                setDetailText(modelManaCost, 'Koszt Many', model.manaCost);
                setDetailText(modelDurability, 'Wytrzymałość', model.durability);
                setDetailText(modelHands, 'Uchwyt', model.hands === "1H" ? "Jednoręczna" : (model.hands === "2H" ? "Dwuręczna" : ""));

                setDetailText(modelUses, 'Liczba użyć', model.uses);
                setDetailText(modelStaminaPerHit, 'Stamina za 1 hit', model.staminaPerHit);
                setDetailText(modelHpPerHit, 'HP za 1 hit', model.hpPerHit);
                setDetailText(modelManaPerHit, 'Mana za 1 hit', model.manaPerHit);
                setDetailText(modelStamina, 'Stamina', model.stamina);
                setDetailText(modelHp, 'HP', model.hp);
                setDetailText(modelMana, 'Mana', model.mana);
                setDetailText(modelDmgType, 'Rodzaj obrażeń', model.dmgType);
                setDetailText(modelDmg, 'DMG', model.dmg);
                setDetailText(modelStrength, 'Wymagana Siła', model.strength);
                setDetailText(modelDexterity, 'Wymagana Zręczność', model.dexterity);
                setDetailText(modelIntelligence, 'Wymagana Inteligencja', model.intelligence);
                setDetailText(modelResistanceBlunt, 'Obrona Obuchowa', model.resistance_blunt);
                setDetailText(modelResistanceProjectile, 'Obrona Pociski', model.resistance_projectile);
                setDetailText(modelResistanceSlash, 'Obrona Sieczna', model.resistance_slash);
                setDetailText(modelResistanceMagic, 'Obrona Magia', model.resistance_magic);
                setDetailText(modelResistanceFire, 'Obrona Ogień', model.resistance_fire);
                setDetailText(modelResistanceFall, 'Obrona Upadek', model.resistance_fall);
                
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

        applyAllFilters();
    }

    // FILTRY
    let activeTier = null;
    let activeHands = null;
    let activeStat = null;
    let activeDmg = null;
    let activeVisual = null;
    let activeLetter = null;
    let activeDisplaySource = null;

    document.querySelectorAll('.filter-button[data-visual]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-button[data-visual]').forEach(b => b.classList.remove('active'));
            activeVisual = (activeVisual === button.dataset.visual) ? null : button.dataset.visual;
            if (activeVisual) button.classList.add('active');
            applyAllFilters();
        });
    });

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

    document.querySelectorAll('.filter-button[data-letter]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-button[data-letter]').forEach(b => b.classList.remove('active'));
            activeLetter = (activeLetter === button.dataset.letter) ? null : button.dataset.letter;
            if (activeLetter) button.classList.add('active');
            applyAllFilters();
        });
    });

    document.querySelectorAll('.filter-button[data-display-source]').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-button[data-display-source]').forEach(b => b.classList.remove('active'));
            activeDisplaySource = (activeDisplaySource === button.dataset.displaySource) ? null : button.dataset.displaySource;
            if (activeDisplaySource) button.classList.add('active');
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
            const instance = card.dataset.instance || "";

            const matchSearch = title.includes(query) || thumb.includes(query) || modelPath.includes(query) || instance.toLowerCase().includes(query);
            const matchTier = !activeTier || card.dataset.tier === activeTier;
            const matchHands = !activeHands || card.dataset.hands === activeHands;
            const matchStat = !activeStat || card.dataset.stat === activeStat;
            const matchDmg = !activeDmg || card.dataset.dmg === activeDmg;
            const matchLetter = !activeLetter || card.dataset.letter === activeLetter;
            const matchDisplaySource = !activeDisplaySource || card.dataset.displaySource === activeDisplaySource;


            const match = matchSearch && matchTier && matchHands && matchStat && matchDmg && matchLetter && matchDisplaySource && (!activeVisual || card.dataset.visual === activeVisual);


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
        setDetailText(modelInstance, '', '');
        setDetailText(modelInstancesaga3, '', '');
        setDetailText(modelOpis, '', '');
        setDetailText(modelWeight, '', '');
        setDetailText(modelRange, '', '');
        setDetailText(modelMagicCircle, '', '');
        setDetailText(modelManaCost, '', '');
        setDetailText(modelDurability, '', '');
        setDetailText(modelHands, '', '');
        setDetailText(modelUses, '', '');
        setDetailText(modelStaminaPerHit, '', '');
        setDetailText(modelHpPerHit, '', '');
        setDetailText(modelManaPerHit, '', '');
        setDetailText(modelStamina, '', '');
        setDetailText(modelHp, '', '');
        setDetailText(modelMana, '', '');
        setDetailText(modelDmgType, '', '');
        setDetailText(modelDmg, '', '');
        setDetailText(modelStrength, '', '');
        setDetailText(modelDexterity, '', '');
        setDetailText(modelIntelligence, '', '');
        setDetailText(modelResistanceBlunt, '', '');
        setDetailText(modelResistanceProjectile, '', '');
        setDetailText(modelResistanceSlash, '', '');
        setDetailText(modelResistanceMagic, '', '');
        setDetailText(modelResistanceFire, '', '');
        setDetailText(modelResistanceFall, '', '');
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