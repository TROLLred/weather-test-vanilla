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
        const navigation = getComponent('events-slider__navigation', this.nRoot);
        this.cards = this.getElements('card');
        if (this.cards.length > 1) {
            if (navigation?.component) {
                this.sliderNavigation = new SliderNavigation({
                    name: 'slider-navigation',
                    component: navigation.component,
                });
            }
            if (this.sliderContainer) {
                this.slider = new Swiper(this.nRoot, {
                    spaceBetween: 0,
                    slidesPerView: 1,
                    navigation: this.sliderNavigation?.swiperOptions || false,
                });
            }
        }
    }

    destroy = () => {
        this.slider?.destroy();
        this.sliderNavigation?.destroy();
    }
}
