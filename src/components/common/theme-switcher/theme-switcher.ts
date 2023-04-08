import Component, { ComponentProps, ComponentOptions } from '@/base/component';
import Switcher from '@/components/ui/switcher/switcher';
import { getComponent } from '@/helpers/helpers';

type ThemeSwitcherOptions = ComponentOptions;

export default class ThemeSwitcher extends Component {
    static readonly storageItemName = 'theme';
    static readonly themeValues = {
        light: 'light',
        dark: 'dark'
    };
    static readonly themes = {
        [ThemeSwitcher.themeValues.light]: {
            '--primary-color': '#157BFB',
            '--background' : '#FFF',
            '--foreground': '#FFF',
            '--text-color' : '#232323',
        },
        [ThemeSwitcher.themeValues.dark]: {
            '--primary-color': '#157BFB', //'#BB86FC',
            '--background' : '#212121',
            '--foreground': '#323232',
            '--text-color' : '#FFF',
        }
    };

    switcher?: Switcher;
    switcherBtn?: HTMLElement;
    constructor(element: ComponentProps, options?: ThemeSwitcherOptions) {
        super(element);
        const switcher = getComponent('switcher', this.nRoot);
        if (switcher?.component) {
            this.switcher = new Switcher({
                name: 'switcher',
                component: switcher.component
            })
        }
        const switcherBtn = getComponent('switcher__box', this.nRoot);
        if (switcherBtn?.component) {
            switcherBtn.component.addEventListener('click', this.toggleTheme)
        }
        this.checkStorage();
    }

    checkStorage = () => {
        const localTheme = localStorage.getItem(ThemeSwitcher.storageItemName);
        if (!localTheme) return;
        if (localTheme === ThemeSwitcher.themeValues.dark) {
            this.switcher?.setCheckedValue(true);
            this.setTheme(ThemeSwitcher.themeValues.dark);
        } else {
            this.switcher?.setCheckedValue(false)
            this.setTheme(ThemeSwitcher.themeValues.light);
        }
    }

    setStorage = (themeName: string) => {
        localStorage.setItem(ThemeSwitcher.storageItemName, themeName)
    }

    toggleTheme = (): void => {
        if (this.switcher?.isChecked()) {
            this.setTheme(ThemeSwitcher.themeValues.dark)
        } else {
            this.setTheme(ThemeSwitcher.themeValues.light)
        }
    }

    setTheme = (themeName: string) => {
        this.setStorage(themeName);
        document.documentElement.className = themeName;
    }

    destroy = () => {
        // Destroy function
    }
}
