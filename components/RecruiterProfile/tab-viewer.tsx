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
}

export const TabViewer = (props: TabViewerProps) => {
    const [activeTab, setActiveTab] = useState<any>('');
    const [activeElement, setActiveElement] = useState<JSX.Element | null>(null);

    useEffect(() => {
        setActiveElement(props.tabs.elements[activeTab]);
    }, [activeTab]);

    const tabButton = ({ display, value }: TabNames) => {
        return <Button
            onClick={() => setActiveTab(value)}
            buttonStyle={'filter-buttons'}
            className={'mx-10'}
            key={value}
            title={display}
        />;
    };

    return <div className={'w-100'}>
        <div className={'display-flex justify-content-center'}>{props.tabs.tabNames.map((tabName: TabNames) => tabButton(tabName))}</div>
        {activeElement}
    </div>;
};
