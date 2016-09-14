'use strict';

(function () {
    var timeline = document.getElementsByClassName('timeline');
    for (var i = 1; i < timeline.length; i++) {
        timeline[i].setAttribute('data-wow-delay', i * 0.3 + 's');
    }
})();
//# sourceMappingURL=bigEvent.js.map
