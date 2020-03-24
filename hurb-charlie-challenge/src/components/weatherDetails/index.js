import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, fromUnixTime } from 'date-fns';
import { trunc } from 'math';
import * as WeatherActions from '../../store/modules/weather/actions';
import getIcon from '../../util/weatherIcons';
import handleEnglishToPortuguese from '../../util/translate';
import { Container, ImageIcon } from './styles';

export default function WeatherDetails() {
    const weatherData = useSelector(state => state.weather.data.weatherData);
    let backgroundColor = 'gray';
    const temperature = useSelector(
        state => state.weather.data.weatherData.list[0].main.temp
    );

    const dispatch = useDispatch();

    function handleChangeTemp() {
        dispatch(WeatherActions.WeatherChangeTemperatureRequest(weatherData));
    }

    function handleBackgroundColor(temp) {
        if (temp < 15 || (temp > 180 && temp < 288)) {
            return '#013ADF';
        }
        if ((temp > 15 && temp < 35) || (temp > 288 && temp < 318)) {
            return '#D7DF01';
        }
        if ((temp > 35 && temp < 333) || (temp > 288 && temp < 318)) {
            return '#DF0101';
        }
        return '#585858';
    }

    const weatherName = handleEnglishToPortuguese(
        weatherData.list[0].weather[0].main
    );
    const weatherIcon = getIcon(weatherData.list[0].weather[0].main);

    console.tron.log(weatherName);

    backgroundColor = handleBackgroundColor(weatherData.list[8].main.temp);
    return (
        <Container background={backgroundColor}>
            <div>
                <ImageIcon src={weatherIcon.icon} alt="" />
                <div>
                    <span>
                        <strong>
                            {weatherData.list[0]
                                ? format(
                                      fromUnixTime(weatherData.list[0].dt),
                                      'd MMMM yyyy'
                                  )
                                : 'Carregando...'}
                        </strong>
                    </span>
                    <br />
                    <span>
                        <strong>
                            {weatherData.list[0].weather[0].main
                                ? weatherName.portugueseName
                                : 'Carregando...'}
                        </strong>
                    </span>
                    <br />
                    <br />
                    <br />
                    <button
                        type="button"
                        onClick={() => handleChangeTemp(weatherData)}
                    >
                        <strong>{trunc(temperature)} °</strong>
                    </button>
                    <br />
                    <span>
                        <strong>
                            Vento: NO
                            {weatherData.list[0].wind.speed
                                ? ` ${weatherData.list[0].wind.speed}`
                                : 'Carregando...'}
                            km/h
                        </strong>
                    </span>
                    <br />
                    <span>
                        <strong>
                            Humidade:
                            {weatherData.list[0].main.humidity
                                ? ` ${weatherData.list[0].main.humidity}%`
                                : 'Carregando...'}
                        </strong>
                    </span>
                    <br />
                    <span>
                        <strong>
                            Pressão:
                            {weatherData.list[0].main.pressure
                                ? ` ${weatherData.list[0].main.pressure}hPA`
                                : 'Carregando...'}
                        </strong>
                    </span>
                </div>
            </div>
        </Container>
    );
}
