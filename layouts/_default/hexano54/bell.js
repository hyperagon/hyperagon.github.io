class Bell extends Instrument {
    constructor() {
        super('Bell');
    }
    
    init() {
        this.createBellControls();
    }
    
    createBellControls() {
        // We keep the standard wave selector visible
        var controlBar = document.querySelector('.control-bar');
        if (!controlBar) return; 

        /* Container for Bell controls */
        var bellControls = document.createElement('div');
        bellControls.id = 'bell-controls';
        bellControls.style.display = 'inline-flex';
        bellControls.style.marginLeft = '15px';
        bellControls.style.alignItems = 'center';
        // Seamless styling maintained
        bellControls.style.padding = '0 10px';
        
        /* --- 1. Decay (Ring Time) Slider --- */
        var decayGroup = document.createElement('div');
        decayGroup.className = 'control-group';
        decayGroup.style.marginRight = '15px';
        
        var decayLabel = document.createElement('label');
        decayLabel.textContent = 'Decay';
        decayLabel.id = 'bell-decay-label';
        decayLabel.style.marginBottom = '5px';
        decayLabel.style.fontSize = '0.8em';
        
        decayGroup.appendChild(decayLabel);
        
        var decaySlider = document.createElement('input');
        decaySlider.type = 'range';
        decaySlider.id = 'bell-decay';
        decaySlider.min = '0.1';
        decaySlider.max = '5.0';
        decaySlider.step = '0.1';
        decaySlider.value = '1.5';
        decaySlider.style.width = '80px';
        decaySlider.title = 'Decay: 1.5s'; // Tooltip instead of label
        
        decaySlider.addEventListener('input', function() {
            this.title = 'Decay: ' + this.value + 's';
        });
        
        decayGroup.appendChild(decaySlider);
        
        /* --- 2. Harmonics (Brightness) Slider --- */
        var harmGroup = document.createElement('div');
        harmGroup.className = 'control-group';
        
        var brightnessLabel = document.createElement('label');
        brightnessLabel.textContent = 'Brightness';
        brightnessLabel.id = 'bell-brightness-label';
        brightnessLabel.style.marginBottom = '5px';
        brightnessLabel.style.fontSize = '0.8em';
        
        harmGroup.appendChild(brightnessLabel);
        
        var harmSlider = document.createElement('input');
        harmSlider.type = 'range';
        harmSlider.id = 'bell-harmonics';
        harmSlider.min = '0';
        harmSlider.max = '1.0';
        harmSlider.step = '0.1';
        harmSlider.value = '1.0';
        harmSlider.style.width = '80px';
        harmSlider.title = 'Brightness: 1.0'; // Tooltip instead of label

        harmSlider.addEventListener('input', function() {
            this.title = 'Brightness: ' + this.value;
        });

        // FIXED: Appending the slider to the group
        harmGroup.appendChild(harmSlider);

        /* Assemble Controls */
        bellControls.appendChild(decayGroup);
        bellControls.appendChild(harmGroup);
        
        controlBar.appendChild(bellControls);
    }
    
    removeBellControls() {
        var bellControls = document.getElementById('bell-controls');
        if (bellControls) {
            bellControls.parentNode.removeChild(bellControls);
        }
    }
    
    playNote(note, freq) {
        if (!window.audioContext) return;
        
        try {
            var now = window.audioContext.currentTime;
            
            /* --- Read Options --- */
            var selectedWave = document.querySelector('.wave-option.selected');
            var waveType = selectedWave ? selectedWave.getAttribute('data-wave-type') : 'sine';

            var decaySlider = document.getElementById('bell-decay');
            var harmSlider = document.getElementById('bell-harmonics');
            
            var decayTime = decaySlider ? parseFloat(decaySlider.value) : 1.5;
            var harmonicMix = harmSlider ? parseFloat(harmSlider.value) : 1.0;

            var masterGainNode = window.audioContext.createGain();
            masterGainNode.connect(window.mainGainNode);
            
            masterGainNode.gain.setValueAtTime(0, now);
            masterGainNode.gain.linearRampToValueAtTime(0.25, now + 0.005);

            var oscillators = [];
            
            /* --- FIXED Additive Synthesis Logic --- */
            const addPartial = function(ratio, volBase) {
                var osc = window.audioContext.createOscillator();
                var pGain = window.audioContext.createGain();
                
                osc.type = waveType;
                osc.frequency.setValueAtTime(freq * ratio, now);
                
                /* 
                   FIX: Only apply harmonicMix to the overtones (ratio > 1.0).
                   The Fundamental (ratio 1.0) keeps its full volume regardless 
                   of the brightness setting.
                */
                var volume = volBase;
                if (ratio > 1.0) {
                    volume = volBase * harmonicMix;
                }

                pGain.gain.value = volume;
                
                osc.connect(pGain);
                pGain.connect(masterGainNode);
                
                osc.start(now);
                oscillators.push(osc);
            };

            /* Partial Stack */
            addPartial(1.0, 1.0);      // Fundamental (Always full volume)
            addPartial(2.0, 0.6);      // Octave (Affected by Brightness)
            addPartial(2.4, 0.4);      // Metallic (Affected by Brightness)
            addPartial(4.2, 0.25);     // High Shimmer (Affected by Brightness)
            addPartial(6.7, 0.2);      // Brightness (Affected by Brightness)
            
            window.activeOscillators[note] = { 
                gainNode: masterGainNode,
                oscillators: oscillators,
                releaseTime: decayTime
            };
            
        } catch (e) {
            console.error("Error playing bell note:", e);
        }
    }
    
    stopNote(note) {
        var oscillatorData = window.activeOscillators[note];
        if (!oscillatorData) return;

        try {
            var masterGain = oscillatorData.gainNode;
            var oscs = oscillatorData.oscillators;
            var now = window.audioContext.currentTime;
            var releaseTime = oscillatorData.releaseTime || 1.5;
            
            masterGain.gain.cancelScheduledValues(now);
            masterGain.gain.setValueAtTime(masterGain.gain.value, now);
            masterGain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);

            oscs.forEach(function(osc) {
                osc.stop(now + releaseTime + 0.1);
            });

            delete window.activeOscillators[note];
            
        } catch (e) {
            console.error("Error stopping bell note:", e);
            delete window.activeOscillators[note];
        }
    }
    
    export(context, note, startTime, duration, destination) {
        /* --- Read Options --- */
        var selectedWave = document.querySelector('.wave-option.selected');
        var waveType = selectedWave ? selectedWave.getAttribute('data-wave-type') : 'sine';

        var decaySlider = document.getElementById('bell-decay');
        var harmSlider = document.getElementById('bell-harmonics');
        
        var decayTime = decaySlider ? parseFloat(decaySlider.value) : 1.5;
        var harmonicMix = harmSlider ? parseFloat(harmSlider.value) : 1.0;
        
        var masterGain = context.createGain();
        masterGain.connect(destination);

        masterGain.gain.setValueAtTime(0, startTime);
        masterGain.gain.linearRampToValueAtTime(0.25, startTime + 0.005);
        masterGain.gain.setValueAtTime(0.25, startTime + duration);
        masterGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration + decayTime);

        /* --- FIXED Export Logic --- */
        var createPartial = function(ratio, volBase) {
            var osc = context.createOscillator();
            var pGain = context.createGain();
            osc.type = waveType;
            osc.frequency.value = note.freq * ratio;
            
            /* Apply brightness logic to export as well */
            var volume = volBase;
            if (ratio > 1.0) {
                volume = volBase * harmonicMix;
            }

            pGain.gain.value = volume;
            
            osc.connect(pGain);
            pGain.connect(masterGain);
            osc.start(startTime);
            osc.stop(startTime + duration + decayTime + 0.1);
        };

        createPartial(1.0, 1.0);
        createPartial(2.0, 0.6);
        createPartial(2.4, 0.4);
        createPartial(4.2, 0.25);
        createPartial(6.7, 0.2);
    }
    
    cleanup() {
        this.removeBellControls();
    }
}
