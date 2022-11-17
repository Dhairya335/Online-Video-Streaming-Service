/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Background, Container, Logo, ButtonLink, Feature, Text,
  TextSmall, FeatureCallOut, Link, Group, Picture, Profile, 
  Dropdown, Search, SearchIcon, SearchInput, PlayButton
} from './styles/header'

// We need a dynamic background for HEADER on the browse page
// So we keep a condition if bg=true then only display background else display chilren
export default function Header ({ bg = true, children, ...restProps }) {
  return bg ? <Background {...restProps}>{children}</Background> : children
}

Header.Feature = function HeaderFeature ({ children, ...restProps }) {
  return <Feature {...restProps}>{children}</Feature>
}

Header.FeatureCallOut = function HeaderFeatureCallOut ({ children, ...restProps }) {
  return <FeatureCallOut {...restProps}>{children}</FeatureCallOut>
}

Header.Text = function HeaderText ({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>
}

Header.Dropdown = function HeaderDropdown ({ children, ...restProps }) {
  return <Dropdown {...restProps}>{children}</Dropdown>
}

Header.Group = function HeaderGroup ({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>
}

Header.PlayButton = function HeaderPlayButton ({ children, ...restProps }) {
  return <PlayButton {...restProps}>{children}</PlayButton>
}

Header.Profile = function HeaderProfile ({ children, ...restProps }) {
  return <Profile {...restProps}>{children}</Profile>
}

Header.Picture = function HeaderPicture ({ src, ...restProps }) {
  return <Picture {...restProps} src={`images/users/${src}.png`}></Picture>
}

Header.Search = function HeaderSearch ({ searchTerm, setSearchTerm, ...restProps }) {
  const [searchActive, setSearchActive] = useState(false)
  return <Search {...restProps}>
                <SearchIcon onClick={() => setSearchActive(searchActive => !searchActive)}>
                    <img src="images/icons/search.png" alt="Search" />
                </SearchIcon>
                <SearchInput
                    value={searchTerm}
                    onChange={({ target }) => setSearchTerm(target.value)}
                    placeholder="Search films and series"
                    active={searchActive}
                />
            </Search>
}

Header.TextSmall = function HeaderTextSmall ({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>
}

Header.Frame = function HeaderFrame ({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>
}

Header.ButtonLink = function HeaderButtonLink ({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>
}

Header.TextLink = function HeaderTextLink ({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>
}

// "to" is for displaying the logo to the home page
Header.Logo = function HeaderLogo ({ to, ...restProps }) {
  return (
        <ReactRouterLink to={to}>
            <Logo {...restProps} />
        </ReactRouterLink>
  )
}
