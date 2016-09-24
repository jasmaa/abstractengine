goog.require("engine.EngineInput");
goog.provide("engine.Engine");

class Engine extends EngineInput {
        
    constructor(canvas) { 
        super(canvas);
        this.updateLimit = 60;
        this.updateInterval = 1000 / this.updateLimit;
        this.updateTime = 0;
        this.renderTime = 0;
        this.renderTrackingCount = 20;
        this.renderTrackingIndex = 0;
        this.renderHistory = new Array(this.renderTrackingCount);
    }
    
    _setup() {
        console.log("Setting up.")
        this.setup();
        this.loadAssets(() => { this._load(); });
    }
    
    _load() {
        console.log("Loaded resources.");
        this.load();
        this._start();
    }
    
    _start() {
        console.log("Starting the engine.");
        setInterval(() => this._update(), this.updateInterval);
        this._render();
    }
    
    _update() {   
        var delta = Date.now() - this.updateTime;
        this.updateTime = Date.now();
        this.update(delta);
    }
    
    _render() {
        requestAnimationFrame(this._render.bind(this));
        var delta = Date.now() - this.renderTime;
        this.renderTime = Date.now();
        this.render(this.context, this.canvas);
        this.renderHistory[this.renderTrackingIndex] = delta;
        this.renderTrackingIndex++;
        if (this.renderTrackingIndex == this.renderTrackingCount) 
            this.renderTrackingIndex = 0;
    }
    
    setup() {}
    load() {}
    update(delta) {}
    render(context, canvas) {}
    stop() {}
    cleanup() {}
    
    main() { this._setup(); }
    
    fps() {
        return this.renderHistory
            .map(function(x) { return 1000/x; })
            .reduce(function(a, b) { return a+b; }, 0) 
            / this.renderTrackingCount
    }
    
}
