import Component, { ComponentProps, ComponentOptions } from '@/base/component';

type EventCardOptions = ComponentOptions;

export default class EventCard extends Component {
    constructor(element: ComponentProps, options?: EventCardOptions) {
        super(element);
    }

    destroy = () => {
        // Destroy function
    }
}
