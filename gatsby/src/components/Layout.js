import React from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
