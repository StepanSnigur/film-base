import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  
  button {
    width: 50px;
    height: 50px;
    color: #000;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    border: none;
    background: #eee;
    font-size: 20px;
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
  }
  
  @media (max-width: 400px) {
    button {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
  }
`
const PageLink = styled.span`
  display: block;
  cursor: pointer;
  margin-right: 10px;
  font-size: 18px;
  
  &:last-child {
    margin-right: 0;
  }
    
  ${(props: { isActive: boolean }) => props.isActive && `text-decoration: underline;`}
`

interface IPaginationBar {
  pagesCount: number,
  currentPage: number,
  onPageChange: (pageId: number) => void,
  isFunctionWrapped?: boolean
}

const PaginationBar: React.FC<IPaginationBar> = ({ pagesCount, currentPage = 1, onPageChange, isFunctionWrapped = true }) => {
  const dispatch = useDispatch()
  const generatePages = (pagesCount: number): number[] => {
    return Array.from({ length: pagesCount }, (_, i) => i + 1)
  }
  const getPages = useMemo(() => generatePages(pagesCount), [pagesCount])

  const paginationBarLimiter = currentPage - 10 <= 0 ? 0 : currentPage - 11;
  const selectPage = (pageId: number) => {
    if (pageId > 0 && pageId <= pagesCount && pageId !== currentPage) {
      isFunctionWrapped ? onPageChange(pageId) : dispatch(onPageChange(pageId))
    }
  }

  return (
    <>
      {pagesCount > 1 && <Wrapper>
        <button onClick={() => selectPage(currentPage - 1)}>&lt;</button>
        <div>
          {getPages
            .slice(paginationBarLimiter, currentPage + 10)
            .map(pageId => (
              <PageLink
                isActive={pageId === currentPage}
                onClick={() => selectPage(pageId)}
                key={pageId}
              >{pageId}</PageLink>
            ))}
        </div>
        <button onClick={() => selectPage(currentPage + 1)}>&gt;</button>
      </Wrapper>}
    </>
  )
}

export default PaginationBar;
