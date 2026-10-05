export function useFilms() {
  // Conecta amb la base de dades de mockapi per a operar amb les pel·lícules
  const API = "https://68e4f2708e116898997db22a.mockapi.io/pelicules";

  // Operació GET per a carregar totes les pel·lícules guardades
  const fetchAllFilms = async () => {
    const res = await fetch(API);
    return res.json();
  };

  // Operació POST per a crear una pel·lícula
  const createFilm = async (filmData) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filmData),
    });
    return res.json();
  };

  // Operació PUT per a actualitzar una pel·lícula
  const updateFilm = async (id, filmData) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filmData),
    });
    return res.json();
  };

  // Operació DELETE per a borrar una pel·lícula
  const deleteFilm = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
  };

  return { fetchAllFilms, createFilm, updateFilm, deleteFilm };
}
