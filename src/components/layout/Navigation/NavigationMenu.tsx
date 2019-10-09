import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import { MenuNode } from 'interfaces/nodes'
import { Heading, Box } from 'components/foundations'
import { colors, space } from 'utils/variables'
import { isActive } from 'utils/helpers'
import { rgba } from 'polished'

interface NavigationMenuProps {
  node: MenuNode
  menuKey: string
  isOpen: boolean
  setIsOpen(newState: boolean): void
}

interface ToggleableProps {
  isOpen?: boolean
}

const ToggleMenu = styled('ul')<ToggleableProps>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  opacity: 0;
  transition: all 150ms ease;
  background: white;
  transform-origin: 50% 0;
  transform: scale3d(1, 0, 1);
  padding: 0;
  ${p =>
    p.isOpen &&
    css`
      opacity: 1;
      transform: scale3d(1, 1, 1);
    `};
`

const ToggleMenuList = styled('li')`
  margin: 0;
  font-size: 85%;
  color: ${colors.darkPurple};

  padding-left: 8px;

  &:first-child {
    padding-top: 8px;
  }
  &:last-child {
    padding-bottom: 8px;
  }

  a {
    display: block;
    padding: 4px 10px;
    border: 2px solid transparent;
    border-radius: 5px;
    color: ${colors.lightPurple};
    text-decoration: none;
    position: relative;
    transition: all 85ms ease-out;

    &:hover,
    &:focus {
      background: ${colors.seafoam};
      color: ${colors.darkPurple};
      text-decoration: none;
    }

    &:focus {
      outline: none;
      background-color: ${colors.seafoam};
      border-color: ${colors.mintChocoChip};
    }

    &.active {
      color: ${colors.hunterOrange};
      background: ${colors.seafoam};
      border-color: transparent;
      text-decoration: none;
      font-weight: bold;
    }
  }
`

const MenuToggle = styled.div`
  cursor: pointer;
  user-select: none;
  position: relative;
  padding: 10px 14px;
  h3 {
    margin: 0;
    color: ${colors.darkPurple};
    ${p =>
      p.isOpen &&
      css`
        color: ${colors.hunterOrange};
        font-weight: bold;
      `};
  }
  svg {
    position: absolute;
    right: 14px;
    top: 9px;
    fill: ${colors.grey};
    width: 18px;
    height: auto;
    opacity: 0.7;
    transform-origin: 50% 50%;
    transform: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? `rotate(90deg)` : `rotate(0deg)`)};
    transition: all 150ms ease-out;
  }
  &:hover {
    svg {
      opacity: 1;
      transform: rotate(90deg);
    }
  }
`

const NavGroup = styled.div``

const RightArrowIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="inherit" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 24.792L12.2654 26L21.4773 17.2061C22.1747 16.5403 22.1737 15.4588 21.4773 14.7939L12.2654 6L11 7.20799L20.2099 16L11 24.792Z" />
  </svg>
)

const NavigationMenu: React.FC<NavigationMenuProps> = ({ node, isOpen, setIsOpen }) => {
  return (
    <NavGroup>
      <MenuToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <Heading as="h3" size={100} color="grey04" mb="sm">
          {node.slug && <Link to={node.slug}>{node.title}</Link>}
          {!node.slug && node.title}
        </Heading>
        <RightArrowIcon />
      </MenuToggle>
      <ToggleMenu isOpen={isOpen}>
        {isOpen &&
          node.items.map(item => (
            <ToggleMenuList key={item.id}>
              <Link to={item.slug} getProps={isActive}>
                {item.title}
              </Link>
            </ToggleMenuList>
          ))}
      </ToggleMenu>
    </NavGroup>
  )
}

export default React.memo(NavigationMenu)
