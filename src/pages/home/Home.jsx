import React, { useEffect, useState } from 'react'
import "./Home.css"
import LogoSmall from "../../../public/logoSmall.png"
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import genreMap from "../../AvaliableGenres.json"
import { useMediaQuery } from "react-responsive";

export const Home = () => {
    const [popularMoviesData, setPopularMoviesData] = useState(null)
    const [popularSeriesData, setPopularSeriesData] = useState(null)
    const [topRatedMoviesData, setTopRatedMoviesData] = useState(null)
    const [centerMovie, setCenterMovie] = useState(null)
    const [trending, setTrending] = useState(null)
    const [heroVideoKey, setHeroVideoKey] = useState(null)
    const isMobile = useMediaQuery({ maxWidth: 600 });

    const fetchPopularMovies = async () => {
        try {
            const res = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                }
            });

            const data = await res.json();
            setPopularMoviesData(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchPopularSeries = async () => {
        try {
            const res = await fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                }
            });

            const data = await res.json();
            setPopularSeriesData(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchTopRatedMovies = async () => {
        try {
            const res = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                }
            });

            const data = await res.json();
            setTopRatedMoviesData(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchTrending = async () => {
        try {
            const res = await fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                }
            });

            const data = await res.json();
            const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            setCenterMovie(randomMovie);
            setTrending(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchVideoHero = async () => {
        if (centerMovie) {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${centerMovie.id}/videos`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                    }
                });

                const data = await res.json();
                setHeroVideoKey(data.results[0].key)
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
    };

    useEffect(() => {
        fetchPopularMovies()
        fetchTopRatedMovies()
        fetchTrending()
        fetchPopularSeries()
    }, [])

    useEffect(() => {
        fetchVideoHero()
    }, [centerMovie])

    const getGenres = (genreIds) => {
        return genreIds.map(id => genreMap[id]).join(", ");
    };

    return (
        <div>
            <main>
                <div className="sectionInicio">
                    <div className="data">
                        <p className='top-info'>{centerMovie ? getGenres(centerMovie.genre_ids) : ''}</p>
                        <h1>{centerMovie?.title || centerMovie?.name}</h1>
                        <div className="cont-down-info">
                            <p>{centerMovie?.release_date || centerMovie?.first_air_date}</p>
                            <p>
                                {centerMovie?.vote_average / 2}
                                <img width="20" height="20" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1" />
                                &nbsp; ({centerMovie?.vote_count} votos)
                            </p>
                        </div>
                        <p className='pDes'>{centerMovie?.overview}</p>
                        <div className="buttons">
                            <Link className='button' to={centerMovie?.first_air_date ? `/series/details/${centerMovie?.id}` : `/movies/details/${centerMovie?.id}`}>
                                <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/visible.png" alt="visible" />
                                See Details
                            </Link>
                            {
                                heroVideoKey && (
                                    <a
                                        target='_blank'
                                        className='buttonTrailer'
                                        href={`https://www.youtube.com/watch?v=${heroVideoKey}`}
                                    >
                                        <img width="20" height="20" src="https://img.icons8.com/glyph-neue/64/play.png" alt="play" />
                                        Watch Trailer
                                    </a>
                                )
                            }

                        </div>
                    </div>
                    {
                        heroVideoKey && !isMobile ? (
                            <iframe
                                className="iframeVideo"
                                src={`https://www.youtube.com/embed/${heroVideoKey}?autoplay=1&controls=0&mute=1&loop=1&playlist=${heroVideoKey}&modestbranding=1&rel=0&cc_load_policy=0`}
                                title={centerMovie?.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        ) : (
                            <img
                                className='imgBack'
                                src={`https://image.tmdb.org/t/p/w1280${centerMovie?.backdrop_path}`}
                                alt={centerMovie?.title}
                            />
                        )
                    }
                </div>

                <div className="mostPopular">
                    <div className="headermp">
                        <h2>Trending Of The Day <img src={LogoSmall} alt="" /></h2>
                    </div>
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={6}
                        slidesToScroll={3}
                        responsive={[
                            { breakpoint: 1500, settings: { slidesToShow: 6, slidesToScroll: 4 } },
                            { breakpoint: 1200, settings: { slidesToShow: 5, slidesToScroll: 3 } },
                            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
                            { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                            { breakpoint: 450, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                        ]}
                    >
                        {
                            trending?.map((movie, index) => (
                                movie.poster_path ? (
                                    <Link className='contCard' to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}>
                                        <div key={index} className="movie">
                                            <img src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie?.title} />
                                            <div className='cont-btn'>
                                                <img width="20" height="20" src="https://img.icons8.com/glyph-neue/64/play.png" alt="play" />
                                                <p>{movie?.title || movie?.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : ""
                            ))
                        }
                    </Slider>
                </div>

                <div className="mostPopular">
                    <div className="headermp">
                        <h2>Most Popular Movies </h2>
                        <Link to="/">See All Movies</Link>
                    </div>
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={6}
                        slidesToScroll={3}
                        responsive={[
                            { breakpoint: 1500, settings: { slidesToShow: 6, slidesToScroll: 4 } },
                            { breakpoint: 1200, settings: { slidesToShow: 5, slidesToScroll: 3 } },
                            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
                            { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                            { breakpoint: 450, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                        ]}
                    >
                        {
                            popularMoviesData?.map((movie, index) => (
                                movie.poster_path ? (
                                    <Link className='contCard' to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}>
                                        <div key={index} className="movie">
                                            <img src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie?.title} />
                                            <div className='cont-btn'>
                                                <img width="20" height="20" src="https://img.icons8.com/glyph-neue/64/play.png" alt="play" />
                                                <p>{movie?.title || movie?.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : ""
                            ))
                        }
                    </Slider>
                </div>

                <div className="mostPopular">
                    <div className="headermp">
                        <h2>Top Rated Movies</h2>
                    </div>
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={6}
                        slidesToScroll={3}
                        responsive={[
                            { breakpoint: 1500, settings: { slidesToShow: 6, slidesToScroll: 4 } },
                            { breakpoint: 1200, settings: { slidesToShow: 5, slidesToScroll: 3 } },
                            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
                            { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                            { breakpoint: 450, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                        ]}
                    >
                        {
                            topRatedMoviesData?.map((movie, index) => (
                                movie.poster_path ? (
                                    <Link className='contCard' to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}>
                                        <div key={index} className="movie">
                                            <img src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie?.title} />
                                            <div className='cont-btn'>
                                                <img width="20" height="20" src="https://img.icons8.com/glyph-neue/64/play.png" alt="play" />
                                                <p>{movie?.title || movie?.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : ""
                            ))
                        }
                    </Slider>
                </div>

                <div className="mostPopular">
                    <div className="headermp">
                        <h2>Most Popular Series</h2>
                        <Link to="/">See All Series</Link>
                    </div>
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={6}
                        slidesToScroll={3}
                        responsive={[
                            { breakpoint: 1500, settings: { slidesToShow: 6, slidesToScroll: 4 } },
                            { breakpoint: 1200, settings: { slidesToShow: 5, slidesToScroll: 3 } },
                            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
                            { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                            { breakpoint: 450, settings: { slidesToShow: 1, slidesToScroll: 1 } },
                        ]}
                    >
                        {
                            popularSeriesData?.map((movie, index) => (
                                movie.poster_path ? (
                                    <Link className='contCard' to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}>
                                        <div key={index} className="movie">
                                            <img src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie?.title} />
                                            <div className='cont-btn'>
                                                <img width="20" height="20" src="https://img.icons8.com/glyph-neue/64/play.png" alt="play" />
                                                <p>{movie?.title || movie?.name || "See Details"}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : ""
                            ))
                        }
                    </Slider>
                </div>
            </main>
        </div>
    )
}
