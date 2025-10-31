import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/movies")
      .then(res => setMovies(res.data))
      .catch(err => {
        console.error("Lỗi khi lấy danh sách phim:", err);
        setError("Không thể tải danh sách phim. Vui lòng kiểm tra server.");
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="movie-page">
      <div className="movie-header">
        <div>
          <h2 className="movie-title">🎬 Danh sách phim</h2>
          <p className="movie-sub">Tìm và duyệt các bộ phim yêu thích</p>
        </div>
        <div className="header-controls">
          {user && (
            <div className="account-name-only" title={user.username}>{user.username}</div>
          )}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {movies.length === 0 ? (
        <div className="no-movies">Chưa có phim để hiển thị.</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img className="movie-poster" src={movie.picture} alt={movie.title} />
              <div className="movie-body">
                <h3 className="movie-name">{movie.title}</h3>
                <p className="movie-genre">Thể loại: {movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;