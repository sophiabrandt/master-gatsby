import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import PizzaOrder from '../components/PizzaOrder'
import SEO from '../components/SEO'
import MenuItemStyles from '../styles/MenuItemStyles'
import OrderStyles from '../styles/OrderStyles'
import calculatePizzaPrice from '../utils/calculatePizzaPrice'
import formatMoney from '../utils/format'
import useForm from '../utils/useForm'
import usePizza from '../utils/usePizza'

export default function OrdersPage({
  data: {
    pizzas: { nodes: pizzas },
  },
}) {
  const { values, updateValues } = useForm({ name: '', email: '' })
  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  })
  return (
    <>
      <SEO title="Order a pizza!" />
      <OrderStyles action="">
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
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                width="50"
                height="50"
                alt={pizza.name}
                fluid={pizza.image.asset.fluid}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
      </OrderStyles>
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
