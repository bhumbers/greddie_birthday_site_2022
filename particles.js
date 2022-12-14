var W = 100;
var H = 100;

var particles = [];

var _config = {
  particle_count: 20,
  minDelay: 1,
  maxDelay: 60,
  minDiameter: 10,
  maxDiameter: 100,
  delayMultiples: 100
};

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function Particle(parent) {
  this.parent = parent;
  this.id = ''; 
  margin = 0.5;
  this.x = function() {
    return getRandom(-W*margin, W*margin);
  };
  this.y = function() {
    return getRandom(-H*margin, H*margin);
  };
  this.diam = function() {
    return getRandom(_config.minDiameter, _config.maxDiameter);
  };
  this.delay = function() {
    return getRandom(_config.minDelay, _config.maxDelay) * _config.delayMultiples;
  };
}

Particle.prototype.start = function() {
  var newPar = this.createNewParticle();
  this.addParticle(newPar);
  return 1;
};

Particle.prototype.createNewParticle = function() {
  var newPar = document.createElement('div');
    newPar.setAttribute('id', this.id);
    newPar.setAttribute('class', 'loading-icon');
    newPar.style.width = newPar.style.height = this.diam() + 'pt';
    newPar.style.left = this.x() + 'pt';
    newPar.style.top = this.y() + 'pt';
    return newPar;
};

Particle.prototype.addParticle = function(newPar) {
  var self = this;
    setTimeout(function(){
      self.parent.insertBefore(newPar, self.parent.firstChild);
      self.move();
    }, self.delay());
  return 1;
};

// Move to new position after 4 seconds
// Get new position to update
Particle.prototype.move = function() {
    var self = this;
    var id = this.id;
    var newLeft = this.x();
    var newTop = this.y();
    var newWidth, newHeight;
    newWidth = newHeight = this.diam();
    setTimeout(function() {
      var currentPar = $('#' + id);
      currentPar.css({top: newTop, left: newLeft, width: newWidth, height: newHeight});
      self.move();
    }, 4000);
  return 1;
};

function startParticles(parent) {
	// Create particles list
	for (var i = 0; i < _config.particle_count; i++) {
	  var particle = new Particle(parent);
	  particles.push(particle);
	}

	particles.forEach(function(particle) {
	  var id = particles.indexOf(particle);
	  particle.id = 'particle-' + id;
	  var delay = particle.delay();
	  particle.start();
	});
}