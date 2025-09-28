import React from 'react'

const Footer = () => {
  return (
    <footer className='bottom-0  flex flex-row justify-between max-w-full bg-gradient-to-br to-gray-500 from-zinc-800 text-white  p-4'>
        <div className="">
            <p>&copy; {new Date().getFullYear()} Sambark. All rights reserved.</p>
        </div>
        <div className=" text-sm">
            <p>Developed by Sambark</p>
        
        </div>
    </footer>
  )
}

export default Footer