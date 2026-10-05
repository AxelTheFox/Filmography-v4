/* useState s'usa per a crear valor que poden cambiar i useEffect
s'utilitza per a executar codi quan els valor canvien */
import { useState, useEffect } from "react";
// S'importa el component del botó Submit (Crear/Actualitzar)
import { ButtonCreate } from "./ButtonCreate";
import { useFilmContext } from "../context/FilmContext";

export function FormNewFilm() {
  // Es declaren les variables cridant la funció declarada en FilmContext
  const {
    onSubmit: handleSubmitContext,
    editingFilm,
    genres,
    setGenres,
    handleSubmit,
  } = useFilmContext();

  /* Es creen 4 estats per a les dades de la pel·lícula, el set actualitza el valor i
  useState esta buit per a que el formulari aparega net abans d'introduïr les dades i després de
  donar-li a Submit (Crear/Actualitzar). L'ultim estat va amb array per a almacenar els generes */

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (editingFilm) {
      setName(editingFilm.name);
      setYear(editingFilm.year);
      setImage(editingFilm.image);
      setSelectedGenres(editingFilm.genres || []);
    }
  }, [editingFilm]);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit({ name, year, image, genres: selectedGenres });
    setName("");
    setYear("");
    setImage("");
    setSelectedGenres([]);
  };

  const addGenre = (genre) => {
    if (!genres.includes(genre)) setGenres([...genres, genre]);
  };

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Any"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="URL de la imatge"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />

      {!editingFilm && (
        <input
          type="text"
          placeholder="Nou gènere"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addGenre(e.target.value);
              e.target.value = "";
            }
          }}
        />
      )}

      <div className="genres-container">
        {genres.map((genre) => (
          <span
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`genre ${
              selectedGenres.includes(genre) ? "applied" : "not-applied"
            }`}
          >
            {genre}
            {!editingFilm && (
              <button
                type="button"
                className="delete-genre"
                onClick={() => setGenres(genres.filter((g) => g !== genre))}
              >
                x
              </button>
            )}
          </span>
        ))}
      </div>

      <ButtonCreate text={editingFilm ? "Actualitzar" : "Crear"} />
    </form>
  );
}
