export const DisplayPriceRupee = (price)=>{
    return new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency:'INR'
    }).format(price)
}