import {ControllerManager} from "./Controller/ControllerManager";
class Main
{
    constructor() {
        console.log("main start")
        let controllerManager = new ControllerManager();
        controllerManager.start();
    }
}

window.addEventListener("load" , () =>
{
    new Main();
})

