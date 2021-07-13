import axios from "axios";
import React from "react";
import { useState } from "react";
import "./trending.css";
import SingleContent from "../../SingleContent/SingleContent";
import { useEffect } from "react";
import CustomPagination from "../../Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=bc411ca963c5949426b439f14e6ad708&page=${page}`
    );
        console.log(data.results)
    setContent(data.results);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {content &&
          content.map((c) => {
            return <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_data || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />;
          })}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
