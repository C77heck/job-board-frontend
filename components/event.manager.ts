export class EventManager {
    public event: Event;
    public eventName: string;
    public element: any;
    public callback?: Function;

    public constructor(eventName: string) {
        this.eventName = eventName;
        this.event = new CustomEvent(eventName, {
            detail: {},
            bubbles: true,
            cancelable: true,
            composed: true,
        });

        // @ts-ignore
    }

    public emit() {
        window.dispatchEvent(this.event);
    }

    // TODO WE CAN CATCH THE DETAILS LIKE SO: e.target.details
    public subscribe(callback: Function) {
        this.callback = callback;
        // @ts-ignore
        window.addEventListener(this.eventName, callback);
    }

    public unsubscribe() {
        // @ts-ignore
        window.removeEventListener(this.eventName, this.callback);
    }
}
