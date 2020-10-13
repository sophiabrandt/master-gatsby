import path from 'path'
import fetch from 'isomorphic-fetch'

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

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch('https://sampleapis.com/beers/api/ale')
  const beers = await res.json()
  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beers-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    }
    actions.createNode({
      ...beer,
      ...nodeMeta,
    })
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  const {
    data: { slicemasters },
  } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)
  const pageSize = Number(process.env.GATSBY_PAGE_SIZE)
  const pageCount = Math.ceil(slicemasters.totalCount / pageSize)
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`)
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    })
  })
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ])
}
