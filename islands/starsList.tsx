import { Star } from "$/utils/api.ts";
import createSearch, { type SearchIndexDump } from "js-inverted-index/mod.ts";
import { RenderableProps } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

type StarsProps = RenderableProps<{
  stars?: Star[];
  index?: SearchIndexDump;
  avatarUrl?: string;
}>;

export default function StarsList(props: StarsProps) {
  /* -------------------------------------------------- *
   * Search setup                                       *
   * -------------------------------------------------- */

  const [term, setTerm] = useState("");
  const inputEl = useRef<HTMLInputElement | null>(null);

  // Hydrate search index
  const search = useMemo(() => {
    if (props.stars && props.index) {
      const index = createSearch<Star>();
      index.hydrate(props.index, props.stars);
      return index.search;
    } else {
      return () => [];
    }
  }, [props.index, props.stars]);

  // Update the search term when the input is changed
  function onSearch(e: Event) {
    if (!(e.target instanceof HTMLInputElement)) return;
    setTerm(e.target.value);
  }

  // Register "/" hotkey for the search input
  useEffect(() => {
    function onSearchHotkey(event: KeyboardEvent) {
      if (event.key === "/" && inputEl.current) {
        event.preventDefault();
        inputEl.current.focus();
      }
    }

    addEventListener("keydown", onSearchHotkey);
    return () => removeEventListener("keydown", onSearchHotkey);
  }, [inputEl]);

  // Search results
  const results = useMemo(
    () => (term ? search(term) : props.stars?.slice(0, 50)),
    [term, search, props.stars],
  );

  /* -------------------------------------------------- *
   * Stars list                                         *
   * -------------------------------------------------- */

  const content = (
    <ul className="stars__list">
      {results?.map((star) => (
        <li key={star.id}>
          <a className="star" href={star.url}>
            <img
              alt=""
              className="star__icon"
              loading="lazy"
              src={star.owner.avatarUrl}
            />
            <span>
              <strong className="star__name">
                @{star.owner.login}/{star.name}
              </strong>
              <small
                className="star__description"
                dangerouslySetInnerHTML={{ __html: star.descriptionHTML }}
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div data-nav="fixed">
        <header>
          <nav data-variant="fixed" className="stars__header">
            {props.avatarUrl
              ? <img src={props.avatarUrl} alt="" className="stars__avatar" />
              : undefined}
            <input
              aria-label="Search"
              className="stars__search"
              onInput={onSearch}
              placeholder="Search ..."
              ref={inputEl}
              type="search"
              value={term}
            />
            <a
              className="stars__sign-out-btn"
              data-variant="muted"
              href="/logout"
              role="button"
            >
              👋 Sign out
            </a>
          </nav>
        </header>

        {results && results.length
          ? (
            content
          )
          : (
            <div className="stars__empty">
              <h3>😵‍💫</h3>
              <p>Sorry, couldn&rsquo;t find anything.</p>
            </div>
          )}
      </div>
    </>
  );
}
