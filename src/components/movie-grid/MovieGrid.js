import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./moviegrid.scss";
import MovieCard from "../movie-card/MovieCard";
import Input from "../input/Input";
import Button, { OutLineButton } from "../buttons/Button";

import tmdbApi, { category, movieType, tvType } from "../../api/movieDbApi";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let respone = null;

      if (keyword === undefined) {
        const params = {};

        switch (props.category) {
          case category.movie:
            respone = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });

            break;
          default:
            respone = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        respone = await tmdbApi.search(props.category, { params });
      }
      setItems(respone.results);
      setTotalPage(respone.total_pages);
    };

    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let respone = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };

      switch (props.category) {
        case category.movie:
          respone = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });

          break;
        default:
          respone = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      respone = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...respone.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <SearchMovie category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutLineButton className="small" onClick={loadMore}>
            Xem Thêm
          </OutLineButton>
        </div>
      ) : null}
    </>
  );
};

// search
const SearchMovie = (props) => {
  const history = useHistory();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const toSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();

      if (e.keyCode === 13) {
        toSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);

    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, toSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Tìm Kiếm"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className='small' onClick={toSearch}><i className='bx bx-search-alt'></i></Button>
    </div>
  );
};

export default MovieGrid;
