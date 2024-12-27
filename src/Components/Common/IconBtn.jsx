import React from 'react'

export const IconBtn = ({
     text,
     disabled,
     children,
     onClick,
     outline = false,
     customClasses,
     type,
     loadings
}) => {
// console.log(disabled)
  return (
        <button  onClick={onClick} 
                 type={type} 
                 disabled = {disabled}
                 className= {`${customClasses} flex flex-row items-center justify-center  gap-2 bg-yellow-50 rounded-lg py-2 px-5 text-lg font-[500]  text-black hover:bg-yellow-100 transition-all duration-300`}
         >
             {
                children ? 
                (
                    <>
                       {children}
                       <span className='text-base font-inter font-semibold '>{text}</span>
                    </>
                ):
                <span className='text-base font-inter font-semibold '>{text}</span>
             }
        </button>
  )
}
