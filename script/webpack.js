/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Common/Events/CommonEvent.js":
/*!******************************************!*\
  !*** ./src/Common/Events/CommonEvent.js ***!
  \******************************************/
/*! namespace exports */
/*! export CommonEvent [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommonEvent": () => /* binding */ CommonEvent
/* harmony export */ });
/* harmony import */ var _EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventDispatcher */ "./src/Common/Events/EventDispatcher.js");

class CommonEvent extends _EventDispatcher__WEBPACK_IMPORTED_MODULE_0__.Event{
    constructor(type = null, value = null) {
        super(type, value);
    }
}
//Constant
CommonEvent.MODEL_COMPLETE_EVENT = "model_complete_event";

/***/ }),

/***/ "./src/Common/Events/EventDispatcher.js":
/*!**********************************************!*\
  !*** ./src/Common/Events/EventDispatcher.js ***!
  \**********************************************/
/*! namespace exports */
/*! export Event [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EventDispatcher [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EventListener [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventDispatcher": () => /* binding */ EventDispatcher,
/* harmony export */   "EventListener": () => /* binding */ EventListener,
/* harmony export */   "Event": () => /* binding */ Event
/* harmony export */ });
/**
 * @author kawamura shin
 * EventDispatcher クラスのインスタンスを集約します。
 * tsEventDispacherの移植
 * https://github.com/ts020/tsEventDispacher
 */
class EventDispatcher {
    constructor() {
        this.listeners = {};
    }
    /**
     * イベントをイベントフローに送出します。
     * @param {Event}event ベントフローに送出されるイベントオブジェクトです。
     */
    dispatchEvent(event) {
        let e;
        let type;
        if (event instanceof Event) {
            type = event.type;
            e = event;
        } else {
            type = event;
            e = new Event(type);
        }

        if(this.listeners[type] != null){
            e.currentTarget = this;
            for (let i = 0; i < this.listeners[type].length; i++){
                let listener = this.listeners[type][i];
                try {
                    listener.handler(e);
                } catch (error) {
                    if (window.console) {
                        console.error(error.stack);
                    }
                }
            }
        }
    }

    /**
     * イベントリスナーオブジェクトを EventDispatcher オブジェクトに登録し、リスナーがイベントの通知を受け取るようにします。
     * @param {string}type イベントのタイプです。
     * @param {function}callback イベントを処理するリスナー関数です。この関数は、次の例のように、Event オブジェクトを唯一のパラメーターとして受け取り、何も返さないものである必要があります。
     * @param {number}priority 優先度
     */
    addEventListener(type, callback, priority = 0) {
        if(this.listeners[type] == null){
            this.listeners[type] = [];
        }
        this.listeners[type].push(new EventListener(type, callback, priority));
        this.listeners[type].sort(function (listener1, listener2) {
            return listener2.priority - listener1.priority;
        });
    }

    /**
     * オブジェクトからリスナーを削除します。
     * @param {string}type イベントのタイプです。
     * @param {function}callback 削除するリスナーオブジェクトです。
     */
    removeEventListener(type, callback) {
        if(this.hasEventListener(type, callback)) {
            for(let i=0; i < this.listeners[type].length; i++){
                let listener = this.listeners[type][i];
                if(listener.equalCurrentListener(type, callback)) {
                    listener.handler = null;
                    this.listeners[type].splice(i,1);
                    return;
                }
            }
        }
    }

    /**
     * リスナーの初期化
     */
    clearEventListener() {
        this.listeners = {};
    }

    /**
     * EventDispatcher オブジェクトに、特定のイベントタイプに対して登録されたリスナーがあるかどうかを確認します。
     * @param {string}type イベントのタイプです。
     * @returns {boolean} 指定したタイプのリスナーが登録されている場合は true、それ以外の場合は false です。
     */
    containEventListener(type) {
        if (this.listeners[type] == null) return false;
        return this.listeners[type].length > 0;
    }

