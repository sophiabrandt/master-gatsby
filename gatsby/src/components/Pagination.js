import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const PaginationGrid = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  text-align: center
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current], &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`


export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize)
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasPrevPage = prevPage >= 1
  const hasNextPage = nextPage <= totalPages

  return (
    <PaginationGrid>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        🢀 Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link className={currentPage === 1 && i === 0 ? 'current' : ''} to={`${base}/${i+1}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next 🢚
      </Link>
    </PaginationGrid>
  )
}
