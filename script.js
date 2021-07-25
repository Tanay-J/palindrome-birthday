let dateInput = document.querySelector('.input-area');
let checkBtn = document.querySelector('.button-two');
let resultText = document.querySelector('.result-text')
let closestDate = document.querySelector('.closest-date');

checkBtn.addEventListener('click', () => {
    
    let dateArray = Array.from(dateInput.value.split('-'));
    let year = dateArray[0];
    let month = dateArray[1];
    let date = dateArray[2];
    let dateString1 = year+month+date; //yyyy-mm-dd
    let dateString2 = date+month+year; //dd-mm-yyyy
    let dateString3 = month+date+year; //mm-dd-yyyy
    let dateString4 = date+month+Array.from(year).slice(2).join(''); //dd-mm-yy
       
    resultText.textContent ='';

    if(dateString1 === Array.from(dateString1).reverse().join('')){
        isPalindrome();
    }else if(dateString2 === Array.from(dateString2).reverse().join('')){
        isPalindrome();
    }else if(dateString3 === Array.from(dateString3).reverse().join('')){
        isPalindrome();
    }else if(dateString4 === Array.from(dateString4).reverse().join('')){
        isPalindrome();
    }else notPalindrome();

})

function isPalindrome(){
    resultText.textContent = 'Wohoo, your birth date is a Palindrome!';
}
function notPalindrome(){
    resultText.textContent = "Oops, your birth date isn't a Palindrome";
}