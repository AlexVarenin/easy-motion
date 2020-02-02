import React from 'react';
import { Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import Video from './Video';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import WellcomeSpinner from "./WellcomeSpinner";

const galleryData = [
	'animation',
  'rig',
  'vfx',
  'gaming',
];


class Gallery extends React.Component {
 render() {
    return (
      <div className="portfolio">
        { !this.props.portfolioData.length && <WellcomeSpinner
          customClass={'no-amination'}
        />}
	      {this.props.match.params.subsection === 'gallery'
        ? galleryData.map( (item, index) =>
            <Portfolio section={this.props.match.params.section} title={item} subsection={this.props.match.params.subsection}  breadcrumbs={false} key={index} />)
        : <Portfolio section={this.props.match.params.section} title={this.props.match.params.subsection} subsection={this.props.match.params.subsection}  breadcrumbs={true}/>
         }
      <Route path={`/${this.props.match.params.section}/${this.props.match.params.subsection}/:id`} component={Video} />
      </div>
      );
  }

  componentWillMount() {
    window.scrollTo(0,0);
  }
}

const mapStateToProps = function(store) {
  return {
    portfolioData: store.portfolioState.portfolioData
  };
}

export default withRouter(connect(mapStateToProps)(Gallery));
