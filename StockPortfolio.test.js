const {StockPortfolio, ShareSaleException} = require('./StockPortfolio');

let portfolio;

beforeEach(() => {
    portfolio = new StockPortfolio();
});

test("Testing StockPortfolio -- success", () => {
    expect(portfolio.getNumberOfShares()).toBe(0);
    expect(portfolio.getTickerSymbols()).toEqual([]);
});

test("Testing Empty Share -- success", () =>{
    expect(portfolio.isEmpty()).toBe(true);
})

test("Testing Adding Shares and Counting Unique TickerSymbols -- success", () => {
    portfolio.addShares("GME", 5);
    portfolio.addShares("RBLX", 10);
    expect(portfolio.countUniqueTickerSymbols()).toBe(2);
})

test("Testing Selling Shares -- success", () => {
    portfolio.addShares("GME", 5);
    expect(portfolio.getNumberOfShares()).toBe(5);

    portfolio.makeSale("GME", 3);
    expect(portfolio.getNumberOfShares()).toBe(2);
    expect(portfolio.countUniqueTickerSymbols()).toBe(1);
    expect(portfolio.getTickerSymbols()).toEqual(["GME"]);
})

test("Testing Getting Number of Shares of Unique Ticker Symbols -- success", () => {
    portfolio.addShares("GME", 3);
    portfolio.addShares("RBLX", 2);
    expect(portfolio.getSharesForSymbol("GME")).toBe(3);
    expect(portfolio.getSharesForSymbol("RBLX")).toBe(2);
    expect(portfolio.getNumberOfShares()).toBe(5);
})

test("Testing Returning Owned Symbols -- success", () => {
    portfolio.addShares("GME", 10);
    portfolio.addShares("RBLX", 5);
    expect(portfolio.getOwnedSymbols()).toEqual(["GME", "RBLX"]);

    portfolio.makeSale("RBLX", 5);
    expect(portfolio.getNumberOfShares()).toBe(10);
    expect(portfolio.getOwnedSymbols()).toEqual(["GME"]);
})

test("Testing Selling More Share Than Available -- success", () => {
    portfolio.addShares("GME", 10);
    expect(() => {
        portfolio.makeSale("GME", 15);
    }).toThrow(ShareSaleException);
    expect(portfolio.getNumberOfShares()).toBe(10);
})