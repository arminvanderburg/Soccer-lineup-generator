const exportBtn = document.getElementById('Export');
const importBtn = document.getElementById('Import');
const exportContainer = document.getElementById('export-container');
const importContainer = document.getElementById('import-container');
const closeButtons = document.querySelectorAll('.close-button');

exportBtn.addEventListener('click', () => {
    exportContainer.style.display = 'flex';
    importContainer.style.display = 'none';
});

importBtn.addEventListener('click', () => {
    importContainer.style.display = 'flex';
    exportContainer.style.display = 'none';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        exportContainer.style.display = 'none';
        importContainer.style.display = 'none';
    });
});