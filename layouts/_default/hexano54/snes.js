class SNES extends Instrument {
    constructor() {
        super('SNES');
    }
    
    init() {
        this.createSNESControls();
        // Instead of adding a class, set the background color directly.
        document.body.style.backgroundColor = '#5D4E37';
    }
    
    createSNESControls() {
        /* Create SNES specific controls */
        document.querySelector('.wave-selector').style.display = 'none';
        var controlBar = document.querySelector('.control-bar');
        
        /* Add SNES specific controls */
        var snesControls = document.createElement('div');
        snesControls.id = 'snes-controls';
        snesControls.style.display = 'inline-flex';
        snesControls.style.marginLeft = '10px';
        
        /* Instrument Type control */
        var typeGroup = document.createElement('div');
        typeGroup.className = 'control-group';
        typeGroup.style.marginRight = '10px';
        
        var typeLabel = document.createElement('label');
        typeLabel.textContent = 'Instrument';
        typeLabel.style.marginBottom = '5px';
        typeLabel.style.fontSize = '0.8em';
        
        var typeSelect = document.createElement('select');
        typeSelect.id = 'snes-instrument';
        typeSelect.style.width = '120px';
        
        var pianoOption = document.createElement('option');
        pianoOption.value = 'piano';
        pianoOption.textContent = 'Piano';
        typeSelect.appendChild(pianoOption);
        
        var stringsOption = document.createElement('option');
        stringsOption.value = 'strings';
        stringsOption.textContent = 'Strings';
        typeSelect.appendChild(stringsOption);
        
        var brassOption = document.createElement('option');
        brassOption.value = 'brass';
        brassOption.textContent = 'Brass';
        typeSelect.appendChild(brassOption);
        
        var woodwindOption = document.createElement('option');
        woodwindOption.value = 'woodwind';
        woodwindOption.textContent = 'Woodwind';
        typeSelect.appendChild(woodwindOption);
        
        var percussionOption = document.createElement('option');
        percussionOption.value = 'percussion';
        percussionOption.textContent = 'Percussion';
        typeSelect.appendChild(percussionOption);
        
        typeGroup.appendChild(typeLabel);
        typeGroup.appendChild(typeSelect);
        
        /* Reverb control */
        var reverbGroup = document.createElement('div');
        reverbGroup.className = 'control-group';
        reverbGroup.style.marginRight = '10px';
        
        var reverbLabel = document.createElement('label');
        reverbLabel.textContent = 'Reverb';
        reverbLabel.id = 'snes-reverb-label';
        reverbLabel.style.marginBottom = '5px';
        reverbLabel.style.fontSize = '0.8em';
        
        var reverbSlider = document.createElement('input');
        reverbSlider.type = 'range';
        reverbSlider.id = 'snes-reverb';
        reverbSlider.min = '0';
        reverbSlider.max = '1';
        reverbSlider.step = '0.05';
        reverbSlider.value = '0.3';
        reverbSlider.style.width = '100px';
        reverbSlider.title = 'Reverb: 0.3'; // Tooltip instead of label
        
        reverbSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'reverbSlider: ' + val;
        });
        
        reverbSlider.addEventListener('input', function() {
            document.getElementById('snes-reverb-label').textContent = 'Reverb';
        });
        
        reverbGroup.appendChild(reverbLabel);
        reverbGroup.appendChild(reverbSlider);
        
        /* Attack control */
        var attackGroup = document.createElement('div');
        attackGroup.className = 'control-group';
        attackGroup.style.marginRight = '10px';
        
        var attackLabel = document.createElement('label');
        attackLabel.textContent = 'Attack';
        attackLabel.id = 'snes-attack-label';
        attackLabel.style.marginBottom = '5px';
        attackLabel.style.fontSize = '0.8em';
        
        var attackSlider = document.createElement('input');
        attackSlider.type = 'range';
        attackSlider.id = 'snes-attack';
        attackSlider.min = '0';
        attackSlider.max = '0.5';
        attackSlider.step = '0.01';
        attackSlider.value = '0.05';
        attackSlider.style.width = '100px';
        attackSlider.title = 'Attack: 0.05'; // Tooltip instead of label
        
        attackSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Attack: ' + val;
        });
        
        attackSlider.addEventListener('input', function() {
            document.getElementById('snes-attack-label').textContent = 'Attack';
        });
        
        attackGroup.appendChild(attackLabel);
        attackGroup.appendChild(attackSlider);
        
        /* Release control */
        var releaseGroup = document.createElement('div');
        releaseGroup.className = 'control-group';
        
        var releaseLabel = document.createElement('label');
        releaseLabel.textContent = 'Release';
        releaseLabel.id = 'snes-release-label';
        releaseLabel.style.marginBottom = '5px';
        releaseLabel.style.fontSize = '0.8em';
        
        var releaseSlider = document.createElement('input');
        releaseSlider.type = 'range';
        releaseSlider.id = 'snes-release';
        releaseSlider.min = '0';
        releaseSlider.max = '2';
        releaseSlider.step = '0.05';
        releaseSlider.value = '0.5';
        releaseSlider.style.width = '100px';
        releaseSlider.title = 'Release: 0.5'; // Tooltip instead of label
        
        attackSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value;
            this.title = 'Release: ' + val;
        });
        
        releaseSlider.addEventListener('input', function() {
            document.getElementById('snes-release-label').textContent = 'Release';
        });
        
        releaseGroup.appendChild(releaseLabel);
        releaseGroup.appendChild(releaseSlider);
        
        snesControls.appendChild(typeGroup);
        snesControls.appendChild(reverbGroup);
        snesControls.appendChild(attackGroup);
        snesControls.appendChild(releaseGroup);
        
        controlBar.appendChild(snesControls);
    }

    removeSNESControls() {
        var snesControls = document.getElementById('snes-controls');
        if (snesControls) {
            snesControls.parentNode.removeChild(snesControls);
        }
        
        document.querySelector('.wave-selector').style.display = 'inline-flex';
    }
    
    playNote(note, freq) {
        if (!window.audioContext) return;
        
        try {
            var now = window.audioContext.currentTime;
            var gainValue = 0.15;

            /* Get SNES specific parameters */
            var instrumentSelect = document.getElementById('snes-instrument');
            var reverbSlider = document.getElementById('snes-reverb');
            var attackSlider = document.getElementById('snes-attack');
            var releaseSlider = document.getElementById('snes-release');
            
            var instrumentType = instrumentSelect ? instrumentSelect.value : 'piano';
            var reverbAmount = reverbSlider ? parseFloat(reverbSlider.value) : 0.3;
            var attackTime = attackSlider ? parseFloat(attackSlider.value) : 0.05;
            var releaseTime = releaseSlider ? parseFloat(releaseSlider.value) : 0.5;

            /* Create main oscillator for the note */
            var oscillator = window.audioContext.createOscillator();
            var gainNode = window.audioContext.createGain();
            
            /* Create additional oscillators for harmonics to simulate sample-based instruments */
            var harmonic1 = window.audioContext.createOscillator();
            var harmonic2 = window.audioContext.createOscillator();
            var harmonicGain1 = window.audioContext.createGain();
            var harmonicGain2 = window.audioContext.createGain();
            
            /* Create filters for SNES sound */
            var filter = window.audioContext.createBiquadFilter();
            var filter2 = window.audioContext.createBiquadFilter();
            
            /* Create reverb using convolver node */
            var convolver = window.audioContext.createConvolver();
            var reverbGain = window.audioContext.createGain();
            var dryGain = window.audioContext.createGain();
            
            /* Create reverb impulse response */
            var length = window.audioContext.sampleRate * reverbAmount * 2;
            var impulse = window.audioContext.createBuffer(2, length, window.audioContext.sampleRate);
            
            for (var channel = 0; channel < 2; channel++) {
                var channelData = impulse.getChannelData(channel);
                for (var i = 0; i < length; i++) {
                    channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
                }
            }
            
            convolver.buffer = impulse;
            
            /* Configure oscillator based on instrument type */
            if (instrumentType === 'piano') {
                oscillator.type = 'triangle';
                harmonic1.type = 'sine';
                harmonic2.type = 'sine';
                harmonic1.frequency.value = freq * 2;
                harmonic2.frequency.value = freq * 3;
                harmonicGain1.gain.value = 0.2;
                harmonicGain2.gain.value = 0.1;
                
                filter.type = 'lowpass';
                filter.frequency.value = freq * 4;
                filter.Q.value = 1;
                
                filter2.type = 'highpass';
                filter2.frequency.value = freq * 0.5;
                filter2.Q.value = 0.5;
            } else if (instrumentType === 'strings') {
                oscillator.type = 'sawtooth';
                harmonic1.type = 'sawtooth';
                harmonic2.type = 'sine';
                harmonic1.frequency.value = freq * 2;
                harmonic2.frequency.value = freq * 3;
                harmonicGain1.gain.value = 0.3;
                harmonicGain2.gain.value = 0.2;
                
                filter.type = 'lowpass';
                filter.frequency.value = freq * 3;
                filter.Q.value = 0.8;
                
                filter2.type = 'highpass';
                filter2.frequency.value = freq * 0.4;
                filter2.Q.value = 0.5;
            } else if (instrumentType === 'brass') {
                oscillator.type = 'square';
                harmonic1.type = 'square';
                harmonic2.type = 'sine';
                harmonic1.frequency.value = freq * 2;
                harmonic2.frequency.value = freq * 1.5;
                harmonicGain1.gain.value = 0.4;
                harmonicGain2.gain.value = 0.3;
                
                filter.type = 'lowpass';
                filter.frequency.value = freq * 2.5;
                filter.Q.value = 1.5;
                
                filter2.type = 'highpass';
                filter2.frequency.value = freq * 0.6;
                filter2.Q.value = 0.7;
            } else if (instrumentType === 'woodwind') {
                oscillator.type = 'triangle';
                harmonic1.type = 'sine';
                harmonic2.type = 'sine';
                harmonic1.frequency.value = freq * 2.5;
                harmonic2.frequency.value = freq * 3.5;
                harmonicGain1.gain.value = 0.25;
                harmonicGain2.gain.value = 0.15;
                
                filter.type = 'lowpass';
                filter.frequency.value = freq * 3.5;
                filter.Q.value = 1.2;
                
                filter2.type = 'highpass';
                filter2.frequency.value = freq * 0.5;
                filter2.Q.value = 0.6;
            } else if (instrumentType === 'percussion') {
                oscillator.type = 'square';
                harmonic1.type = 'square';
                harmonic2.type = 'triangle';
                harmonic1.frequency.value = freq * 1.5;
                harmonic2.frequency.value = freq * 0.5;
                harmonicGain1.gain.value = 0.3;
                harmonicGain2.gain.value = 0.2;
                
                filter.type = 'bandpass';
                filter.frequency.value = freq * 1.2;
                filter.Q.value = 2;
                
                filter2.type = 'highpass';
                filter2.frequency.value = freq * 0.3;
                filter2.Q.value = 0.8;
            }
            
            /* Set main oscillator frequency */
            var roundedFreq = Math.round(freq * 1000) / 1000;
            oscillator.frequency.setValueAtTime(roundedFreq, now);
            
            /* Set reverb gains */
            reverbGain.gain.value = reverbAmount * 0.5;
            dryGain.gain.value = 1 - reverbAmount * 0.3;
            
            /* Connect audio graph */
            oscillator.connect(gainNode);
            harmonic1.connect(harmonicGain1);
            harmonic2.connect(harmonicGain2);
            harmonicGain1.connect(gainNode);
            harmonicGain2.connect(gainNode);
            
            /* Connect to filters */
            gainNode.connect(filter);
            filter.connect(filter2);
            
            /* Connect to dry/wet mix */
            filter2.connect(dryGain);
            filter2.connect(reverbGain);
            
            dryGain.connect(window.mainGainNode);
            reverbGain.connect(convolver);
            convolver.connect(window.mainGainNode);
            
            /* --- ADSR Envelope --- */
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(gainValue, now + attackTime);
            
            /* Start the sound */
            oscillator.start(now);
            harmonic1.start(now);
            harmonic2.start(now);
            
            window.activeOscillators[note] = { 
                oscillator: oscillator, 
                gainNode: gainNode,
                harmonic1: harmonic1,
                harmonic2: harmonic2,
                harmonicGain1: harmonicGain1,
                harmonicGain2: harmonicGain2,
                filter: filter,
                filter2: filter2,
                convolver: convolver,
                reverbGain: reverbGain,
                dryGain: dryGain,
                releaseTime: releaseTime
            };
            
            if(DEBUG) {
                console.log("SNES Note started:", note, "Frequency:", roundedFreq);
            }
        } catch (e) {
            console.error("Error playing SNES note:", e);
        }
    }
    
    stopNote(note) {
        var oscillatorData = window.activeOscillators[note];
        
        if (!oscillatorData) {
            if(DEBUG) {
                console.log("SNES note data missing:", note, oscillatorData);
            }
            return;
        }
        
        // *** THE FIX: Add a flag to prevent double cleanup ***
        if (oscillatorData.isStopping) {
            // This note is already in the process of stopping, so do nothing.
            return;
        }
        oscillatorData.isStopping = true;

        try {
            var now = window.audioContext.currentTime;
            // Use the release time that was stored when the note was played
            var releaseTime = oscillatorData.releaseTime || 0.5;
            
            // Stop all components with the proper release time
            if (oscillatorData.oscillator) {
                oscillatorData.oscillator.stop(now + releaseTime);
            }
            if (oscillatorData.harmonic1) {
                oscillatorData.harmonic1.stop(now + releaseTime);
            }
            if (oscillatorData.harmonic2) {
                oscillatorData.harmonic2.stop(now + releaseTime);
            }
            
            // Schedule the gain ramps for fade out
            if (oscillatorData.gainNode) {
                oscillatorData.gainNode.gain.cancelScheduledValues(now);
                oscillatorData.gainNode.gain.setValueAtTime(oscillatorData.gainNode.gain.value, now);
                oscillatorData.gainNode.gain.linearRampToValueAtTime(0, now + releaseTime);
            }
            if (oscillatorData.harmonicGain1) {
                oscillatorData.harmonicGain1.gain.cancelScheduledValues(now);
                oscillatorData.harmonicGain1.gain.setValueAtTime(oscillatorData.harmonicGain1.gain.value, now);
                oscillatorData.harmonicGain1.gain.linearRampToValueAtTime(0, now + releaseTime);
            }
            if (oscillatorData.harmonicGain2) {
                oscillatorData.harmonicGain2.gain.cancelScheduledValues(now);
                oscillatorData.harmonicGain2.gain.setValueAtTime(oscillatorData.harmonicGain2.gain.value, now);
                oscillatorData.harmonicGain2.gain.linearRampToValueAtTime(0, now + releaseTime);
            }
            if (oscillatorData.reverbGain) {
                oscillatorData.reverbGain.gain.cancelScheduledValues(now);
                oscillatorData.reverbGain.gain.setValueAtTime(oscillatorData.reverbGain.gain.value, now);
                oscillatorData.reverbGain.gain.linearRampToValueAtTime(0, now + releaseTime);
            }
            if (oscillatorData.dryGain) {
                oscillatorData.dryGain.gain.cancelScheduledValues(now);
                oscillatorData.dryGain.gain.setValueAtTime(oscillatorData.dryGain.gain.value, now);
                oscillatorData.dryGain.gain.linearRampToValueAtTime(0, now + releaseTime);
            }
            
            // Schedule the cleanup and visual feedback to happen AFTER the audio has finished.
            setTimeout(function() {
                // Check if the note still exists and hasn't been force-stopped
                if (window.activeOscillators[note] && window.activeOscillators[note].isStopping) {
                    // Now that the audio has faded, we can safely clean up.
                    delete window.activeOscillators[note];

                    if(DEBUG) {
                        console.log("SNES Note fully stopped and cleaned up:", note);
                    }
                }
            }, releaseTime * 1000);

            if(DEBUG) {
                console.log("SNES Note stop scheduled:", note, "Release time:", releaseTime);
            }
        } catch (e) {
            console.error("Error stopping SNES note:", e);
            // If there's an error, force cleanup immediately to prevent getting stuck
            delete window.activeOscillators[note];
        }
    }
    
    export(context, note, startTime, duration, destination) {
        var instrumentSelect = document.getElementById('snes-instrument');
        var attackSlider = document.getElementById('snes-attack');
        var releaseSlider = document.getElementById('snes-release');

        var instrumentType = instrumentSelect ? instrumentSelect.value : 'piano';
        var attackTime = attackSlider ? parseFloat(attackSlider.value) : 0.05;
        var releaseTime = releaseSlider ? parseFloat(releaseSlider.value) : 0.5;
        var sustainLevel = 0.7;

        var oscillator = context.createOscillator();
        var gainNode = context.createGain();
        var filter = context.createBiquadFilter();

        // Simplified SNES instrument simulation
        if (instrumentType === 'piano') {
            oscillator.type = 'triangle';
            filter.type = 'lowpass';
            filter.frequency.value = note.freq * 4;
        } else if (instrumentType === 'strings') {
            oscillator.type = 'sawtooth';
            filter.type = 'lowpass';
            filter.frequency.value = note.freq * 3;
        } else { // Default to a generic sound
            oscillator.type = 'square';
            filter.type = 'lowpass';
            filter.frequency.value = note.freq * 2.5;
        }

        oscillator.frequency.value = note.freq;

        // --- CORRECTED ENVELOPE LOGIC ---
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime);
        gainNode.gain.setValueAtTime(sustainLevel, startTime + duration);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration + releaseTime);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(destination);

        // Extend the stop time to allow for the release tail.
        oscillator.start(startTime);
        oscillator.stop(startTime + duration + releaseTime);
    }
    
    cleanup() {
        this.removeSNESControls();
        // Revert the background color to its default state.
        document.body.style.backgroundColor = '';
    }
}
