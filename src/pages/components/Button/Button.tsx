import React from "react"
import styled from "styled-components"
import CircleLoader from "../Loader/CircleLoader"

const Button: React.FC<{ className?: any, disabled?: boolean, onClick?: any, children: any, isLoading?: boolean }> = ({ className, disabled, children, onClick, isLoading }) => {
  const isDisabled = isLoading || disabled;

  const classNames = className ? [className] : [];

  if (isDisabled) {
    classNames.push("button--disabled");
  }

  return <ClaimButtonBox 
    className={isDisabled ? 'disabled':''}
    disabled={isDisabled}
   onClick={onClick}>
    {isLoading ? <CircleLoader /> : ''}
    {children}
  </ClaimButtonBox>
}

export default Button

const ClaimButtonBox = styled.button`
  cursor: pointer;
  width: 220px;
  height: 60px;
  border-radius: 30px;
  background: linear-gradient(270deg, rgba(24, 241, 149, 1),rgba(31, 183, 255, 1));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #292929;
  gap:10px;
  padding:0px;
  box-shadow: none;
  border: none;
  margin: 0px;
  &:disabled{
    background: linear-gradient(270deg, rgba(100, 100, 100, .9),rgba(200, 200, 200, .8));
    color:#fff;
  }
`