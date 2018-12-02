const initialPortfolioState = {
  portfolioData: []
}

const portfolioReducer = function(state = initialPortfolioState, action) {
  switch(action.type) {
  case 'UPDATE_PORTFOLIO_DATA':
    return Object.assign({}, state, { portfolioData: action.portfolioData });
  }
  return state;
}

export default portfolioReducer;