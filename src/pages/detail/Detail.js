import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import tmdbApi from "../../api/movieDbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import ListVideo from "./ListVideo";
import MovieList from '../../components/movie-list/MovieList'

const Detail = () => {
  const { category, id } = useParams();

  const [items, setItems] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItems(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {items && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImg(
                items.backdrop_path || items.poster_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImg(
                    items.backdrop_path || items.poster_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <div className="title">{items.title || items.name}</div>
              <div className="genres">
                Thể loại:
                {items.genres &&
                  items.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <div className="overview">{items.overview}</div>
              <div className="cast">
                <div className="section__header">
                  <h2>Diễn Viên</h2>
                </div>
                <CastList id={items.id}/>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <ListVideo id={items.id}/>
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Nội dung khác</h2>
              </div>
                <MovieList category={category} type='similar' id={items.id}/>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
