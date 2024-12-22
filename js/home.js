export default class Games{
    static api = 'https://www.freetogame.com/api/games';

    constructor(){
        this.display;
    }

    async display(){
        const response = await fetch(Games.api);
        const res = await response.json()
        console.log(res);
        
    }
}