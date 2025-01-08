import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import IconSearch from "../../../public/iconSearch.png"
import './Search.css';

export const Search = () => {
    const [dataToSearch, setDataToSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!dataToSearch.trim()) {
            toast.error('Escribe el nombre de la película/serie.')
            return;
        }

        setIsLoading(true)

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(dataToSearch)}&language=en-US&page=1`,
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
                    }
                }
            );

            const data = await res.json();
            setSearchResults(data.results || []);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching search results:', error);
            setIsLoading(false)
        }
    };

    return (
        <div className="searchAll">
            <Toaster />
            <h1>Buscar Películas/Series</h1>
            <div className="search">
                <input
                    onChange={(e) => setDataToSearch(e.target.value)}
                    type="text"
                    placeholder="Escribe el nombre de la película/serie"
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            <div className="results">
                {
                    searchResults ? (
                        searchResults?.map((movie, index) => (
                            <Link
                                key={movie?.id}
                                className="contCard"
                                to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}
                            >
                                <div className="movie">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`}
                                        alt={movie?.title || movie?.name}
                                    />
                                    <div className="cont-btn">
                                        <img
                                            width="20"
                                            height="20"
                                            src="https://img.icons8.com/glyph-neue/64/play.png"
                                            alt="play"
                                        />
                                        <p>{movie?.title || movie?.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : isLoading ? (
                        <div class="loading-wave">
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                            <div class="loading-bar"></div>
                        </div>
                    ) : (
                        <div className="anunce">
                            <img src={IconSearch} alt="" />
                            <p>Busca algo para ver tus resultados</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
