import {ModelManager} from "../Model/ModelManager";
import {CommonEvent} from "../Common/Events/CommonEvent";
export class ControllerManager {
    constructor() {
        const handler = (e) => {
            this.eventHandler(e);
        }
        this._modelManger = ModelManager.getInstance();
        this._modelManger.addEventListener(CommonEvent.MODEL_COMPLETE_EVENT, handler);
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