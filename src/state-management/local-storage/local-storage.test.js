import { saveSearches, loadSearches } from './local.storage';

beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem');
});

afterEach(() =>  {
    localStorage.setItem.mockRestore();
    localStorage.getItem.mockRestore();
});
  
test('should save seraches to local storage', () => {
    const setItemMock = jest.fn();
    const searches = ['star wars'];
    
    saveSearches(searches);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
});

test('should call console error while saving data to local storage and error produced', () => {
    const setItemMock = jest.fn(() => { throw new Error() });
    const consoleErrorMock = jest.fn();
    const searches = ['star wars'];

    jest.spyOn(console, 'error');
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error() });

    saveSearches(searches);
    expect(console.error).toHaveBeenCalledTimes(1);
});

test('should load seraches from local storage', () => {
    const searches = ['star wars'];
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => JSON.stringify(searches)); 

    expect(loadSearches(searches)).toEqual(searches);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
});

test('should return empty array when seraches key is not yet set in local storage', () => {
    const searches = ['star wars'];
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);

    expect(loadSearches(searches)).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
});

test('should call console error while retrieving data from local storage and error produced', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error() });

    loadSearches();
    
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
});