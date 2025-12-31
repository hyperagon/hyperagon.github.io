class Drums extends Instrument {
    constructor() {
        super('Drums & Percussion');
    }
    
    init() {
        this.createDrumsControls();
        // Instead of adding a class, set the background color directly.
        document.body.style.backgroundColor = '#3a3a3a';
    }
    
    createDrumsControls() {
        /* Create Drums specific controls */
        document.querySelector('.wave-selector').style.display = 'none';
        var controlBar = document.querySelector('.control-bar');
        
        /* Add Drums specific controls */
        var drumsControls = document.createElement('div');
        drumsControls.id = 'drums-controls';
        drumsControls.style.display = 'inline-flex';
        drumsControls.style.marginLeft = '10px';
        
        /* Drum Type control */
        var typeGroup = document.createElement('div');
        typeGroup.className = 'control-group';
        typeGroup.style.marginRight = '10px';
        
        var typeLabel = document.createElement('label');
        typeLabel.textContent = 'Drum Type';
        typeLabel.style.marginBottom = '5px';
        typeLabel.style.fontSize = '0.8em';
        
        var typeSelect = document.createElement('select');
        typeSelect.id = 'drums-type';
        typeSelect.style.width = '120px';
        
        var kickOption = document.createElement('option');
        kickOption.value = 'kick';
        kickOption.textContent = 'Kick';
        typeSelect.appendChild(kickOption);
        
        var snareOption = document.createElement('option');
        snareOption.value = 'snare';
        snareOption.textContent = 'Snare';
        typeSelect.appendChild(snareOption);
        
        var tomOption = document.createElement('option');
        tomOption.value = 'tom';
        tomOption.textContent = 'Tom';
        typeSelect.appendChild(tomOption);
        
        // Added hi-hat option
        var hiHatOption = document.createElement('option');
        hiHatOption.value = 'hihat';
        hiHatOption.textContent = 'Hi-Hat';
        typeSelect.appendChild(hiHatOption);
        
        typeGroup.appendChild(typeLabel);
        typeGroup.appendChild(typeSelect);
        
        var cymbalOption = document.createElement('option');
        cymbalOption.value = 'cymbal';
        cymbalOption.textContent = 'Cymbal';
        typeSelect.appendChild(cymbalOption);
        
        /* Pitch control */
        var pitchGroup = document.createElement('div');
        pitchGroup.className = 'control-group';
        pitchGroup.style.marginRight = '10px';
        
        var pitchLabel = document.createElement('label');
        pitchLabel.textContent = 'Pitch';
        pitchLabel.id = 'drums-pitch-label';
        pitchLabel.style.marginBottom = '5px';
        pitchLabel.style.fontSize = '0.8em';
        
        var pitchSlider = document.createElement('input');
        pitchSlider.type = 'range';
        pitchSlider.id = 'drums-pitch';
        pitchSlider.min = '0.5';
        pitchSlider.max = '2';
        pitchSlider.step = '0.1';
        pitchSlider.value = '1';
        pitchSlider.style.width = '100px';
        pitchSlider.title = 'Pitch: 1'; // Tooltip instead of label
        
        pitchSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Pitch: ' + val;
        });
        
        pitchSlider.addEventListener('input', function() {
            document.getElementById('drums-pitch-label').textContent = 'Pitch';
        });
        
        pitchGroup.appendChild(pitchLabel);
        pitchGroup.appendChild(pitchSlider);
        
        /* Tone control */
        var toneGroup = document.createElement('div');
        toneGroup.className = 'control-group';
        toneGroup.style.marginRight = '10px';
        
        /* Decay control */
        var decayGroup = document.createElement('div');
        decayGroup.className = 'control-group';
        
        var decayLabel = document.createElement('label');
        decayLabel.textContent = 'Decay';
        decayLabel.id = 'drums-decay-label';
        decayLabel.style.marginBottom = '5px';
        decayLabel.style.fontSize = '0.8em';
        
        var decaySlider = document.createElement('input');
        decaySlider.type = 'range';
        decaySlider.id = 'drums-decay';
        decaySlider.min = '0.1';
        decaySlider.max = '2';
        decaySlider.step = '0.1';
        decaySlider.value = '0.5';
        decaySlider.style.width = '100px';
        decaySlider.title = 'Decay: 0.5'; // Tooltip instead of label
        
        decaySlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Decay: ' + val;
        });
        
        decaySlider.addEventListener('input', function() {
            document.getElementById('drums-decay-label').textContent = 'Decay';
        });
        
        decayGroup.appendChild(decayLabel);
        decayGroup.appendChild(decaySlider);
        
        drumsControls.appendChild(typeGroup);
        drumsControls.appendChild(pitchGroup);
        drumsControls.appendChild(decayGroup);
        
        controlBar.appendChild(drumsControls);
    }
    
    removeDrumsControls() {
        var drumsControls = document.getElementById('drums-controls');
        if (drumsControls) {
            drumsControls.parentNode.removeChild(drumsControls);
        }
        
        document.querySelector('.wave-selector').style.display = 'inline-flex';
    }
    
    playNote(note, freq) {
        if (!window.audioContext) return;
        
        try {
            var now = window.audioContext.currentTime;
            var gainValue = 0.5;

            /* Get Drums specific parameters */
            var typeSelect = document.getElementById('drums-type');
            var pitchSlider = document.getElementById('drums-pitch');
            var decaySlider = document.getElementById('drums-decay');
            
            var drumType = typeSelect ? typeSelect.value : 'kick';
            var pitch = pitchSlider ? parseFloat(pitchSlider.value) : 1;
            var decayTime = decaySlider ? parseFloat(decaySlider.value) : 0.5;

            var noiseBuffer = window.audioContext.createBufferSource();
            var noiseGain = window.audioContext.createGain();
            var noiseFilter = window.audioContext.createBiquadFilter();
            
            /* Create noise buffer */
            var bufferSize = window.audioContext.sampleRate * 2;
            var buffer = window.audioContext.createBuffer(1, bufferSize, window.audioContext.sampleRate);
            var output = buffer.getChannelData(0);
            
            for (var i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            noiseBuffer.buffer = buffer;
            noiseBuffer.loop = true;

            var oscillator = window.audioContext.createOscillator();
            var oscillatorGain = window.audioContext.createGain();
            
            /* Configure based on drum type */
            if (drumType === 'kick') {
                oscillator.type = 'sine';
                // Use the provided frequency instead of fixed 150
                oscillator.frequency.setValueAtTime(freq * pitch, now);
                oscillator.frequency.exponentialRampToValueAtTime(0.01, now + decayTime);
                oscillatorGain.gain.setValueAtTime(gainValue, now);
                oscillatorGain.gain.exponentialRampToValueAtTime(0.01, now + decayTime);
                
                oscillator.connect(oscillatorGain);
                oscillatorGain.connect(window.mainGainNode);
                oscillator.start(now);
                oscillator.stop(now + decayTime);
                
                window.activeOscillators[note] = { oscillator: oscillator, gainNode: oscillatorGain };
            } else if (drumType === 'snare') {
                /* Tone component */
                oscillator.type = 'triangle';
                // Use the provided frequency instead of fixed 200
                oscillator.frequency.setValueAtTime(freq * pitch, now);
                oscillatorGain.gain.setValueAtTime(gainValue * 0.5, now);
                oscillatorGain.gain.exponentialRampToValueAtTime(0.01, now + decayTime);
                
                /* Noise component */
                noiseFilter.type = 'highpass';
                // Map frequency to filter range (higher notes = higher filter)
                noiseFilter.frequency.value = 1000 + (freq / 100);
                noiseGain.gain.setValueAtTime(gainValue * 0.5, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.01, now + decayTime);
                
                oscillator.connect(oscillatorGain);
                noiseBuffer.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                
                oscillatorGain.connect(window.mainGainNode);
                noiseGain.connect(window.mainGainNode);
                
                oscillator.start(now);
                noiseBuffer.start(now);
                
                window.activeOscillators[note] = { 
                    oscillator: oscillator, 
                    gainNode: oscillatorGain,
                    noiseBuffer: noiseBuffer,
                    noiseGain: noiseGain
                };
            } else if (drumType === 'tom') {
                oscillator.type = 'square';
                // Use the provided frequency instead of fixed 150
                oscillator.frequency.setValueAtTime(freq * pitch, now);
                oscillator.frequency.exponentialRampToValueAtTime(0.01, now + decayTime);
                oscillatorGain.gain.setValueAtTime(gainValue, now);
                oscillatorGain.gain.exponentialRampToValueAtTime(0.01, now + decayTime);
                
                oscillator.connect(oscillatorGain);
                oscillatorGain.connect(window.mainGainNode);
                oscillator.start(now);
                oscillator.stop(now + decayTime);
                
                window.activeOscillators[note] = { oscillator: oscillator, gainNode: oscillatorGain };
            } else if (drumType === 'hihat') {
                oscillator.type = 'square';
                // Create a new buffer source for noise
                const noiseSource = window.audioContext.createBufferSource();
                
                // Create noise buffer if it doesn't exist
                if (!window.noiseBuffer) {
                    const bufferSize = window.audioContext.sampleRate * 0.5; // 0.5 seconds of noise
                    window.noiseBuffer = window.audioContext.createBuffer(1, bufferSize, window.audioContext.sampleRate);
                    const output = window.noiseBuffer.getChannelData(0);
                    
                    for (let i = 0; i < bufferSize; i++) {
                        output[i] = Math.random() * 2 - 1; // Generate white noise
                    }
                }
                
                noiseSource.buffer = window.noiseBuffer;
                
                // Create an oscillator for the pitched component
                const hihatOsc = window.audioContext.createOscillator();
                hihatOsc.type = 'square'; // Square wave for metallic sound
                
                // *** KEY FIX: Use the 'pitch' variable from the slider ***
                // This follows the same pattern as your working 'tom' drum
                const targetFreq = freq * pitch;
                hihatOsc.frequency.value = targetFreq;
                
                // Create a bandpass filter for the oscillator
                const oscFilter = window.audioContext.createBiquadFilter();
                oscFilter.type = 'bandpass';
                // Use the same target frequency for the filter to track the pitch
                oscFilter.frequency.value = targetFreq;
                oscFilter.Q.value = 10; // High Q for resonance
                
                // Create a highpass filter for noise
                const noiseFilter = window.audioContext.createBiquadFilter();
                noiseFilter.type = 'highpass';
                noiseFilter.frequency.value = 8000; // Fixed high frequency for noise
                
                // Create gain nodes for both sources
                const noiseGain = window.audioContext.createGain();
                const oscGain = window.audioContext.createGain();
                const hihatGain = window.audioContext.createGain();
                
                // Set gain values
                noiseGain.gain.value = 0.3; // Noise component
                oscGain.gain.value = 0.2; // Oscillator component
                
                hihatGain.gain.setValueAtTime(gainValue * 0.5, now);
                hihatGain.gain.exponentialRampToValueAtTime(0.01, now + decayTime * 0.2);
                
                // Connect noise path
                noiseSource.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(hihatGain);
                
                // Connect oscillator path
                hihatOsc.connect(oscFilter);
                oscFilter.connect(oscGain);
                oscGain.connect(hihatGain);
                
                // Connect to main output
                hihatGain.connect(window.mainGainNode);
                
                // Start and stop sources
                noiseSource.start(now);
                hihatOsc.start(now);
                noiseSource.stop(now + decayTime * 0.3);
                hihatOsc.stop(now + decayTime * 0.3);
                
                window.activeOscillators[note] = { 
                    noiseSource: noiseSource,
                    oscillator: hihatOsc,
                    gain: hihatGain
                };
            } else if (drumType === 'cymbal') {
                noiseFilter.type = 'highpass';
                // Map frequency to filter range (higher notes = higher filter)
                noiseFilter.frequency.value = 3000 + (freq / 15);
                noiseGain.gain.setValueAtTime(gainValue * 0.4, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.01, now + decayTime * 2);
                
                noiseBuffer.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(window.mainGainNode);
                
                noiseBuffer.start(now);
                
                window.activeOscillators[note] = { 
                    noiseBuffer: noiseBuffer,
                    noiseGain: noiseGain
                };
            }
            
            if(DEBUG) {
                console.log("Drum Note started:", note, "Type:", drumType, "Frequency:", freq);
            }
        } catch (e) {
            console.error("Error playing drum note:", e);
        }
    }
    
    stopNote(note) {
        var oscillatorData = window.activeOscillators[note];
        
        if (!oscillatorData) {
            if(DEBUG) {
                console.log("Drum note data missing:", note, oscillatorData);
            }
            delete window.activeOscillators[note];
            return;
        }
        
        try {
            var now = window.audioContext.currentTime;
            var releaseTime = 0.05; /* Very short release for drums */
            
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
                    oscillatorData.noiseBuffer.stop(now + releaseTime);
                } catch (e) {
                    /* Ignore errors */
                }
            }
            
            /* Fade out gains */
            if (oscillatorData.gainNode) {
                oscillatorData.gainNode.gain.cancelScheduledValues(now);
                oscillatorData.gainNode.gain.setValueAtTime(oscillatorData.gainNode.gain.value, now);
                oscillatorData.gainNode.gain.exponentialRampToValueAtTime(0.01, now + releaseTime);
            }
            
            if (oscillatorData.noiseGain) {
                oscillatorData.noiseGain.gain.cancelScheduledValues(now);
                oscillatorData.noiseGain.gain.setValueAtTime(oscillatorData.noiseGain.gain.value, now);
                oscillatorData.noiseGain.gain.exponentialRampToValueAtTime(0.01, now + releaseTime);
            }
            
            /* Remove from active oscillators immediately */
            delete window.activeOscillators[note];
            
            if(DEBUG) {
                console.log("Drum Note stopped:", note);
            }
        } catch (e) {
            console.error("Error stopping drum note:", e);
            /* Still remove from active oscillators even if stopping failed */
            delete window.activeOscillators[note];
        }
    }
    
    export(context, note, startTime, duration, destination) {
        var typeSelect = document.getElementById('drums-type');
        var pitchSlider = document.getElementById('drums-pitch');
        var decaySlider = document.getElementById('drums-decay');
        
        var drumType = typeSelect ? typeSelect.value : 'kick';
        var pitch = pitchSlider ? parseFloat(pitchSlider.value) : 1;
        var decayTime = decaySlider ? parseFloat(decaySlider.value) : 0.5;

        var oscillator = context.createOscillator();
        var oscillatorGain = context.createGain();
        var noiseBuffer = context.createBufferSource();
        var noiseGain = context.createGain();
        var noiseFilter = context.createBiquadFilter();
        
        // Create noise buffer
        var bufferSize = context.sampleRate * 2;
        var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        var output = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        noiseBuffer.buffer = buffer;
        noiseBuffer.loop = true;

        // --- CORRECTED AUDIO ROUTING & ENVELOPE LOGIC ---
        if (drumType === 'kick') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(note.freq * pitch, startTime);
            oscillator.frequency.exponentialRampToValueAtTime(0.01, startTime + decayTime);
            
            oscillatorGain.gain.setValueAtTime(0.7, startTime);
            oscillatorGain.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);
            
            oscillator.connect(oscillatorGain);
            oscillatorGain.connect(destination);
            oscillator.start(startTime);
            oscillator.stop(startTime + decayTime);
        } else if (drumType === 'snare') {
            oscillator.type = 'triangle';
            oscillator.frequency.value = note.freq * pitch;
            
            noiseFilter.type = 'highpass';
            noiseFilter.frequency.value = 5000;
            
            oscillatorGain.gain.setValueAtTime(0.5, startTime);
            noiseGain.gain.setValueAtTime(0.5, startTime);
            
            oscillatorGain.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);

            oscillator.connect(oscillatorGain);
            noiseBuffer.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            
            oscillatorGain.connect(destination);
            noiseGain.connect(destination);
            
            oscillator.start(startTime);
            noiseBuffer.start(startTime);
            oscillator.stop(startTime + decayTime);
            noiseBuffer.stop(startTime + decayTime);
        } else { // Default to a tom-like sound for other types
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(note.freq * pitch, startTime);
            oscillator.frequency.exponentialRampToValueAtTime(0.01, startTime + decayTime);
            
            oscillatorGain.gain.setValueAtTime(0.7, startTime);
            oscillatorGain.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);
            
            oscillator.connect(oscillatorGain);
            oscillatorGain.connect(destination);
            oscillator.start(startTime);
            oscillator.stop(startTime + decayTime);
        }
    }
    
    cleanup() {
        this.removeDrumsControls();
        // Revert the background color to its default state.
        document.body.style.backgroundColor = '';
    }
}
