import { MdLocalPizza as icon } from 'react-icons/md'

// helper function
function createArrayfromSelectedKeys(obj, fn) {
  return Object.keys(obj)
    .filter((key) => fn(key))
    .filter((key) => obj[key] !== undefined)
    .reduce((value, key) => value.concat(obj[key]), [])
}

export default {
  // schema name
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Pizza price in cents',
      validation: (Rule) => Rule.required().min(1000).max(50000),
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0name: 'toppings.0.name',
      topping1name: 'toppings.1.name',
      topping2name: 'toppings.2.name',
      topping3name: 'toppings.3.name',
      topping0vegetarian: 'toppings.0.vegetarian',
      topping1vegetarian: 'toppings.1.vegetarian',
      topping2vegetarian: 'toppings.2.vegetarian',
      topping3vegetarian: 'toppings.3.vegetarian',
    },
    prepare: ({ title, media, ...toppings }) => {
      // find all names for the toppings
      const toppingNames = createArrayfromSelectedKeys(toppings, (key) =>
        key.includes('name')
      )

      // find the vegetarian flags
      const toppingsVegetarian = createArrayfromSelectedKeys(toppings, (key) =>
        key.includes('vegetarian')
      )

      // are all toppings vegetarian?
      const allVegetarian = toppingsVegetarian.every(Boolean)

      const veggieMarker = allVegetarian ? ' 🥬' : ''

      // display preview object
      return {
        title,
        media,
        subtitle: toppingNames.join(', ') + veggieMarker,
      }
    },
  },
}
