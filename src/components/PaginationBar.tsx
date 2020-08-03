import React from 'react';
import styled from 'styled-components';

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
  currentPage: number,
  maxPagesCount: number,
  updatePage: (pageId: number) => void
}

const PaginationBar: React.FC<IPaginationBar> = (props) => {
  const pagesCount = [];
  const currentPage = props.currentPage;
  const maxPagesCount = props.maxPagesCount;
  const PaginationBarLimiter = currentPage - 10 <= 0 ? 1 : currentPage - 10;

  for (let i = 0; i <= maxPagesCount; i++) {
    pagesCount.push(i);
  }

  const selectPage = (pageId: number) => {
    if (pageId > 0 && pageId <= maxPagesCount && pageId !== currentPage) props.updatePage(pageId);
  }

  return (
    <>
      {maxPagesCount > 1 && <Wrapper>
        <button onClick={() => selectPage(currentPage - 1)}>&lt;</button>
        <div>
          {pagesCount.map((el) => {
            return (
              <PageLink
                isActive={el === currentPage}
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => selectPage(+e.currentTarget.innerHTML)}
                key={el}
              >{el}</PageLink>
            )
          }).slice(PaginationBarLimiter, currentPage + 11)}
        </div>
        <button onClick={() => selectPage(currentPage + 1)}>&gt;</button>
      </Wrapper>}
    </>
  )
}

export default PaginationBar;
