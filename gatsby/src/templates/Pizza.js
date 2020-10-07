import React from 'react'
import { graphql } from 'gatsby'

export default function SinglePizzaPage() {
  return <p>Single Pizza</p>
}

// fetch dynmically based on the slug passed via context
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`
