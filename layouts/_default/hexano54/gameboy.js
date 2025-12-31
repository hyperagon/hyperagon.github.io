class GameBoy extends Instrument {
    constructor() {
        super('Game Boy');
    }
    
    init() {
        this.createGameBoyControls();
        // Instead of adding a class, set the background color directly.
        document.body.style.backgroundColor = '#9bbc0f';
    }
    
    createGameBoyControls() {
        /* Create Game Boy specific controls if needed */
        document.querySelector('.wave-selector').style.display = 'none';
        var controlBar = document.querySelector('.control-bar');
        
        /* Add Game Boy specific controls */
        var gameboyControls = document.createElement('div');
        gameboyControls.id = 'gameboy-controls';
        gameboyControls.style.display = 'inline-flex';
        gameboyControls.style.marginLeft = '10px';
        
        /* Wave Channel control */
        var waveGroup = document.createElement('div');
        waveGroup.className = 'control-group';
        waveGroup.style.marginRight = '10px';
        
        var waveLabel = document.createElement('label');
        waveLabel.textContent = 'Wave';
        waveLabel.style.marginBottom = '5px';
        waveLabel.style.fontSize = '0.8em';
        
        var waveSelect = document.createElement('select');
        waveSelect.id = 'gameboy-wave';
        waveSelect.style.width = '120px';
        
        var squareOption = document.createElement('option');
        squareOption.value = 'square';
        squareOption.textContent = 'Pulse (50%)';
        waveSelect.appendChild(squareOption);
        
        var sawtoothOption = document.createElement('option');
        sawtoothOption.value = 'sawtooth';
        sawtoothOption.textContent = 'Pulse (25%)';
        waveSelect.appendChild(sawtoothOption);
        
        var triangleOption = document.createElement('option');
        triangleOption.value = 'triangle';
        triangleOption.textContent = 'Triangle';
        waveSelect.appendChild(triangleOption);
        
        waveGroup.appendChild(waveLabel);
        waveGroup.appendChild(waveSelect);
        
        /* Noise Channel control */
        var noiseGroup = document.createElement('div');
        noiseGroup.className = 'control-group';
        noiseGroup.style.marginRight = '10px';
        
        var noiseLabel = document.createElement('label');
        noiseLabel.textContent = 'Noise';
        noiseLabel.style.marginBottom = '5px';
        noiseLabel.style.fontSize = '0.8em';
        
        var noiseSelect = document.createElement('select');
        noiseSelect.id = 'gameboy-noise';
        noiseSelect.style.width = '120px';
        
        var whiteOption = document.createElement('option');
        whiteOption.value = 'white';
        whiteOption.textContent = 'White Noise';
        noiseSelect.appendChild(whiteOption);
        
        var pinkOption = document.createElement('option');
        pinkOption.value = 'pink';
        pinkOption.textContent = 'Pink Noise';
        noiseSelect.appendChild(pinkOption);
        
        noiseGroup.appendChild(noiseLabel);
        noiseGroup.appendChild(noiseSelect);
        
        /* Attack control */
        var attackGroup = document.createElement('div');
        attackGroup.className = 'control-group';
        attackGroup.style.marginRight = '10px';
        
        var attackLabel = document.createElement('label');
        attackLabel.textContent = 'Attack';
        attackLabel.id = 'gameboy-attack-label';
        attackLabel.style.marginBottom = '5px';
        attackLabel.style.fontSize = '0.8em';
        
        var attackSlider = document.createElement('input');
        attackSlider.type = 'range';
        attackSlider.id = 'gameboy-attack';
        attackSlider.min = '0';
        attackSlider.max = '0.5';
        attackSlider.step = '0.01';
        attackSlider.value = '0';
        attackSlider.style.width = '100px';
        attackSlider.title = 'Attack: Off'; // Tooltip instead of label
        
        attackSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Attack: ' + val;
        });
        
        attackSlider.addEventListener('input', function() {
            document.getElementById('gameboy-attack-label').textContent = 'Attack';
        });
        
        attackGroup.appendChild(attackLabel);
        attackGroup.appendChild(attackSlider);
        
        /* Release control */
        var releaseGroup = document.createElement('div');
        releaseGroup.className = 'control-group';
        
        var releaseLabel = document.createElement('label');
        releaseLabel.textContent = 'Release';
        releaseLabel.id = 'gameboy-release-label';
        releaseLabel.style.marginBottom = '5px';
        releaseLabel.style.fontSize = '0.8em';
        
        var releaseSlider = document.createElement('input');
        releaseSlider.type = 'range';
        releaseSlider.id = 'gameboy-release';
        releaseSlider.min = '0';
        releaseSlider.max = '1';
        releaseSlider.step = '0.01';
        releaseSlider.value = '0.3';
        releaseSlider.style.width = '100px';
        releaseSlider.title = 'Release: 0.3'; // Tooltip instead of label
        
        releaseSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Release: ' + val;
        });
        
        releaseSlider.addEventListener('input', function() {
            document.getElementById('gameboy-release-label').textContent = 'Release';
        });
        
        releaseGroup.appendChild(releaseLabel);
        releaseGroup.appendChild(releaseSlider);
        
        gameboyControls.appendChild(waveGroup);
        gameboyControls.appendChild(noiseGroup);
        gameboyControls.appendChild(attackGroup);
        gameboyControls.appendChild(releaseGroup);
        
        controlBar.appendChild(gameboyControls);
    }
    
    removeGameBoyControls() {
        var gameboyControls = document.getElementById('gameboy-controls');
        if (gameboyControls) {
            gameboyControls.parentNode.removeChild(gameboyControls);
        }
        
        document.querySelector('.wave-selector').style.display = 'inline-flex';
    }
    
    playNote(note, freq) {
        // FIX: Check if window.audioContext exists before using it
        if (!window.audioContext) {
            console.error("AudioContext not initialized");
            return;
        }
        
        try {
            var now = window.audioContext.currentTime;
            var gainValue = 0.12;

            /* Get Game Boy specific parameters */
            var waveformSelect = document.getElementById('gameboy-wave');
            var noiseSelect = document.getElementById('gameboy-noise');
            var attackSlider = document.getElementById('gameboy-attack');
            var releaseSlider = document.getElementById('gameboy-release');
            
            var waveformType = waveformSelect ? waveformSelect.value : 'square';
            var noiseType = noiseSelect ? noiseSelect.value : 'white';
            var attackTime = attackSlider ? parseFloat(attackSlider.value) : 0.0;
            var releaseTime = releaseSlider ? parseFloat(releaseSlider.value) : 0.3;

            /* Create main oscillator for the note */
            var oscillator = window.audioContext.createOscillator();
            var gainNode = window.audioContext.createGain();
            
            /* Create noise buffer for Game Boy style */
            var noiseBuffer = window.audioContext.createBufferSource();
            var noiseGain = window.audioContext.createGain();
            
            /* Create noise buffer */
            var bufferSize = window.audioContext.sampleRate * 2; /* 2 seconds of noise */
            var buffer = window.audioContext.createBuffer(1, bufferSize, window.audioContext.sampleRate);
            var output = buffer.getChannelData(0);
            
            for (var i = 0; i < bufferSize; i++) {
                if (noiseType === 'white') {
                    output[i] = Math.random() * 2 - 1;
                } else { /* Pink noise is more complex, we'll fake it with a simple filter */
                    output[i] = (Math.random() * 2 - 1) * (i / bufferSize); /* A simple lo-fi sweep */
                }
            }
            noiseBuffer.buffer = buffer;
            noiseBuffer.loop = true;
            
            /* Configure oscillator */
            oscillator.type = waveformType;
            var roundedFreq = Math.round(freq * 1000) / 1000;
            oscillator.frequency.setValueAtTime(roundedFreq, now);
            
            /* Much lower noise volume */
            noiseGain.gain.value = 0.005; /* Further reduced */
            
            /* Connect the audio graph */
            oscillator.connect(gainNode);
            noiseBuffer.connect(noiseGain);
            gainNode.connect(window.mainGainNode);
            noiseGain.connect(window.mainGainNode);
            
            /* --- ADSR Envelope --- */
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(gainValue, now + attackTime);
            
            /* Start the sound */
            oscillator.start(now);
            noiseBuffer.start(now);
            
            window.activeOscillators[note] = { 
                oscillator: oscillator, 
                gainNode: gainNode,
                noiseBuffer: noiseBuffer,
                noiseGain: noiseGain,
                releaseTime: releaseTime
            };
            
            if(DEBUG) {
                console.log("8-bit Note started:", note, "Frequency:", roundedFreq);
            }
        } catch (e) {
            console.error("Error playing 8-bit note:", e);
        }
    }
    
    stopNote(note) {
        // FIX: Check if window.audioContext exists before using it
        if (!window.audioContext) {
            console.error("AudioContext not initialized");
            return;
        }
        
        var oscillatorData = window.activeOscillators[note];
        
        if (!oscillatorData) {
            if(DEBUG) {
                console.log("8-bit note data missing:", note, oscillatorData);
            }
            delete window.activeOscillators[note];
            return;
        }
        
        try {
            var now = window.audioContext.currentTime;
            /* FIX: Use the release time that was stored when the note was played */
            var releaseTime = oscillatorData.releaseTime || 0.3;
            
            /* Stop all components */
            if (oscillatorData.oscillator) {
                try {
                    oscillatorData.oscillator.stop(now + releaseTime);
                } catch (e) {
                    /* Ignore errors */
                }
            }
            
            if (oscillatorData.noiseBuffer) {
                try {
                    oscillatorData.noiseBuffer.stop(now + 0.01); /* Stop noise immediately */
                } catch (e) {
                    /* Ignore errors */
                }
            }
            
            /* Fade out gains */
            if (oscillatorData.gainNode) {
                oscillatorData.gainNode.gain.cancelScheduledValues(now);
                oscillatorData.gainNode.gain.setValueAtTime(oscillatorData.gainNode.gain.value, now);
                oscillatorData.gainNode.gain.linearRampToValueAtTime(0, now + releaseTime);
            }
            
            if (oscillatorData.noiseGain) {
                oscillatorData.noiseGain.gain.cancelScheduledValues(now);
                oscillatorData.noiseGain.gain.setValueAtTime(oscillatorData.noiseGain.gain.value, now);
                oscillatorData.noiseGain.gain.linearRampToValueAtTime(0, now + 0.01);
            }
            
            /* Remove from active oscillators immediately */
            delete window.activeOscillators[note];
            
            if(DEBUG) {
                console.log("8-bit Note stopped:", note, "Release time:", releaseTime);
            }
        } catch (e) {
            console.error("Error stopping 8-bit note:", e);
            /* Still remove from active oscillators even if stopping failed */
            delete window.activeOscillators[note];
        }
    }
    
    export(context, note, startTime, duration, destination) {
        var waveformSelect = document.getElementById('gameboy-wave');
        var noiseSelect = document.getElementById('gameboy-noise');
        var attackSlider = document.getElementById('gameboy-attack');
        var releaseSlider = document.getElementById('gameboy-release');

        var waveformType = waveformSelect ? waveformSelect.value : 'square';
        var noiseType = noiseSelect ? noiseSelect.value : 'white';
        var attackTime = attackSlider ? parseFloat(attackSlider.value) : 0.0;
        var releaseTime = releaseSlider ? parseFloat(releaseSlider.value) : 0.3;
        var sustainLevel = 0.7;

        var oscillator = context.createOscillator();
        var gainNode = context.createGain();
        var noiseBuffer = context.createBufferSource();
        var noiseGain = context.createGain();

        var bufferSize = context.sampleRate * 0.5;
        var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        var output = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * (noiseType === 'white' ? 1 : i / bufferSize);
        }
        noiseBuffer.buffer = buffer;

        oscillator.type = waveformType;
        oscillator.frequency.value = note.freq;
        noiseGain.gain.value = 0.02;

        // --- CORRECTED ENVELOPE LOGIC ---
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime);
        gainNode.gain.setValueAtTime(sustainLevel, startTime + duration);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration + releaseTime);

        oscillator.connect(gainNode);
        noiseBuffer.connect(noiseGain);
        gainNode.connect(destination);
        noiseGain.connect(destination);

        // Extend the stop time for both oscillator and noise to allow for the release tail.
        oscillator.start(startTime);
        noiseBuffer.start(startTime);
        oscillator.stop(startTime + duration + releaseTime);
        noiseBuffer.stop(startTime + duration + releaseTime);
    }
    
    cleanup() {
        this.removeGameBoyControls();
        // Revert the background color to its default state.
        document.body.style.backgroundColor = '';
    }
}
