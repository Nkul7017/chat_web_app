import React from 'react'

function Message({item,pos}) {
    console.log(item?.message);
    if(item?.user==="Admin")
    return(
<p className='m-3 capitalize font-normal text-[14px] clear-both text-center'><span className='bg-gray-200  px-2 py-1 rounded-sm'>{item?.message}</span></p>        
)
if(pos==="right")
  return (
    <div className=' min-w-[30%] max-w-[50%]  m-3 border border-gray-400 bg-green-300 rounded-sm px-2 py-1   clear-both float-right'>
      <p className='text-red-500   '>You</p>
    <p className='' >{item?.message}</p>
    </div>
  )
if(pos==="left")
  return (
    <div className='min-w-[30%] max-w-[50%] m-3 border border-gray-400 bg-green-300 rounded-sm px-2 py-1   clear-both float-left'>
    <p className='text-red-500  capitalize font-medium   '>{item?.user}</p>
  <p className=' '>{item?.message}</p>
  </div>
  )
}

export default Message
