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
        console.log(this.props.options);
        this.setState({ searchedOptions: this.props.options });
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
        const regex = new RegExp(this.state?.searchedValue || '', 'i');
        const searchedOptions = this.props.options?.filter(({ value }) => regex.test(value));
        console.log({
            searchedValue: this.state.searchedValue,
            sortedOptions: searchedOptions
        });

        this.setState({
            searchedOptions: searchedOptions
        });
    }

    public handleWrapperClick() {
        console.log('wrapper getting cliocked finsih this fucking component');
        this.setState({ show: !this.state.show });
    }

    public searchableDropdown() {
        return <div className={'w-100'} ref={this.divRef}>
            <div onClick={() => this.handleWrapperClick()}>
                <input
                    className={'input searchable-input'}
                    onChange={(e) => this.props.handleChange(e)}
                    value={this.props.value as string}
                    type={'text'}
                    name={this.props.name}
                    id={this.props.id}
                    readOnly={true}
                    required={this.props.required}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    onFocus={() => this.setState({ isInFocus: true })}
                    onKeyDown={(e) => this.manageKeyEvent(e)}
                    onKeyDownCapture={(e) => this.manageKeyEvent(e)}
                />
            </div>
            <div className={`${this.props.className} dropdown-general dropdown dropdown--searchable dropdown--${this.state.show ? 'show' : 'hide'} display-flex flex-column`}>
                {(this.state.searchedOptions || []).map(option => this.renderOption(option))}
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

    public renderOption(option: OptionProps) {
        const { value, title } = option;
        const isChosen = this.props.value === value;
        console.log({ option });
        return <span
            onFocus={() => console.log('its on focus', value)}
            key={`${value}-${title}`}
            onClick={() => this.props.onClickHandler(isChosen, value)}
            className={`${isChosen && 'text-color--secondary-1 '} fs-14 hover-primary`}
        >
            {title}
        </span>;
    }

    public render() {
        return this.searchableDropdown();
    }
}
