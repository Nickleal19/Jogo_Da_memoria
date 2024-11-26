const spanplayer = document.querySelector(".player");
const points = document.querySelector(".points")
const timer = document.querySelector(".timer");
const grid = document.querySelector(".grid");

let currentTime = 0;

let pontos = 0;

// quando a janela for iniciada
window.onload = () => {
    spanplayer.innerHTML = localStorage.getItem(".player");
    startTimer();
    loadGame();
};

const startTimer = () => {
    
    this.loop = setInterval(() => {
        points.innerHTML = pontos;

        currentTime++;
        timer.innerHTML = currentTime;

    }, 1000);
}

// array dos personagens das cartas 
const characters = [
    'bellamy',
    'clarke',
    'jasper',
    'john',
    'lexa',
    'lincoln',
    'madi',
    'monty',
    'octavia',
    'raven',
];

// dobrando o tamanho do array
const duplicateCharacters = [...characters, ...characters];

// Embaralhar as cartas
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

// função para criar os elementos
function createElement(tag, className) {

    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Criar as cartas 
const createCard = (character) => {

    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character",character);

   return card;
};

// Função iniciar o jogo
const loadGame = () => {

    shuffledArray.forEach((character) => {
        const card = createCard(character);

        grid.appendChild(card);
    });
};

let firstCard = "";
let secondCard = "";

// função revela as cartas 
const revealCard = ({ target }) => {

       if (target.parentNode.className.includes("revela-card")) {
        return
       }

       if (firstCard === "") {
        
       target.parentNode.classList.add("revela-card");
        firstCard  = target.parentNode;

       } else if(secondCard === "") {

        target.parentNode.classList.add("revela-card");
        secondCard = target.parentNode
        
       }

       checkCards();
};

// função para checar as cartas

const checkCards = () => {

    
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        // quando as cartas forem iguais

        pontos += 10;

        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

            firstCard = "";
            secondCard = "";

            checkEndGame();

    } else {
        // quando as cartas forem diferentes
        pontos -= 2;

        setTimeout(() => {
            
            firstCard.classList.remove("revela-card");
            secondCard.classList.remove("revela-card");

            firstCard = "";
            secondCard = "";

        }, 500);
    }
    
};

// função para checar fim de jogo 
const checkEndGame = () => {

    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {

        localStorage.setItem("score", pontos);
        localStorage.startTimer("recordTime", currentTime);

        clearInterval(this.loop);

        setTimeout(() => {
            
            alert(`parabens ${spanPlayer.innerHTML}. 
                   Tempo Total: ${currentTime} segundos.
                   Pontos: ${pontos}.
                   `)

                   const dialog = confirm("Gostaria de jogar novamente?")

                   if (dialog) {
           
                       window.location.reload();
                       
                   } else {
                       
                       window.location.href = "../index.html"
                   }
        }, 500);

       
    }
}