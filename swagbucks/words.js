var words = require('an-array-of-english-words')
const randomWord = () => {
    const thing = words[Math.floor(Math.random()*words.length)];
    return thing;
}

const randomBrand = ()=>{
    const brands = ["Addidas", "Apple", "Nike", "Nvidia"]
    const thing = brands[Math.floor(Math.random()*brands.length)];
    return thing;
}

const randomInitial = ()=>{
    const brands = ["Encontrar", "Comer", "Comprar", "Liquidar"]
    const thing = brands[Math.floor(Math.random()*brands.length)];
    return thing;
}

module.exports = {randomWord, randomBrand, randomInitial}
