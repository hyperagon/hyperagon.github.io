class Default extends Instrument {
    constructor() {
        super('Default');
    }
    
    playNote(note, freq) {
        if (!window.audioContext) return;
        
        try {
            var now = window.audioContext.currentTime;
            var gainValue = 0.15;

            var oscillator = window.audioContext.createOscillator();
            var gainNode = window.audioContext.createGain();

            /* Get wave type from the selected wave option */
            var selectedWave = document.querySelector('.wave-option.selected');
            if (selectedWave) {
                oscillator.type = selectedWave.getAttribute('data-wave-type');
            } else {
                /* Default to sine if nothing is selected */
                oscillator.type = 'sine';
            }
            
            /* Round frequency to 3 decimal places */
            var roundedFreq = Math.round(freq * 1000) / 1000;
            oscillator.frequency.setValueAtTime(roundedFreq, now);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(gainValue, now + 0.02);
            
            oscillator.connect(gainNode);
            gainNode.connect(window.mainGainNode);
            oscillator.start(now);

            window.activeOscillators[note] = { 
                oscillator: oscillator, 
                gainNode: gainNode
            };
            
            if(DEBUG) {
                console.log("Note started:", note, "Frequency:", roundedFreq);
            }
        } catch (e) {
            console.error("Error playing note:", e);
        }
    }
    
    stopNote(note) {
        var oscillatorData = window.activeOscillators[note];
        
        if (!oscillatorData) {
            // Note might have already been stopped or was never started
            return;
        }

        try {
            var oscillator = oscillatorData.oscillator;
            var gainNode = oscillatorData.gainNode;
            var now = window.audioContext.currentTime;
            var releaseTime = 0.1; /* Shorter release time for immediate stop */
            
            gainNode.gain.cancelScheduledValues(now);
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.linearRampToValueAtTime(0, now + releaseTime);

            oscillator.stop(now + releaseTime + 0.01);
            
            /* Immediately remove from active oscillators */
            delete window.activeOscillators[note];
            
            if(DEBUG) {
                console.log("Note stopped:", note);
            }
        } catch (e) {
            console.error("Error stopping note:", e);
            /* Still remove from active oscillators even if stopping failed */
            delete window.activeOscillators[note];
        }
    }
    
    export(context, note, startTime, duration, destination) {
        var oscillator = context.createOscillator();
        var gainNode = context.createGain();

        var selectedWave = document.querySelector('.wave-option.selected');
        oscillator.type = selectedWave ? selectedWave.getAttribute('data-wave-type') : 'sine';
        oscillator.frequency.value = note.freq;

        // Default envelope for simple synth
        var attackTime = 0.02;
        var releaseTime = 0.1;
        var sustainLevel = 0.7;

        // --- CORRECTED ENVELOPE LOGIC ---
        // This creates a precise timeline to ensure the release ramp works correctly.
        gainNode.gain.setValueAtTime(0, startTime); // Start at silence
        gainNode.gain.linearRampToValueAtTime(sustainLevel, startTime + attackTime); // Attack
        gainNode.gain.setValueAtTime(sustainLevel, startTime + duration); // Hold sustain level until note ends
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration + releaseTime); // Release fade-out

        oscillator.connect(gainNode);
        gainNode.connect(destination);

        // The oscillator must run for the full duration plus the release tail.
        oscillator.start(startTime);
        oscillator.stop(startTime + duration + releaseTime);
    }
    
    switch() {
        const selector = document.querySelector('.wave-selector');
        if (selector) {
            selector.style.display = 'inline-flex';
        }
    }
    
    remove() {
        const selector = document.querySelector('.wave-selector');
        if (selector) {
            selector.style.display = 'none';
        }
    }
}
