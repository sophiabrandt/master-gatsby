import { FaPepperHot as icon } from 'react-icons/fa'

export default {
  // schema name
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Is that topping vegetarian?',
      options: {
        layout: 'checkbox'
      }
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian'
    },
    prepare: ({name, vegetarian}) => ({title: `${name} ${vegetarian ? ' 🥬' : ''}`})
  }
}
