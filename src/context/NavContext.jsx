import { createContext, useContext, useState, useCallback } from 'react';

const defaultNav = {
  page: null,
  openArticle: () => {},
  openVideo: () => {},
  openPodcast: () => {},
  goBack: () => {},
};

const NavContext = createContext(defaultNav);

export function NavProvider({ children }) {
  const [page, setPage] = useState(null); // { type: 'article'|'video'|'podcast', item: {...} }

  const openArticle = useCallback((item) => {
    setPage({ type: 'article', item });
    window.scrollTo(0, 0);
  }, []);

  const openVideo = useCallback((item) => {
    setPage({ type: 'video', item });
    window.scrollTo(0, 0);
  }, []);

  const openPodcast = useCallback((item) => {
    setPage({ type: 'podcast', item });
    window.scrollTo(0, 0);
  }, []);

  const goBack = useCallback(() => {
    setPage(null);
    window.scrollTo(0, 0);
  }, []);

  return (
    <NavContext.Provider value={{ page, openArticle, openVideo, openPodcast, goBack }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
