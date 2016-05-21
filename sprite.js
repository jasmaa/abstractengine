/** General sprite utilities. */
var sprite = {};

/** Transform. */
sprite.Transform = function Transform(x, y, r, v, w) {
    
    /** Basic transform information. */
    this.position = new geometry.Vector(x || 0, y || 0);
    this.rotation = r || 0;
    this.scale = new geometry.Vector(v || 0, w || 0);
    
}

/** Fancy property methods. */
sprite.Transform.prototype = {
    
    /* Setters and getters for members. V and W are scale. */
    get x() { return this.position.x; },
    set x($) { this.position.x = $; },
    get y() { return this.position.y; },
    set y($) { this.position.y = $; },
    get r() { return this.rotation; },
    set r($) { this.rotation = $; },
    get v() { return this.scale.x; },
    set v($) { this.scale.x = $; },
    get w() { return this.scale.y; },
    set w($) { this.scale.y = $; }
    
}

/** The sprite class. */
sprite.Sprite = function Sprite(x, y, w, h, c, d) {
    
    /** Transform and center. */
    this.transform = new sprite.Transform(x, y);
    this.width = 0;
    this.height = 0;
    this.center = c && d && new geometry.Vector(c, d);  // null if c or d are not defined
    
    /** Bounding box. */
    this.bbox = geometry.bbox;
    
    /** Update the sprite. */
    this.update = function(delta) {}
    
    /** Render the sprite. */
    this.render = function(context) {}

}