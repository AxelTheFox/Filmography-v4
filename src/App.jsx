/* Aquest fitxer ha sigut molt retallat, ja que anteriorment guardava múltiples
variables, tenia els fetch (operacions CRUD), controlava el formulari amb onSubmit,
onDelete i onEdit i passava moltes props a FormNewFilm i GridFilms. Es per tot aço que
es fa ús d'una refactorització del codi i de un hook per a als fetch aconseguint un
codi millor estructurat i més senzill d'entendre. */

import { FilmProvider } from "./context/FilmContext";
import { FormNewFilm } from "./components/FormNewFilm";
import { GridFilms } from "./components/GridFilms";
import "./styles.css";

export function App() {
  return (
    <FilmProvider>
      <h1>Filmography</h1>
      <FormNewFilm />
      <GridFilms />
    </FilmProvider>
  );
}
