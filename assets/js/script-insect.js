// Seleciona todas as telas do jogo
const screens = document.querySelectorAll('.screen');
// Seleciona todos os botões de escolha de inseto
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
// Seleciona o botão de início do jogo
const start_btn = document.getElementById('start-btn')
// Seleciona o contêiner principal do jogo onde os insetos aparecem
const game_container = document.getElementById('game-container')
// Seleciona o elemento que exibe o tempo
const timeEl = document.getElementById('time')
// Seleciona o elemento que exibe a pontuação
const scoreEl = document.getElementById('score')
// Seleciona o elemento da mensagem especial (ex: "Jogo Impossível")
const message = document.getElementById('message')

// Variáveis de controle do jogo
let seconds = 0 // Contador de segundos
let score = 0 // Contador de pontuação
let selected_insect = {} // Objeto para armazenar as informações do inseto escolhido

// Adiciona um ouvinte de evento ao botão de início
start_btn.addEventListener('click', () => {
    // Quando o botão de início é clicado, adiciona a classe 'up' à primeira tela,
    // fazendo-a deslizar para cima e revelando a próxima tela.
    screens[0].classList.add('up')
})

// Itera sobre cada botão de escolha de inseto e adiciona um ouvinte de evento
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Pega a imagem dentro do botão clicado
        const img = btn.querySelector('img')
        // Obtém o caminho da imagem (src)
        const src = img.getAttribute('src')
        // Obtém o texto alternativo da imagem (alt)
        const alt = img.getAttribute('alt')
        // Armazena o src e alt do inseto escolhido no objeto selected_insect
        selected_insect = { src, alt }
        // Adiciona a classe 'up' à segunda tela, movendo-a para cima
        screens[1].classList.add('up')
        // Aguarda 1 segundo antes de criar o primeiro inseto
        setTimeout(createInsect, 1000)
        // Inicia o contador de tempo do jogo
        startGame()
    })
})

// Função para iniciar o jogo
function startGame() {
    // Inicia um intervalo que chama increaseTime a cada 500 milissegundos (0.5 segundos)
    setInterval(increaseTime, 500)
}

// Função para aumentar o tempo do jogo
function increaseTime() {
    // Calcula os minutos (m) e segundos (s) a partir do total de segundos
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    // Adiciona um zero à esquerda se o minuto ou segundo for menor que 10
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    // Atualiza o texto do elemento de tempo
    timeEl.innerHTML = `Tempo: ${m}:${s}`
    // Incrementa o contador de segundos
    seconds++
}

// Função para criar um novo inseto na tela
function createInsect() {
    // Cria um novo elemento div
    const insect = document.createElement('div')
    // Adiciona a classe 'insect' para aplicar os estilos CSS
    insect.classList.add('insect')
    // Obtém uma posição aleatória para o inseto
    const { x, y } = getRandomLocation()
    // Define a posição superior e esquerda do inseto
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    // Adiciona a imagem do inseto dentro do div, com uma rotação aleatória
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    // Adiciona um ouvinte de evento de clique ao inseto
    insect.addEventListener('click', catchInsect)

    // Adiciona o inseto ao contêiner do jogo
    game_container.appendChild(insect)
}

// Função para obter uma localização aleatória na tela
function getRandomLocation() {
    // Obtém a largura e altura da janela do navegador
    const width = window.innerWidth
    const height = window.innerHeight
    // Calcula uma posição X aleatória, com margem para evitar bordas
    const x = Math.random() * (width - 200) + 100
    // Calcula uma posição Y aleatória, com margem para evitar bordas
    const y = Math.random() * (height - 200) + 100
    // Retorna um objeto com as coordenadas X e Y
    return { x, y }
}

// Função chamada quando um inseto é clicado (pego)
function catchInsect() {
    // Aumenta a pontuação
    increaseScore()
    // Adiciona a classe 'caught' ao inseto clicado, que o faz desaparecer via CSS
    this.classList.add('caught')
    // Remove o inseto do DOM após 2 segundos (para permitir a animação de desaparecimento)
    setTimeout(() => this.remove(), 2000)
    // Adiciona novos insetos à tela
    addInsects()
}

// Função para adicionar mais insetos após um ser pego
function addInsects() {
    // Cria um novo inseto após 1.89 segundos
    setTimeout(createInsect, 1890)
    // Cria outro novo inseto logo em seguida, após 1.9 segundos
    setTimeout(createInsect, 1900)
}

// Função para aumentar a pontuação e exibir a mensagem especial
function increaseScore() {
    // Incrementa a pontuação
    score++
    // Se a pontuação for maior que 19, exibe a mensagem de "Jogo Impossível"
    if(score > 19) {
        message.classList.add('visible')
    }
    // Atualiza o texto do elemento de pontuação
    scoreEl.innerHTML = `Pontuação: ${score}`
}