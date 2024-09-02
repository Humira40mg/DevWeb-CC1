"use strict"; // MILLOT Nathan

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

/**
 * Handler de l'evenement $startBtn cliqué, permet de lancer la partie.
 * @param {MouseEvent} _evt 
 */
function launchGame(_evt) {
  /* J'ai choisi de ne pas désactiver le bouton $startBtn pour pouvoir recommencer 
  la partie même si elle n'est pas terminée */
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.floor(Math.random() * $maxUsr.value) + 1;

  $output.innerHTML = ''; // pour clear les anciens messages

  //Création d'un objet HTML pour le message du Start
  const $launchmsg = document.createElement('p'); 
  $launchmsg.innerHTML = `Tu as ${maxGuesses} tentatives pour montrer si tu es meilleur.`;
  $output.appendChild($launchmsg); // on ajoute le message de start dans l'output.
  
  nbGuesses = 0; //remise a 0 au cas où l'utilisateur recommence sans terminer l'ancien essai
  $guessBtn.disabled = false; //on active le bouton de vérification
}

$startBtn.addEventListener("click", launchGame);

$guessBtn.addEventListener("click", (event) => {
  /*Cette fonction flechée vérifie si le nombre entré par l'utilisateur est plus grand, plus petit, 
  ou le nombre attendu. Affiche la réponse en adéquation avec l'intéraction de
  l'utilisateur.*/

  //Création d'un objet HTML pour le message retourné
  const $msg = document.createElement('p');
  $output.appendChild($msg);

  nbGuesses++;

  if ($numUsr.value > secretNumber) {
    $msg.innerHTML = "C'est moins. Sois meilleur.";
  } else if ($numUsr.value < secretNumber) {
    $msg.innerHTML = "C'est plus. Sois meilleur.";
  } else {
    $msg.innerHTML = `C'est ça bravo, tu as été meilleur en ${nbGuesses} tentatives.`;
    //Retour à 0
    nbGuesses = 0; 
    $guessBtn.disabled = true; 
    return; //retour pour éviter de faire la comparaison du prochain if car il est inutile et sera toujours faux dans cette situation.
  }

  //message ajouté lorsque le nombre de tentative max a été atteind
  if (nbGuesses === maxGuesses) {
    $msg.innerHTML += "<br/>T'as cru que j'avais toutes la journée ou quoi ? Sois meilleur la prochaine fois.";
    nbGuesses = 0;
    $guessBtn.disabled = true; //Retour à 0
  }
});

let overbtn = false; //modifié sur les evenements $cow.mouseover et $cowmouseout


/**
 * Affiche une vache qui danse à l'endroit exacte où l'utilisateur à cliqué.
 * @param {MouseEvent} evt 
 * @returns void
 */
function addCow(evt) {
  if (overbtn) return; //pour éviter de vacher le bouton $cow.

  //création de l'élément HTML vache
  const $cow = document.createElement('img');
  $cow.src ='https://media1.tenor.com/images/964831e7eccb34007e82c065a50679ef/tenor.gif?itemid=18924714'; //polishCow 
  $cow.className = "cow";

  //calibrage de la position de la polishCow ainsi que sa rotation.
  /* SI le window.scrollX (ou Y) n'est pas là alors: 
     si l'utilisateur scroll (ça arrive si on joue au jeu de la recherche dichotomique avant de vacher),
     la vache ne sera pas au bon endroit. */
  $cow.style.left = `${evt.x + window.scrollX - 25}px`; 
  $cow.style.top = `${evt.y + window.scrollY - 25}px`; //les -25 permettent de recentrer la vache sur la souris.
  $cow.style.transform = `rotate(${Math.random() * 360}deg)`; //rotation aléatoire.
  
  document.body.appendChild($cow);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);


/* Ces evenements sont attendu pour empecher de vacher le bouton 'vacher/devacher'
cela permet de laisser le bouton visible. */
$cowBtn.addEventListener("mouseover", (event) => {
  overbtn = true;
});
$cowBtn.addEventListener("mouseout", (event) => {
  overbtn = false;
});