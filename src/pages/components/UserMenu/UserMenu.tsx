import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import UserMenuItem from "./styles";
import LightButton from "../LightButton";


const UserMenu: React.FC<any> = ({
  account,
  text,
  avatarSrc,
  avatarClassName,
  children,
  disabled,
  placement = "bottom-end",
  recalculatePopover,
  ...props
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null;
  const { styles, attributes, update } = usePopper(targetRef, tooltipRef, {
    strategy: "fixed",
    placement,
    modifiers: [{ name: "offset", options: { offset: [0, 0] } }],
  });

  // recalculate the popover position
  useEffect(() => {
    if (recalculatePopover && isOpen && update) update();
  }, [isOpen, update, recalculatePopover]);

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true);
    };

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node;
      if (target && !tooltipRef?.contains(target)) {
        setIsOpen(false);
        evt.stopPropagation();
      }
    };

    targetRef?.addEventListener("mouseenter", showDropdownMenu);
    targetRef?.addEventListener("mouseleave", hideDropdownMenu);

    return () => {
      targetRef?.removeEventListener("mouseenter", showDropdownMenu);
      targetRef?.removeEventListener("mouseleave", hideDropdownMenu);
    };
  }, [targetRef, tooltipRef, setIsOpen]);


  return (
    <Flex ref={setTargetRef} {...props}>
      <StyledUserMenu
        onTouchStart={() => {
          setIsOpen((s) => !s);
        }}
      >
        <MenuButton><span>{text || accountEllipsis}</span></MenuButton>
        {/* {!disabled && <ChevronDownIcon color="text" width="24px" />} */}
      </StyledUserMenu>
      {!disabled && (
        <Menu style={styles.popper} ref={setTooltipRef} {...attributes.popper} isOpen={isOpen}>
          <MenuInert onClick={() => setIsOpen(false)}>{children?.({ isOpen })}</MenuInert>
        </Menu>
      )}
    </Flex>
  );
};

export default UserMenu;

const Flex = styled.div`
  display: flex;
`
const MenuButton = styled(LightButton)`
  width: 158px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  &:hover{
   span{
    background: linear-gradient(270deg, #4ECFB1 0%, #6ADD83 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
   } 
  }
`


export const StyledUserMenu = styled.div`
  width: 158px;
`;

const Menu = styled.div<{ isOpen: boolean }>`
  padding-top: 10px;
 ${({ isOpen }) =>
    !isOpen &&
    `
    display: none;
    pointer-events: none;
    visibility: hidden;
  `} 
`;

const MenuInert = styled.div`
  background-color: #1A1B1F;
  border-radius: 8px;
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 156px;
  visibility: visible;
  z-index: 1001;
  
/* 
  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  } */
`