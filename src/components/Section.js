import React from 'react';
import {Link} from 'react-router-dom';
import WellcomeSpinner from './WellcomeSpinner';

let sectionData = [
	  {
	    title: 'Animation',
	    description: 'actions, cycles, facial animation',
	    img: 'animation.png',
	    subUrl: '/animation'
	  },
	  {
	    title: 'Rig',
	    description: 'characters, facial',
	    img: 'rig.png',
	    subUrl: '/rig'
	  },
	  {
	    title: 'VFX',
	    description: 'Bifrost, Fluids, xGen, nCloth, nHair, nParticles',
	    img: 'vfx.png',
	    subUrl: '/vfx'
	  },
	  {
	    title: 'Gaming',
	    description: 'Unreal Engine 4',
	    img: 'gaming.png',
	    subUrl: '/gaming'
	  }
  ];

export default class Section extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoading: true
		};
	}

	handleImageLoaded = () => {
      this.setState( {isLoading: false});
	}

   render() {
      return (
        <div className='animation'>
        	<ul className='animation__list'>
          		{ sectionData.map(( item, index) => 
              		<li className='animation__list-item' key={index}>
                		<div className='animation__background'>
                  			<div><img
	                  			src={item.img}
	                  			onLoad={this.handleImageLoaded}
	                  			alt='section img'
                  			/></div>
                		</div>
                		<Link to={this.props.match.url+item.subUrl}>
                  		<div className='animation__wrapper'>
                    		<h3>{item.title}</h3>
                    		<p>{item.description}</p>
                  		</div>
                		</Link>
              		</li> )}
         	</ul>
         	{ this.state.isLoading && <WellcomeSpinner
        		customClass={'no-amination'}
        	/>}
        </div>
      );
   }
   componentWillMount() {
    window.scrollTo(0,0);
  }
} 