import Component, { ComponentProps, ComponentOptions } from '@/base/component';
import axios from 'axios';

type WeatherWidgetOptions = ComponentOptions;

type currentWeatherDataType = {
    main: {
        temp: number,
        feels_like: number
    },
    weather: [{
        description: string,
        icon: string
    }],
};

type forecastWeatherType = Array<{
    main: {
        temp: number,
    },
    dt_txt: string,
    weather: [{
        description: string,
        icon: string
    }],
}>

export default class WeatherWidget extends Component {
    /**
    * @description Ссылка на доступ к текущей погоде.
    */
    private readonly BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?';
    /**
    * @description Ссылка на доступ к прогнозу.
    */
    private readonly BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?';
    /**
    * @description Ключ доступа к API.
    */
    private readonly API_KEY = '7311ac75435e57755bb7750fe57621f6';
    /**
     * @description Дефолтная локация.
     * TODO - сделать получение локации по API через Geoapify.
     */
    private readonly DEFAULT_CITY = 'Сочи';
    /**
    * @description Параметры системы исчисления и локализации языка.
    */
    private readonly SETTINGS = '&units=metric&lang=ru'
    private readonly DAYS = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    private readonly MONTHS = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    // Это не костыль)
    /**
    * @description Костыль. Пары ключ-время для получения времени суток,
    * поскольку в бесплатном тарифе такой функционал не доступен
    */
    private readonly TIMES: Record<string, string> = {
        '06:00:00': 'Утром',
        '12:00:00': 'Днем',
        '18:00:00': 'Вечером',
        '00:00:00': 'Ночью'
    }

    static readonly classNames = {
        loading: '_loading-data',
        error: '_error'
    }

    infoIcon?: HTMLElement;
    infoDegree?: HTMLElement;
    weather?: HTMLElement;
    weatherType?: HTMLElement;
    feelsLike?: HTMLElement;
    date?: HTMLElement;
    forecast?: HTMLElement;
    forecastTimes: HTMLElement[];
    forecastIcons: HTMLElement[];
    forecastDegree: HTMLElement[];

    constructor(element: ComponentProps, options?: WeatherWidgetOptions) {
        super(element);

        this.setIsLoading(true);
        this.infoIcon = this.getElement('info-icon');
        this.infoDegree = this.getElement('info-degree');
        this.weather = this.getElement('weather');
        this.weatherType = this.getElement('weather-type');
        this.feelsLike = this.getElement('feels-like');
        this.forecast = this.getElement('forecast');
        this.forecastTimes = this.getElements('forecast-times');
        this.forecastIcons = this.getElements('forecast-icon');
        this.forecastDegree = this.getElements('forecast-degree');
        this.date = this.getElement('date');

        this.setDate();
        this.getWeatherData(this.DEFAULT_CITY);
    }

    setDate = () => {
        const date = new Date();
        const day = this.DAYS[date.getDay()];
        const month = this.MONTHS[date.getMonth()];
        this.date && (this.date.innerText = `${day}, ${date.getDate()} ${month}`)
    }

    getWeatherData = async (city: string) => {
        this.setIsLoading(true);
        try {
            await axios.get(`${this.BASE_URL_WEATHER}q=${city}&appid=${this.API_KEY}` + this.SETTINGS)
                .then((res) => {
                    this.setCurrentWeather(res.data);
                }).catch(err => this.errorReaction(err))

            await axios.get(`${this.BASE_URL_FORECAST}q=${city}&cnt=8&appid=${this.API_KEY}` + this.SETTINGS)
                .then((res) => {
                    this.setForecastWeather(res.data.list);
                }).catch(err => this.errorReaction(err))

            // NOTE: Для теста ошибки
            // this.errorReaction('');

            this.setIsLoading(false);
        } catch (err) {
            this.errorReaction(err);
        }
    }

    setCurrentWeather = (data: currentWeatherDataType) => {
        const temp = (Math.round(data.main.temp) > 0) ?
            `+${Math.round(data.main.temp)}`:
            Math.round(data.main.temp);
        this.infoDegree &&
            (this.infoDegree.innerHTML = `${temp}&deg;`);
        this.weatherType &&
            (this.weatherType.innerText = data.weather[0].description);
        this.feelsLike &&
            (this.feelsLike.innerHTML = `Ощущается как ${Math.round(data.main.feels_like)}&deg;`);
        this.infoIcon && (
            this.infoIcon.innerHTML = `<use xlink:href="#${data.weather[0].icon}"></use>`
        )
    }

    setForecastWeather = (list: forecastWeatherType) => {
        const currentTimes: any[] = [];
        const filteredList = list.filter((item) => {
            const { dt_txt } = item;
            const time = (dt_txt as string).substring(11);
            if (time in this.TIMES) {
                currentTimes.push(this.TIMES[time])
                return true;
            }
            return false;
        });
        this.forecastTimes?.map((item, i) => {
            item.innerText = currentTimes[i+1];
        });
        this.forecastIcons?.map((item, i) => {
            item.innerHTML = `<use xlink:href="#${filteredList[i+1].weather[0].icon}"></use>`;
        });
        this.forecastDegree?.map((item, i) => {
            const temp = (Math.round(filteredList[i+1].main.temp) > 0) ?
                `+${Math.round(filteredList[i+1].main.temp)}`:
                Math.round(filteredList[i+1].main.temp);
            item.innerHTML = `${temp}&deg;`;
        });
    }

    setIsLoading = (state: boolean): void => {
        if (state) {
            this.nRoot.classList.add(WeatherWidget.classNames.loading);
        } else {
            // NOTE: Чтобы при быстром интернете была более заметна анимация склетона
            //setTimeout(() =>
            //    this.nRoot.classList.remove(WeatherWidget.classNames.loading),
            //2000)
            this.nRoot.classList.remove(WeatherWidget.classNames.loading)
        }
    }

    errorReaction = (err: any) => {
        this.nRoot.classList.add(WeatherWidget.classNames.error);
        this.infoIcon && (this.infoIcon.innerHTML = '<use xlink:href="#sad"></use>');
        this.infoDegree && (this.infoDegree.innerText = 'Упс!');
        this.weather && (this.weather.innerText = 'Кажется, что-то пошло не так. Попробуйте перезагрузить страницу.');
        this.forecast?.remove();

        this.setIsLoading(false);
        console.log(err);
    }

    destroy = () => {
        // Destroy function
    }
}
