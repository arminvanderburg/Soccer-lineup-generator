document.querySelectorAll('.player').forEach(player => {
    player.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
    
    player.addEventListener('touchstart', touchStart, { passive: false });
    player.addEventListener('touchmove', touchMove, { passive: false });
    player.addEventListener('touchend', touchEnd);
    
    player.addEventListener('dblclick', (e) => resetPlayer(e.target));
});

const field = document.getElementById('field');
const sidebar = document.getElementById('players');

field.addEventListener('dragover', (e) => e.preventDefault());
sidebar.addEventListener('dragover', (e) => e.preventDefault());

field.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const player = document.getElementById(id);
    if (!player) return;

    const rect = field.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    placePlayer(player, x, y);
});

sidebar.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const player = document.getElementById(id);
    if (player) resetPlayer(player);
});

document.addEventListener('dragover', (e) => e.preventDefault());
document.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const player = document.getElementById(id);
    if (player && !e.target.closest('#field') && !e.target.closest('#players')) {
        resetPlayer(player);
    }
});

let touchStartX = 0;
let touchStartY = 0;

function touchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function touchMove(e) {
    e.preventDefault();
    const player = e.target;
    const touch = e.touches[0];
    
    player.style.position = 'fixed';
    player.style.left = `${touch.clientX - player.offsetWidth / 2}px`;
    player.style.top = `${touch.clientY - player.offsetHeight / 2}px`;
    player.style.zIndex = '1000';
}

function touchEnd(e) {
    const player = e.target;
    player.style.zIndex = '1';
    
    const touch = e.changedTouches[0];
    const fieldRect = field.getBoundingClientRect();
    
    if (
        touch.clientX >= fieldRect.left &&
        touch.clientX <= fieldRect.right &&
        touch.clientY >= fieldRect.top &&
        touch.clientY <= fieldRect.bottom
    ) {
        const x = ((touch.clientX - fieldRect.left) / fieldRect.width) * 100;
        const y = ((touch.clientY - fieldRect.top) / fieldRect.height) * 100;
        placePlayer(player, x, y);
    } else {
        resetPlayer(player);
    }
}

function placePlayer(player, x, y) {
    field.appendChild(player);
    player.style.position = 'absolute';
    player.style.left = `${x}%`;
    player.style.top = `${y}%`;
    player.style.transform = 'translate(-50%, -50%)';
}

function resetPlayer(player) {
    sidebar.appendChild(player);
    player.style.position = 'static';
    player.style.transform = 'none';
}