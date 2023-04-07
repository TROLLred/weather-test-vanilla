import Component, { ComponentProps, ComponentOptions } from '@/base/component';

type EventCardOptions = ComponentOptions;

export default class EventCard extends Component {
    static readonly copyMessage = 'Copied!';
    static readonly errMessage = 'Oops :(';
    static readonly reactionTime = 1500;
    static readonly tooltipShowClass = '_tooltip-show';

    title?: HTMLElement;
    subtitle?: HTMLElement;
    info?: HTMLElement[];
    copyBtn?: HTMLElement;

    constructor(element: ComponentProps, options?: EventCardOptions) {
        super(element);
        this.title = this.getElement('title');
        this.subtitle = this.getElement('subtitle');
        this.info = this.getElements('info-element');

        this.copyBtn = this.getElement('copy');
        this.copyBtn?.addEventListener('click', this.copyToClipBoard);
    }

    templateAssembly = () => {
        const template = new Array;
        this.title && template.push(this.title.innerText)
        this.subtitle && template.push(this.subtitle.innerText)
        this.info && this.info.map(el => template.push(el.innerText))
        return template.length ? template.join('. ') : '';
    };

    copyToClipBoard = (e: Event) => {
        navigator.clipboard.writeText(this.templateAssembly())
            .then(this.copyReaction)
            .catch(err => {
                //this.copyReaction()
                console.log(err)
            })
    }

    copyReaction = () => {
        this.copyBtn?.classList.add(EventCard.tooltipShowClass)
        setTimeout(() => {
            this.copyBtn?.classList.remove(EventCard.tooltipShowClass)
        }, EventCard.reactionTime);
    }

    destroy = () => {
        this.copyBtn?.removeEventListener('click', this.copyToClipBoard);
    }
}
