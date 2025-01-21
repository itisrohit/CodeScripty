import React from 'react'
import MonacoEditor from '../Home/MonacoEditor'

const BodyContent = () => {
  return (
    <div className="w-screen h-[calc(100vh-13vh)] flex justify-center">
        <div className="w-[80em] h-full flex">
            <div className="w-[65em] h-full border border-teal-400">
                <MonacoEditor />
            </div>
            <div className="w-[35em] border border-blue-500">
                <div className="w-full h-[6em] flex flex-col justify-between border border-fuchsia-600">
                    <p className=''>Input</p>
                    <div className="h-[3.5em] flex justify-center border border-red-500">
                    <input className='w-[95%] h-full' type="text" placeholder='Give an input'/>
                    </div>
                </div>
                <div className="w-full h-[calc(100%-6em)] border border-lime-300"></div>
            </div>
        </div>
    </div>
  )
}

export default BodyContent
