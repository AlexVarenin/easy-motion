import React from 'react';
import {Link} from 'react-router-dom';
import WellcomeSpinner from './WellcomeSpinner';

let sectionData = [
	  {
	    title: 'Animation',
	    description: 'actions, cycles, facial animation',
	    img: 'animation.png',
      imgMin: 'animation-min.png',
	    subUrl: '/animation'
	  },
	  {
	    title: 'Rig',
	    description: 'characters, facial',
	    img: 'rig.png',
      imgMin: 'rig-min.png',
	    subUrl: '/rig'
	  },
	  {
	    title: 'VFX',
	    description: 'Bifrost, Fluids, xGen, nCloth, nHair, nParticles',
	    img: 'vfx.png',
      imgMin: 'vfx-min.png',
	    subUrl: '/vfx'
	  },
	  {
	    title: 'Gaming',
	    description: 'Unreal Engine 4',
	    img: 'gaming.png',
      imgMin: 'gaming-min.png',
	    subUrl: '/gaming'
	  }
  ];

export default class Section extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  isLoading: true
		};
		this.loadCounter = 0;
	}

	handleImageLoaded = () => {
	    if (++this.loadCounter === sectionData.length) {
        this.setState( {isLoading: false});
      }
	};

  handleMaimImageLoaded = e => {
    e.target.parentNode.parentNode.parentNode.children[1].style.display = 'none';
  };

   render() {
      return (
        <div className='animation'>
        	<ul className='animation__list'>
          		{ sectionData.map(( item, index) => 
              		<li className='animation__list-item' key={index}>
                		<div className='animation__background'>
                  			<div><img
	                  			src={item.img}
	                  			onLoad={($event)=>{this.handleMaimImageLoaded($event)}}
	                  			alt='section img'
                  			/></div>
                		</div>
                    <div className='animation__background animation__background--min'>
                      <div><img
                        src={item.imgMin}
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
