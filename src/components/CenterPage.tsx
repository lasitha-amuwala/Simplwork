import {PropsWithChildren} from 'react'

type Props = {}

export const CenterPage = ({children}: PropsWithChildren<Props>) => {
  return (
    <div className='flex items-center justify-center h-screen'>{children}</div>
  )
}

