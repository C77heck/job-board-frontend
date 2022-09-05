import { Button } from '../../shared/components/buttons/button';

export const ActionButtons = (props: any) => {
    // TODO -> needs icons!!
    return <div className={'row'}>
        <div className={'col-33 display-flex justify-content-start'}>
            <Button buttonStyle={'filter'} title={'Create alert'}/></div>
        <div className={'col-33 position-center'}>
            <Button buttonStyle={'secondary'} title={'Apply'}/></div>
        <div className={'col-33 display-flex justify-content-end'}>
            <Button buttonStyle={'filter'} title={'Save'}/>
        </div>
    </div>;
};
