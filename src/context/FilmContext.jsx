import { createContext, useContext, useState, useEffect } from "react";
import { peliculas } from "../films";
import { useFilms } from "../hooks/useFilms";

const FilmContext = createContext();
export const useFilmContext = () => useContext(FilmContext);

export function FilmProvider({ children }) {
  const { fetchAllFilms, createFilm, updateFilm, deleteFilm } = useFilms();

  const [films, setFilms] = useState(peliculas);
  const [genres, setGenres] = useState([]);
  const [editingFilm, setEditingFilm] = useState(null);

  // Carrega inicial de pel·lícules
  useEffect(() => {
    fetchAllFilms().then((data) => {
      setFilms([...peliculas, ...data]);
    });
  }, []);

  // Carrega gèneres de localStorage
  useEffect(() => {
    const saved = localStorage.getItem("genres");
    if (saved) setGenres(JSON.parse(saved));
  }, []);

  // Guarda gèneres en localStorage
  useEffect(() => {
    localStorage.setItem("genres", JSON.stringify(genres));
  }, [genres]);

  // Borrar pel·lícula
  const handleDelete = async (id) => {
    await deleteFilm(id);
    setFilms(films.filter((f) => f.id !== id));
  };

  // Editar pel·lícula
  const handleEdit = (film) => {
    setEditingFilm(film);
  };

  // Crear o actualitzar pel·lícula
  const handleSubmit = async (filmData) => {
    if (editingFilm) {
      const updated = await updateFilm(editingFilm.id, filmData);
      setFilms(films.map((f) => (f.id === updated.id ? updated : f)));
    } else {
      const newFilm = await createFilm(filmData);
      setFilms([...films, newFilm]);
    }
    setEditingFilm(null);
  };

  return (
    <FilmContext.Provider
      value={{
        films,
        genres,
        setGenres,
        editingFilm,
        handleSubmit,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}
