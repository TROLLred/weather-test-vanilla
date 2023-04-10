import { ITransitionData } from '@barba/core/dist/core/src/defs';
import Component from '@/base/component';
import EventCard from '@/components/blocks/event-card/event-card';
import ButtonRounded from '@/components/ui/button-rounded/button-rounded';
import EventsSlider from '@/components/blocks/events-slider/events-slider';
import ThemeSwitcher from '@/components/common/theme-switcher/theme-switcher';
import WeatherWidget from '@/components/blocks/weather-widget/weather-widget';

// Набор всех компонентов, для которых будет применяться стандартная инициализация
const allComponents: Record<string, any & Component> = {
    'theme-switcher': ThemeSwitcher,
    'button-rounded': ButtonRounded,
    'events-slider': EventsSlider,
    'event-card': EventCard,
    'weather-widget': WeatherWidget,
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
