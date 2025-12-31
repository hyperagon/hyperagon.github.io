class Guitar extends Instrument {
    constructor() {
        super('Guitar');
    }
    
    init() {
        this.createGuitarControls();
        // Wood texture background
        document.body.style.backgroundColor = '#5D4037';
    }
    
    createGuitarControls() {
        /* Create Guitar specific controls */
        document.querySelector('.wave-selector').style.display = 'none';
        var controlBar = document.querySelector('.control-bar');
        
        /* Add Guitar specific controls */
        var guitarControls = document.createElement('div');
        guitarControls.id = 'guitar-controls';
        guitarControls.style.display = 'inline-flex';
        guitarControls.style.marginLeft = '10px';
        
        /* Guitar Type control */
        var typeGroup = document.createElement('div');
        typeGroup.className = 'control-group';
        typeGroup.style.marginRight = '10px';
        
        var typeLabel = document.createElement('label');
        typeLabel.textContent = 'Type';
        typeLabel.style.marginBottom = '5px';
        typeLabel.style.fontSize = '0.8em';
        typeLabel.style.color = '#fff'; // Better contrast on dark bg
        
        var typeSelect = document.createElement('select');
        typeSelect.id = 'guitar-type';
        typeSelect.style.width = '120px';
        
        var acousticOption = document.createElement('option');
        acousticOption.value = 'acoustic';
        acousticOption.textContent = 'Acoustic';
        typeSelect.appendChild(acousticOption);
        
        var electricOption = document.createElement('option');
        electricOption.value = 'electric';
        electricOption.textContent = 'Electric';
        typeSelect.appendChild(electricOption);
        
        var bassOption = document.createElement('option');
        bassOption.value = 'bass';
        bassOption.textContent = 'Bass';
        typeSelect.appendChild(bassOption);
        
        typeGroup.appendChild(typeLabel);
        typeGroup.appendChild(typeSelect);
        
        /* Damping control */
        var dampingGroup = document.createElement('div');
        dampingGroup.className = 'control-group';
        dampingGroup.style.marginRight = '10px';
        
        var dampingLabel = document.createElement('label');
        dampingLabel.textContent = 'Decay';
        dampingLabel.id = 'guitar-damping-label';
        dampingLabel.style.marginBottom = '5px';
        dampingLabel.style.fontSize = '0.8em';
        dampingLabel.style.color = '#fff';
        
        var dampingSlider = document.createElement('input');
        dampingSlider.type = 'range';
        dampingSlider.id = 'guitar-damping';
        dampingSlider.min = '0.1';
        dampingSlider.max = '2.0';
        dampingSlider.step = '0.1';
        dampingSlider.value = '1.0';
        dampingSlider.style.width = '100px';
        dampingSlider.title = 'Damping: 1.0'; // Tooltip instead of label
        
        dampingSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Damping: ' + val;
        });
        
        dampingSlider.addEventListener('input', function() {
            document.getElementById('guitar-damping-label').textContent = 'Decay';
        });
        
        dampingGroup.appendChild(dampingLabel);
        dampingGroup.appendChild(dampingSlider);
        
        /* Body Resonance control */
        var resonanceGroup = document.createElement('div');
        resonanceGroup.className = 'control-group';
        
        var resonanceLabel = document.createElement('label');
        resonanceLabel.textContent = 'Body';
        resonanceLabel.id = 'guitar-body-label';
        resonanceLabel.style.marginBottom = '5px';
        resonanceLabel.style.fontSize = '0.8em';
        resonanceLabel.style.color = '#fff';
        
        var resonanceSlider = document.createElement('input');
        resonanceSlider.type = 'range';
        resonanceSlider.id = 'guitar-body';
        resonanceSlider.min = '0';
        resonanceSlider.max = '10';
        resonanceSlider.step = '0.5';
        resonanceSlider.value = '5';
        resonanceSlider.style.width = '100px';
        resonanceSlider.title = 'Body: 5'; // Tooltip instead of label
        
        resonanceSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Body: ' + val;
        });
        
        resonanceSlider.addEventListener('input', function() {
            document.getElementById('guitar-body-label').textContent = 'Body';
        });
        
        resonanceGroup.appendChild(resonanceLabel);
        resonanceGroup.appendChild(resonanceSlider);
        
        guitarControls.appendChild(typeGroup);
        guitarControls.appendChild(dampingGroup);
        guitarControls.appendChild(resonanceGroup);
        
        controlBar.appendChild(guitarControls);
    }

    removeGuitarControls() {
        var guitarControls = document.getElementById('guitar-controls');
        if (guitarControls) {
            guitarControls.parentNode.removeChild(guitarControls);
        }
        
        document.querySelector('.wave-selector').style.display = 'inline-flex';
    }
    
    // Helper to create distortion curve for electric guitar
    makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50;
        var n_samples = 44100;
        var curve = new Float32Array(n_samples);
        var deg = Math.PI / 180;
        for (var i = 0; i < n_samples; ++i) {
            var x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    playNote(note, freq) {
        if (!window.audioContext) return;
        
        try {
            var now = window.audioContext.currentTime;
            
            /* Parameters */
            var typeSelect = document.getElementById('guitar-type');
            var dampingSlider = document.getElementById('guitar-damping');
            var bodySlider = document.getElementById('guitar-body');
            
            var guitarType = typeSelect ? typeSelect.value : 'acoustic';
            var decayMult = dampingSlider ? parseFloat(dampingSlider.value) : 1.0;
            var bodyGain = bodySlider ? parseFloat(bodySlider.value) : 5;
            
            var roundedFreq = Math.round(freq * 1000) / 1000;

            // --- 1. Sources ---
            
            // Main Oscillator (Sawtooth is rich in harmonics)
            var osc1 = window.audioContext.createOscillator();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(roundedFreq, now);
            
            // Secondary Oscillator (Detuned for "Chorus" width)
            var osc2 = window.audioContext.createOscillator();
            osc2.type = 'sawtooth';
            osc2.detune.setValueAtTime(10, now); // Detune by 10 cents
            osc2.frequency.setValueAtTime(roundedFreq, now);
            
            // "Twang" Oscillator (High freq sine that dies fast)
            var twang = window.audioContext.createOscillator();
            twang.type = 'triangle';
            twang.frequency.setValueAtTime(roundedFreq * 4, now); // 2 octaves up
            
            // Pluck Noise (Bandpassed noise for pick attack)
            var bufferSize = window.audioContext.sampleRate * 0.05; // 50ms
            var buffer = window.audioContext.createBuffer(1, bufferSize, window.audioContext.sampleRate);
            var data = buffer.getChannelData(0);
            for (var i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            var noise = window.audioContext.createBufferSource();
            noise.buffer = buffer;
            var noiseFilter = window.audioContext.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.value = guitarType === 'bass' ? 1000 : 2500; // Brightness of pick
            
            // --- 2. Gains (Envelopes) ---
            
            var masterGain = window.audioContext.createGain();
            var oscGain = window.audioContext.createGain();
            var twangGain = window.audioContext.createGain();
            var noiseGain = window.audioContext.createGain();
            
            // --- 3. Filters (Tone Shaping) ---
            
            var filter = window.audioContext.createBiquadFilter();
            filter.type = 'lowpass';
            // Initial filter frequency (Open for attack)
            var startFreq = guitarType === 'acoustic' ? roundedFreq * 6 : roundedFreq * 8;
            filter.frequency.setValueAtTime(startFreq, now);
            
            // Body Resonance (Simulates wood cavity)
            var bodyFilter = window.audioContext.createBiquadFilter();
            bodyFilter.type = 'peaking';
            bodyFilter.frequency.value = guitarType === 'bass' ? 120 : 100; // The "boom"
            bodyFilter.Q.value = 1.0;
            bodyFilter.gain.value = bodyGain; 
            // Bypass body filter if gain is 0
            if(bodyGain <= 0.1) bodyFilter.gain.value = 0;

            // Distortion (Electric only)
            var shaper = null;
            if (guitarType === 'electric') {
                shaper = window.audioContext.createWaveShaper();
                shaper.curve = this.makeDistortionCurve(100);
                shaper.oversample = '4x';
            }

            // --- 4. Routing ---
            
            osc1.connect(oscGain);
            osc2.connect(oscGain);
            twang.connect(twangGain);
            
            noise.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            
            // Combine sources
            oscGain.connect(masterGain);
            twangGain.connect(masterGain);
            noiseGain.connect(masterGain);
            
            // Filter Chain: Main -> Filter -> Body -> [Distortion] -> Out
            masterGain.connect(filter);
            filter.connect(bodyFilter);
            
            if (shaper) {
                bodyFilter.connect(shaper);
                shaper.connect(window.mainGainNode);
            } else {
                bodyFilter.connect(window.mainGainNode);
            }
            
            // --- 5. Envelope Logic ---
            
            var sustainLevel = guitarType === 'electric' ? 0.4 : 0.3;
            var attackTime = 0.005;
            
            // Master Volume Envelope
            masterGain.gain.setValueAtTime(0, now);
            masterGain.gain.linearRampToValueAtTime(0.3, now + attackTime); // Attack
            masterGain.gain.exponentialRampToValueAtTime(sustainLevel, now + (0.5 * decayMult)); // Initial Decay
            
            // Filter Envelope (The "Pluck")
            // Filter closes as the string settles
            filter.frequency.exponentialRampToValueAtTime(
                guitarType === 'bass' ? roundedFreq * 1.5 : roundedFreq * 2.5, 
                now + (0.4 * decayMult)
            );

            // Twang Envelope (Decays very fast)
            twangGain.gain.setValueAtTime(0.15, now);
            twangGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            
            // Noise Envelope (Decays instantly)
            noiseGain.gain.setValueAtTime(0.2, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
            
            // --- 6. Start ---
            osc1.start(now);
            osc2.start(now);
            twang.start(now);
            noise.start(now);
            
            // Store references for stopping
            window.activeOscillators[note] = { 
                osc1: osc1, 
                osc2: osc2,
                twang: twang,
                noise: noise,
                masterGain: masterGain,
                filter: filter,
                shaper: shaper
            };
            
        } catch (e) {
            console.error("Error playing guitar note:", e);
        }
    }
    
    stopNote(note) {
        var oscData = window.activeOscillators[note];
        if (!oscData) return;
        
        try {
            var now = window.audioContext.currentTime;
            var releaseTime = 0.2; // Fast release for guitar
            
            // Mute the noise immediately
            if(oscData.noise) try { oscData.noise.stop(now + 0.01); } catch(e){}

            // Fade out master gain
            if (oscData.masterGain) {
                oscData.masterGain.gain.cancelScheduledValues(now);
                oscData.masterGain.gain.setValueAtTime(oscData.masterGain.gain.value, now);
                oscData.masterGain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);
            }
            
            // Close the filter quickly (simulates muting with palm/hand)
            if (oscData.filter) {
                oscData.filter.frequency.cancelScheduledValues(now);
                oscData.filter.frequency.setValueAtTime(oscData.filter.frequency.value, now);
                oscData.filter.frequency.exponentialRampToValueAtTime(100, now + releaseTime);
            }
            
            // Stop oscillators after release
            [oscData.osc1, oscData.osc2, oscData.twang].forEach(function(osc) {
                if (osc) {
                    try { osc.stop(now + releaseTime + 0.1); } catch(e){}
                }
            });
            
            delete window.activeOscillators[note];
            
        } catch (e) {
            console.error("Error stopping guitar note:", e);
            delete window.activeOscillators[note];
        }
    }
    
    export(context, note, startTime, duration, destination) {
        // Logic mirrors playNote but for offline rendering
        var typeSelect = document.getElementById('guitar-type');
        var dampingSlider = document.getElementById('guitar-damping');
        var bodySlider = document.getElementById('guitar-body');
        
        var guitarType = typeSelect ? typeSelect.value : 'acoustic';
        var decayMult = dampingSlider ? parseFloat(dampingSlider.value) : 1.0;
        var bodyGain = bodySlider ? parseFloat(bodySlider.value) : 5;
        
        var freq = note.freq;

        // 1. Create Nodes
        var osc1 = context.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.value = freq;

        var osc2 = context.createOscillator();
        osc2.type = 'sawtooth';
        osc2.detune.value = 10;
        osc2.frequency.value = freq;

        var twang = context.createOscillator();
        twang.type = 'triangle';
        twang.frequency.value = freq * 4;

        // Noise
        var noiseBuffer = context.createBuffer(1, context.sampleRate * 0.05, context.sampleRate);
        var noiseData = noiseBuffer.getChannelData(0);
        for (var i = 0; i < noiseBuffer.length; i++) noiseData[i] = Math.random() * 2 - 1;
        var noise = context.createBufferSource();
        noise.buffer = noiseBuffer;
        var noiseFilter = context.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = guitarType === 'bass' ? 1000 : 2500;

        // Gains
        var masterGain = context.createGain();
        var oscGain = context.createGain();
        var twangGain = context.createGain();
        var noiseGain = context.createGain();

        // Filters
        var filter = context.createBiquadFilter();
        filter.type = 'lowpass';
        var startFreq = guitarType === 'acoustic' ? freq * 6 : freq * 8;
        filter.frequency.setValueAtTime(startFreq, startTime);

        var bodyFilter = context.createBiquadFilter();
        bodyFilter.type = 'peaking';
        bodyFilter.frequency.value = guitarType === 'bass' ? 120 : 100;
        bodyFilter.Q.value = 1.0;
        bodyFilter.gain.value = bodyGain;
        if(bodyGain <= 0.1) bodyFilter.gain.value = 0;

        var shaper = null;
        if (guitarType === 'electric') {
            shaper = context.createWaveShaper();
            shaper.curve = this.makeDistortionCurve(100);
            shaper.oversample = '4x';
        }

        // 2. Connect
        osc1.connect(oscGain);
        osc2.connect(oscGain);
        twang.connect(twangGain);
        oscGain.connect(masterGain);
        twangGain.connect(masterGain);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);

        masterGain.connect(filter);
        filter.connect(bodyFilter);

        if (shaper) {
            bodyFilter.connect(shaper);
            shaper.connect(destination);
        } else {
            bodyFilter.connect(destination);
        }

        // 3. Envelopes
        var sustainLevel = guitarType === 'electric' ? 0.4 : 0.3;
        var releaseTime = Math.min(duration * 0.3, 0.5);
        var noteEndTime = startTime + duration;

        masterGain.gain.setValueAtTime(0, startTime);
        masterGain.gain.linearRampToValueAtTime(0.3, startTime + 0.005);
        masterGain.gain.exponentialRampToValueAtTime(sustainLevel, startTime + (0.5 * decayMult));
        // Release
        masterGain.gain.setValueAtTime(sustainLevel, noteEndTime);
        masterGain.gain.exponentialRampToValueAtTime(0.001, noteEndTime + releaseTime);

        filter.frequency.exponentialRampToValueAtTime(
            guitarType === 'bass' ? freq * 1.5 : freq * 2.5, 
            startTime + (0.4 * decayMult)
        );
        // Close filter on release
        filter.frequency.setValueAtTime(filter.frequency.value, noteEndTime);
        filter.frequency.exponentialRampToValueAtTime(100, noteEndTime + releaseTime);

        twangGain.gain.setValueAtTime(0.15, startTime);
        twangGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

        noiseGain.gain.setValueAtTime(0.2, startTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);

        // 4. Start/Stop
        osc1.start(startTime);
        osc2.start(startTime);
        twang.start(startTime);
        noise.start(startTime);
        
        osc1.stop(noteEndTime + releaseTime + 0.1);
        osc2.stop(noteEndTime + releaseTime + 0.1);
        twang.stop(noteEndTime + releaseTime + 0.1);
        noise.stop(startTime + 0.1);
    }
    
    cleanup() {
        this.removeGuitarControls();
        document.body.style.backgroundColor = '';
    }
}
