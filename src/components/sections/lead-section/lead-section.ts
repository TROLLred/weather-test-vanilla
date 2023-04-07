import Component, { ComponentProps, ComponentOptions } from '@/base/component';
import Swiper from 'swiper';

type LeadSectionOptions = ComponentOptions;

export default class LeadSection extends Component {
    constructor(element: ComponentProps, options?: LeadSectionOptions) {
        super(element);
    }

    destroy = () => {}
}
