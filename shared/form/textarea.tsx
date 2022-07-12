import React, { Component } from 'react';

export class Textarea extends Component<any, any> {
    public render() {
        return <div className={`${this.props.className} display-flex justify-content-center w-100 flex-column`}>
            {this.props.label && <label
                className={`input-label error-${this.props.hasError && !this.props.isInFocus ? 'show' : 'hide'}--label ${this.props.labelClass}`}
                htmlFor={this.props.name}
            >
                {this.props.label}
            </label>}
            <textarea
                className={`${this.props.inputClasses}input w-100 pl-8 py-5`}
                rows={this.props.rows}
                cols={this.props.cols}
                onChange={(e) => this.props.handleChange(e)}
                value={this.props.value}
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
