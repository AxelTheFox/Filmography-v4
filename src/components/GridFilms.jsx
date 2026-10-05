import { useFilmContext } from "../context/FilmContext";
import { Film } from "./Film";

export function GridFilms() {
  const { films, handleDelete, handleEdit } = useFilmContext();

  return (
    <div className="grid">
      {films.map((film) => (
        <Film
          key={film.id}
          film={film}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}
