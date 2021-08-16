let dateInput = document.querySelector('.input-area');
let checkBtn = document.querySelector('.button-two');
let resultText = document.querySelector('.result-text');
let closestDateText = document.querySelector('.closest-date-text');
let closestDate = document.querySelector('.closest-date');
let loading = document.querySelector('.loading-img');

function reverseString(str){
    return str.split('').reverse().join('');
}


function dateStringMaker(date){
    let dateStringArray = [];
    
    date.day = date.day.toString();
    date.month = date.month.toString();
    date.year = date.year.toString();

    if(date.day.length == 1){
        date.day = '0'+date.day;
    }
    if(date.month.length == 1){
        date.month = '0'+date.month;
    }

    dateStringArray[0] = date.day+date.month+date.year; 
    dateStringArray[1] = date.month+date.day+date.year;
    dateStringArray[2] = date.year+date.month+date.day;
    dateStringArray[3] = date.day+date.month+date.year.slice(-2);

    return dateStringArray;

}

function palindromeChecker(date){
    let dateStringArray = dateStringMaker(date);
    
    for(let i = 0; i < dateStringArray.length; i++){
        console.log(dateStringArray[i] === reverseString(dateStringArray[i]));
        if(dateStringArray[i] === reverseString(dateStringArray[i])){   
            return true;
        }
    }
    return false;
}

function isLeapYear(date){
    if((date.year % 4 == 0 && date.year % 100 != 0) || date.year % 400 == 0){
        return true;
    }
    return false
}

function getNextDate(currentDate){
    let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(isLeapYear(currentDate)){
        daysInMonths = [31,29,31,30,31,30,31,31,30,31,30,31];
    }
    
    if(currentDate.day < daysInMonths[currentDate.month-1]){
        currentDate.day++;
    }else {
        currentDate.day = 1;
        currentDate.month++;
    }

    if(currentDate.month > 12){
        currentDate.month = 1;
        currentDate.year++;
    }
}

function getPreviousDate(currentDate){
    let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(isLeapYear(currentDate)){
        daysInMonths = [31,29,31,30,31,30,31,31,30,31,30,31];
    }

    if(currentDate.day == 1 ){
        if(currentDate.month == 1){
            currentDate.year--;
            currentDate.month = 12;
            currentDate.day = 31;
        }else {
            currentDate.month--;
            currentDate.day = daysInMonths[currentDate.month-1]
        }
    }else {
        currentDate.day--;
    }
}

function nearestPalindrome(date){
    let counter1 = 1;
    let counter2 = 1;
    let finalPalindrome;
    let tempDate = {
        day: date.day,
        month: date.month,
        year: date.year
    }
 
    if(!palindromeChecker(date)){
        while(1){
            getNextDate(date);
            if(palindromeChecker(date)){
                break;
            }
            counter1++;
        }
    }

    if(!palindromeChecker(tempDate)){   
        while(1){
            getPreviousDate(tempDate);
            if(palindromeChecker(tempDate)){
                break;
            }
            counter2++;
        }
    }
    if(counter1 < counter2){
        finalPalindrome = date;
        return {
            counter1, finalPalindrome
        }
    }else if(counter1 > counter2) {
        counter1 = counter2;
        finalPalindrome = tempDate;
        return {
            counter1, finalPalindrome
        }
    }
}

function displayHandler(isPalindrome,nearestPalindrome){
    loading.setAttribute('style','display:none;');
    if(isPalindrome){
        resultText.textContent = 'Your birthdate is a Palindrome';
        closestDateText.textContent = '';
        closestDate.textContent = '';
    }else {
        resultText.textContent = 'Your birthdate is not a Palindrome';
        closestDateText.textContent = `You missed it by ${nearestPalindrome.counter1} days! Closest Palindrome date to your birthday is `;
        closestDate.textContent = nearestPalindrome.finalPalindrome.day+'-'+nearestPalindrome.finalPalindrome.month+'-'+nearestPalindrome.finalPalindrome.year;
    }
    
}
checkBtn.addEventListener('click',() => {
    let input = dateInput.value.split('-')
    let date = {
        day: input[2],
        month: input[1],
        year: input[0]
    }
    let isPalindrome = palindromeChecker(date);
    let nearestPalObj = nearestPalindrome(date);
    loading.setAttribute('style','display:block;');
    setTimeout(displayHandler,2000,isPalindrome,nearestPalObj);
   
    // displayHandler(isPalindrome, nearestPalObj);

})
