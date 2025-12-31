class Flute extends Instrument {
    constructor() {
        super('Flute');
    }
    
    init() {
        this.createFluteControls();
    }
    
    createFluteControls() {
        var controlBar = document.querySelector('.control-bar');
        if (!controlBar) return; 

        /* Container for Flute controls */
        var fluteControls = document.createElement('div');
        fluteControls.id = 'flute-controls';
        fluteControls.style.display = 'inline-flex';
        fluteControls.style.marginLeft = '15px';
        fluteControls.style.alignItems = 'center';
        // Seamless styling maintained
        fluteControls.style.padding = '0 10px';
        
        /* --- 1. Vibrato Speed Slider --- */
        var vibGroup = document.createElement('div');
        vibGroup.className = 'control-group';
        vibGroup.style.marginRight = '15px';
        
        var vibspeedLabel = document.createElement('label');
        vibspeedLabel.textContent = 'Vib. Speed';
        vibspeedLabel.id = 'flute-vibspeed-label';
        vibspeedLabel.style.marginBottom = '5px';
        vibspeedLabel.style.fontSize = '0.8em';
        
        vibGroup.appendChild(vibspeedLabel);
        
        var vibSlider = document.createElement('input');
        vibSlider.type = 'range';
        vibSlider.id = 'flute-vib';
        vibSlider.min = '0';
        vibSlider.max = '12';
        vibSlider.step = '0.5';
        vibSlider.value = '5';
        vibSlider.style.width = '80px';
        vibSlider.title = 'Vib Speed: 5Hz'; // Tooltip instead of label
        
        vibSlider.addEventListener('input', function() {
            var val = this.value == 0 ? 'Off' : this.value + 'Hz';
            this.title = 'Vib Speed: ' + val;
        });
        
        vibGroup.appendChild(vibSlider);
        
        /* --- 2. Breath Noise (Airiness) Slider --- */
        var breathGroup = document.createElement('div');
        breathGroup.className = 'control-group';
        
        var breathLabel = document.createElement('label');
        breathLabel.textContent = 'Breath';
        breathLabel.id = 'flute-breath-label';
        breathLabel.style.marginBottom = '5px';
        breathLabel.style.fontSize = '0.8em';
        
        breathGroup.appendChild(breathLabel);
        
        var breathSlider = document.createElement('input');
        breathSlider.type = 'range';
        breathSlider.id = 'flute-breath';
        breathSlider.min = '0';
        breathSlider.max = '1.0';
        breathSlider.step = '0.1';
        breathSlider.value = '0.4';
        breathSlider.style.width = '80px';
        breathSlider.title = 'Breath: 0.4'; // Tooltip instead of label

        breathSlider.addEventListener('input', function() {
            this.title = 'Breath: ' + this.value;
        });
        
        // FIXED: Appending the slider to the group
        breathGroup.appendChild(breathSlider);

        /* Assemble Controls */
        fluteControls.appendChild(vibGroup);
        fluteControls.appendChild(breathGroup);
        
        controlBar.appendChild(fluteControls);
    }
    
    removeFluteControls() {
        var fluteControls = document.getElementById('flute-controls');
        if (fluteControls) {
            fluteControls.parentNode.removeChild(fluteControls);
        }
    }
    
    createNoiseBuffer(context) {
        var bufferSize = context.sampleRate * 2; 
        var buffer = context.createBuffer(1, bufferSize, context.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }
    
    playNote(note, freq) {
        if (!window.audioContext) return;
        
        try {
            var now = window.audioContext.currentTime;
            
            var selectedWave = document.querySelector('.wave-option.selected');
            var waveType = selectedWave ? selectedWave.getAttribute('data-wave-type') : 'triangle';

            var vibSlider = document.getElementById('flute-vib');
            var breathSlider = document.getElementById('flute-breath');
            
            var vibSpeed = vibSlider ? parseFloat(vibSlider.value) : 5;
            var breathAmt = breathSlider ? parseFloat(breathSlider.value) : 0.4;

            var masterGainNode = window.audioContext.createGain();
            masterGainNode.connect(window.mainGainNode);
            masterGainNode.gain.setValueAtTime(0, now);
            masterGainNode.gain.linearRampToValueAtTime(0.3, now + 0.1);
            
            var osc = window.audioContext.createOscillator();
            osc.type = waveType;
            osc.frequency.setValueAtTime(freq, now);
            
            var oscGain = window.audioContext.createGain();
            oscGain.gain.value = 1.0;
            
            osc.connect(oscGain);
            oscGain.connect(masterGainNode);
            
            var vibratoOsc = null;
            var vibratoGain = null;
            
            if (vibSpeed > 0) {
                vibratoOsc = window.audioContext.createOscillator();
                vibratoOsc.type = 'sine';
                vibratoOsc.frequency.value = vibSpeed;
                
                vibratoGain = window.audioContext.createGain();
                vibratoGain.gain.value = (freq * 0.01); 

                vibratoOsc.connect(vibratoGain);
                vibratoGain.connect(osc.frequency);
                
                vibratoOsc.start(now);
            }
            
            osc.start(now);
            
            var noiseNode = null;
            var noiseFilter = null;
            var noiseGain = null;
            
            if (breathAmt > 0) {
                var noiseBuffer = this.createNoiseBuffer(window.audioContext);
                noiseNode = window.audioContext.createBufferSource();
                noiseNode.buffer = noiseBuffer;
                noiseNode.loop = true;
                
                noiseFilter = window.audioContext.createBiquadFilter();
                noiseFilter.type = 'lowpass';
                noiseFilter.frequency.value = 1200;
                
                noiseGain = window.audioContext.createGain();
                noiseGain.gain.value = breathAmt * 0.8; 
                
                noiseNode.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(masterGainNode);
                
                noiseNode.start(now);
            }

            window.activeOscillators[note] = { 
                masterGain: masterGainNode,
                nodes: [osc, vibratoOsc, noiseNode],
                releaseTime: 0.3 
            };
            
        } catch (e) {
            console.error("Error playing flute note:", e);
        }
    }
    
    stopNote(note) {
        var oscillatorData = window.activeOscillators[note];
        if (!oscillatorData) return;

        try {
            var masterGain = oscillatorData.masterGain;
            var nodes = oscillatorData.nodes;
            var now = window.audioContext.currentTime;
            var releaseTime = oscillatorData.releaseTime || 0.3;
            
            masterGain.gain.cancelScheduledValues(now);
            masterGain.gain.setValueAtTime(masterGain.gain.value, now);
            masterGain.gain.exponentialRampToValueAtTime(0.001, now + releaseTime);

            nodes.forEach(function(node) {
                if (node) {
                    node.stop(now + releaseTime + 0.1);
                }
            });

            delete window.activeOscillators[note];
            
        } catch (e) {
            console.error("Error stopping flute note:", e);
            delete window.activeOscillators[note];
        }
    }
    
    export(context, note, startTime, duration, destination) {
        var selectedWave = document.querySelector('.wave-option.selected');
        var waveType = selectedWave ? selectedWave.getAttribute('data-wave-type') : 'triangle';

        var vibSlider = document.getElementById('flute-vib');
        var breathSlider = document.getElementById('flute-breath');
        
        var vibSpeed = vibSlider ? parseFloat(vibSlider.value) : 5;
        var breathAmt = breathSlider ? parseFloat(breathSlider.value) : 0.4;
        
        var masterGain = context.createGain();
        masterGain.connect(destination);

        masterGain.gain.setValueAtTime(0, startTime);
        masterGain.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
        masterGain.gain.setValueAtTime(0.3, startTime + duration);
        masterGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration + 0.3);

        var osc = context.createOscillator();
        osc.type = waveType;
        osc.frequency.value = note.freq;
        
        var oscGain = context.createGain();
        oscGain.gain.value = 1.0;
        
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.4);

        if (vibSpeed > 0) {
            var vibratoOsc = context.createOscillator();
            vibratoOsc.type = 'sine';
            vibratoOsc.frequency.value = vibSpeed;
            
            var vibratoGain = context.createGain();
            vibratoGain.gain.value = (note.freq * 0.01);

            vibratoOsc.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            
            vibratoOsc.start(startTime);
            vibratoOsc.stop(startTime + duration + 0.4);
        }
        
        if (breathAmt > 0) {
            var noiseBuffer = this.createNoiseBuffer(context);
            var noiseNode = context.createBufferSource();
            noiseNode.buffer = noiseBuffer;
            noiseNode.loop = true;
            
            var noiseFilter = context.createBiquadFilter();
            noiseFilter.type = 'lowpass';
            noiseFilter.frequency.value = 1200;
            
            var noiseGain = context.createGain();
            noiseGain.gain.value = breathAmt * 0.8;
            
            noiseNode.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(masterGain);
            
            noiseNode.start(startTime);
            noiseNode.stop(startTime + duration + 0.4);
        }
    }
    
    cleanup() {
        this.removeFluteControls();
    }
}
        
        var brightnessLabel = document.createElement('label');
        brightnessLabel.textContent = 'Brightness';
        brightnessLabel.id = 'bell-brightness-label';
        brightnessLabel.style.marginBottom = '5px';
        brightnessLabel.style.fontSize = '0.8em';
        
        harmGroup.appendChild(brightnessLabel);
