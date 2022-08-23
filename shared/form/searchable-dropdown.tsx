import React, { Component } from 'react';
import { FieldProps } from './input';

export interface OptionProps {
    value: string;
    title: string;
}

export interface SearchableDropdownProps extends FieldProps<OptionProps> {
    currentValue: string;
    handleChange: (e: any) => void;
    onClickHandler: (onChange: any, value: string) => void;
}

export class SearchableDropdown extends Component<SearchableDropdownProps, any> {
    public state = {
        show: false,
        value: '',
        hasError: false,
        errorMessage: '',
        searchedOptions: [],
        isInFocus: false,
        searchedValue: ''
    };

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
        console.log(this.divRef);
        if (!this.divRef?.current?.contains(event.target)) {
            this.setState({ isInFocus: false, state: false });
        }
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.searchedValue !== this.state.searchedValue) {
            this.manageSearch();
        }
    }

    public manageSearch() {
        const regex = new RegExp(this.state.searchedValue, 'i');
        this.setState({
            searchedOptions: this.props.options?.filter(({ value }) => regex.test(value))
        });
    }

    public searchableDropdown() {
        return <div ref={this.divRef}>
            <div onClick={() => this.setState({ show: !this.state.show })}>
                <input
                    className={'input'}
                    onChange={(e) => this.props.handleChange(e)}
                    value={this.props.value as string}
                    type={this.props.type || 'text'}
                    name={this.props.name}
                    id={this.props.id}
                    readOnly={this.props.readOnly}
                    required={this.props.required}
                    placeholder={this.props.placeholder}
                    autoComplete={this.props.autoComplete}
                    disabled={this.props.disabled}
                    onFocus={() => this.setState({ isInFocus: true })}
                    onKeyDown={(e) => this.manageKeyEvent(e)}
                    onKeyDownCapture={(e) => this.manageKeyEvent(e)}
                />
            </div>
            <div className={`${this.props.className} dropdown-general dropdown dropdown--${this.state.show ? 'show' : 'hide'}`}>
                <ul>
                    {(this.state.searchedOptions || []).map(option => this.renderOption(option))}
                </ul>
            </div>
        </div>;
    }

    public manageKeyEvent({ key }: React.KeyboardEvent<HTMLInputElement>) {
        if (key === 'arrowDown') {
            console.log('kind of success');
        }
        switch (key) {
            case 'arrowDown':
                console.log('bitch arrowDown');
                return;
            case 'arrowUp':
                console.log('suck me arrowUp');
                return;
            case 'enter':
                console.log('enter');
                return;
            default:
                return;
        }
    }

    public renderOption({ value, title }: OptionProps) {
        const isChosen = this.props.value === value;

        return <li
            onFocus={() => console.log('its on focus', value)}
            key={`${value}-${title}`}
            onClick={() => this.props.onClickHandler(isChosen, value)}
            className={`${isChosen && 'text-color--active'}`}
        >
            {title}
        </li>;
    }

    public manageOptions() {
        const hasValue = !!this.props.value;
        const hasOptions = !!this.state.searchedOptions?.length;

        if (hasValue && hasOptions && this.state.isInFocus) {
            return 'dropdown dropdown--show';
        }
        return 'dropdown dropdown--hide';
    }

    public render() {
        return this.searchableDropdown();
    }
}
