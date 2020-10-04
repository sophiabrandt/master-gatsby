import React from 'react'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'

export default function PizzasPage({
  data: {
    pizzas: { nodes: pizzas },
  },
}) {
  return <PizzaList pizzas={pizzas} />
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        slug {
          current
        }
        toppings {
          name
          id
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
