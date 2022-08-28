import { useState } from 'react';
import { EventManager } from '../../components/event.manager';

export const useEvent = (eventName: string) => {
    const [event] = useState<EventManager>(new EventManager(eventName as keyof WindowEventMap));

    const subscribe = (callback: EventListenerOrEventListenerObject) => {
        console.log(!event, 'subscribe');
        if (!event) {
            return;
        }

        event.subscribe(callback);
    };

    const emit = (data: any = {}) => {
        console.log(!event, 'emit');

        if (!event) {
            return;
        }

        event.emit(data);
    };

    const unsubscribe = () => {
        console.log(!event, 'unsubscribe');

        if (!event) {
            return;
        }

        event.unsubscribe();
    };

    return { event, emit, subscribe, unsubscribe };
};
