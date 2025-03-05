import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const galaxy = "https://wallup.net/wp-content/uploads/2016/01/156574-galaxy-space-stars-Andromeda.jpg"


function Home() {
  const [articles, setArticles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [updatedInp, setUpdatedInp] = useState("");
  const [page, setPage] = useState(20);
  const [pageCount, setPageCount] = useState(1)

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchBtn = (event) => {
    setUpdatedInp(searchInput);
    event.preventDefault();
    
    fetchData(searchInput);
  };

  const fetchData = async (keyword, page) => {
    try {
      const url = `https://api.spaceflightnewsapi.net/v4/articles?title_contains=${keyword ? keyword : "nasa"}&offset=${page}&limit=20`;
      const data = await fetch(url);
      const parsedData = await data.json();
      setArticles(parsedData);
    } catch (error) {
      console.log("Cannot fetch", error);
    }
  };

  const previousBtn = () =>{
    setPage(page - 20);
    fetchData(searchInput, page);
    setPageCount(pageCount - 1);
  }

  const nextBtn = () =>{
    setPage(page + 20);
    fetchData(searchInput, page);
    setPageCount(pageCount + 1);
  }

  useEffect(() => {
    // Initial fetch 
    fetchData("");
  }, []);

  return (
    <div className="news-container" style={{ paddingTop: "150px" }}>
      <form onSubmit={handleSearchBtn} className="news-search-form" role="search">
        <input
          className="news-search-bar"
          id="searchBar"
          type="search"
          placeholder="Search for Something..."
          aria-label="Search"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button
          type="submit"
          className="news-search-btn"
          id="searchBtn"
        >
          Search
        </button>
      </form>
      <h3 className="news-results-title">
        <i>Showing results for: {updatedInp ? updatedInp : "nasa"}</i>
      </h3>
      <h4 className="news-results-count">{articles.results ? articles.count : "No"} Results!</h4>

      <div className="news-articles">
        {console.log(articles)}
        {articles.results ? (
          articles.results.map((article) => (
            <div className="news-article" key={article.id}>
              <div className="news-card">
                <a target="_blank" href={article.image_url}>
                  <img
                    src={article.image_url}
                    className="news-card-img"
                    alt="this is image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${galaxy}`;
                    }}
                  />
                </a>
                <div className="news-card-body">
                  <h5 className="news-card-title">
                    Title: {(article.title).slice(0, 60)}...
                  </h5>
                  <p className="news-card-text">
                    Description: {(article.summary).slice(0, 200)}...
                  </p>
                  <small className="news-card-date">
                    <b>Date: </b>
                    {new Date(article.published_at).toGMTString()}
                  </small>
                  <small className="news-card-updated">
                    <b>Updated: </b>
                    {new Date(article.updated_at).toGMTString()}
                  </small>
                  <a href={article.url} className="news-card-btn">
                    More
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
      {<Loading/> && (
          <div className="news-pagination">
            <button
              disabled={pageCount <= 1 ? true : false}
              type="button"
              onClick={previousBtn}
              className="news-btn-prev"
            >
              &larr; Previous
            </button>
            <button
              type="button"
              onClick={nextBtn}
              className="news-btn-next"
              disabled={pageCount == Math.ceil(articles.count/20)}
            >
              Next Page &rarr;
            </button>
          </div>
        )}
    </div>
  );
}

export default Home;
