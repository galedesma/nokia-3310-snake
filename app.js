document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn  = document.querySelector('.start')

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2,1,0]; //2 = Cabeza, 1 = Cuerpo, 0 = Cola
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //Para iniciar el juego o reiniciarlo

    function startGame(){
        currentSnake.forEach( index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1;
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach( index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //Función que lidia con todos los resultados del movimiento de la serpiente
    function moveOutcomes(){
        //Lidia con la serpiente golpeando una pared o a sí misma
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || //Serpiente choca el fondo
            (currentSnake[0] % width === width - 1 && direction === 1) || //Serpiente choca el lado derecho
            (currentSnake[0] % width === 0 && direction === -1) || //Serpiente choca el lado izquierdo
            (currentSnake[0] - width < 0 && direction === -width) || //Serpiente choca con el techo
            squares[currentSnake[0] + direction].classList.contains('snake') //Serpiente choca consigo misma
        ){
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        //Serpiente come manzana
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.innerText = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }

    //Asignar functiones a los keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39){ //si se presiona la tecla "arrowRight"
            direction = 1
        }else if (e.keyCode === 38){ //si se presiona la tecla "arrowUp"
            direction = -width
        }else if (e.keyCode === 37){ //si se presiona la tecla "arrowLeft"
            direction = -1
        }else if (e.keyCode === 40){ //si se presiona la tecla "arrowDown"
            direction = +width
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})