import styled from "styled-components";
import LightButton from "../LightButton";


export interface UserMenuItemProps {
  disabled?: boolean;
}
export const UserMenuItem = styled.button<UserMenuItemProps>`
  align-items: center;
  border: 0;
  background: #1A1B1F;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: space-between;
  outline: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;

  

  &:is(button) {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }

  &:hover:not(:disabled) {
    color: #fff;
    background-color: #1A1B1F;
  }

  &:active:not(:disabled) {
    /* opacity: 0.85; */
    transform: translateY(1px);
  }
  /* &:hover{
    color: #000;
    background: #000;
  } */
  &:hover{
   span{
    background: linear-gradient(270deg, #4ECFB1 0%, #6ADD83 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
   } 
  }
`;

const ConnectButton=styled(LightButton)`
  width: 169px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default ConnectButton