import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://wwww.gatsby.pizza',
    description: 'The best pizza in town!',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'vtpxf73d',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
}
