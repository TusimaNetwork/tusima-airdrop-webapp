import React from "react"
import styled from "styled-components"

const LightButton:React.FC<{className?:any,onClick?:any,children:any}>=({className,children,onClick})=>{
  return <CardWrapper>
   <CardInner onClick={onClick} className={className}>
   {children} 
   </CardInner> 
  </CardWrapper> 
 }

export default LightButton

const CardInner = styled.div`
  cursor: pointer;
  background-color: #0B0C0B;
  border-radius:20px;
`

const CardWrapper = styled.div`
  position: relative;
  z-index: 0;
  border-radius:8px;
  color: #fff;
  &::after{
    content: '';
    background: linear-gradient(270deg, rgba(31, 183, 255, 1), rgba(106, 221, 131, 1));
    position: absolute;
    border-radius:20px;
    top:-1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: -1;
  }
  /* &:hover{
    opacity: .5;
  } */
`;