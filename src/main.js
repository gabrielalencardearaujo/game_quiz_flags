// import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
const paisesCode = require('./DadosPaises/paises.json');

const bandeiraEscolhida = document.querySelector('.bandeiraEscolhida')
const divAlternativas = document.querySelector('.divAlternativas')
const spanVidas = document.querySelectorAll('.fa-heart')
const cronometro = document.querySelector('#cronometro')
let contCronometro = 60;
let pontuacao = 0;
let contVidas = 0;

const criaObjPaises = (index) => {
  return {
    nome: paisesCode[index].nome,
    codigo: paisesCode[index].codigo,
    iso: paisesCode[index].iso
  }
}

const Interval = setInterval(() => {
  cronometro.textContent = `${contCronometro--}s`;
  gerenciaPontuacao(true, false, false)
  if (contCronometro == 0) {
    clearInterval(Interval)
    saveResultadoJSON(pontuacao)
    window.location.href = './result.html'
  }
}, 1000)

function escolhePaisesAleatorios() {
  const random = Math.floor(Math.random() * (paisesCode.length - 1))
  return criaObjPaises(random)
}

// ############################### Main Function  ###############################
function gerenciador() {
  const arrayPaises = []
  while (arrayPaises.length < 4) {
    const objPais = escolhePaisesAleatorios();
    (!(arrayPaises.includes(objPais))) ? arrayPaises.push(objPais) : '';
  }
  const rand = Math.floor(Math.random() * 4)
  paisEscolhido(arrayPaises[rand])
  alternativasPaises(arrayPaises)
  verificaEscolha(arrayPaises[rand])
}
gerenciador()
// #################################################################################

function paisEscolhido(paisEscolhido) {
  bandeiraEscolhida.innerHTML = ''
  const imgPais = document.createElement('img')
  imgPais.setAttribute('src', `../src/DadosPaises/svg/${paisEscolhido.iso.toLowerCase()}.svg`)
  imgPais.setAttribute('alt', `${paisEscolhido.nome}`)
  imgPais.setAttribute('id', `${paisEscolhido.codigo}`)
  bandeiraEscolhida.appendChild(imgPais)
}

function alternativasPaises(arrayPaises) {
  divAlternativas.innerHTML = ''

  for (let paises of arrayPaises) {
    const alternative = document.createElement('button')
    alternative.setAttribute('class', 'alternativa')
    alternative.setAttribute('id', `${paises.codigo}`)
    alternative.textContent = `${paises.nome}`
    divAlternativas.appendChild(alternative)
  }
}

function verificaEscolha(pais) {
  divAlternativas.addEventListener('click', feedbackEscolha)

  function feedbackEscolha(e) {
    const elemento = e.target
    if (elemento.classList.contains('alternativa')) {
      if (elemento.id === pais.codigo) {
        elemento.style.backgroundColor = 'green'
        gerenciaPontuacao(false, true, false)
        divAlternativas.removeEventListener('click', feedbackEscolha)
        gerenciador()
      }
      if (elemento.id !== pais.codigo) {
        elemento.style.backgroundColor = 'red'
        gerenciaPontuacao(false, false, true)
        subtraiVida()
      }
    }
  }
}

function subtraiVida() {
  spanVidas[contVidas].classList.remove('fa-solid')
  spanVidas[contVidas].classList.add('fa-regular')
  contVidas++
  if (contVidas === 5) {
    saveResultadoJSON(pontuacao)
    window.location.href = './result.html'
  }
}

function gerenciaPontuacao(cronometro, acerto, erro) {
  (cronometro) ? pontuacao -= 10 : '';
  (acerto) ? pontuacao += 500 : '';
  (erro) ? pontuacao -= 200 : '';
  (pontuacao < 0) ? pontuacao = 0 : pontuacao;
}

function saveResultadoJSON(pontos) {
  const placaresJSON = JSON.parse(localStorage.getItem('Placar'))

  const placarJogadorAtual = placaresJSON.find(value => {
    return placaresJSON[0] === value.nome
  });

  (pontos < 0) ? pontos = 0 : ''; 
  (placarJogadorAtual.placar < pontos) ? placarJogadorAtual.placar  = pontos : placarJogadorAtual.placar;
  placaresJSON[1] = pontos;

  const json = JSON.stringify(placaresJSON)
  localStorage.setItem('Placar', json)
}