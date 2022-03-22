import React from "react";

const WeatherItem = ({warther_id, warther_img, warther_descript, onClick, isSelected}) => {
    return (
        <div
            className={["WeatherItem", isSelected ?
                `WeatherItem_on_${warther_id}` :  `WeatherItem_off`].join(" ")}
            onClick={()=> onClick(warther_id)}>
            <img src={warther_img} />
            <span>{warther_descript}</span>
        </div>
    )
}

export default React.memo(WeatherItem);