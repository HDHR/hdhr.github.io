document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Digital Matrix Rain Canvas Animation (Background Vibe)
    // -------------------------------------------------------------
    const canvas = document.getElementById('rain-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const chars = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEFØ";
        const fontSize = 14;
        let columns = Math.floor(width / fontSize);
        let drops = Array(columns).fill(1);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            drops = Array(columns).fill(1);
        });

        function drawRain() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                const rand = Math.random();
                if (rand > 0.95) {
                    ctx.fillStyle = '#e06c75';
                } else if (rand > 0.82) {
                    ctx.fillStyle = '#9cdef2';
                } else {
                    ctx.fillStyle = '#1e5462';
                }

                ctx.fillText(text, x, y);

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawRain, 45);
    }

    // -------------------------------------------------------------
    // 2. Interactive CLI Engine
    // -------------------------------------------------------------
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');

    if (cliInput && cliOutput) {
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const inputVal = cliInput.value.trim();
                if (!inputVal) return;

                const cmd = inputVal.toLowerCase();
                cliInput.value = '';

                cliOutput.innerHTML = '';

                if (cmd === 'clear') {
                    return;
                }

                const echoEl = document.createElement('div');
                echoEl.className = 'cli-log-line cli-command-echo';
                echoEl.innerHTML = `<span class="prompt-user">hdhr@bruh</span>:<span class="prompt-path">~</span>$&nbsp;${escapeHtml(inputVal)}`;
                cliOutput.appendChild(echoEl);

                const responseEl = document.createElement('div');
                responseEl.className = 'cli-log-line';

                switch (cmd) {
                    case 'help':
                        responseEl.innerHTML = `Available commands: <br>
  - <span style="color: var(--yellow);">whoami</span> : Display user profile info<br>
  - <span style="color: var(--yellow);">skills</span> : View technical stack<br>
  - <span style="color: var(--yellow);">neofetch</span> : Show system information<br>
  - <span style="color: var(--yellow);">projects</span> : Jump to project directory<br>
  - <span style="color: var(--yellow);">contact</span> : Jump to comms link<br>
  - <span style="color: var(--yellow);">clear</span> : Clear terminal output`;
                        break;

                    case 'whoami':
                        responseEl.innerHTML = `<span style="color: var(--green);">Handle:</span> HDHR / AyyIsDedzzz | <span style="color: var(--blue);">Location:</span> Indonesia 「インドネシア」`;
                        break;

                    case 'skills':
                        responseEl.innerHTML = `<span style="color: var(--green);">Stack:</span> Python, JavaScript, Docker, HTML5/CSS3, Linux & Self-Hosted, Git, REST APIs`;
                        break;

                    case 'neofetch':
                        responseEl.className = 'cli-neofetch';
                        responseEl.textContent = 
`  .-.      hdhr@bruh
 (o.o)     ---------
  |=|      OS: HDHR System x86_64
  "="      Host: A.I.D_vØ [Project: ガブッ]
           Kernel: 6.8.0-custom
           Uptime: 24/7 Online
           Shell: bruh-sh v1.0
           Theme: AMOLED Dark Terminal`;
                        break;

                    case 'projects':
                        responseEl.innerHTML = `Navigating to projects...`;
                        const projSec = document.getElementById('projects');
                        if (projSec) projSec.scrollIntoView({ behavior: 'smooth' });
                        break;

                    case 'contact':
                        responseEl.innerHTML = `Navigating to contact info...`;
                        const contactSec = document.getElementById('contact');
                        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                        break;

                    case 'sudo':
                    case 'sudo request_access':
                        responseEl.className = 'cli-log-line cli-error';
                        responseEl.innerHTML = `[ ERROR ] Access level CONFIDENTIAL. Elevated privileges required.`;
                        break;

                    default:
                        responseEl.className = 'cli-log-line cli-error';
                        responseEl.innerHTML = `command not found: ${escapeHtml(cmd)}. Type '<span style="color: var(--yellow);">help</span>' for available commands.`;
                        break;
                }

                cliOutput.appendChild(responseEl);
                cliOutput.scrollTop = cliOutput.scrollHeight;
            }
        });
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, function(m) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
        });
    }

    // -------------------------------------------------------------
    // 3. Scrollspy Active Nav Tab Highlighting
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('main section[id]');
    const navTabs = document.querySelectorAll('nav .nav-tab');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 110;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('href') === `#${currentSectionId}`) {
                tab.classList.add('active');
            }
        });
    });

    // -------------------------------------------------------------
    // 4. Cookie & LocalStorage Memory for Bootloader State
    // -------------------------------------------------------------
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function setCookie(name, value, seconds) {
        const d = new Date();
        d.setTime(d.getTime() + (seconds * 1000));
        document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
    }

    const BOOT_COOKIE_KEY = 'lastBootCookie';
    const BOOT_LOCAL_KEY = 'lastBoot';
    const BOOT_EXPIRE_SECONDS = 300; // 5 minutes

    const hasBootCookie = getCookie(BOOT_COOKIE_KEY) === 'true';
    const lastBootTime = Number(localStorage.getItem(BOOT_LOCAL_KEY)) || 0;
    const isBootCached = hasBootCookie || (Date.now() - lastBootTime < BOOT_EXPIRE_SECONDS * 1000);

    const bootOverlay = document.getElementById('boot-overlay');
    const bootLine = document.getElementById('boot-line');
    const bodyEl = document.body;

    // Dynamic Year & Scramble Effects
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*";
    document.querySelectorAll('.project-item h3 a').forEach(element => {
        let originalText = element.textContent;
        let iteration = 0;
        let interval = null;

        element.addEventListener('mouseover', (event) => {
            clearInterval(interval);
            iteration = 0;
            interval = setInterval(() => {
                event.target.innerText = originalText.split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }
                iteration += 1 / 3;
            }, 25);
        });

        element.addEventListener('mouseout', () => {
            clearInterval(interval);
            element.innerText = originalText;
        });
    });

    const commandOutputs = document.querySelectorAll('[data-command-output]');
    commandOutputs.forEach(output => {
        Array.from(output.children).forEach((child, index) => {
            child.style.setProperty('--output-index', index);
        });
    });

    function updateOutputHeights() {
        commandOutputs.forEach(output => {
            output.style.setProperty('--output-height', `${output.scrollHeight}px`);
        });
    }
    updateOutputHeights();
    window.addEventListener('resize', updateOutputHeights);

    // -------------------------------------------------------------
    // 5. Sequential Terminal Execution & Output Reveal Engine
    // -------------------------------------------------------------
    const bootMessages = [
        "Bootloader vØ.91",
        "Initializing system...",
        "User. A.I.D_vØ initialized.",
        "Loading modules... 「接続中」",
        "Module initialized."
    ];

    function typeBootLine(line, done, index = 0) {
        if (!bootLine) {
            done();
            return;
        }
        if (index < line.length) {
            bootLine.textContent = line.slice(0, index + 1);
            setTimeout(() => typeBootLine(line, done, index + 1), 18);
        } else {
            setTimeout(done, 200);
        }
    }

    function runBootSequence(step = 0) {
        if (step < bootMessages.length) {
            typeBootLine(bootMessages[step], () => runBootSequence(step + 1));
        } else {
            finishBoot();
        }
    }

    function finishBoot() {
        bodyEl.classList.add('boot-complete');
        setCookie(BOOT_COOKIE_KEY, 'true', BOOT_EXPIRE_SECONDS);
        localStorage.setItem(BOOT_LOCAL_KEY, Date.now().toString());

        setTimeout(() => {
            if (bootOverlay) {
                bootOverlay.style.display = 'none';
            }
            startSequentialTerminal(false);
        }, 500);
    }

    function revealOutput(outputEl) {
        if (!outputEl) return;
        updateOutputHeights();
        outputEl.classList.remove('is-expanded');
        outputEl.classList.add('is-visible');
        setTimeout(() => {
            outputEl.classList.add('is-expanded');
        }, 500);
    }

    function typeCommandText(targetEl, text, done, index = 0) {
        if (index < text.length) {
            targetEl.textContent += text.charAt(index);
            setTimeout(() => typeCommandText(targetEl, text, done, index + 1), 40);
        } else {
            targetEl.classList.add('done-typing');
            setTimeout(done, 300);
        }
    }

    function startSequentialTerminal(instant = false) {
        if (instant) {
            document.querySelectorAll('.prompt').forEach(p => p.classList.add('is-visible'));
            document.querySelectorAll('.typed-cmd').forEach(c => {
                c.textContent = c.getAttribute('data-cmd');
                c.classList.add('done-typing');
            });
            commandOutputs.forEach(output => {
                revealOutput(output);
            });
            return;
        }

        runCommandSection('hero', () => {
            runCommandSection('about', () => {
                runCommandSection('projects', () => {
                    runCommandSection('cv', () => {
                        runCommandSection('contact', null);
                    });
                });
            });
        });
    }

    function runCommandSection(sectionId, nextSection) {
        const promptEl = document.getElementById(`prompt-${sectionId}`);
        const outputEl = document.getElementById(`output-${sectionId}`);
        if (!promptEl) {
            if (nextSection) nextSection();
            return;
        }

        promptEl.classList.add('is-visible');
        const typedCmdEl = promptEl.querySelector('.typed-cmd');
        const cmdText = typedCmdEl ? typedCmdEl.getAttribute('data-cmd') : '';

        if (typedCmdEl && cmdText) {
            typeCommandText(typedCmdEl, cmdText, () => {
                revealOutput(outputEl);
                if (nextSection) {
                    setTimeout(nextSection, 400);
                }
            });
        } else {
            revealOutput(outputEl);
            if (nextSection) {
                setTimeout(nextSection, 400);
            }
        }
    }

    if (isBootCached && bootOverlay) {
        bodyEl.classList.add('boot-complete');
        bootOverlay.style.display = 'none';
        startSequentialTerminal(true);
    } else {
        runBootSequence();
    }

    const glitchTexts = document.querySelectorAll('.glitch');
    glitchTexts.forEach(text => {
        setInterval(() => {
            text.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
            setTimeout(() => {
                text.style.transform = 'translate(0, 0)';
            }, 50);
        }, 3500);
    });
});
