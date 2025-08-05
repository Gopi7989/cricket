const userMoveText = document.getElementById('user-move');
const computerMoveText = document.getElementById('computer-move');
const resultText = document.getElementById('result');
const scoreText = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const buttons = document.querySelectorAll('.choice-button');

let scoreData = localStorage.getItem('Score');
let score = scoreData ? JSON.parse(scoreData) : { win: 0, lost: 0, tie: 0 };

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const userMove = button.getAttribute('data-move');
    const computerMove = generateComputerChoice();
    const result = getResult(userMove, computerMove);
    showResult(userMove, computerMove, result);
  });
});

resetButton.addEventListener('click', () => {
  localStorage.clear();
  score = { win: 0, lost: 0, tie: 0 };
  showResult();
});

function generateComputerChoice() {
  const choices = ['Bat', 'Ball', 'Stump'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function getResult(user, computer) {
  if (user === computer) {
    score.tie++;
    return 'tie';
  }

  const winConditions = {
    Bat: 'Ball',
    Ball: 'Stump',
    Stump: 'Bat',
  };

  if (winConditions[user] === computer) {
    score.win++;
    return 'win';
  } else {
    score.lost++;
    return 'lost';
  }
}

function showResult(user, computer, result) {
  localStorage.setItem('Score', JSON.stringify(score));

  userMoveText.innerText = user ? `You chose: ${user}` : '';
  computerMoveText.innerText = computer ? `Computer chose: ${computer}` : '';
  
  resultText.innerText =
    result === 'win'
      ? 'You Won!'
      : result === 'lost'
      ? 'Computer Won!'
      : result === 'tie'
      ? "It's a Tie!"
      : '';

  resultText.className = `result-text ${result || ''}`;

  scoreText.innerText = `Score - Wins: ${score.win}, Losses: ${score.lost}, Ties: ${score.tie}`;
}
