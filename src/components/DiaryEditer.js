import { useNavigate } from 'react-router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './../App.js';

import MyHeader from './/MyHeader';
import MyButton from './/MyButton';
import EmotionItem from './EmotionItem';
import WeatherItem from './WeatherItem';

import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion';
import { weatherList } from '../util/weather';

const DiaryEditer = ({isEdit, originData}) => {
    const contentRef = useRef();
    const titleRef = useRef();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [weather, setWeather] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext)

    const handleClickEmotion = useCallback((emotion) => {
        setEmotion(emotion);
    }, []);

    const handleClickWeather = useCallback((weather) => {
        setWeather(weather);
    }, []);

    const navigate = useNavigate();

    const handleSubmit = () => {

        if(title.length < 1){
            titleRef.current.focus();
            return;
        }

        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit) {
                onCreate(title, date, content, emotion);
            }else{
                onEdit(originData.id, title, date, content, emotion);
            }
        }

        
        navigate('/',{replace:true});
    };

    const handleRemove = () => {
        if(window.confirm('정말 삭제하시겠습니까?')){
            onRemove(originData.id);
            navigate('/', {replace:true});
        }
    }

    useEffect(()=> {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setTitle(originData.title);
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return (
        <div className="DiaryEditer">
            <MyHeader
                headText={ isEdit ? "일기 수정하기" : "새 일기쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"}
                onClick={()=> navigate(-1)} />
                }
                rightChild={
                    isEdit && <MyButton text={"삭제하기"} type={"negative"} onClick={handleRemove}/>
                }
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            value={date}
                            onChange={(e)=> setDate(e.target.value)}
                            type="date" />
                    </div>
                </section>
                {/* <section>
                    <h4>오늘의 날씨는?</h4>
                    <div className="input_box weather_list_wrapper">
                        {weatherList.map((data)=> (
                            <WeatherItem
                                key={data.weather_id}
                                {...data}
                                onClick={handleClickWeather}
                                isSelected={data.weather_id === weather}
                            />
                        ))}
                    </div>
                </section> */}
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((data)=> (
                            <EmotionItem
                                key={data.emotion_id}
                                {...data}
                                onClick={handleClickEmotion}
                                isSelected={data.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box title">
                        <input
                            type="text"
                            placeholder="오늘의 주제"
                            ref={titleRef}
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘은 어떤 하루였나요?"
                            ref={contentRef}
                            value={content}
                            onChange={(e)=> setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={()=> navigate(-1)}/>
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditer;