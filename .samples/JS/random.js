/* eslint-disable no-constant-condition */
// double slash comment: Java Script syntax example

"use strict";

(function() {
  const isChrome = window.chrome || navigator.userAgent.match("CriOS");
  var isTouch = "ontouchstart" in document.documentElement;

  if (!isChrome || !isTouch) {
    var supportsOverscroll = false;
    let lastTouchY = 0;
    return lastTouchY;
  }

  console.log(`Hello ${isChrome} World!`);

  const object = {
    key1: "value1",
    key2: 1234,
    "345": "value3",
  };

  try {
    if (CSS.supports("overscroll-behavior-y", "contain")) {
      supportsOverscroll = true;
    }
  } catch (e) {
    return;
  }

  if (supportsOverscroll) {
    return (document.body.style.overscrollBehaviorY = "contain");
  } else {
    var head = document.head || document.body;
    var style = document.createElement("style");
    var css =
      "\n      ::-webkit-scrollbar {\n        width: 5px;\n      }\n      ::-webkit-scrollbar-thumb {\n        border-radius: 5px;\n        background-color: rgba(0, 0, 0, 0.2);\n      }\n      body {\n        -webkit-overflow-scrolling: auto!important;\n      }\n    ";
    style.type = "text/css";

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  try {
    window.addEventListener("test", null, {
      get passive() {
        return (supportsPassive = true);
      },
    });
  } catch (e) {
    return;
  }

  const setTouchStartPoint = function setTouchStartPoint(event) {
    lastTouchY = event.touches[0].clientY;
  };

  let isScrollingUp = function isScrollingUp(event) {
    var touchY = event.touches[0].clientY;
    const touchYDelta = touchY - lastTouchY;
    lastTouchY = touchY;
    return touchYDelta > 0;
  };

  var touchstartHandler = function touchstartHandler(event) {
    if (event.touches.length !== 1) return;
    setTouchStartPoint(event);
    maybePrevent = window.pageYOffset === 0;
  };

  var touchmoveHandler = function touchmoveHandler(event) {
    if (maybePrevent) {
      maybePrevent = false;

      if (isScrollingUp(event)) {
        return event.preventDefault();
      }
    }
  };

  document.addEventListener(
    "touchstart",
    touchstartHandler,
    supportsPassive
      ? {
          passive: true,
        }
      : false
  );
  document.addEventListener(
    "touchmove",
    touchmoveHandler,
    supportsPassive
      ? {
          passive: false,
        }
      : false
  );
  object;
})();
