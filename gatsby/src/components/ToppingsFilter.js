import styled from 'styled-components'
import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 0 1rem;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`

function countPizzasInToppings(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((obj, topping) => {
      // Does the topping exist?
      const existingTopping = obj[topping.id]
      if (existingTopping) {
        existingTopping.count += 1
      } else {
        // Create an object that holds the topping name, id and count
        obj[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        }
      }
      return obj
    }, {})

  const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count)

  return sortedToppings
}

export default function ToppingsFilter({ activeTopping }) {
  const {
    pizzas: { nodes: pizzas },
  } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `)
  console.log('activeTopping', activeTopping)

  const toppingsWithCounts = countPizzasInToppings(pizzas)
  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  )
}
