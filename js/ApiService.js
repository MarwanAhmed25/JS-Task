export class ApiService {
    constructor(apiBaseUrl, apiHeaders) {
      this.apiBaseUrl = apiBaseUrl;
      this.apiHeaders = apiHeaders;
    }
  
    async fetchGames(endpoint) {
      try {
        const response = await fetch(`${this.apiBaseUrl}/${endpoint}`, {
          method: 'GET',
          headers: this.apiHeaders,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  