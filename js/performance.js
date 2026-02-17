/**
 * Performance Simulator Logic
 * Refinado para el laboratorio de prueba
 */

document.addEventListener('DOMContentLoaded', () => {
    // Master Outputs
    const outLayers = [
        document.getElementById('outLayer1'),
        document.getElementById('outLayer2'),
        document.getElementById('outLayer3')
    ];
    const noSignal = document.getElementById('noSignal');

    // Controls
    const layerRows = document.querySelectorAll('.layer-row');
    const bpmDisplay = document.getElementById('bpmDisplay');
    const tapBtn = document.getElementById('tapBtn');
    const bpmIndicator = document.getElementById('bpmIndicator');

    let bpm = 120.0;
    let lastTap = 0;
    let tapCounts = [];

    // Initialize Layers
    layerRows.forEach((row, index) => {
        const layerNum = parseInt(row.dataset.layer); // 1, 2, 3
        const fader = row.querySelector('.opacity-fader');
        const clips = row.querySelectorAll('.clip-cell');
        const outLayer = outLayers[layerNum - 1];
        let lastActiveClip = null; // Track last played clip for Resume/Toggle

        // Fader Logic
        fader.addEventListener('input', () => {
            const opacity = fader.value / 100;
            outLayer.style.opacity = opacity;
            checkSignal();
        });

        // Clear Layer Logic (The 'X' button) - Modified for Toggle/Resume
        const clearBtn = row.querySelector('.clear-layer');
        clearBtn.addEventListener('click', () => {
            const isLayerActive = outLayer.style.display === 'block';

            if (isLayerActive) {
                // STOP: Si está sonando, apagar todo
                clips.forEach(c => c.classList.remove('active'));
                outLayer.style.display = 'none';
                outLayer.pause();
                outLayer.src = '';
                checkSignal();
            } else {
                // RESUME: Si está apagado y hay memoria, volver a encender
                if (lastActiveClip) {
                    // Usamos forcePlay=true para asegurar que arranque
                    if (lastActiveClip.playClip) {
                        lastActiveClip.playClip(true);
                    } else {
                        // Fallback por si acaso
                        lastActiveClip.click();
                    }
                }
            }
        });

        // Blend Mode Logic (Buttons)
        const blendBtns = row.querySelectorAll('.blend-btn');
        blendBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Actualizar estilo visual
                blendBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Aplicar modo de fusión
                const mode = btn.dataset.mode;
                outLayer.style.mixBlendMode = mode;
            });
        });

        // 2. Clip Triggering
        clips.forEach(clip => {
            const video = clip.querySelector('video');

            // Live Thumbnail: Intentar reproducir automáticamente
            video.play().catch(() => {
                document.addEventListener('touchstart', () => video.play(), { once: true });
                document.addEventListener('click', () => video.play(), { once: true });
            });

            // Attach custom method for external control (Column trigger)
            clip.playClip = (forcePlay = false) => {
                const isActive = clip.classList.contains('active');

                // Piano Mode / Toggle Logic
                // If forcePlay is true, we ALWAYS play (treat as fresh trigger)
                // If forcePlay is false, we toggle.
                if (isActive && !forcePlay) {
                    // Stop
                    clip.classList.remove('active');
                    outLayer.style.display = 'none';
                    outLayer.pause();
                    outLayer.src = '';
                    checkSignal();
                } else {
                    // Play
                    clips.forEach(c => c.classList.remove('active'));
                    clip.classList.add('active');

                    // Store as last active for Resume functionality
                    lastActiveClip = clip;

                    // If src is different or we are restarting, reload
                    outLayer.src = video.getAttribute('src');
                    outLayer.style.display = 'block';
                    outLayer.play().catch(e => console.log("Navegador bloqueó video, esperando interacción."));

                    checkSignal();
                }
            };

            clip.addEventListener('click', () => {
                clip.playClip(false); // Default click is Toggle
            });
        });

        // Set initial opacity from fader
        outLayer.style.opacity = fader.value / 100;
    });

    function checkSignal() {
        const anyActive = Array.from(outLayers).some(l => l.style.display === 'block' && parseFloat(l.style.opacity) > 0);
        noSignal.style.display = anyActive ? 'none' : 'block';
    }

    // 3. Tap Tempo
    tapBtn.addEventListener('click', () => {
        const now = Date.now();
        if (lastTap > 0) {
            const diff = now - lastTap;
            if (diff > 2000) {
                tapCounts = [];
            } else {
                tapCounts.push(60000 / diff);
                if (tapCounts.length > 4) tapCounts.shift();
                const avgBpm = tapCounts.reduce((a, b) => a + b) / tapCounts.length;
                bpm = parseFloat(avgBpm.toFixed(1));
                bpmDisplay.textContent = bpm.toFixed(1);
                resetBpmInterval();
            }
        }
        lastTap = now;
        bpmIndicator.classList.add('beat');
        setTimeout(() => bpmIndicator.classList.remove('beat'), 100);
    });

    let bpmInterval;
    function resetBpmInterval() {
        if (bpmInterval) clearInterval(bpmInterval);
        const ms = 60000 / bpm;
        bpmInterval = setInterval(() => {
            bpmIndicator.classList.add('beat');
            setTimeout(() => bpmIndicator.classList.remove('beat'), 100);
        }, ms);
    }

    resetBpmInterval();
    checkSignal();

    // 4. Column Triggers (Master Column Launch)
    const columnLabels = document.querySelectorAll('.column-label');
    columnLabels.forEach(label => {
        label.addEventListener('click', () => {
            // Extraer el número de la columna del texto
            const colMatch = label.textContent.match(/\d+/);
            if (!colMatch) return;
            const colNum = colMatch[0];

            // Feedback visual de la cabecera activa
            columnLabels.forEach(l => l.classList.remove('active'));
            label.classList.add('active');

            // Disparar clips de esta columna en todas las filas
            layerRows.forEach(row => {
                const clip = row.querySelector(`.clip-cell[data-clip="${colNum}"]`);
                if (clip) {
                    // Usar el método personalizado si existe, forzando Play
                    if (clip.playClip) {
                        clip.playClip(true);
                    } else {
                        clip.click();
                    }
                }
            });
        });
    });

    // 5. Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Prevent default spacebar scrolling
        if (e.code === 'Space') {
            e.preventDefault();
            tapBtn.classList.add('keyboard-active');
            tapBtn.click();
            return;
        }

        const key = e.key.toLowerCase();

        // Column Triggers: 1, 2
        if (['1', '2'].includes(key)) {
            const index = parseInt(key) - 1;
            const columnLabels = document.querySelectorAll('.column-label');
            if (columnLabels[index]) columnLabels[index].click();
        }

        // Layer Clear: Q (L3), W (L2), E (L1) - Top to Bottom logic
        if (key === 'q' && layerRows[0]) layerRows[0].querySelector('.clear-layer').click();
        if (key === 'w' && layerRows[1]) layerRows[1].querySelector('.clear-layer').click();
        if (key === 'e' && layerRows[2]) layerRows[2].querySelector('.clear-layer').click();

        // Master Clear: Escape
        if (key === 'escape') {
            document.querySelectorAll('.clear-layer').forEach(btn => btn.click());
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            tapBtn.classList.remove('keyboard-active');
        }
    });

    // Mirror for mouse interaction feedback
    tapBtn.addEventListener('mousedown', () => tapBtn.classList.add('keyboard-active'));
    tapBtn.addEventListener('mouseup', () => tapBtn.classList.remove('keyboard-active'));
    tapBtn.addEventListener('mouseleave', () => tapBtn.classList.remove('keyboard-active'));

    // Support touch
    tapBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        tapBtn.classList.add('keyboard-active');
        tapBtn.click();
    });
    tapBtn.addEventListener('touchend', () => tapBtn.classList.remove('keyboard-active'));

    // 6. Recording Functionality
    setupRecording();

    // 7. Check for File Protocol (Student Warning)
    if (window.location.protocol === 'file:') {
        const monitorSection = document.querySelector('.monitor-section');
        const warning = document.createElement('div');
        warning.style.cssText = `
            background: rgba(255, 68, 68, 0.1);
            border: 1px solid #ff4444;
            color: #ff4444;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        warning.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <div>
                <strong>Modo Archivo Local Detectado:</strong><br>
                La grabación de video estará desactivada por seguridad del navegador.<br>
                <span style="opacity:0.8; font-size:0.75rem;">Para grabar, abre este archivo con "Live Server" o súbelo a internet.</span>
            </div>
        `;
        // Insert before the monitor label
        monitorSection.insertBefore(warning, monitorSection.querySelector('.monitor-label'));

        // Disable Record Button visually
        const recBtn = document.getElementById('recBtn');
        if (recBtn) {
            recBtn.style.opacity = '0.5';
            recBtn.style.cursor = 'not-allowed';
            recBtn.title = "Grabación no disponible en modo local (file://)";
        }
    }
});

