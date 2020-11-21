import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import SEO from '../components/SEO'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/format'
import useForm from '../utils/useForm'

export default function OrdersPage({
  data: {
    pizzas: { nodes: pizzas },
  },
}) {
  const { values, updateValues } = useForm({ name: '', email: '' })
  return (
    <>
      <SEO title="Order a pizza!" />
      <form action="">
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={updateValues}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              email="email"
              value={values.email}
              onChange={updateValues}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <div key={pizza.id}>
              <div>
                <Img
                  width="50"
                  height="50"
                  alt={pizza.name}
                  fluid={pizza.image.asset.fluid}
                />
              </div>
              <h2>{pizza.name}</h2>
              {['S', 'M', 'L'].map((size) => (
                <button type="button">
                  {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                </button>
              ))}
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
    </>
  )
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        id
        name
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
