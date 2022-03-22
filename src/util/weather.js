
const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const weatherList = [
    {
        weather_id: 1,
        weather_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        weather_descript: '맑음',
    },
    {
        weather_id: 2,
        weather_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        weather_descript: '흐림',
    },
    {
        weather_id: 3,
        weather_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        weather_descript: '눈',
    },
    {
        weather_id: 4,
        weather_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        weather_descript: '비',
    },
];