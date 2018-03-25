export const saveSearches = (searches) => {
    try {
        const serializedSearches = JSON.stringify(searches);
        localStorage.setItem('searches', serializedSearches);
    } catch(err) {
        console.error('There was an error while persisting data to local storage');
    }
};

export const loadSearches = () => {
    try {
        const persistedSearches = localStorage.getItem('searches');
        if (persistedSearches === null) {
            return [];
        }
        return JSON.parse(persistedSearches);
    } catch(err) {
        console.error('There was an error while retrieving data from local storage');
    }
};