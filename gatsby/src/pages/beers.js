import styled from 'styled-components';
import React from 'react'
import { graphql } from 'gatsby'

const BeerGridStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const SingleBeerStyle = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    line-items: center;
    font-size: 10px;
  }
`

export default function BeersPage({
  data: {
    beers: { nodes: beers },
  },
}) {
  return (
    <>
      <h2 className="center">
        We have {beers.length} beers available. Dine in only!
      </h2>
    <BeerGridStyle>
      {beers.map((beer) => {
        const rating = Math.round(beer.rating.average)
        return (
          <SingleBeerStyle key={beer.id}>
            <img src={beer.image} alt={beer.name} />
            <h3>{beer.name}</h3>
            {beer.price}
            <p title={`${rating} out of 5 stars`}>
              {`⭐`.repeat(rating)}
              <span style={{ filter: `grayScale(100%)` }}>
                {`⭐`.repeat(5 - rating)}
              </span>
              <span>({beer.rating.reviews})</span>
            </p>
          </SingleBeerStyle>
        )
      })}
    </BeerGridStyle>
    </>
  )
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`
