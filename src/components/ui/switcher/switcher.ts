import Component, { ComponentProps, ComponentOptions } from '@/base/component';

type SwitcherOptions = ComponentOptions;

export default class Switcher extends Component {
    checkbox?: HTMLInputElement;
    constructor(element: ComponentProps, options?: SwitcherOptions) {
        super(element);
        this.checkbox = this.getElement('checkbox');
    }

    setCheckedValue = (value: boolean): void => {
        if (this.checkbox) {
            this.checkbox.checked = value;
        }
    }

    isChecked = (): boolean | undefined => {
        return this.checkbox?.checked;
    }

    destroy = () => {}
}
