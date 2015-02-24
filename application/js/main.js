    /* jshint ignore:start */

    /**
     * a list of recognised keycodes
     */
    var keyCodes = {
        up: 38,
        down: 40
    };

    /**
     * The number of sections including the header
     * @type {number}
     */
    var sectionCount = document.getElementsByTagName('section').length + 1;

    /**
     * Section number
     * @type {Number}
     */
    var currentSectionNumber = 0;

    /**
     * [currentContainerOffset description]
     * @type {Number}
     */
    var currentContainerOffset = 0;

    /**
     * iOS Device
     * @type {Boolean}
     */
    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

    /**
     * Last animation (date) 
     * @type {Number}
     */
    var lastAnimation = 0;

    /**
     * The period that you cannot use scroll between transition
     * @type {Number}
     */
    var quietPeriod = 1000;

    /**
     * The animation/transition time
     * @type {Number}
     */
    var animationTime = 500;

    /**
     * Initialize
     */
    function init() {
        window.onkeydown = function(event) {
            if (event.keyCode === keyCodes.up) {
                prev();
            } else if (event.keyCode === keyCodes.down) {
                next();
            }
        };
    }

    /**
     * Move to section based on section number
     */   
    var move;

    if (conditionizr.ie8 || conditionizr.ie9) {
        move = function() {

            changeBulletAndNavColor();
            showNavigation();
            
            var el = document.getElementById('container');

            var target = -(currentSectionNumber * window.innerHeight);

            var distanceToCover = Math.abs(target - currentContainerOffset);

            var direction = (target > currentContainerOffset) ? 'up' : 'down';

            // we want to complete in 0.5s, so divide the distance to cover by 30 because 16ms * 60 is ~ 1000
            var pixelsToIncrementBy = parseInt(distanceToCover / 30);

            var scroll = function() {

                if(target > currentContainerOffset) {
                    currentContainerOffset += pixelsToIncrementBy;
                } else if(target < currentContainerOffset) {
                    currentContainerOffset -= pixelsToIncrementBy;
                }
                
                if ((direction === 'up' && currentContainerOffset >= target) || 
                    (direction === 'down' && currentContainerOffset <= target)) {
                  currentContainerOffset = target;
                  clearInterval(id);
                }

                el.style.top = currentContainerOffset + 'px';
            };

            // We want 60fps, so repeat every 16ms because 1000 / 60 is ~16
            var id = setInterval(scroll, 16);
         
        };
    } else {
        move = function() {
            var maskHeight = document.getElementById('mask').offsetHeight;
            changeBulletAndNavColor();
            showNavigation();
            hideDropDown();
            if(iOS) {
                document.getElementById('container').style.top = '-' + (currentSectionNumber * maskHeight) + 'px';
            } else {
                document.getElementById('container').style.top = '-' + (currentSectionNumber * window.innerHeight) + 'px';
            }
            
        };
    }

    /**
     * Go the next section
     */
    var next = function() {
        if (currentSectionNumber + 1 === sectionCount) {
            return;
        }
        currentSectionNumber++;
        move();
    };

    /**
     * Go to previous section
     */
    var prev = function() {
        if (currentSectionNumber === 0) {
            return;
        }
        currentSectionNumber--;
        move();
    };

    /**
     * Go to a specific section
     * @param  {number} section
     */
    var section = function(section) {
        currentSectionNumber = parseInt(section);
        move();
    };

    /**
     * Checks if user scrolls up or down and goes to the next or prev section
     * @param  {number} delta
     */
    function handle(delta) {
        if (delta > 0) {
            prev();
        } else if (delta <= 0) {
            next();
        }
    }

    /**
     * Checks if user scrolls up or down and calls handle function
     * @param  {object} event
     * @return {number}
     */
    function wheel(event){
        var timeNow = new Date().getTime();
        if(timeNow - lastAnimation < quietPeriod + animationTime) {
            event.preventDefault();
            return;
        }

        var delta = 0;
        var currentEvent = event || window.event;

        if (currentEvent.wheelDelta) {
            delta = (window.opera ? -1 : 1) * currentEvent.wheelDelta / 120;
        } else if (currentEvent.detail) {
            delta = -currentEvent.detail / 3;
        }

        if (delta) {
            lastAnimation = timeNow;
            handle(delta);
        }
    }

    /**
     * On resizing the window recalculate the height of the current slide
     */
    if(window.attachEvent) {
        window.attachEvent('onresize', function() {
            move();
        });
    } else if(window.addEventListener) {
        window.addEventListener('resize', function(){
            move();
        });
    }
    

    /**
     * Event listener for the mousescroll
     */
    if(window.attachEvent) {
        window.attachEvent ('onmousewheel', wheel);
    } else if(window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }

    window.onmousewheel = document.onmousewheel = wheel;


    /**
     * Event listener for swiping on mobile devices
     */

    var xDown = null;
    var yDown = null;

    var handleTouchStart = function(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    };

    var handleTouchMove = function(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var yUp = evt.touches[0].clientY;

        var yDiff = yDown - yUp;

        if (yDiff > 0) {
            next();
        } else {
            prev();
        }

        /* reset values */
        xDown = null;
        yDown = null;
    };

    if(window.addEventListener) {
        window.addEventListener('touchstart', handleTouchStart, false);
        window.addEventListener('touchmove', handleTouchMove, false);
    }
    
    init();   

    /* jshint ignore:end */ 
