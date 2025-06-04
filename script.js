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
        // "Initializing system...",
        // "Loading user profile...",
        // "Establishing secure connection...",
        "Welcome to my digital space.",
    ];

    const welcomeMessages = document.querySelectorAll('.prompt');
    welcomeMessages.forEach(msg => msg.style.opacity = '0');

    let messageIndex = 0;
    const typingEffect = document.getElementById('typing-effect');
    
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

    typeMessage(messages[0]);

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