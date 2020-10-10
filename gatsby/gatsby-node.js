import path from 'path'

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
  const {
    data: {
      pizzas: { nodes: pizzas },
    },
  } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)
  pizzas.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: { slug: pizza.slug.current },
    })
  })
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  const {
    data: {
      toppings: { nodes: toppings },
    },
  } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `)
  toppings.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: { topping: topping.name, toppingRegex: `/${topping.name}/i` },
    })
  })
}

export async function createPages(params) {
  await Promise.all([turnPizzasIntoPages(params), turnToppingsIntoPages(params)])
}
