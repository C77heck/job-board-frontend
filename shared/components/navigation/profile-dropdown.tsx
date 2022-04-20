import React, { Component } from 'react';

export interface ProfileDropdown {
    trigger: JSX.Element;
    content: JSX.Element;
}

export class ProfileDropdown extends Component<any, any> {
    public state = { show: false, isInFocus: false };
    public divRef: React.RefObject<any> = React.createRef();

    constructor(props: any) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    public componentDidMount() {
        this.assignClickHandler();
    }

    public componentWillUnmount() {
        this.removeClickHandler();
    }

    public assignClickHandler() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    public removeClickHandler() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    public handleClickOutside(event: any) {
        if (!this.divRef.current.contains(event.target)) {
            this.setState({ show: false });
        }
    }

    public render() {
        return <div ref={this.divRef}>
            <div onClick={() => this.setState({ show: !this.state.show })}>
                {this.props.trigger && this.props.trigger}
            </div>
            <div className={`dropdown-general dropdown dropdown--${this.state.show ? 'show' : 'hide'}`}>
                {this.props.content && this.props.content}
            </div>
        </div>;
    }
};
