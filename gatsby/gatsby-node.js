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

export async function createPages(params) {
  await turnPizzasIntoPages(params)
}
