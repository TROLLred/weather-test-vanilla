import Component, { ComponentProps, ComponentOptions } from '@/base/component';
import axios from 'axios';

type WeatherWidgetOptions = ComponentOptions;

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
    private readonly TIMES = {
        '09:00:00': 'Утром',
        '15:00:00': 'Днем',
        '21:00:00': 'Вечером',
        '03:00:00': 'Ночью'
    }
    infoDegree?: HTMLElement;
    weatherType?: HTMLElement;
    feelsLike?: HTMLElement;
    date?: HTMLElement;
    constructor(element: ComponentProps, options?: WeatherWidgetOptions) {
        super(element);

        this.infoDegree = this.getElement('info-degree');
        this.weatherType = this.getElement('weather-type')
        this.feelsLike = this.getElement('feels-like');
        this.date = this.getElement('date');

        this.setDate();
        this.getWeatherData(this.DEFAULT_CITY);
    }

    getWeatherData = async (city: string) => {
        this.setIsLoading(true)
        try {
            //const {data} = await axios.get(`${this.BASE_URL}q=${city}&units=metric&lang=ru&appid=${this.API_KEY}`)
            //return data;
            axios.get(`${this.BASE_URL_WEATHER}q=${city}&appid=${this.API_KEY}` + this.SETTINGS)
                .then((res) => {
                    const temp = (Math.round(res.data.main.temp) > 0) ?
                        `+${Math.round(res.data.main.temp)}`:
                        Math.round(res.data.main.temp);
                    this.infoDegree && 
                        (this.infoDegree.innerHTML = `${temp}&deg;`);
                    this.weatherType && 
                        (this.weatherType.innerText = res.data.weather[0].description);
                    this.feelsLike && 
                        (this.feelsLike.innerHTML = `Ощущается как ${Math.round(res.data.main.feels_like)}&deg;`);
                    //console.log(res.data)
                }).catch()

            axios.get(`${this.BASE_URL_FORECAST}q=${city}&appid=${this.API_KEY}` + this.SETTINGS)
                .then((res) => {
                    console.log(res.data)
                }).catch()
        } catch (err) {
            console.log(err);
        }
    }

    setCompoentData = async () => {
        try {
            //const data = this.getWeatherData(this.DEFAULT_CITY);
            //console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    setIsLoading = (state: boolean): void => {
        //
    }

    setDate = () => {
        const date = new Date();
        const day = this.DAYS[date.getDay()];
        const month = this.MONTHS[date.getMonth()];
        this.date && (this.date.innerText = `${day}, ${date.getDate()} ${month}`)
    }

    destroy = () => {
        // Destroy function
    }
}
