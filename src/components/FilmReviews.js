import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

let ReviewWrapper = styled.div`
    width: 800px;
    margin-bottom: 10px;
    padding: 12px;
    border-radius: 4px;
    background: #daf1db;
    
    @media (max-width: 900px) {
        width: 500px;
    }
`
let ShowReviewsBtn = styled.button`
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 40px;
    margin-top: 15px;
    border-radius: 4px;
    border: 3px solid #eee;
    background: none;
    cursor: pointer;
`

class FilmReviews extends Component {
    state = {
        reviewsLimiter: 0
    }

    initialReviewsLimiter = 3;

    componentDidMount() {
        this.setState({
            reviewsLimiter: this.initialReviewsLimiter
        })
    }

    moveReviewsLimiter = () => {
        this.setState({
            reviewsLimiter: this.state.reviewsLimiter + 3
        })
    }
    returnReviewsLimiterToInitial = () => {
        this.setState({
            reviewsLimiter: this.initialReviewsLimiter
        })
    }

    render() {
        let filmReviews = this.props.reviews.results;
        let { reviewsLimiter } = this.state;
        let showContentBtn = () => {
            return (
                <>
                    {
                        filmReviews.length > reviewsLimiter ?
                            <ShowReviewsBtn onClick={this.moveReviewsLimiter}>View more</ShowReviewsBtn> :
                            <ShowReviewsBtn onClick={this.returnReviewsLimiterToInitial}>Close</ShowReviewsBtn>
                    }
                </>
            )
        }
        return (
            <>
                {
                    filmReviews.length > 0 ?
                    <div>
                        <h2>Reviews:</h2>
                        <div>
                            {
                                filmReviews.slice(0, reviewsLimiter).map((el) => {
                                    return (
                                        <ReviewWrapper key={el.id}>
                                            <h3>{el.author}</h3>
                                            <p>{el.content}</p>
                                        </ReviewWrapper>
                                    )
                                })
                            }
                            {
                                filmReviews.length <= this.initialReviewsLimiter ?
                                null :
                                showContentBtn()
                            }
                        </div>
                    </div> :
                    null
                }
            </>
        );
    }
}

let mapStateToProps = ({ currentFilm }) => {
    return {
        reviews: currentFilm.reviews
    }
}

export default connect(mapStateToProps)(FilmReviews);