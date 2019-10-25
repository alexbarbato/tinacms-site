import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'
import { WindowLocation, globalHistory } from '@reach/router'
import { SkipNavLink } from '@reach/skip-nav'

import { NavigationContextProvider } from 'components/layout/Navigation/NavigationContext'

import { SiteMetadata } from 'interfaces/gatsby'
import { breakpoints } from 'utils/variables'

const StyledLayoutRoot = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
  }
`

interface LayoutRootProps {
  className?: string
  location?: WindowLocation
}

interface DataProps {
  site: {
    siteMetadata: SiteMetadata
  }
}

const LayoutRoot: React.SFC<LayoutRootProps> = ({ children, className, location }) => (
  <NavigationContextProvider>
    <StaticQuery query={query}>
      {(data: DataProps) => {
        const { siteMetadata } = data.site

        return (
          <StyledLayoutRoot className={className}>
            <Helmet>
              <title>{siteMetadata.title}</title>
              <meta name="description" content={siteMetadata.description} />
              <meta name="keywords" content={siteMetadata.keywords} />
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content={siteMetadata.title} />
              <meta property="og:description" content={siteMetadata.description} />
              <meta property="og:url" content={`${siteMetadata.siteUrl}${location ? location.pathname : '/'}`} />
            </Helmet>
            <SkipNavLink />
            {children}
          </StyledLayoutRoot>
        )
      }}
    </StaticQuery>
  </NavigationContextProvider>
)

export default LayoutRoot

const query = graphql`
  query LayoutRootQuery {
    site {
      siteMetadata {
        title
        sidebarTitle
        description
        siteUrl
        keywords
        author {
          name
          url
          email
        }
      }
    }
  }
`

const AlertBar = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  color: white;
  font-weight: bold;
  padding: 0.25rem 1rem;
  font-size: 1.25rem;
  background-color: #ec4815;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: white;
    margin: 0 1rem;
    white-space: nowrap;
    &:hover {
      color: white;
      opacity: 0.7;
    }
    span {
      text-decoration: underline;
    }
  }
  & + * {
    position: relative;
  }
  .hidden-mobile {
    @media (max-width: 440px) {
      display: none;
    }
  }
`