    /**
     * EventDispatcher オブジェクトに、特定のイベントタイプとリスナー関数が登録されたリスナーがあるかどうかを確認します。
     * @param {string}type イベントのタイプです。
     * @param {function}callback
     * @returns {boolean} 指定したタイプとリスナー関数をもつリスナーオブジェクトが登録されている場合は true、それ以外の場合は false です。
     */
    hasEventListener(type, callback) {
        if(this.listeners[type] == null) return false;
        for(let i=0; i < this.listeners[type].length; i++){
            let listener = this.listeners[type][i];
            if(listener.equalCurrentListener(type, callback)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * リスナーの登録オブジェクト
 */
class EventListener {
    constructor( type = null,  handler = null,  priority = 0) {
        this.type = type;
        this.handler = handler;
    }
    equalCurrentListener(type, handler) {
        if (this.type == type && this.handler == handler) {
            return true;
        }
        return false;
    }
}

/**
 * イベントリスナーにパラメーターとして渡す Event オブジェクトを作成します。
 */
class Event {
    constructor( type = null,  value = null) {
        this.type = type;
        this.value = value;
        Event.COMPLETE = "complete";
        Event.CHANGE_PROPERTY ="changeProperty";
    }
}




/***/ }),

/***/ "./src/Controller/ControllerManager.js":
/*!*********************************************!*\
  !*** ./src/Controller/ControllerManager.js ***!
  \*********************************************/
/*! namespace exports */
/*! export ControllerManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControllerManager": () => /* binding */ ControllerManager
/* harmony export */ });
/* harmony import */ var _Model_ModelManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/ModelManager */ "./src/Model/ModelManager.js");
/* harmony import */ var _Common_Events_CommonEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Events/CommonEvent */ "./src/Common/Events/CommonEvent.js");


class ControllerManager {
    constructor() {
        const handler = (e) => {
            this.eventHandler(e);
        }
        this._modelManger = _Model_ModelManager__WEBPACK_IMPORTED_MODULE_0__.ModelManager.getInstance();
        this._modelManger.addEventListener(_Common_Events_CommonEvent__WEBPACK_IMPORTED_MODULE_1__.CommonEvent.MODEL_COMPLETE_EVENT, handler);
    }

    start() {
        this._modelManger.start();
    }

    eventHandler(e) {
        console.log("handler");
        console.log(e.currentTarget);
        console.log(e.value);

    }
}

/***/ }),

/***/ "./src/Main.js":
/*!*********************!*\
  !*** ./src/Main.js ***!
  \*********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Controller_ControllerManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller/ControllerManager */ "./src/Controller/ControllerManager.js");

class Main
{
    constructor() {
        console.log("main start")
        let controllerManager = new _Controller_ControllerManager__WEBPACK_IMPORTED_MODULE_0__.ControllerManager();
        controllerManager.start();
    }
}

window.addEventListener("load" , () =>
{
    new Main();
})



/***/ }),

/***/ "./src/Model/ModelManager.js":
/*!***********************************!*\
  !*** ./src/Model/ModelManager.js ***!
  \***********************************/
/*! namespace exports */
/*! export ModelManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelManager": () => /* binding */ ModelManager
/* harmony export */ });
/* harmony import */ var _Common_Events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/Events/EventDispatcher */ "./src/Common/Events/EventDispatcher.js");
/* harmony import */ var _Common_Events_CommonEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Events/CommonEvent */ "./src/Common/Events/CommonEvent.js");


class ModelManager extends _Common_Events_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher
{

    static getInstance()
    {
        if(this._instance == null)
        {
            this._instance = new ModelManager(new SingletonBlock());
        }
        return this._instance;
    }

    constructor(block) {
        super();
    }
    start()
    {
        let handler = () =>
        {
            this.setTimeoutHandler();
        }
        setTimeout(handler , 1000);
    }

    setTimeoutHandler()
    {
        let commonEvent = new _Common_Events_CommonEvent__WEBPACK_IMPORTED_MODULE_1__.CommonEvent(_Common_Events_CommonEvent__WEBPACK_IMPORTED_MODULE_1__.CommonEvent.MODEL_COMPLETE_EVENT);
        commonEvent.value = "modelManager value";
        this.dispatchEvent(commonEvent);
    }
}

class SingletonBlock{}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/Main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=webpack.js.map