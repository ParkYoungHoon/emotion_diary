import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditer from '../components/DiaryEditer';

const Edit = () => {

    const [originData, setOriginData] = useState();
    const navigate = useNavigate(); 
    const { id } = useParams();
    
    const diaryList = useContext(DiaryStateContext);

    console.log(`id : ${id}`);
    console.log(`diaryList : ${diaryList}`);

    useEffect(()=> {
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (data)=> parseInt(data.id) === parseInt(id)
            );
            console.log(targetDiary);
            if(targetDiary){
                setOriginData(targetDiary);
            }else{
                navigate('/', { replace: true });
            }
        }
    }, [id, diaryList]);

    return (
        <div>
           {originData && <DiaryEditer isEdit={true} originData={originData} />}
        </div>
    )
}

export default Edit;