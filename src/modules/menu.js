const inputName = document.querySelector('.form__field')

function projectFlags(placar = 0) {
  if (inputName.value) {
    const newObjPlacar = createObjPlacar(inputName.value, placar)
    getJSON(newObjPlacar)
    window.location.href = './quiz.html'
  } else {
    trataError()
  }
}

function createObjPlacar(name, placar = 0) {
  return {
    nome: name,
    placar,
  }
}

function getJSON(newObjPlacar) {
  const recebeJSON = localStorage.getItem('Placar')
  if (recebeJSON) {
    const converteJSON = JSON.parse(recebeJSON)
    converteJSON[0] = newObjPlacar.nome
    converteJSON[1] = newObjPlacar.placar
    searchJSON(converteJSON, newObjPlacar)
  } else {
    const array = [newObjPlacar.nome]
    array.push(newObjPlacar)
    saveNameJSON(array)
  }
}

function saveNameJSON(objPlacar) {
  const json = JSON.stringify(objPlacar)
  localStorage.setItem('Placar', json)
}

function searchJSON(arrayJSON, newObjPlacar) {
  console.log(arrayJSON)
  const pesquisaNameArray = arrayJSON.find(value => value.nome === newObjPlacar.nome);
  (!pesquisaNameArray) ? arrayJSON.push(newObjPlacar) : '';
  saveNameJSON(arrayJSON)
}

function trataError(){
  inputName.setAttribute('placeholder', 'Digite seu nome')
}