import { useEffect, useState } from "react"
import { TimeOutDisplay } from "./TimeOutDisplay"
import { arrayFromTo, pickRandomNUmber, arrayExcluding } from "../helperFunctions/generateRandomCombination"
import generateDomain from "../helperFunctions/allDomains"

const MyComponent = () => {

    const [history, setHistory] = useState([])
    const [timeOut, setTimeOut] = useState(undefined)
    const [number, setNumber] = useState(undefined)
    const [allNumbers] = useState(arrayFromTo(1, 24))
    const [drawnNumbers, setDrawnNumbers] = useState([])

    const domain = arrayExcluding(allNumbers, drawnNumbers).length ? arrayExcluding(allNumbers, drawnNumbers) : arrayFromTo(1, 24)
    const drawn = (number) => {
        return drawnNumbers.includes(number)
    }

    const numberClassName = (number) => {
        return `${drawn(number) ? 'bg-yellow-500' : 'bg-red-900'} font-bold rounded-md w-12 h-8`
    }

    const latestDraws = () => {
        const latest = history.length > 8 ? history.slice(history.length - 8) : history
        return latest.reverse()
    }


    const tails = () => {
        const tailNumbers = drawnNumbers.filter((number) => number > 0 && number <= 12)
        return tailNumbers.length > 3
    }

    const heads = () => {
        const headNumbers = drawnNumbers.filter((number) => number > 12 && number <= 24)
        return headNumbers.length > 3
    }

    const evens = () => {
        const heads = drawnNumbers.filter((number) => number > 12 && number <= 24)
        const tails = drawnNumbers.filter((number) => number > 0 && number <= 12)
        return (heads.length == 3) && (tails.length == 3)
    }

    useEffect(() => {

        const timeOutId = setTimeout(() => {

            if (domain && drawnNumbers.length < 6) {
                const random = pickRandomNUmber(domain)
                setDrawnNumbers(drawnNumbers => [...drawnNumbers, random])
                setNumber(random)
                if (drawnNumbers.length == 5) {
                    setHistory((history) => [...history, [...drawnNumbers, random]])
                    clearTimeout(timeOutId)
                }
            }
            else {
                timer()
            }

        }, 1500)

        return () => clearTimeout(timeOutId)

    }, [number])


    useEffect(() => {

        const timeOutId = setTimeout(() => {
            if (timeOut) {
                setTimeOut((timeOut) => timeOut - 1000)
            }
            else {
                clearTimeout(timeOutId)
                setNumber(undefined)
                setDrawnNumbers(() => [])
            }
        }, 1000)
        return () => {
            clearTimeout(timeOutId)
        }

    }, [timeOut])

    const timer = () => {
        setTimeOut(10000)
    }

    return (
        <>
        <div className="  bg-gradient-to-r from-red-900 from-10% via-red-800 via-30% to-red-700 to-90% w-fit p-6 flex flex-wrap">

            <div className="bg-red-800 w-fit h-100% p-6  ">

                <div className="flex justify-between header">
                    <div className="">
                        <span className="text-yellow-500 text-3xl font-bold ">DRAW</span>
                        <span className="text-white text-3xl font-bold ml-3 ">
                            {drawnNumbers.length < 6 ? history.length + 1 : history.length}
                        </span>
                    </div>
                    <div className="flex justify-center items-center ml-2">
                        <button className="w-fit px-1 h-fit  bg-yellow-500 rounded-md text-black text-xl font-bold ">
                        {
                            heads() ? <span> HEADS </span>  : (evens() ? <span>EVENS</span>  : '')
                        }
                        </button>
                    </div>
                </div>

                <div className="flex flex-col  justify-between ">
                    {generateDomain(1, 24, 6).map((row) => (
                        <div key={row} className="flex  ">
                            {row.map((number) => (
                                <div key={number} className="flex justify-between  p-2">
                                    <button className={numberClassName(number)}>
                                        {number}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between">
                    <button className="font-bold text-red-900 text-3xl footer disabled">
                        NU NI NA
                    </button>
                    <button className="w-fit px-1 h-fit  bg-yellow-500 rounded-md text-black text-xl font-bold ">
                        {
                            tails() ? <span>TAILS</span> : ''
                        }
                    </button>
                </div>
            </div>

            <div className="bg-red-900 w-fit h-100% grow p-6 flex flex-col">

                <>
                    {!timeOut ? <> <div className=" flex justify-center">
                        <span className="text-white text-3xl font-bold">
                            {drawnNumbers.length}/6
                        </span>
                    </div>
                        <div className="h-100 flex items-center justify-center">
                            <div>
                                <img src="src\assets\bott.png" alt="corky" className="max-w-48 max-h-48 bg-cover " />
                            </div>
                            <div className=" absolute">
                                <span className="font-bold text-black-900 text-3xl">
                                    {number ?? ''}
                                </span>
                            </div>
                        </div>
                    </>
                        :
                        <TimeOutDisplay time={timeOut} draw={history.length} />
                    }
                </>
            </div>
        </div>

            <div className="flex flex-col ml-4  h-80 overflow-hidden flex" >
                {latestDraws().map((round, index) => (
                    <div key={index} className=" flex bg-gradient-to-r from-red-900 from-10% via-red-800 via-30% to-red-700 to-90%">
                        <div className="flex items-center font-bold text-yellow-500 text-xl">
                            DRAW {history.length - index}
                        </div>
                        <div className="w-fit flex justify-evenly">
                            {round.map((number, index) => (
                                <div key={index} className="w-16 h-10 flex items-center justify-evenly rounded br-2 font-bold text-white text-xl">
                                    {number}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default MyComponent