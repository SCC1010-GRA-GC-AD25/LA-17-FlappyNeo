let fondoJuego
let fondoInicio
let pared
let jaeminBird
let x = 0
let posX = 100
let posY = 100
let dY = 3
let estado = 0 // 0= menú; 1 = Juego
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let musicaRecord
let musicaFondo
let sonido = true


function preload() {
  // Cargar imágenes con los nombres correctos
  fondoJuego = loadImage("./images/fondoJuego.jpg")
  fondoInicio = loadImage("./images/fondoInicio.jpg")
  pared = loadImage("./images/pared.png")
  jaeminBird = loadImage("./images/jaeminBird.png")
  
  // Cargar sonidos
  musicaRecord = loadSound("./sounds/aplauso.wav")
  musicaFondo = loadSound("./sounds/musicaFondo.mp3")
}

function setup() {
  createCanvas(800, 600)
  noCursor()
}

function checkCollision() {
  // Tamaño del pájaro
  let birdWidth = 80
  let birdHeight = 80
  
  // Verificar colisión con cada par de tubos
  for (let i = 0; i < wallX.length; i++) {
    // Ancho aproximado del tubo
    let tuboWidth = 100
    
 
    if (posX + birdWidth/2 > wallX[i] - tuboWidth/2 && 
        posX - birdWidth/2 < wallX[i] + tuboWidth/2) {
      
    
      let espacioSuperior = wallY[i] - 150
      let espacioInferior = wallY[i] + 150
      
     
      if (posY - birdHeight/2 < espacioSuperior || 
          posY + birdHeight/2 > espacioInferior) {
        return true
      }
    }
  }
  
  return false
}

function draw() {
  if (estado === 1) {
    
    background(255)
    imageMode(CORNER)
    
    
    image(fondoJuego, x, 0, width, height)
    image(fondoJuego, x + width, 0, width, height)
    x = x - 5
    dY = dY + 1
    posY = posY + dY

    if (x <= -width) {
      x = 0
    }

    // Obstáculos (paredes)
    for (let i = 0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(pared, wallX[i], wallY[i] - 500)
      image(pared, wallX[i], wallY[i] + 500)
      
    
      if (wallX[i] < -pared.width) {
        wallX[i] = width + 100
        wallY[i] = random(200, 300)
      }
      
      // Puntaje
      if (wallX[i] === posX) {
        puntaje = puntaje + 1
        puntajeMax = max(puntajeMax, puntaje)
      }

      wallX[i] = wallX[i] - 5
    }
    
    // Validar colisiones con tubos y bordes
    if (posY < -60 || posY > height + 60 || checkCollision()) {
      musicaFondo.stop()
      estado = 0
    }

    
    imageMode(CENTER)
    image(jaeminBird, posX, posY, 80, 80)
    
    // Mostrar puntaje
    fill(255)
    stroke(0)
    strokeWeight(4)
    textSize(32)
    textAlign(CENTER)
    text("Puntaje: " + puntaje, width / 2, 40)
    
  } else if (estado === 0) {
    
    imageMode(CORNER)
    image(fondoInicio, 0, 0, width, height)
    
    cursor()
    
   
    textAlign(CENTER)
    
    // Puntaje máximo 
    textSize(40)
    fill(255)
    stroke(0)
    strokeWeight(3)
    text("Puntaje Máximo: " + puntajeMax, width * 0.75, 110)
    
    // Instrucción para jugar
    textSize(32)
    text("Presiona para iniciar", width * 0.75, 240)
    
    // Reproducir sonido de record
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying() && sonido) {
        musicaRecord.play()
        sonido = false
      }
    }
  }
}

function mousePressed() {
  if (estado === 0) {
    // Iniciar juego
    estado = 1
    x = 0
    posX = 100
    posY = 100
    dY = 3
    wallX = [500, 800, 1100]
    wallY[0] = random(200, 300)
    wallY[1] = random(200, 300)
    wallY[2] = random(200, 300)
    puntaje = 0
    sonido = true
    recordAnterior = puntajeMax
    
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaFondo.loop()
    noCursor()
  }
  
  // Hacer que el pájaro salte
  dY = -15
}