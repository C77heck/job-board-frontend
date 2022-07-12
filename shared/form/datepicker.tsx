import React, { Component } from 'react';

export class Datepicker extends Component<any, any> {
    public render() {
        return <div className={'position-center w-100'}>
            <input
                className={`input ${this.props.inputClasses} h-px-35 w-100 pl-8`}
                onChange={(e) => this.props.handleChange(e)}
                value={this.props.value}
                type={'date'}
                name={this.props.name}
                id={this.props.id}
                readOnly={this.props.readOnly}
                required={this.props.required}
                placeholder={this.props.placeholder}
                autoComplete={this.props.autoComplete}
                disabled={this.props.disabled}
                onFocus={() => this.props.onFocus()}
                onBlur={() => this.props.onBlur()}
            />
        </div>;
    }
}
