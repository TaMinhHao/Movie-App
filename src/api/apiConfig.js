const apiConfig = {
    URL: "https://api.themoviedb.org/3/",
    key: process.env.REACT_APP_API_KEY,
    originalImg: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Img: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};
export default apiConfig;
