// Importacions dels components per a borrar i actualitzar dates
import { ButtonDelete } from "./ButtonDelete";
import { ButtonUpdate } from "./ButtonUpdate";

/* Es crea la funció que rep 3 props. film es l'objecte amb les dades
de la pel·lícula, onDelete borraría una pel·lícula a través de l'ID i 
onEdit passa per l'objecte film per a editar les dades d'un objecte en concret, es a dir,
una pel·lícula. */
export function Film({ film, onDelete, onEdit }) {
  return (
    <div className="film-card">
      <img src={film.image} alt={film.name} />
      <h3>{film.name}</h3>
      <p>Any: {film.year}</p>
      <ButtonUpdate onClick={() => onEdit(film)} />
      <ButtonDelete onClick={() => onDelete(film.id)} />
    </div>
  );
}
