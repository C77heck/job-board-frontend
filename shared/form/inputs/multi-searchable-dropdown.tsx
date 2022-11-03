import React from 'react';
import { ArrowDown, ArrowUp } from '../../components/icons/icons';
import { handleErrors } from '../../libs/handle-errors';
import { AbstractDropdown, DropdownProps, DropdownState, OptionProps } from './libs/abstract.dropdown';

export interface MultiSearchableDropdownProps extends Omit<DropdownProps<OptionProps[]>, 'onClickHandler' | 'value'> {
    onClickHandler: (options: OptionProps[]) => void;
    value: OptionProps[];
}

export class MultiSearchableDropdown extends AbstractDropdown<MultiSearchableDropdownProps, DropdownState> {
    public componentDidMount() {
        super.componentDidMount();
        this.setState({ searchedOptions: this.props?.options || [] });
    }

    public componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        super.componentDidUpdate(prevProps, prevState);
        if (prevState.searchedValue !== this.state.searchedValue) {
            this.manageSearch();
        }
        if (prevState.searchedOptions !== this.state.searchedOptions) {
            console.log(this.state.searchedOptions);
        }
    }

    public manageEnterKeyPress() {
        if (!this.props.value) {
            this.props.handleChange({ target: { value: this.state.searchedOptions[0] } });
        }
        this.setState({ show: false });
    }

    public manageTabKeyPress() {
        if (!this.props.value) {
            this.props.handleChange({ target: { value: this.state.searchedOptions[0] } });
        }
        this.setState({ show: false });
    }

    public manageSteps(direction: 'up' | 'down') {
        try {
            const index = this.getIndex(direction);

            switch (direction) {
                case 'up':
                    this.props.handleChange({ target: { value: this.state.searchedOptions[index] } });
                    break;
                case 'down':
                    this.props.handleChange({ target: { value: this.state.searchedOptions[index] } });
                    break;
                default:
                    break;
            }
        } catch (e) {
            handleErrors(e);
        }
    }

    public getIndex(direction: 'up' | 'down'): number {
        if (!this.props.value) {
            return direction === 'down' ? 0 : this.state.searchedOptions.length - 1;
        }

        let index = 0;
        const options: OptionProps[] = this.state.searchedOptions;

        for (const option of options) {
            const isChosen = !!(this.props.value || []).find(v => v.value === option.value);

            if (isChosen) {
                return direction === 'down' ? index + 1 : index - 1;
            }
            index++;
        }

        throw 'No options to search';
    }

    public handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchedValue: e.target.value });
    };

    public manageSearch() {
        const regex = new RegExp(this.state?.searchedValue || '', 'i');
        const searchedOptions = (this.props?.options || []).filter(({ title }) => regex.test(title.toString()));

        this.setState({ searchedOptions });
    }

    public renderDropdownContent() {
        return <>
            {this.renderSearchInput()}
            {(this.state.searchedOptions || []).map(option => this.renderOption(option))}
        </>;
    }

    public handleOnClick(option: OptionProps) {
        this.props.onClickHandler([...(this.props?.value || []), option]);
    }

    public renderInputContent() {
        return <div
            className={'display-flex w-100'}
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
            {this.props?.value?.length
                ? this.props.value.map(item => item?.title && <span key={item.title} className={'searchable-input w-100 fs-13 line-height-17 p-3'}>{item.title}</span>)
                : <span className={'searchable-input w-100 fs-13 line-height-17 p-3'}>-</span>}
            {this.renderArrows()}
        </div>;
    }

    public renderSearchInput() {
        return <input
            className={'input search-bar-input'}
            onChange={(e) => this.handleChange(e)}
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
        const isChosen = !!(this.props.value || []).find(v => v.value === value);

        return <span
            onFocus={() => console.log('its on focus', value)}
            key={`${value}-${title}`}
            onClick={() => this.handleOnClick(option)}
            className={`${isChosen && 'select-input-active-option'} fs-14 hover-primary pb-4`}
        >
            {title}
        </span>;
    }
}
