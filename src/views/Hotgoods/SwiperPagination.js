import React,{ Component } from 'react'
import classNames from 'classnames'
import ReactSwipe from 'react-swipe';

class SwiperPagination extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentDidUpdate() {
  }

  render() {
    var props = this.props;
    return (
      <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
        {
          props.swipers.map(function(item,i){
            return (<span key={i} className={props.active == i ? 'swiper-pagination-bullet swiper-pagination-bullet-active' : 'swiper-pagination-bullet'}></span>)
          })
        }
      </div>
    )
  }
};
export default SwiperPagination;
