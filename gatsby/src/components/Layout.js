import React from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'
import Footer from './Footer'
import GlobalStyles from '../styles/GlobalStyles';
import 'normalize.css'

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
