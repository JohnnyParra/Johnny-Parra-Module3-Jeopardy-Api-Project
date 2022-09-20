const questionCard = document.querySelector('.question-card');
const questionContent = document.querySelector('.question-content');
let categories = [];

// returns an array with 5 random IDs to use for getTrivia
const getRandomIds = () =>{
  let categoryIds = [];
  let count = 0;

  while(count < 5){
    let randomCategoryId = Math.floor(Math.random() * 27723) + 1; //27723 categories
    if(!categoryIds.includes(randomCategoryId)){
      categoryIds.push(randomCategoryId);
      count++;
    }
  }
  return categoryIds;
}


// this returns an array with 5 categories and all association questions to each category
const getTrivia = async() => {
  const categoryIds = getRandomIds();

  for(let i = 0; i < categoryIds.length; i++){
    let url = 'https://jservice.io/api/category?id=' + categoryIds[i];
    const response = await fetch(url, {
      method: 'GET',
      })
    
    const responseJson = await response.json();
    // console.log('response', response, responseJson);
    let category = [];
    for(let j = 0; j < responseJson.clues.length; j++){
      category.push(responseJson.clues[j]);
    }
    categories.push(category);
    let elementId = "category" + [i];
    document.getElementById(elementId).innerHTML = responseJson.title;
  };
  return categories;
};

getTrivia();
// const runGame = async() => {
//   const categories = await getTrivia();
// }
// runGame();


// these 4 functions handle questions and answers being displayed when number is clicked
let blah = document.querySelectorAll("h3");
blah.forEach(h3 => h3.addEventListener('click', question));
function question(event) {
  const el = event.target;
  el.style.visibility = 'hidden';
  const col = el.dataset.col;
  const row = el.dataset.row;
  displayQuestion(col, row);
}

function displayQuestion(col, row){
  const question = categories[col][row].question;

  questionCard.style.visibility = 'visible';
  questionContent.innerHTML = question;

  questionCard.addEventListener('click', displayAnswer.bind(questionCard, col, row));
}

function displayAnswer(col, row) {
  const answer = categories[col][row].answer;

  questionContent.innerHTML = answer;

  questionCard.addEventListener('click', returnToBoard);
}

function returnToBoard(){
  questionCard.removeEventListener('click', returnToBoard);
  document.querySelector('.question-card').style.visibility = 'hidden';
}


// reloads page
document.querySelector('.reload').addEventListener('click', reload);
function reload(){
  window.location.reload();
}