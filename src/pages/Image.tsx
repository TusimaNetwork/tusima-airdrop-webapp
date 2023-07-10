
import Image from 'next/image'
import { memo } from 'react'

const ImageIcon = memo(
  ({ name, width = undefined, height = undefined,path = '' }: { name: any; width?: number; height?: number,path?:any}) => {
      return (
        <Image
          alt={`${path}-${name}`}
          style={{ maxHeight: `${height}px` }}
          src={`/images/${name}.png`}
          width={width}
          height={height}
          unoptimized
        />
      )
  }
)

export default ImageIcon