import * as React from 'react';
import { FieldProps } from '../input';

export interface OptionProps {
    value: string | number;
    title: string | number;
}

export interface DropdownProps<TValue> extends Omit<FieldProps<OptionProps>, 'value'> {
    handleChange: (e: any) => void;
    onClickHandler: (onChange: any, value: OptionProps) => void;
    value: TValue;
    options: OptionProps[];
}

export interface DropdownState {
    show: boolean;
    hasError: boolean;
    errorMessage: string;
    searchedOptions: OptionProps[];
    searchedValue: string;
}

export abstract class AbstractDropdown<TProps extends DropdownProps<any>, TState extends DropdownState> extends React.Component<TProps | DropdownProps<any>, TState | DropdownState> {
    public state = {
        show: false,
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
        this.setState({ searchedOptions: this.props?.options || [] });
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
        switch (e.key) {
            case 'ArrowDown':
                this.manageSteps('down');
                break;
            case 'ArrowUp':
                this.manageSteps('up');
                break;
            case 'Enter':
                this.manageEnterKeyPress();
                break;
            case 'Tab':
                this.manageTabKeyPress();
                break;
            default:
                break;
        }
    }

    public render(): JSX.Element {
        return <div className={'w-100'} ref={this.divRef}>
            <div className={'display-flex'} onClick={() => this.setState({ show: !this.state.show })}>
                {this.renderInputContent()}
            </div>
            <div className={`${this.props.className} dropdown-general dropdown dropdown--searchable dropdown--${this.state.show ? 'show' : 'hide'} display-flex flex-column`}>
                {this.renderDropdownContent()}
            </div>
        </div>;
    };

    public abstract renderInputContent(): JSX.Element;

    public abstract renderDropdownContent(): JSX.Element;

    public abstract manageSteps(direction: 'down' | 'up'): void;

    public abstract getIndex(direction: 'down' | 'up'): number;

    public abstract manageEnterKeyPress(): void;

    public abstract manageTabKeyPress(): void;
}
