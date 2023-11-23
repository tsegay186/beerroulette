/* eslint-disable react/prop-types */

export const TimeOutDisplay = ({ time, draw }) => {

    return (
        <>
            <div className="flex flex-col ">
                <div className="">
                    <span className="text-yellow-500 text-3xl font-bold ">DRAW</span>
                    <span className="text-white text-3xl font-bold ml-3 ">{draw + 1}</span>
                    <div>
                        <span className="text-yellow-500 text-3xl font-bold">00 : {time / 1000 < 10 ? `0${time / 1000}`: time / 1000} </span>
                    </div>
                </div>
            </div>
        </>
    )

}