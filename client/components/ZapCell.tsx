import React from 'react'

const ZapCell = ({
    name,
    index,
    onClick
}: {
    name?: string;
    index: number;
    onClick: () => void;
}) => {
  return (
    <div onClick={onClick} className='hover:border-white/20 transition-all duration-200 mb-2 min-w-[300px] border-2 py-4 px-4 flex max-w-wd justify-center rounded-xl bg-[#fafafa] cursor-pointer dark:bg-[#18181b]'>
        <div className='flex text-xl'>
            <div className='font-bold'>
                {index}
            </div>
            <div>
                {name}
            </div>
        </div>
    </div>
  )
}

export default ZapCell;
