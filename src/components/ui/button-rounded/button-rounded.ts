import Component, { ComponentProps, ComponentOptions } from '@/base/component';

type ButtonRoundedOptions = ComponentOptions;

export default class ButtonRounded extends Component {
    constructor(element: ComponentProps, options?: ButtonRoundedOptions) {
        super(element);
    }

    destroy = () => {}
}
