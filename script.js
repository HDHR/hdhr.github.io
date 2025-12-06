document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
    document.querySelectorAll('.project-item h3 a').forEach(element => {
        let originalText = element.textContent;
        let iteration = 0;
        
        element.addEventListener('mouseover', (event) => {
            let interval = setInterval(() => {
                event.target.innerText = originalText.split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");
                
                if(iteration >= originalText.length) {
                    clearInterval(interval);
                }
                iteration += 1/3;
            }, 30);
        });

        element.addEventListener('mouseout', () => {
            element.innerText = originalText;
        });
    });

    const messages = [
        "re/Starting modules...",
    ];

    const bootOverlay = document.getElementById('boot-overlay');
    const bootLine = document.getElementById('boot-line');
    const bodyEl = document.body;
    const BOOT_INTERVAL_MS = 5 * 60 * 1000;
    const lastBoot = Number(localStorage.getItem('lastBoot')) || 0;
    const shouldShowBoot = !lastBoot || (Date.now() - lastBoot) > BOOT_INTERVAL_MS;
    const bootMessages = [
        "Bootloader vØ.91",
        "Initializing system...",
        "User. A.I.D_vØ initialized.",
        "Loading modules... 「接続中」",
        "Module initialized."
    ];

    const welcomeMessages = document.querySelectorAll('.prompt');
    welcomeMessages.forEach(msg => msg.style.opacity = '0');

    let messageIndex = 0;
    const typingEffect = document.getElementById('typing-effect');

    function typeBootLine(line, done, index = 0) {
        if (!bootLine) {
            done();
            return;
        }
        if (index < line.length) {
            bootLine.textContent = line.slice(0, index + 1);
            setTimeout(() => typeBootLine(line, done, index + 1), 22);
        } else {
            setTimeout(done, 280);
        }
    }

    function runBootSequence(step = 0) {
        if (!bootOverlay) {
            startMainSequence();
            return;
        }
        if (!shouldShowBoot) {
            bodyEl.classList.add('boot-complete');
            bootOverlay.style.display = 'none';
            startMainSequence();
            return;
        }
        if (step < bootMessages.length) {
            typeBootLine(bootMessages[step], () => runBootSequence(step + 1));
        } else {
            finishBoot();
        }
    }

    function finishBoot() {
        bodyEl.classList.add('boot-complete');
        localStorage.setItem('lastBoot', Date.now().toString());
        setTimeout(() => {
            if (bootOverlay) {
                bootOverlay.style.display = 'none';
            }
            startMainSequence();
        }, 900);
    }
    
    function typeMessage(message, index = 0) {
        if (index < message.length) {
            typingEffect.textContent += message.charAt(index);
            setTimeout(() => typeMessage(message, index + 1), 50);
        } else {
            setTimeout(() => {
                if (messageIndex < messages.length - 1) {
                    messageIndex++;
                    typingEffect.textContent = '';
                    typeMessage(messages[messageIndex]);
                } else {
                    welcomeMessages.forEach((msg, i) => {
                        setTimeout(() => {
                            msg.style.transition = 'opacity 0.5s';
                            msg.style.opacity = '1';
                        }, i * 1000);
                    });
                }
            }, 1000);
        }
    }

    function startMainSequence() {
        typingEffect.textContent = '';
        typeMessage(messages[0]);
    }

    runBootSequence();

    const glitchTexts = document.querySelectorAll('.glitch');
    glitchTexts.forEach(text => {
        setInterval(() => {
            text.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
            setTimeout(() => {
                text.style.transform = 'translate(0, 0)';
            }, 50);
        }, 3000);
    });
});
