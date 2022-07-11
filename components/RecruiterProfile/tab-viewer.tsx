import { useEffect, useState } from 'react';
import { Button } from '../../shared/components/buttons/button';

export interface TabNames {
    display: string;
    value: string;
}

export interface Tab {
    elements: { [key: string]: JSX.Element; };
    tabNames: TabNames[];
}

export interface TabViewerProps {
    tabs: Tab;
    default: string;
}

export const TabViewer = (props: TabViewerProps) => {
    const [activeTab, setActiveTab] = useState<any>('');
    const [activeElement, setActiveElement] = useState<JSX.Element | null>(null);

    useEffect(() => {
        setActiveElement(props.tabs.elements[activeTab]);
    }, [activeTab]);

    useEffect(() => {
        setActiveTab(props.default);
    }, []);

    const tabButton = ({ display, value }: TabNames) => {
        const isActive = value === activeTab ? 'filter-buttons-active' : '';

        return <Button
            onClick={() => setActiveTab(value)}
            buttonStyle={'filter-buttons'}
            className={`${isActive} mx-10`}
            key={value}
            title={display}
        />;
    };

    return <div className={'w-100'}>
        <div className={'display-flex justify-content-center'}>{props.tabs.tabNames.map((tabName: TabNames) => tabButton(tabName))}</div>
        <div className={'mt-30'}>
            {activeElement}
        </div>
    </div>;
};
