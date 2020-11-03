const numberFormat = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol'
};

export function formatAmount(amount:number):string {
    return new Intl.NumberFormat('en-US', numberFormat).format(amount);
}