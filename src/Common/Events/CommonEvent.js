import {Event} from "./EventDispatcher";
export class CommonEvent extends Event{
    constructor(type = null, value = null) {
        super(type, value);
    }
}
//Constant
CommonEvent.MODEL_COMPLETE_EVENT = "model_complete_event";