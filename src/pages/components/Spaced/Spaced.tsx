import React, { useMemo } from "react"
import styled from "styled-components"
interface StyleProp {
  size?: string
}

const Spaced: React.FC<StyleProp> = ({ size = 30 }) => {
  const sizePx = useMemo(() => {
    if (String(size).includes("px") === true) {
      return size
    }
    return `${size}px`
  }, [size])
  return (
    <SpaceSty
      style={{
        width: sizePx,
        height: sizePx,
      }}
    />
  )
}
export default Spaced

const SpaceSty = styled.div`
  position: relative;
`

