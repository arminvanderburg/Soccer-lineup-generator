const exportBtn = document.getElementById('Export');
const exportContainer = document.getElementById('export-container');
const shareUrlInput = document.getElementById('share-url');
const closeButtons = document.querySelectorAll('.close-button');
const copyButton = document.getElementById('copy-btn');
const allowEditCheckbox = document.getElementById('allow-edit-checkbox');

function updateShareUrl() {
    const basisUrl = window.location.href.split('?')[0];
    const allowEdit = allowEditCheckbox.checked;
    let opstellingData = [];

    document.querySelectorAll('#field .player').forEach(player => {
        const x = parseFloat(player.style.left);
        const y = parseFloat(player.style.top);
        opstellingData.push(`${player.id}:${x.toFixed(1)}:${y.toFixed(1)}`);
    });

    if (opstellingData.length > 0) {
        shareUrlInput.value = `${basisUrl}?edit=${allowEdit}&lineup=${opstellingData.join(',')}`;
    } else {
        shareUrlInput.value = `${basisUrl}?edit=${allowEdit}`;
    }
}

allowEditCheckbox.addEventListener('change', () => {
    updateShareUrl();
});

exportBtn.addEventListener('click', () => {
    updateShareUrl();
    exportContainer.style.display = 'flex';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        exportContainer.style.display = 'none';
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const canEdit = urlParams.get('edit') !== 'false';
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

    if (!canEdit) {
        document.querySelectorAll('.player').forEach(player => {
            player.setAttribute('draggable', 'false');
            player.style.pointerEvents = 'none';
        });
        const resetBtn = document.getElementById('ResetBtn');
        if (resetBtn) resetBtn.style.display = 'none';
        if (exportBtn) exportBtn.style.display = 'none';
    }

    if (!canEdit) {
    document.querySelectorAll('.player').forEach(player => {
        player.setAttribute('draggable', 'false');
        player.style.pointerEvents = 'none';
    });
    const resetBtn = document.getElementById('ResetBtn');
    if (resetBtn) resetBtn.style.display = 'none';
    if (exportBtn) exportBtn.style.display = 'none';
    
    const viewIndicator = document.getElementById('view-mode-indicator');
    if (viewIndicator) viewIndicator.style.display = 'inline-block';
}
});

copyButton.addEventListener('click', () => {
    shareUrlInput.select();
    shareUrlInput.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
    } catch (err) {
        navigator.clipboard.writeText(shareUrlInput.value).catch(e => {});
    }
});