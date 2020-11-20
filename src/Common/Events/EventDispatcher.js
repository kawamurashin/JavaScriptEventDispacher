/**
 * @author kawamura shin
 * EventDispatcher クラスのインスタンスを集約します。
 * tsEventDispacherの移植
 * https://github.com/ts020/tsEventDispacher
 */
export class EventDispatcher {
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
export class EventListener {
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
export class Event {
    constructor( type = null,  value = null) {
        this.type = type;
        this.value = value;
        Event.COMPLETE = "complete";
        Event.CHANGE_PROPERTY ="changeProperty";
    }
}


