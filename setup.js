/** Abstract Engine dependencies. */
var dependencies = ["vector.js", "animation.js", "sprite.js", "engine.js"];

/** Require a set of javascript files. */
function require(files, callback) {
    
    /* Set up ready hooks. */
    var ready = [];
    var done = false;
    var and = function(a, b) { return a && b; };
    var check = function() { 
        if (ready.indexOf(null) == -1 && !done) {
            callback(ready.reduce(and)); 
            done = true;
        }
    };
    
    /* Iterate through files. */
    for (var i = 0; i < files.length; i++) {
        
        /* Create script and custom hook. */
        var script = document.createElement("script");
        script.index = i;
        script.type = "text/javascript";
        script.src = files[i];

        /* Create event callbacks. */
        var hook = function() { ready[this.index] = true; check(); };
        script.onreadystatechange = hook;
        script.onload = hook;
        ready[i] = null;
        
        /* Add the script. */
        try { document.head.appendChild(script); check(); }
        catch (e) { ready[i] = false; }
        
    }
    
}

/* Check start function. */
if (typeof start === "function") {
    
    /* Load the engine. */
    if (typeof ENGINE !== "string") var ENGINE = "";
    dependencies = dependencies.map(function(file) { return ENGINE+file; });
    require(dependencies, start);
    console.log("Loaded dependencies.");

/* Otherwise. */
} else { console.error("No start function is defined."); }