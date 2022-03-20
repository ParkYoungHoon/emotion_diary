import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";

import MyHeadr from './../components/MyHeader';
import MyButton from './../components/MyButton';
import DiaryList from './../components/DiaryList';


const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(()=> {

        if(diaryList.length >= 1) {

            // 현재 선택 된 월의 1일
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            console.log(`firstDay > ${firstDay}`);

            // 현재 선택 된 월의 마지막일
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0
            ).getTime();

            setData(diaryList.filter((data)=> firstDay <= data.date && data.date <= lastDay));

        }
    }, [diaryList, curDate]);

    useEffect(()=> {
        console.log(data);
    }, [data]);

    const increaseMonth = ()=> {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    };

    const decreaseMonth = ()=> {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    };

    return (
        <div>
            <MyHeadr headText={headText}
            leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
            rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data}/>
        </div>
    )
}

export default Home;