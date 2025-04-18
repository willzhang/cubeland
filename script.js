// Smooth scrolling for navigation links
const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

// Animate elements when they come into view
const setupScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .rule-item').forEach(el => {
        observer.observe(el);
    });
};

// Simulate player count updates
const updatePlayerCount = () => {
    const playerCountElement = document.getElementById('player-count');
    // Random player count between 15 and 45 for demo purposes
    const players = Math.floor(Math.random() * 30) + 15;
    playerCountElement.textContent = players;
    
    // Animate the number change
    playerCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        playerCountElement.style.transform = 'scale(1)';
    }, 300);
    
    // Update every 20 seconds
    setTimeout(updatePlayerCount, 20000);
};

// Copy server IP to clipboard with improved feedback
const setupCopyButton = () => {
    const copyButton = document.getElementById('copy-ip');
    const ipElement = document.getElementById('server-ip');
    
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(ipElement.textContent)
            .then(() => {
                copyButton.innerHTML = '✓ Copied!';
                copyButton.style.backgroundColor = '#28a745';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy IP';
                    copyButton.style.backgroundColor = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy IP: ', err);
                copyButton.innerHTML = 'Failed!';
                copyButton.style.backgroundColor = '#dc3545';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy IP';
                    copyButton.style.backgroundColor = '';
                }, 2000);
            });
    });
};

// Simulate server status check with visual feedback
const checkServerStatus = () => {
    const statusElement = document.getElementById('server-status');
    // 95% chance to show online, 5% offline for demo
    const isOnline = Math.random() > 0.05;
    
    if (isOnline) {
        statusElement.textContent = 'Online';
        statusElement.className = 'online';
    } else {
        statusElement.textContent = 'Offline';
        statusElement.className = 'offline';
    }
    
    // Pulse animation when status changes
    statusElement.style.animation = 'pulse 0.5s';
    setTimeout(() => {
        statusElement.style.animation = '';
    }, 500);
    
    // Check every 45 seconds
    setTimeout(checkServerStatus, 45000);
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    setupScrollAnimations();
    updatePlayerCount();
    setupCopyButton();
    checkServerStatus();
});

// Add pulse animation for status changes
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
`;
document.head.appendChild(style);
