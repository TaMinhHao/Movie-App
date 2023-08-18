import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/movieDbApi";

const ListVideo = (props) => {
  const { category } = useParams();
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideo(category, props.id);
      setVideo(res.results.slice(0, 5));
    };

    getVideos();
  }, [category, props.id]);

  return (
    <>
      {video.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </>
  );
};

const Video = (props) => {
    const item= props.item
    const iframeRef = useRef(0)

    useEffect(() => {
      const height= iframeRef.current.offsetWidth * 9 / 16 + 'px'
      iframeRef.current.setAttribute('height',height)
    }, [])
    

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default ListVideo;
