import Swiper, {
    Controller, Navigation,
} from 'swiper';
import Component, { ComponentProps, ComponentOptions } from '@/base/component';
import SliderNavigation from '@/components/ui/slider-navigation/slider-navigation';
import { getComponent } from '@/helpers/helpers';

Swiper.use([Navigation, Controller]);
type EventsSliderOptions = ComponentOptions;

export default class EventsSlider extends Component {
    sliderContainer?: HTMLElement;
    cards?: HTMLElement[];
    slider?: Swiper;
    sliderNavigation?: SliderNavigation;

    constructor(element: ComponentProps, options?: EventsSliderOptions) {
        super(element);
        this.sliderContainer = this.getElement('slider');
        this.cards = this.getElements('card');
        const navigation = getComponent('slider-navigation', this.nRoot);

        if (this.cards.length <= 1) return;
        if (navigation?.component) {
            this.sliderNavigation = new SliderNavigation(navigation);
        }
        if (this.sliderContainer) {
            this.slider = new Swiper(this.nRoot, {
                spaceBetween: 0,
                slidesPerView: 1,
                navigation: this.sliderNavigation?.swiperOptions ?? false,
            });
        }
    }

    destroy = () => {
        this.slider?.destroy();
        this.sliderNavigation?.destroy();
    }
}
