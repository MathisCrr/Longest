/**
 * Generate letters using an array that represents the frequency of appearance of letters in words in French
 */
function generateLetter(){
    var letters = []
    let alphabet = ["a","a","a","a","a","a","a","b","c","c","c","d","d","d","d","e","e","e","e","e","e","e","e","e","e","e","e","f","g","h","i","i","i","i","i","i","i","j","k","l","l","l","l","l","m","m","m","n","n","n","n","n","n","o","o","o","o","o","p","p","p","q","r","r","r","r","r","r","s","s","s","s","s","s","s","t","t","t","t","t","t","u","u","u","u","u","v","w","x","y","z"]
    for (let i = 0 ; i < 12 ; i++){
        let newLetter = alphabet[Math.floor(Math.random()*alphabet.length)]
        while (letters.filter(el => el === newLetter).length >= 2){
            newLetter = alphabet[Math.floor(Math.random()*alphabet.length)]
        }
        letters.push(newLetter);
    }
    return (letters);
}

module.exports = generateLetter