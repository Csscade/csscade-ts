import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SearchBar.css";

export const SearchBar = () => {
  return (
    <search>
      <form action="/recherche" className="search-bar">
        <label htmlFor="search-input" className="sr-only">
          Rechercher
        </label>
        <div className="search-bar__field">
          <input
            id="search-input"
            className="search-bar__input"
            type="search"
            name="q"
            placeholder="Comment centrer une div ?"
            autoComplete="off"
          />
          <button
            type="submit"
            className="search-bar__button"
            aria-label="Lancer la recherche"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </search>
  );
};
