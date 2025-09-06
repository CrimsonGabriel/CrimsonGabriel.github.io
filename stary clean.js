const fs = require('fs');
const path = require('path');

const jsonFilePath = './assets/dane/jubiler.json';
const jsonDir = path.dirname(jsonFilePath);

async function cleanData() {
    console.log("--- Rozpoczynam czyszczenie danych w pliku jubiler.json ---");

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

    const recordsToDelete = [];
    const recordsToKeep = [];

    jsonData.forEach(item => {
        // Sprawdź, czy wartość jest dokładnie "TODO: "Nie ma w excel""
        if (item.instance === 'TODO: "Nie ma w excel"') {
            recordsToDelete.push(item);
        } else {
            recordsToKeep.push(item);
        }
    });

    if (recordsToDelete.length === 0) {
        console.log("Brak rekordów do usunięcia. Proces zakończony.");
        return;
    }

    const deletedFiles = [];
    const notFoundFiles = [];

    // Funkcja do bezpiecznego usuwania plików
    const deleteFile = (filePath) => {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                deletedFiles.push(filePath);
            } else {
                notFoundFiles.push(filePath);
            }
        } catch (error) {
            console.error(`Błąd podczas usuwania pliku ${filePath}:`, error);
        }
    };

    // Usuwanie plików dla każdego rekordu
    recordsToDelete.forEach(item => {
        if (item.thumbnail) {
            deleteFile(path.join(jsonDir, '..', '..', item.thumbnail));
        }
        if (item.model) {
            deleteFile(path.join(jsonDir, '..', '..', item.model));
        }
    });

    // Zapisywanie zaktualizowanego pliku JSON
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(recordsToKeep, null, 4), 'utf8');
        console.log(`\n--- Proces zakończony pomyślnie ---`);
        console.log(`Usunięto ${recordsToDelete.length} rekordów z pliku ${jsonFilePath}.`);
        console.log(`Usunięto ${deletedFiles.length} plików.`);
        console.log(`Znaleziono i usunięto następujące pliki:`);
        deletedFiles.forEach(file => console.log(` - ${file}`));
        if (notFoundFiles.length > 0) {
            console.log(`\nNastępujące pliki nie zostały znalezione i pominięto:`);
            notFoundFiles.forEach(file => console.log(` - ${file}`));
        }
    } catch (error) {
        console.error(`\nBłąd podczas zapisu pliku JSON:`, error);
    }
}

cleanData();