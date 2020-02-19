import { withRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  let className = props.className || null
  if (router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} ${props.activeClassName}`.trim()
  }

  delete props.activeClassName
  delete props.className

return <Link {...props}><a className={className}>{ children }</a></Link>
}

export default withRouter(ActiveLink)