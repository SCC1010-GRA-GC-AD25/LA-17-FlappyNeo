// Agrega esta función después de la función setup()
function checkCollision() {
  // Tamaño del pájaro
  let birdWidth = 80
  let birdHeight = 80
  
  // Verificar colisión con cada par de tubos
  for (let i = 0; i < wallX.length; i++) {
    // Ancho aproximado del tubo
    let tuboWidth = pared.width
    
    // Verificar si el pájaro está en el rango horizontal del tubo
    if (posX + birdWidth/2 > wallX[i] - tuboWidth/2 && 
        posX - birdWidth/2 < wallX[i] + tuboWidth/2) {
      
      // Altura del espacio entre tubos (ajusta este valor según tu juego)
      let espacioEntreParedes = 200
      
      // Calcular límites de los tubos
      let tuboSuperiorBottom = wallY[i] - 500 + pared.height/2
      let tuboInferiorTop = wallY[i] + 500 - pared.height/2
      
      // Verificar colisión con tubo superior o inferior
      if (posY - birdHeight/2 < tuboSuperiorBottom || 
          posY + birdHeight/2 > tuboInferiorTop) {
        return true
      }
    }
  }
  
  return false
}


function draw() {
  if (estado === 1) {
    // JUEGO EN MARCHA
    background(255)
    imageMode(CORNER)
    
    // Fondo en movimiento (escalado al tamaño del canvas)
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
      
      // Nuevos obstáculos
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
    
    // **AGREGAR ESTA VALIDACIÓN DE COLISIÓN**
    // Validar colisiones con tubos y bordes
    if (posY < -60 || posY > height + 60 || checkCollision()) {
      musicaFondo.stop()
      estado = 0
    }

    // Despliega personaje (Jaemin Bird)
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
    // PANTALLA DE INICIO / GAME OVER
    imageMode(CORNER)
    image(fondoInicio, 0, 0, width, height)
    
    cursor()
    
    // Textos en la parte derecha (lado negro)
    textAlign(CENTER)
    
   
    textSize(40)
    fill(255)
    stroke(0)
    strokeWeight(3)
    text("Puntaje Máximo: " + puntajeMax, width * 0.75, 110)
    
    
    textSize(32)
    text("Presiona para iniciar", width * 0.75, 240)
    
    
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying() && sonido) {
        musicaRecord.play()
        sonido = false
      }
    }
  }
}