class ShareSaleException extends Error {
    constructor(symbol, requestedShares, availableShares){
        super("Unable to sell ${requestedShares} shares of ${symbol}. Only ${availableShares} shares are available.");
        this.name = "ShareSaleException";
    }
}

class StockPortfolio{
    constructor(){
        this.stockMap = new Map();
    }

    addShares(tickerSymbols, numberOfShares){
        if (this.stockMap.has(tickerSymbols)){
            this.stockMap.set(tickerSymbols, this.stockMap.get(tickerSymbols) + numberOfShares);
        } else {
            this.stockMap.set(tickerSymbols, numberOfShares)
        }
    }

    makeSale(tickerSymbols, numberOfShares){
        if (numberOfShares > 0 && this.stockMap.has(tickerSymbols)){
            const currentShares = this.stockMap.get(tickerSymbols);
            if (numberOfShares <= currentShares){
                this.stockMap.set(tickerSymbols, currentShares - numberOfShares);
            } else {
                throw new ShareSaleException(tickerSymbols, numberOfShares, currentShares);
            }
        }
    }

    getSharesForSymbol(tickerSymbols){
        if (this.stockMap.has(tickerSymbols)){
            return this.stockMap.get(tickerSymbols);
        }
        return 0;
    }

    getOwnedSymbols(){
        const ownedSymbols = Array.from(this.stockMap.keys()).filter((symbol) => this.stockMap.get(symbol) > 0);
        return ownedSymbols;
    }

    countUniqueTickerSymbols(){
        return this.stockMap.size;
    }

    getTickerSymbols(){
        return Array.from(this.stockMap.keys());
    }

    getNumberOfShares(){
        return Array.from(this.stockMap.values()).reduce((total, shares) => total + shares, 0);
    }

    isEmpty(){
        return this.getNumberOfShares() === 0;
    }
}

module.exports = {
    StockPortfolio,
    ShareSaleException,
};