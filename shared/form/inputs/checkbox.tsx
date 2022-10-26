import React, { Component } from 'react';

export class Checkbox extends Component<any, any> {
    public state = {
        active: false,
    };

    public renderCheckIcon(isActive: boolean) {
        return;
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.active !== this.state.active && this.props.handleChange) {
            this.props.handleChange({ target: { value: this.state.active } });
        }
    }

    public handleOnClick() {
        this.setState({ active: !this.state.active });
    }

    public render() {

        return <button
            className={'question-button display-flex py-1 mt-30 mb-5 hover-opacity'}
            onClick={() => this.handleOnClick()}
            type={'button'}
        >
            <div className={'display-flex question-circle justify-content-center align-items-center mt-3'}>
                <div className={`question-circle--filling background-color--primary-1 ${!this.state.active && 'scale-0'}`}/>
            </div>
            <span className={'typo-small-inter fw-700 pl-5 pt-1'}>{this.props.label}</span>
        </button>;
    }
}
