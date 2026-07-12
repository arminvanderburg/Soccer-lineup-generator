const exportBtn = document.getElementById('Export');
const exportContainer = document.getElementById('export-container');
const shareUrlInput = document.getElementById('share-url');
const closeButtons = document.querySelectorAll('.close-button');
const copyButton = document.querySelectorAll('Copy')

exportBtn.addEventListener('click', () => {
    const basisUrl = window.location.href.split('?')[0];
    let opstellingData = [];

    document.querySelectorAll('#field .player').forEach(player => {
        const x = parseFloat(player.style.left);
        const y = parseFloat(player.style.top);
        opstellingData.push(`${player.id}:${x.toFixed(1)}:${y.toFixed(1)}`);
    });

    if (opstellingData.length > 0) {
        shareUrlInput.value = `${basisUrl}?lineup=${opstellingData.join(',')}`;
    } else {
        shareUrlInput.value = basisUrl;
    }

    exportContainer.style.display = 'flex';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        exportContainer.style.display = 'none';
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lineupData = urlParams.get('lineup');

    if (lineupData) {
        const combinaties = lineupData.split(',');

        combinaties.forEach(combinatie => {
            if (!combinatie) return;
            const [spelerId, x, y] = combinatie.split(':');
            const player = document.getElementById(spelerId);

            if (player) {
                placePlayer(player, parseFloat(x), parseFloat(y));
            }
        });
    }
});

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(shareUrlInput.value);
})