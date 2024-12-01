import "./Genres.css"
import React, { useEffect, useState } from 'react'
import genreMap from "../../AvaliableGenres.json"
import { Link } from 'react-router-dom'

export const Genres = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [allData, setAllData] = useState(null)
    const [genres, setGenres] = useState(["12"])
    const [page, setPage] = useState(1)

    const fetchDataByGenre = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genres.join(",")}&language=en-US&page=${page}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                }
            });

            const data = await res.json();
            setAllData(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (genres.length > 0) {
            setPage(1)
            fetchDataByGenre()

            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }, [genres])

    useEffect(() => {
        fetchDataByGenre()
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [page])

    const toggleGenre = (key) => {
        if (genres.includes(key)) {
            setGenres(genres.filter((genre) => genre !== key));
        } else {
            setGenres((prevData) => [...prevData, key]);
        }
    }

    return (
        <div className="genresPageCont">
            <div className="contMenu">
                <h1>Genres</h1>
                <p>You can select one or more genres</p>
                <div className="buttons">
                    {
                        Object.entries(genreMap).map(([key, genre]) => (
                            <button
                                key={key}
                                className={genres.includes(key) ? "active" : ""}
                                onClick={() => toggleGenre(key)}
                            >
                                {genre}
                            </button>
                        ))
                    }
                </div>
            </div>

            <div className="cont-cards">
                <div className="headerResults">
                    <p><span>{allData?.total_results || 0}</span> Results</p>
                    <div className="paginationGen">
                        {
                            page > 1 &&
                            <button className='btnTransform' onClick={() => { setPage(page - 1), window.scroll(0, 0) }}>
                                <img width="30" height="30" src="https://img.icons8.com/glyph-neue/40/bd0300/circled-chevron-right.png" alt="circled-chevron-right" />
                            </button>
                        }
                        <div className="aPage">
                            <span>{page}</span>
                            &nbsp;of
                            &nbsp;{allData?.total_pages || 0}
                            <small>pages</small>
                        </div>
                        <button onClick={() => { setPage(page + 1), window.scroll(0, 0) }}>
                            <img width="30" height="30" src="https://img.icons8.com/glyph-neue/40/bd0300/circled-chevron-right.png" alt="circled-chevron-right" />
                        </button>
                    </div>
                </div>

                {
                    isLoading ? (
                        Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="imgLoading movieLoading"></div>
                        ))
                    ) : (
                        allData?.results.length > 0 ? allData?.results.map((movie, index) => (
                            movie.poster_path && (
                                <Link className='contCard' to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`} key={index}>
                                    <div className="movie">
                                        <img src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie?.title} />
                                        <div className='cont-btn'>
                                            <img width="20" height="20" src="https://img.icons8.com/glyph-neue/64/play.png" alt="play" />
                                            <p>{movie?.title || movie?.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )) : (
                            <div className="no-results">
                                <img width="50" height="50" src="https://img.icons8.com/hatch/50/nothing-found.png" alt="nothing-found" />
                                <p>No Results Found</p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
