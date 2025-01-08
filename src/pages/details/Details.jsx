import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import "./Details.css"
import toast, { Toaster } from 'react-hot-toast';
import LogoSmall from "../../../public/logoSmall.png"
import Slider from "react-slick";
import { Link } from 'react-router-dom'

export const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [providers, setProviders] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [recomendations, setRecomendations] = useState(null);
  const [modalAddRating, setModalAddRating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [ratingScore, setRatingScore] = useState(0);
  const [videos, setVideos] = useState(null);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const badEmojis = ["🙁", "😕", "😒", "😟", "😞"];
  const neutralEmojis = ["😐", "🙂", "🤔", "😶", "🤨", "🤷"];
  const goodEmojis = ["😄", "😍", "🥳", "😎", "😊", "😃", "🤩"];


  const fetchDetails = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        }
      });

      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const fetchCredits = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        }
      });

      const data = await res.json();
      setCredits(data.cast);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const fetchVideos = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        }
      });

      const data = await res.json();
      setVideos(data)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchProviders = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        }
      });

      const data = await res.json();
      setProviders(data)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchKeywords = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        }
      });

      const data = await res.json();
      setKeywords(data.keywords || data.results)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchReviews = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        }
      });

      const data = await res.json();
      setReviews(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchRecomendations = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        }
      });

      const data = await res.json();
      setRecomendations(data.results)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/movies')) {
      fetchDetails(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
      fetchCredits(`https://api.themoviedb.org/3/movie/${id}/credits`);
      fetchVideos(`https://api.themoviedb.org/3/movie/${id}/videos`)
      fetchProviders(`https://api.themoviedb.org/3/movie/${id}/watch/providers`)
      fetchKeywords(`https://api.themoviedb.org/3/movie/${id}/keywords`)
      fetchReviews(`https://api.themoviedb.org/3/movie/${id}/reviews`)
      fetchRecomendations(`https://api.themoviedb.org/3/movie/${id}/recommendations`)
    } else if (location.pathname.includes('/series')) {
      fetchDetails(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
      fetchCredits(`https://api.themoviedb.org/3/tv/${id}/credits`);
      fetchVideos(`https://api.themoviedb.org/3/tv/${id}/videos`)
      fetchProviders(`https://api.themoviedb.org/3/tv/${id}/watch/providers`)
      fetchKeywords(`https://api.themoviedb.org/3/tv/${id}/keywords`)
      fetchReviews(`https://api.themoviedb.org/3/tv/${id}/reviews`)
      fetchRecomendations(`https://api.themoviedb.org/3/tv/${id}/recommendations`)
    }
  }, [id, location.pathname]);

  useEffect(() => {
    if (details) {
      setPercentage((details.vote_average / 10) * 100);
      window.document.title = "Mov · " + (details.title || details.name)
    }

  }, [details]);

  const getRandomEmojis = () => {
    let emojiList = [];
    if (percentage <= 20) {
      emojiList = [...badEmojis];
    } else if (percentage > 20 && percentage <= 40) {
      emojiList = [...neutralEmojis];
    } else {
      emojiList = [...goodEmojis];
    }

    const randomEmojis = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * emojiList.length);
      randomEmojis.push(emojiList[randomIndex]);
      emojiList.splice(randomIndex, 1);
    }

    return randomEmojis.map((emoji, index) => (
      <span key={index}>{emoji}</span>
    ));
  };

  const setRatingState = () => {
    setModalAddRating(true)
  }

  const closeModal = () => {
    setModalAddRating(false);
  }

  const getEmojiByScore = () => {
    if (ratingScore <= 2) {
      return <span>😡</span>
    } else if (ratingScore <= 4) {
      return <span>😕</span>
    } else if (ratingScore <= 6) {
      return <span>😐</span>
    } else if (ratingScore <= 8) {
      return <span>😊</span>
    } else if (ratingScore > 8) {
      return <span>😍</span>
    }
  }

  const sendNewRating = async () => {
    let url;

    if (location.pathname.includes('/movies')) {
      url = `https://api.themoviedb.org/3/movie/${id}/rating`;
    } else if (location.pathname.includes('/series')) {
      url = `https://api.themoviedb.org/3/tv/${id}/rating`;
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdmN2E0MDRiZGU0OGM3NzYzMzhkY2M3ZDEzZDZiMSIsIm5iZiI6MTcyNjAyNDI0MS41NDI3NjksInN1YiI6IjY0ZDE5MmVjYzNiZmZlMDExZGQyMzg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yq02p8kHA83LjbXC35EAUn7Ppzdo0mVzBsKiSWJBQ-w'
        },
        body: JSON.stringify({
          value: ratingScore
        })
      });

      if (res.ok) {
        toast.success("Rating Submitted Successfully! 👌🏼")
        setModalAddRating(false)
      } else {
        toast.error("Error sending Rating, try again later!")
        setModalAddRating(false)
      }

    } catch (error) {
      console.error('Error enviando la reseña:', error);
    }
  }

  return (
    <div>
      <Toaster />
      {details ? (
        <>
          <img className='backdrop' src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`} alt="" />
          <div className="cont-main-info">
            <img
              className='poster'
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title || details.name}
            />
            <div className="content">
              <h1>{details.title || details.name}</h1>
              <p className='dt'>
                {details.release_date || details.first_air_date}
                <span>·</span>
                {details.genres.map((genre) => genre.name).join(', ')}
                <span>·</span>
                {details.runtime} min
              </p>
              <div className="contScoreReactions">
                <div className="circular-progress">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      className="circle-background"
                      cx="60"
                      cy="60"
                      r={radius}
                      strokeWidth="10"
                    />
                    <circle
                      className="circle-progress"
                      cx="60"
                      cy="60"
                      r={radius}
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <div className="circle-text">
                    {Math.floor(percentage)}%
                  </div>
                </div>

                <p>Rating <br /> User Score</p>

                <div className="emoji-reactions">
                  {getRandomEmojis()}
                </div>
              </div>
              <p className='overview'>{details.overview}</p>
              <div className="buttonsOptions">
                <button className='btnTrailer'>
                  <img width="15" height="15" src="https://img.icons8.com/glyph-neue/64/play.png" alt="play" />
                  Watch Trailer
                </button>
                <button onClick={() => setRatingState()} className='btnRating'>
                  <img width="15" height="15" src="https://img.icons8.com/ios-glyphs/30/plus-math.png" alt="plus-math" />
                  Add Rating
                </button>
              </div>
            </div>
          </div>

          <div className="cont-inf-down">
            <div className="cont-inf-down-left">
              <div className="videos">
                <h2>Trailer {details.title || details.name}</h2>
                {
                  videos?.results?.length ? (
                    (() => {
                      let trailer = videos.results.find(video => video.name.includes("Official Trailer"));
                      if (!trailer) { trailer = videos.results[0] }
                      return (
                        <iframe
                          className="iframeVideo"
                          src={`https://www.youtube.com/embed/${trailer.key}?playlist=${trailer.key}`}
                          title={trailer.key}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                      );
                    })()
                  ) :
                    <p className='noVideos'>
                      <img width="35" height="35" src="https://img.icons8.com/ios-filled/35/sad.png" alt="sad" />
                      No Trailer Available
                    </p>
                }
              </div>


            </div>

            <div className="cont-inf-down-right">
              <div className="platforms">
                <h2>Streaming Platforms</h2>
                {
                  providers?.results && Object.keys(providers?.results).length > 0 ? (
                    <div className="contPlatforms">
                      {
                        providers?.results?.US ? (
                          (providers?.results?.US?.flatrate || providers?.results?.US?.buy)?.map((provider, index) => {
                            return (
                              <div className="provider" key={index}>
                                <img
                                  src={`https://image.tmdb.org/t/p/w154${provider?.logo_path}`}
                                  alt={provider?.provider_name}
                                />
                              </div>
                            );
                          })
                        ) : (
                          (providers.results[Object.keys(providers.results)[0]]?.flatrate || providers.results[Object.keys(providers.results)[0]]?.buy)?.map((provider, index) => {
                            return (
                              <div className="provider" key={index}>
                                <img
                                  src={`https://image.tmdb.org/t/p/w154${provider?.logo_path}`}
                                  alt={provider?.provider_name}
                                />
                              </div>
                            );
                          })
                        )
                      }
                    </div>
                  ) : (
                    <p className='noProviders'>
                      <img width="35" height="35" src="https://img.icons8.com/ios-filled/35/sad.png" alt="sad" />
                      No Providers Available
                    </p>
                  )
                }
              </div>

              <div className="keywords">
                <h2>Keywords</h2>
                {
                  keywords?.length ? (
                    <div className="contKeywords">
                      {
                        keywords?.map((data, index) => {
                          return (
                            <div className="key">
                              <p key={index}>{data.name}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <p className='noKeywords'>
                      <img width="35" height="35" src="https://img.icons8.com/ios-filled/35/sad.png" alt="sad" />
                      No Keywords Available
                    </p>
                  )
                }
              </div>
            </div>
          </div>

          <div className="reviews">
            <div className="header">
              <h2>Reviews</h2>
            </div>
            {
              reviews?.length ? (
                <div className="contReview">
                  {
                    reviews?.map((review, index) => {
                      const getRandomColor = () => {
                        const letters = '0123456789ABCDEF';
                        let color = '#';
                        for (let i = 0; i < 6; i++) {
                          color += letters[Math.floor(Math.random() * 16)];
                        }
                        return color;
                      };

                      return (
                        <div className="review" key={index}>
                          <div className="header">
                            <div style={{ background: getRandomColor() }} className="img">
                              {review.author.slice(0, 1)}
                            </div>
                            <div className="inf">
                              <p>A review by {review.author}</p>
                              <span>At {review.created_at}</span>
                            </div>
                          </div>
                          <p className='rev'>{review?.content}</p>
                        </div>
                      );
                    })
                  }
                </div>
              ) : (
                <p className='noReviews'>
                  <img width="35" height="35" src="https://img.icons8.com/ios-filled/35/sad.png" alt="sad" />
                  No Reviews Available
                </p>
              )
            }
          </div>

          <div className="credits">
            <h2>Main Cast</h2>
            <div className="contBoxes">
              {
                credits?.map((movie, index) => (
                  movie.profile_path ? (
                    <div key={index} className="credit">
                      <img src={`https://image.tmdb.org/t/p/w154${movie?.profile_path}`} />
                      <p>{movie?.name}</p>
                      <span>{movie?.character}</span>
                    </div>
                  ) : ""
                ))
              }
            </div>
          </div>

          <div className="mostPopular">
            <div className="headermp">
              <h2>Recomendations</h2>
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
                recomendations?.map((movie, index) => (
                  movie.poster_path ? (
                    <Link className='contCard' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to={movie?.first_air_date ? `/series/details/${movie?.id}` : `/movies/details/${movie?.id}`}>
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

          {
            modalAddRating && (
              <div className="AddRatingModal">
                <div className="content">
                  <div className="header">
                    <p>Add Rating Score</p>
                    <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                      <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                    </svg>
                  </div>

                  <div className="counter">
                    <div className="r">
                      {getEmojiByScore()}
                      <p>{ratingScore}<small>/10</small></p>
                    </div>
                    <input max={10} value={ratingScore} onChange={(e) => setRatingScore(e.target.value)} type="range" />
                  </div>

                  <div className="contBtn" onClick={sendNewRating}>
                    <button className="send">
                      Send Rating
                    </button>
                  </div>
                </div>
              </div>
            )
          }

        </>
      ) : (
        <div>No details available.</div>
      )}
    </div>
  );
};
