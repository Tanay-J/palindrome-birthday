let dateInput = document.querySelector('.input-area');
let checkBtn = document.querySelector('.button-two');
let resultText = document.querySelector('.result-text');
let closestDateText = document.querySelector('.closest-date-text');
let closestDate = document.querySelector('.closest-date');

function palindromeChecker(dateArray){
    
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
    }else {
        notPalindrome();
        nearestPalindrome(dateArray);
    }

    // nearestPalindrome(dateArray);
}

function isPalindrome(){
    if(closestDateText.textContent){
        closestDateText.textContent = '';
        closestDate.textContent = '';
    }
    resultText.textContent = 'Wohoo, your birth date is a Palindrome!';
}
function notPalindrome(){
    resultText.textContent = "Oops, your birth date isn't a Palindrome";
    
}
//issue: datecounter is not counting from input date, it is counting from 1st Jan because we are checking for palindrome from 1st Jan
function nearestPalindrome(dateArray){
    let year = dateArray[0];
    let month = dateArray[1];
    let date = dateArray[2];
    let dayCounter1 = 0;
    let dayCounter2 = 0;
    let palindromeArray1 = [];
    let palindromeArray2 = [];
    let lowerPalindrome = [];
    let higherPalindrome = [];
    let tempYear = year;



    if(palindromeArray1.length == 0 && palindromeArray2.length == 0){
        for(let a = year;a < parseInt(year)+20;a++){
    
            for(let i = 1;i<=12;i++){
                if(i<10){
                    month = '0'+i; 
                }else month = i;
                for(let j = 1;j<31;j++){
                    if(j<10){
                        date = '0'+j;                       
                    }else date = j;
                    if(palindromeArray1.length == 0 ){
                        dayCounter1++;
                        let dateString = date.toString()+month+tempYear;
                        if(dateString === Array.from(dateString).reverse().join('')){
                            palindromeArray1 = Array.from(dateString);
                            // return palindromeArray1;
                        }
                    }   
                }
            }
            tempYear++;
        }
        tempYear = year-1;
        for(let a = parseInt(year)-1;a > parseInt(year)-20;a--){
            
            for(let i = 1;i<=12;i++){
                if(i<10){
                    month = '0'+i; 
                }else month = i;
                for(let j = 1;j<31;j++){
                    if(j<10){
                        date = '0'+j;                       
                    }else date = j;
                    if(palindromeArray2.length == 0 ){
                        dayCounter2++;
                        let dateString = date.toString()+month+tempYear;
                        if(dateString === Array.from(dateString).reverse().join('')){
                            palindromeArray2 = Array.from(dateString);
                            // console.log(palindromeArray2)
                            // return palindromeArray2;
                        }
                    }

                }
            }
            tempYear--;         
        }             
    }
    higherPalindrome = [palindromeArray1[0]+palindromeArray1[1],palindromeArray1[2]+palindromeArray1[3],palindromeArray1[4]+palindromeArray1[5]+palindromeArray1[6]+palindromeArray1[7]];
    lowerPalindrome = [palindromeArray2[0]+palindromeArray2[1],palindromeArray2[2]+palindromeArray2[3],palindromeArray2[4]+palindromeArray2[5]+palindromeArray2[6]+palindromeArray2[7]];

console.log('lower '+lowerPalindrome+ ' : '+dayCounter1);
console.log('higher '+higherPalindrome+ ' : '+dayCounter2)

    if(dayCounter1 < dayCounter2){
        dayCounter1 = 0;
        dayCounter2 = 0;
        palindromeArray1 = [];
        closestDate.textContent = lowerPalindrome[0]+'-'+lowerPalindrome[1]+'-'+lowerPalindrome[2];
        closestDateText.textContent = "Nearest Palindrome date to your birthdate is: ";
        
        // return lowerPalindrome;
    }else if(dayCounter1 > dayCounter2){
        dayCounter1 = 0;
        dayCounter2 = 0;
        palindromeArray2 = [];
        closestDate.textContent = higherPalindrome[0]+'-'+higherPalindrome[1]+'-'+higherPalindrome[2];
        closestDateText.textContent = "Nearest Palindrome date to your birthdate is: ";

        // return higherPalindrome;
    }
}

checkBtn.addEventListener('click', () => {
    let dateArray = Array.from(dateInput.value.split('-'));
    palindromeChecker(dateArray);
})
