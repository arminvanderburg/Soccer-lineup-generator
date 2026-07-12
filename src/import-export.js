const exportBtn = document.getElementById('Export');
const exportContainer = document.getElementById('export-container');
const closeButtons = document.querySelectorAll('.close-button');

exportBtn.addEventListener('click', () => {
    exportContainer.style.display = 'flex';
    importContainer.style.display = 'none';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        exportContainer.style.display = 'none';
        importContainer.style.display = 'none';
    });
});