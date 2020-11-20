import {EventDispatcher} from "../Common/Events/EventDispatcher";
import {CommonEvent} from "../Common/Events/CommonEvent";
export class ModelManager extends EventDispatcher
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
        let commonEvent = new CommonEvent(CommonEvent.MODEL_COMPLETE_EVENT);
        commonEvent.value = "modelManager value";
        this.dispatchEvent(commonEvent);
    }
}

class SingletonBlock{}