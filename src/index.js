import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

  function Square(props) {
    // Al ser un componente de funcion y no un componente de clase, tambien modificamos la función "onClick={() => this.props.onClick()}"
    // a una más corta onClick={props.onClick} (notar la falta de paréntesis en ambos lados).
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
      );
    }
 
  class Board extends React.Component {
    // Agregamos el constructor a la clase para inicializar el estado.
    constructor(props) {
        // Realizamos la llamada a super(props). Todas las clases de componentes de React que tienen un constructor, DEBEN EMPEZAR CON UNA LLAMADA
        // A SUPER(PROPS)
        super(props);
        // Definimos el estado inicial del componente padre BOARD para que contenga un arreglo con 9 valores null, los cuales
        // corresponden a los 9 cuadrados. Por lo que, cuando vayamos rellenando el cuadrado, el mismo se vera asi:
        // 'O', null, 'X',
        // 'X', 'X', O,
        // 'O', null, null,
        // Los componentes de React pueden tener un estado establecido "this.state" en sus constructores,
        // y este, debe ser considerado como privado para un componente de React en el que es definido.
        // Lo que haremos, es almacenar el valor actual de un cuadrado en "this.state" y cambiarlo cuando
        // el cuadrado es clickeado.
        this.state = {
            squares: Array(9).fill(null),
            // Establecemos que el primer movimiento es la X por defecto. Cada vez que un jugador haga un movimiento, xIsNext (booleano)
            // sera invertido para determinar que jugador sigue y el estado del juego sera guardado. Ademas, actualizamos la funcion handleClick
            // del componente BOARD para invertir el valor de xIsNext.
            xIsNext: true,
        };
    }

    handleClick(i) {
        // NOTAR que en esta funcion, utilizamos el metodo .slice() para crear una copia del array de squares para modificarlo
        // en vez de modificar el array existente. VER NOTAS_GUIA DEL CONCEPTO DE INMUTABILIDAD 
        const squares = this.state.squares.slice();
        // Con esta condicion, establecemos que si ya hay un ganador en el juego, ya retorna y no espera a que se llenen todos los cuadrados.
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        // Usaremos la prop pasando el mecanismo otra vez, y de esta manera, modificaremos el tablero (BOARD) para instruir
        // cada Square acerca de su valor actual (X, O, null). Ya habiendo definido el arreglo squares en el constructor BOARD,
        // modificamos el metodo renderSquare para que se lea desde alli. Por lo que de ahora en mas, cada square recibira una prop
        // "value" que sera X, O o null para cuadrados vacios.
        // La funcion flecha onClick, la utilizamos para cambiar el estado de BOARD, por lo que cuando cambia el estado de un Square,
        // el estado de BOARD cambia. Es importante recordar que el "this.state" (estado) de cada componente, es privado, por lo que no podemos
        // cambiar el estado de un componente desde otro. Por eso, en este caso lo que hacemos es pasar una funcion como prop desde BOARD (clase padre)
        // a Square, y Square llamara a esa funcion cuando un cuadrado es clickeado.
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
        // Llamamos al metodo calculateWinner, para que cuando se determine un ganador, se pueda mostrar un texto predeterminado.
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    // Dado un arreglo de 9 cuadrados, esta funcion comprobará si hay un ganador y devolvera 'X', 'O' o null
    // segun correponda.
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Elevando el estado
  // Para determinar el ganador del juego, necesitamos mantener el valor de cada uno de los 9 cuadrados
  // en un solo lugar. Si bien es posible que el tablero pregunte por el estado a cada cuadrado en particular,
  // es mas conveniente en este caso, almacenar el estado de cada uno de estos en el componente padre, que es el
  // BOARD. Este componente, puede decirle a cada cuadrado que mostrar pasandole una prop tal y como hicimos
  // cuando pasamos un numero a cada cuadrado. Para recompilar datos de multiples hijos, o tener dos componentes hijos
  // comunicados entre si, es necesario declarar el estado compartido en su componente padre. El componente padre (BOARD)
  // puede pasar el estado hacia los hijos usando props; esto mantiene los componentes hijos sincronizados entre ellos
  // y con su componente padre. Elevar el estado al componente padre es común cuando componentes de React son refactorizados.

  // El atributo "onClick" del elemento <button> del DOM, tiene un significado especial para React, porque es un componente
  // pre-construido. En React, es una convencion usar los nombres on[Evento] para props que representan eventos y handle[Evento]
  // para los métodos que manejan los eventos.

  // Como hemos mencionado previamente, el componente Square no mantiene estado, y los componentes Square reciben valores del componente
  // BOARD e informan al mismo cuando son clickeados. EN TERMINOS DE REACT, LOS COMPONENTES SQUARE AHORA SON **COMPONENTES CONTROLADOS**.
  // El componente BOARD tiene control completo sobre ellos. 
  
  // EL JUEGO YA ESTA FUNCIONANDO!
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);