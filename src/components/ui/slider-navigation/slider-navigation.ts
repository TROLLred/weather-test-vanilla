import { NavigationOptions } from 'swiper/types';
import Component, { ComponentProps, ComponentOptions } from '@/base/component';

type SliderNavigationOptions = ComponentOptions;

export default class SliderNavigation extends Component {
    swiperOptions: NavigationOptions;

    next: HTMLElement | undefined;

    prev: HTMLElement | undefined;

    constructor(element: ComponentProps, options?: SliderNavigationOptions) {
        super(element);
        this.next = this.getElement('next');
        this.prev = this.getElement('prev');

        this.swiperOptions = {
            nextEl: this.next,
            prevEl: this.prev,
        };
    }

    destroy = () => {}
}
