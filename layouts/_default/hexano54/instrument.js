// Base Instrument class
class Instrument {
    constructor(name) {
        this.name = name;
    }
    
    init() {
        // Default implementation
    }
    
    playNote(note, freq) {
        // To be implemented by subclasses
    }
    
    stopNote(note) {
        // To be implemented by subclasses
    }
    
    export(context, note, startTime, duration, destination) {
        // To be implemented by subclasses
    }
    
    cleanup() {
        // Default implementation
    }
}
