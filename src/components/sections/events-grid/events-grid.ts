import Component, { ComponentProps, ComponentOptions } from '@/base/component';

type EventsGridOptions = ComponentOptions;

export default class EventsGrid extends Component {
    constructor(element: ComponentProps, options?: EventsGridOptions) {
        super(element);
    }

    destroy = () => {}
}
