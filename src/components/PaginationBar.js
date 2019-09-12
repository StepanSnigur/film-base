import React  from 'react';
import styled from 'styled-components';

let Wrapper = styled.div`
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
let PageLink = styled.span`
    display: block;
    cursor: pointer;
    margin-right: 10px;
    font-size: 18px;
    
    &:last-child {
        margin-right: 0;
    }
    
    ${
        ({ isActive }) => {
            return isActive && `text-decoration: underline;`
        }
    }
`

let PaginationBar = (props) => {
    let pagesCount = [];
    let currentPage = props.currentPage;
    let maxPagesCount = props.maxPagesCount;
    let PaginationBarLimiter = currentPage - 10 <= 0 ? 1 : currentPage - 10;

    for (let i = 0; i <= maxPagesCount; i++) {
        pagesCount.push(i);
    }

    let selectPage = (pageId) => {
        if (pageId > 0 && pageId <= maxPagesCount) props.updatePage(pageId);
    }

    return (
        <>
            {
                maxPagesCount <= 1 ?
                null :
                <Wrapper>
                    <button onClick={() => selectPage(currentPage - 1)}>&lt;</button>
                    <div>
                        {
                            pagesCount.map((el) => {
                                return (
                                    <PageLink isActive={el === currentPage} onClick={(e) => selectPage(e.target.innerHTML)} key={el}>{el}</PageLink>
                                )
                            }).slice(PaginationBarLimiter, currentPage + 11)
                        }
                    </div>
                    <button onClick={() => selectPage(currentPage + 1)}>&gt;</button>
                </Wrapper>
            }
        </>
    )
}

export default PaginationBar;