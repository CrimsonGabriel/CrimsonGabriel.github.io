const fs = require('fs');
const path = require('path');

const jsonFilePath = './assets/dane/jubiler.json';
const jsonDir = path.dirname(jsonFilePath); // Pobiera katalog pliku JSON
const professionToClean = 'TECZOWY_RAFAL';

async function cleanJubilerData() {
    console.log(`--- Rozpoczynam czyszczenie danych dla profesji: ${professionToClean} ---`);
    
    if (!fs.existsSync(jsonFilePath)) {
        console.error(`Błąd: Plik JSON nie znaleziono pod ścieżką: ${jsonFilePath}`);
        return;
    }

    let jsonData;
    try {
        jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    } catch (error) {
        console.error(`Błąd podczas odczytu lub parsowania pliku JSON:`, error);
        return;
    }
    
    const recordsToDelete = jsonData.filter(item => item.profession === professionToClean);
    const recordsToKeep = jsonData.filter(item => item.profession !== professionToClean);

    if (recordsToDelete.length === 0) {
        console.log(`Brak rekordów do usunięcia z profesją: ${professionToClean}. Proces zakończony.`);
        return;
    }

    console.log(`Znaleziono ${recordsToDelete.length} rekordów do usunięcia.`);

    const deletedFiles = [];
    const notFoundFiles = [];

    // Funkcja do bezpiecznego usuwania plików
    const deleteFile = (filePath) => {
        try {
            // Zbudowanie pełnej, bezwzględnej ścieżki
            const absolutePath = path.join(jsonDir, '..', '..', filePath);
            
            if (fs.existsSync(absolutePath)) {
                fs.unlinkSync(absolutePath);
                deletedFiles.push(absolutePath);
                console.log(`Usunięto plik: ${absolutePath}`);
            } else {
                notFoundFiles.push(absolutePath);
                console.log(`Pominięto plik (nie znaleziono): ${absolutePath}`);
            }
        } catch (error) {
            console.error(`Błąd podczas usuwania pliku ${filePath}:`, error);
        }
    };

    // Krok 1: Usunięcie plików z dysku
    for (const record of recordsToDelete) {
        if (record.thumbnail) {
            deleteFile(record.thumbnail);
        }
        if (record.model) {
            deleteFile(record.model);
        }
    }

    // Krok 2: Usunięcie rekordów z pliku JSON
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(recordsToKeep, null, 4), 'utf8');
        console.log(`\nPlik ${jsonFilePath} został zaktualizowany.`);
        console.log(`Usunięto ${recordsToDelete.length} rekordów.`);
        console.log(`Zapisano ${recordsToKeep.length} rekordów w pliku.`);
    } catch (error) {
        console.error(`Błąd podczas zapisu pliku JSON ${jsonFilePath}:`, error);
    }
    
    console.log("--- Proces czyszczenia zakończony pomyślnie ---");
}

cleanJubilerData();