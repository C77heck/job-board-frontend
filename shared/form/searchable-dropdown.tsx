import React, { Component } from 'react';
import { ArrowDown, ArrowUp } from '../components/icons/icons';
import { FieldProps } from './input';

export interface OptionProps {
    value: string;
    title: string;
}

export interface SearchableDropdownProps extends Omit<FieldProps<OptionProps>, 'value'> {
    currentValue: string;
    handleChange: (e: any) => void;
    onClickHandler: (onChange: any, value: OptionProps) => void;
    value: OptionProps;
}

export interface SearchableDropdownState {
    show: boolean;
    value: string;
    hasError: boolean;
    errorMessage: string;
    searchedOptions: OptionProps[];
    searchedValue: string;
}

export class SearchableDropdown extends Component<SearchableDropdownProps, SearchableDropdownState> {
    public state = {
        show: false,
        value: '',
        hasError: false,
        errorMessage: '',
        searchedOptions: [],
        searchedValue: ''
    };

    public divRef: React.RefObject<any> = React.createRef();

    constructor(props: any) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    public componentDidMount() {
        this.assignClickHandler();
        this.setState({ searchedOptions: this.props.options });
    }

    public componentWillUnmount() {
        this.removeClickHandler();
        this.assignKeyDownListener(false);
    }

    public assignClickHandler() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    public removeClickHandler() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    public handleClickOutside(event: any) {
        if (!this.divRef?.current?.contains(event.target)) {
            this.setState({ show: false });
        }
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if (prevState.searchedValue !== this.state.searchedValue) {
            this.manageSearch();
        }
        if (prevState.show !== this.state.show) {
            this.assignKeyDownListener(this.state.show);
        }
    }

    public keyPressListener = this.assignKeyDownListener.bind(this);

    public assignKeyDownListener(isVisible: boolean): any {
        if (!isVisible) {
            const keyListener: any = this.keyPressListener;

            return document.removeEventListener('keydown', keyListener);
        }

        const keyListener = this.listenForKeyPress.bind(this);

        this.keyPressListener = keyListener;

        return document.addEventListener('keydown', keyListener);
    }

    public listenForKeyPress(e: any) {
        // TODO -> We need to know the index
        switch (e.key) {
            case 'ArrowDown':
                this.manageSteps('down');
                break;
            case 'ArrowUp':
                this.manageSteps('up');
                break;
            case 'Enter':
                if (!this.props.value) {
                    this.props.handleChange({ target: { value: this.state.searchedOptions[0] } });
                }
                this.setState({ show: false });
                break;
            case 'Tab':
                // @ts-ignore
                this.setState({ show: false });
                break;
            default:
                break;
        }
    }

    public getIndex(direction: 'up' | 'down'): number {
        if (!this.props.value) {
            return direction === 'down' ? 0 : this.state.searchedOptions.length - 1;
        }

        let index = 0;
        const options: OptionProps[] = this.state.searchedOptions;

        for (const option of options) {
            if (option.value === this.props.value.value) {
                return direction === 'down' ? index + 1 : index - 1;
            }
            index++;
        }

        throw 'No options to search';
    }

    public manageSteps(direction: 'up' | 'down') {
        try {
            const index = this.getIndex(direction);
            console.log({ index });
            switch (direction) {
                case 'up':
                    this.props.handleChange({ target: { value: this.state.searchedOptions[this.getIndex(direction)] } });
                    break;
                case 'down':
                    this.props.handleChange({ target: { value: this.state.searchedOptions[this.getIndex(direction)] } });
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    }

    public manageSearch() {
        const regex = new RegExp(this.state?.searchedValue || '', 'i');
        const searchedOptions = this.props.options?.filter(({ title }) => regex.test(title));

        this.setState({ searchedOptions });
    }

    public render() {
        return <div className={'w-100'} ref={this.divRef}>
            <div
                className={'display-flex'}
                onClick={() => this.setState({ show: !this.state.show })}
            >
                <input
                    className={'input display-none'}
                    onChange={(e) => this.props.handleChange(e)}
                    value={this.props.value as any}
                    type={'text'}
                    name={this.props.name}
                    id={this.props.id}
                    readOnly={true}
                    required={this.props.required}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                />
                <span className={'searchable-input w-100 fs-13 line-height-17 p-3'}>{this.props?.value?.title || '-'}</span>
                {this.renderArrows()}
            </div>
            <div className={`${this.props.className} dropdown-general dropdown dropdown--searchable dropdown--${this.state.show ? 'show' : 'hide'} display-flex flex-column`}>
                {this.renderSearchInput()}
                {(this.state.searchedOptions || []).map(option => this.renderOption(option))}
            </div>
        </div>;
    }

    public renderSearchInput() {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ searchedValue: e.target.value });
        };
        return <input
            className={'input search-bar-input'}
            onChange={(e) => handleChange(e)}
            value={this.state.searchedValue}
            type={'text'}
            placeholder={'Type here...'}
        />;
    }

    public renderArrows() {
        return this.state.show
            ? <ArrowUp color={'rgba(8, 61, 66, 0.53)'} className={'position-center arrow-wrapper'} width={15}/>
            : <ArrowDown color={'rgba(8, 61, 66, 0.53)'} className={'position-center arrow-wrapper'} width={15}/>;
    }

    public renderOption(option: OptionProps) {
        const { value, title } = option;
        const isChosen = this.props.value?.value === value;

        return <span
            onFocus={() => console.log('its on focus', value)}
            key={`${value}-${title}`}
            onClick={() => this.props.onClickHandler(isChosen, option)}
            className={`${isChosen && 'select-input-active-option'} fs-14 hover-primary pb-4`}
        >
            {title}
        </span>;
    }
}
