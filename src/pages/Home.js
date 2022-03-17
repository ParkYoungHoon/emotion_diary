import { useState, useContext, useEffect } from "react";

import MyHeadr from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from "../App";

const Home = () => {

    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(()=> {
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0
        ).getTime();

        setData(diaryList)
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
        </div>
    )
}

export default Home;