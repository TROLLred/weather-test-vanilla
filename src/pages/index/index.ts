import { ITransitionData } from '@barba/core/dist/core/src/defs';
import Component from '@/base/component';
import EventCard from '@/components/blocks/event-card/event-card';
import ButtonRounded from '@/components/ui/button-rounded/button-rounded';
import EventsSlider from '@/components/blocks/events-slider/events-slider';
import SliderNavigation from '@/components/ui/slider-navigation/slider-navigation';

// Набор всех компонентов, для которых будет применяться стандартная инициализация
const allComponents: Record<string, any & Component> = {
    'button-rounded': ButtonRounded,
    'slider-navigation': SliderNavigation,
    'events-slider': EventsSlider,
    'event-card': EventCard,
};

export default {
    namespace: 'common',
    components: <Component[]>[],
    async beforeEnter({ next: { container, url } }: ITransitionData) {
        try {
            // Стандартная инициализация компонентов
            const existedComponents = Array.from(container.querySelectorAll<HTMLElement>('[data-component]'));

            this.components = existedComponents.map((component) => {
                try {
                    return new allComponents[component.dataset.component!]({
                        name: component.dataset.component,
                        component: component,
                    }, { ...component.dataset });
                } catch (e: any) {
                    console.error(`Ошибка во время инициализации компонента: ${component.dataset.component}`);
                    console.error(e);
                }
            });

            // Дополнительная логика для инициализации страницы
            // ...

        } catch (e) {
            console.error(e);
        }
    },
    beforeLeave() {
        this.components.forEach((component) => {
            try {
                component.destroy()
            } catch (e: any) {
                console.error(`Ошибка во время удаления компонента: ${component.nRootName}`);
                console.error(e);
            }
        })
        this.components = [];
    },

    afterLeave() {
    },
};
