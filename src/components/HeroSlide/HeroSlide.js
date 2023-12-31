import React, { useEffect, useRef, useState } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi, { category, movieType } from "../../api/movieDbApi";
import apiConfig from "../../api/apiConfig";

import Modal, { ModalContent } from "../modal/Modal";
import Button, { OutLineButton } from "../buttons/Button";
import "./heroslide.scss";
import { useHistory } from "react-router-dom";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(0, 4));
        // console.log(response);
      } catch {
        console.log("err");
      }
    };
    getMovie();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""} `}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {
        movieItems.map((item,i )=> <TrailerModal key={i} item={item}/>)
      }
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useHistory();
  const item = props.item;
  const background = apiConfig.originalImg(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const video = await tmdbApi.getVideo(category.movie, item.id);

    if (video.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + video.results[0].key;

      modal.querySelector(".modal__content > iframe").setAttribute("src", videoSrc);

    } else {
      modal.querySelector(".modal__content").innerHTML ="Không có Trailer";
    }
    modal.classList.toggle("active");
  };


  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push("/movie/" + item.id)}>
              Thông tin 
            </Button>
            <OutLineButton onClick={setModalActive}>Xem trailer</OutLineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Img(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src",null);

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer modal"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
