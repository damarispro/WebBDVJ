import React, { useState } from 'react'

const Count = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>Count = {count}</p>
            <button
                onClick={() => {
                    setCount(count + 1)
                    console.log(count)
                }}
            >
                Suma
            </button>
        </div>
    )
}

export default Count