import Component, { ComponentProps, ComponentOptions } from '@/base/component';

type SwitcherOptions = ComponentOptions;

export default class Switcher extends Component {
    checkbox?: HTMLInputElement;
    box?: HTMLElement;

    constructor(element: ComponentProps, options?: SwitcherOptions) {
        super(element);
        this.checkbox = this.getElement('checkbox');
        this.box = this.getElement('box');
    }

    setCheckedValue = (value: boolean): void => {
        if (this.checkbox) {
            this.checkbox.checked = value;
        }
    }

    isChecked = (): boolean => {
        return !!this.checkbox?.checked;
    }

    destroy = () => {}
}
