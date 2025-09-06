const fs = require('fs');
const path = require('path');

const jsonFilePath = './assets/dane/jubiler.json';
const outputDir = './assets/dane/';

// Mapowanie profesji na nazwy plików JSON
const professionToFileMap = {
    'Alchemik': 'alchemik.json',
    'Drwal': 'drwal.json',
    'Górnik': 'gornik.json',
    'Hutnik': 'hutnik.json',
    'Kaletnik': 'kaletnik.json',
    'Kucharz': 'kucharz.json',
    'Kuśnierz': 'kusnierz.json',
    'Łuczarz': 'luczarz.json',
    'Myśliwy': 'mysliwy.json',
    'Płatnerz': 'platnerz.json',
    'Kowal': 'rafinacja_metali.json',
    'Rolnik': 'rolnik.json',
    'Krawiec': 'ubrania.json',
    'Zaklinacz': 'zaklinacz.json',
    'Zbieracz': 'zbieracz.json',
    'Zbrojmistrz': 'zbrojmistrz.json'
};

async function distributeData() {
    console.log("--- Rozpoczynam dystrybucję danych na podstawie profesji ---");

    if (!fs.existsSync(jsonFilePath)) {
        console.error(`Błąd: Plik źródłowy JSON nie znaleziono pod ścieżką: ${jsonFilePath}`);
        return;
    }

    let jsonData;
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    } catch (error) {
        console.error(`Błąd podczas odczytu lub parsowania pliku JSON:`, error);
        return;
    }

    const distributedData = {};
    for (const key in professionToFileMap) {
        distributedData[key] = [];
    }
    
    let processedRecordsCount = 0;
    let unassignedRecordsCount = 0;

    jsonData.forEach(item => {
        const profession = item.profession;
        if (profession && professionToFileMap[profession]) {
            distributedData[profession].push(item);
            processedRecordsCount++;
        } else {
            unassignedRecordsCount++;
        }
    });

    // Sprawdzanie, czy katalog docelowy istnieje, i tworzenie go, jeśli nie
    if (!fs.existsSync(outputDir)) {
        console.log(`Katalog docelowy ${outputDir} nie istnieje. Tworzę...`);
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Zapisywanie danych do poszczególnych plików JSON
    for (const profession in distributedData) {
        const records = distributedData[profession];
        if (records.length > 0) {
            const fileName = professionToFileMap[profession];
            const filePath = path.join(outputDir, fileName);
            try {
                fs.writeFileSync(filePath, JSON.stringify(records, null, 4), 'utf8');
                console.log(`Zapisano ${records.length} rekordów do pliku ${fileName}.`);
            } catch (error) {
                console.error(`Błąd podczas zapisu pliku ${filePath}:`, error);
            }
        }
    }

    console.log(`\nProces dystrybucji zakończony pomyślnie.`);
    console.log(`Przetworzono łącznie ${processedRecordsCount} rekordów.`);
    if (unassignedRecordsCount > 0) {
        console.log(`Pominięto ${unassignedRecordsCount} rekordów bez przypisanej profesji lub z nieznaną profesją.`);
    }
}

distributeData();