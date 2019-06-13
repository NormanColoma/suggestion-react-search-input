import { saveSearches, loadSearches } from './local.storage';

test('should save seraches to local storage', () => {
    const setItemMock = jest.fn();
    const searches = ['star wars'];

    const localStorageMock = {
        setItem: setItemMock
    }
    global.localStorage = localStorageMock;
    
    saveSearches(searches);

    expect(setItemMock.mock.calls.length).toBe(1);
});

test('should call console error while saving data to local storage and error produced', () => {
    const setItemMock = jest.fn(() => { throw new Error() });
    const consoleErrorMock = jest.fn();
    const searches = ['star wars'];
    const localStorageMock = { setItem: setItemMock };
    const consoleMock = { error: consoleErrorMock };

    global.localStorage = localStorageMock;
    global.console = consoleMock;

    saveSearches(searches);
    expect(consoleErrorMock.mock.calls.length).toBe(1);
});

test('should load seraches from local storage', () => {
    const searches = ['star wars'];
    const getItemMock = jest.fn();
    const localStorageMock = {
        getItem: getItemMock
    }

    getItemMock.mockReturnValue(JSON.stringify(searches));
    global.localStorage = localStorageMock;
    
    expect(loadSearches(searches)).toEqual(searches);
    expect(getItemMock.mock.calls.length).toBe(1);
});

test('should return empty array when seraches key is not yet set in local storage', () => {
    const searches = ['star wars'];
    const getItemMock = jest.fn();
    const localStorageMock = {
        getItem: getItemMock
    }

    getItemMock.mockReturnValue(null);
    global.localStorage = localStorageMock;
    
    expect(loadSearches(searches)).toEqual([]);
    expect(getItemMock.mock.calls.length).toBe(1);
});

test('should call console error while retrieving data from local storage and error produced', () => {
    const getItemMock = jest.fn(() => { throw new Error() });
    const consoleErrorMock = jest.fn();
    const localStorageMock = { getItem: getItemMock };
    const consoleMock = { error: consoleErrorMock };

    global.localStorage = localStorageMock;
    global.console = consoleMock;

    loadSearches();
    expect(consoleErrorMock.mock.calls.length).toBe(1);
});