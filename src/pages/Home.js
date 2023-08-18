import React from 'react'
import { Link } from 'react-router-dom'
import { OutLineButton } from '../components/buttons/Button'
import HeroSlide from '../components/HeroSlide/HeroSlide'
import MovieList from '../components/movie-list/MovieList'

import { category,movieType, tvType } from '../api/movieDbApi'

const Home = () => {
  return (
    <div>
      <HeroSlide/>
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Thịnh Hành </h2>
            <Link to='/movie'> 
              <OutLineButton className='small'>Xem Thêm</OutLineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular}/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Xếp Hạng Movie</h2>
            <Link to='/movie'>  
              <OutLineButton className='small'>Xem Thêm</OutLineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated}/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>TV Thịnh Hành</h2>
            <Link to='/tv'> 
              <OutLineButton className='small'>Xem Thêm</OutLineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular}/>
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>TV Xếp Hạng</h2>
            <Link to='/tv'> 
              <OutLineButton className='small'>Xem Thêm</OutLineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated}/>
        </div>
      </div>
    </div>
  )
}
export default Home