function setupRecording() {
    const recBtn = document.getElementById('recBtn');
    const recDot = document.getElementById('recDot');
    const recText = document.getElementById('recText');
    const downloadLink = document.getElementById('downloadLink');

    // Canvas de composición (Off-screen)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false }); // Fondo negro opaco

    // Configuración base (HD) - se ajustará al primer video si es posible
    canvas.width = 1280;
    canvas.height = 720;

    let mediaRecorder;
    let recordedChunks = [];
    let isRecording = false;
    let animationFrameId;

    // Referencias a los elementos de video y sus estados
    const outLayers = [
        document.getElementById('outLayer1'),
        document.getElementById('outLayer2'),
        document.getElementById('outLayer3')
    ];

    // Mapeo de CSS mix-blend-mode a Canvas globalCompositeOperation
    const blendMap = {
        'normal': 'source-over',
        'screen': 'screen',
        'multiply': 'multiply',
        'difference': 'difference',
        'overlay': 'overlay',
        'lighten': 'lighten',
        'darken': 'darken',
        'add': 'lighter' // Aproximación
    };

    function compositeFrame() {
        if (!isRecording) return;

        // 1. Limpiar canvas (Fondo negro)
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Dibujar cada capa
        outLayers.forEach(video => {
            // Solo dibujar si el video está visible y tiene opacidad
            const style = window.getComputedStyle(video);
            const display = video.style.display || style.display;
            const opacity = parseFloat(video.style.opacity || style.opacity);

            if (display !== 'none' && opacity > 0 && video.readyState >= 2) {
                // Sincronizar tamaño del canvas con el primer video activo si es necesario
                if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    // Re-fill black after resize
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.globalAlpha = opacity;

                // Obtener modo de fusión actual del elemento
                const cssBlend = video.style.mixBlendMode || 'normal';
                ctx.globalCompositeOperation = blendMap[cssBlend] || 'source-over';

                try {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                } catch (e) {
                    // Ignorar
                }
            }
        });

        // Loop
        animationFrameId = requestAnimationFrame(compositeFrame);
    }

    recBtn.addEventListener('click', () => {
        if (!isRecording) {
            // === START RECORDING ===
            try {
                // 1. Iniciar Loop de Dibujo
                isRecording = true;
                compositeFrame();

                // 2. Capturar Stream del Canvas (30 FPS)
                const stream = canvas.captureStream(30);

                // 3. Configurar Recorder
                const options = MediaRecorder.isTypeSupported('video/webm; codecs=vp9')
                    ? { mimeType: 'video/webm; codecs=vp9' }
                    : { mimeType: 'video/webm' };

                mediaRecorder = new MediaRecorder(stream, options);

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) recordedChunks.push(e.data);
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(recordedChunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);

                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                    downloadLink.href = url;
                    downloadLink.download = `IBV-Set-${timestamp}.webm`;
                    downloadLink.style.display = 'inline-block';

                    resetRecUI();
                    cancelAnimationFrame(animationFrameId);
                };

                mediaRecorder.start();
                updateRecUI(true);

                recordedChunks = [];
                downloadLink.style.display = 'none';

            } catch (err) {
                console.error("Error al iniciar grabación:", err);
                if (err.name === 'SecurityError') {
                    alert('ERROR: El navegador ha bloqueado la grabación por seguridad.\n\nCAUSA: Estás abriendo el archivo directamente (file://).\nSOLUCIÓN: Debes usar un Servidor Local (ej. Live Server en VSCode o python) para que funcione esta función avanzada.');
                } else {
                    alert('Error al iniciar grabación: ' + err.message);
                }
                isRecording = false;
            }
        } else {
            // === STOP RECORDING ===
            stopRecording();
        }
    });

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        isRecording = false;
    }

    function updateRecUI(recording) {
        if (recording) {
            recBtn.style.borderColor = '#ff4444';
            recText.textContent = 'DETENER';
            recText.style.color = '#ff4444';
            recDot.style.background = '#ff4444';
            recDot.classList.add('blink');
        }
    }

    function resetRecUI() {
        recBtn.style.borderColor = '#444';
        recText.textContent = 'REC';
        recText.style.color = '#ccc';
        recDot.style.background = '#999';
        recDot.classList.remove('blink');
    }
}
