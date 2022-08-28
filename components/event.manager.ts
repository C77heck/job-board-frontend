export class EventManager {
    public eventName: keyof WindowEventMap;
    public callback!: EventListenerOrEventListenerObject;

    public constructor(eventName: keyof WindowEventMap) {
        this.eventName = eventName;
    }

    public emit(detail: any = {}) {
        if (!window) {
            return;
        }

        window.dispatchEvent(new CustomEvent(this.eventName, {
            detail,
            bubbles: true,
            cancelable: true,
            composed: true,
        }));
    }

    public subscribe(callback: EventListenerOrEventListenerObject) {
        this.callback = callback;
        window.addEventListener(this.eventName, this.callback);
    }

    public unsubscribe() {
        window.removeEventListener(this.eventName, this.callback);
    }
}
