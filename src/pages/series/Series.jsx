import React, { useEffect, useState } from 'react'
import "../movies/Movies.css"
import { Link } from 'react-router-dom'
import genreMap from "../../AvaliableGenres.json"

export const Series = () => {
    const [popularSeriesData, setPopularSeriesData] = useState(null)
    const [airSeriesData, setAirSeriesData] = useState(null)
    const [centerImg, setCenterImg] = useState(null)
    const [totalSeries, setTotalSeries] = useState(null)
    const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true)
    const [isLoadingPopular, setIsLoadingPopular] = useState(true)
    const [page, setPage] = useState(1)

    const getGenres = (genreIds) => {
        return genreIds
            .map(id => genreMap[id])
            .filter(Boolean)
            .join(", ");
    };

    const fetchPopularSeries = async () => {
        try {
            setIsLoadingPopular(true)
            const res = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                }
            });

            const data = await res.json();
            const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            if (!centerImg) { setCenterImg(randomMovie?.backdrop_path) }
            if (!totalSeries) { setTotalSeries(data.total_results) }
            setPopularSeriesData(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchAirSeries = async () => {
        try {
            const res = await fetch("https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1", {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                }
            });

            const data = await res.json();
            setAirSeriesData(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchAirSeries()
    }, []);

    useEffect(() => {
        fetchPopularSeries();
    }, [page]);

    useEffect(() => {
        if (airSeriesData) {
            setTimeout(() => {
                setIsLoadingUpcoming(false)
            }, [1000])
        }
    }, [airSeriesData])

    useEffect(() => {
        if (popularSeriesData) {
            setTimeout(() => {
                setIsLoadingPopular(false)
            }, [1000])
        }
    }, [popularSeriesData])

    return (
        <>
            <div className="cont-header-movies">
                <img src={`https://image.tmdb.org/t/p/w1280${centerImg}`} />
                <div className="content">
                    <h1>Series</h1>
                    {
                        !totalSeries ? (
                            <div class="load">
                                <hr /><hr /><hr /><hr />
                            </div>
                        ) : (
                            <p>More than <span>{popularSeriesData?.total_results}</span> series</p>
                        )
                    }
                </div>
            </div>



            <div className="cont-info-all">
                {
                    isLoadingPopular ? (
                        <div className='cont-movies-page'>
                            {
                                Array.from({ length: 20 }).map((_, index) => (
                                    <div key={index} className="imgLoading movieLoading"></div>
                                ))
                            }
                        </div>
                    ) : (
                        <>
                            <div className='cont-movies-page'>
                                {
                                    popularSeriesData?.results?.map((movie, index) => (
                                        movie.poster_path ? (
                                            <Link key={movie?.id} className='contCard' to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}>
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
                            </div>
                        </>
                    )
                }

                {
                    isLoadingUpcoming ? (
                        <div className="cont-movies-upcoming">
                            <h3>
                                <span className="one">ON</span>
                                <span className="two">
                                    The
                                    <span className='three'>Air</span>
                                </span>
                            </h3>
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="imgLoading upcomingLoading"></div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className="cont-movies-upcoming">
                            <h3>
                                <span className="one">ON</span>
                                <span className="two">
                                    The
                                    <span className='three'>Air</span>
                                </span>
                            </h3>
                            {
                                airSeriesData?.slice(0, 6).reverse().map((movie, index) => (
                                    movie.poster_path ? (
                                        <Link key={movie?.id} className='contCard' to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}>
                                            <div key={index} className="movie">
                                                <img src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie?.title} />
                                                <div className="info">
                                                    <p className='date'>{movie?.release_date || movie?.first_air_date}</p>
                                                    <p className='title'>{movie?.title || movie?.name}</p>
                                                    <p className='genres'>{getGenres(movie.genre_ids) || "varied"}</p>
                                                    <p className='rate'>
                                                        {Math.floor(movie?.vote_average)}/10
                                                        <img width="20" height="20" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1" />
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ) : ""
                                ))
                            }
                        </div>
                    )
                }
            </div>

            {
                isLoadingPopular ? (
                    ""
                ) : (
                    <div className="pagination">
                        {
                            page > 1 &&
                            <button className='btnTransform' onClick={() => { setPage(page - 1), window.scroll(0, 0) }}>
                                <img width="40" height="40" src="https://img.icons8.com/glyph-neue/40/bd0300/circled-chevron-right.png" alt="circled-chevron-right" />
                            </button>
                        }
                        <div className="aPage">
                            <span>{page}</span>
                            &nbsp;de
                            &nbsp;{popularSeriesData?.total_pages}
                        </div>
                        <button onClick={() => { setPage(page + 1), window.scroll(0, 0) }}>
                            <img width="40" height="40" src="https://img.icons8.com/glyph-neue/40/bd0300/circled-chevron-right.png" alt="circled-chevron-right" />
                        </button>
                    </div>
                )
            }
        </>
    )
}
