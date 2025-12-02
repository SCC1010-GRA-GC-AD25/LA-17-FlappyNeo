let imagenFondo
let imagenInicio
let personaje
let pared
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
  // put preload code here
  fondojuego = loadImage("./images/fondojuego00.png")
  fondoinicio = loadImage("./images/fondoinicio00.jpg")
  pared = loadImage("./images/pared.png")
  musicaRecord = loadSound("./sounds/aplauso.wav")
  musicaFondo = loadSound("./sounds/musicafondo.mp3")
}

function setup() {
  // put setup code here
  createCanvas(1000,512)
  noCursor()
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    background(255)
    imageMode(CORNER)
    image(imagenFondo,x,0)
    image(imagenFondo,x+imagenFondo.width,0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY

    if (x <= -imagenFondo.width) {
      x = 0
    }

    //obstaculos
    for (let i=0; i < wallX.length; i++){
      imageMode(CENTER)
      image(pared,wallX[i], wallY[i]-500)
      image(pared,wallX[i], wallY[i]+500)
      //Nuevos obstáculos
      if (wallX[i] < -pared.width) {
        wallX[i] = width + 100
        wallY[i] = random(200,300)
      }
      //Puntaje
      if (wallX[i] === posX) {
        puntaje = puntaje  + 1
        puntajeMax = max(puntajeMax, puntaje)
      }


      wallX[i] = wallX[i] - 5
      //validar colisiones
      if (posY < -60 || posY > height+60 ) {
        musicaFondo.stop()
        estado = 0
      }
    }


    //Despliega personaje
    image(personaje,posX,posY,60,60)
    text("Puntaje: " + puntaje, width/2 - 60,30)
  } else if (estado === 0) {
    background(0)
    fill(255)
    cursor()
    imageMode(CORNER)
    image(imagenInicio,0,0,450,600)
    textSize(24)
    text("Puntaje Máximo: " + puntajeMax, 600, 100)
    text("Clic para jugar",600,200)
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying() && sonido) {
        musicaRecord.play(duration=2)
        sonido = false
      }
    } 

  }
}

function mousePressed() {
  if (estado === 0) {
    estado = 1
    x = 0
    posX =100
    posY = 100
    dY = 3
    wallX = [500, 800, 1100]
    wallY[0] = random(200,300)
    wallY[1] = random(200,300)
    wallY[2] = random(200,300)
    puntaje = 0
    sonido = true
    recordAnterior = puntajeMax
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaFondo.loop()
    
    noCursor()
  }
  dY = -15
}