¿Qué es **React**?

React es una biblioteca de JavaScript declarativa, eficiente y flexible para construir
interfaces de usuario. Permite componer IUs complejas de pequeñas y aisladas piezas de 
código llamadas **“componentes”**.

React tiene pocos tipos diferentes de componentes, pero vamos a empezar con la
subclase **React.Component**:

**************************************************************************************

EJEMPLO:

<!-- class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Lista de compras para {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
Uso de ejemplo: <ShoppingList name="Mark" /> -->

**************************************************************************************

Nosotros utilizamos componentes para decirle a React lo que queremos mostrar en pantalla.
Cuando nuestros datos cambian, React actualizara efectivamente y volvera a renderizar nuestros componentes.

En el caso ejemplo de arriba, "ShoppingList" es una clase de componente de React o tipo de componente de React.

Estos componentes, aceptan parametros llamados **props** (abreviatura de propiedades) y retorna 
una jerarquía de vistas a mostrar a través del método render.

El método **render** retorna una descripción de lo que quieres ver en la pantalla, un elemento de React, el cual
es una ligera descripción de lo que hay que renderizar.

La mayoria de los desarrolladores de React, utilizan una sintaxis especial denominada **JSX**, pero, que es esto?

*****************************************************************************************************************************************
**JSX**

Siendo una extensión de la sintaxis de JS, es altamente recomendado utilizarlo con React. JSX produce "elementos de React".

**¿Por qué JSX?**

En lugar de separar artificialmente tecnologías poniendo el maquetado y la lógica en archivos separados, React separa intereses con unidades ligeramente acopladas llamadas “componentes” que contienen ambas. **React no requiere usar JSX**, pero la mayoría de la gente lo encuentra útil como ayuda visual cuando trabajan con interfaz de usuario dentro del código Javascript. Esto también permite que React muestre mensajes de error o advertencia más útiles.

**Insertando expresiones en JSX**

A continuación, declaramos una variable llamada name y luego la usamos dentro del JSX envolviéndola dentro de llaves:
_______________________________________

const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
_______________________________________

En el ejemplo a continuación, insertamos el resultado de llamar la función de JavaScript, formatName(user), dentro de un elemento <h1>.
_______________________________________________

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
_______________________________________________

**JSX tambien es una expresión**

Después de compilarse, las expresiones JSX se convierten en llamadas a funciones JavaScript regulares y se evalúan en objetos JavaScript.
Esto significa que puedes usar JSX dentro de declaraciones if y bucles for, asignarlo a variables, aceptarlo como argumento, y retornarlo desde dentro de funciones:
____________________________________

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
____________________________________

**Especificando atributos con JSX**

Puedes utilizar comillas para especificar strings literales como atributos:
____________________________________________________________

const element = <a href="https://www.reactjs.org"> link </a>;
____________________________________________________________

También puedes usar llaves para insertar una expresión JavaScript en un atributo:
_________________________________________________

const element = <img src={user.avatarUrl}></img>;
_________________________________________________

No pongas comillas rodeando llaves cuando insertes una expresión JavaScript en un atributo. Debes utilizar comillas
(para los valores de los strings) o llaves (para las expresiones), pero no ambas en el mismo atributo.

**Especificando hijos con JSX**

Si una etiqueta está vacía, puedes cerrarla inmediatamente con />, como en XML:
_____________________________________________

const element = <img src={user.avatarUrl} />;
_____________________________________________

Las etiquetas de Javascript pueden contener hijos:
__________________________________

const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
___________________________________

**JSX previene ataques de inyeccion**

Es seguro insertar datos ingresados por el usuario en JSX:
__________________________________________________

const title = response.potentiallyMaliciousInput;
// Esto es seguro:
const element = <h1>{title}</h1>;
__________________________________________________

Por defecto, React DOM escapa cualquier valor insertado en JSX antes de renderizarlo. De este modo,
se asegura de que nunca se pueda insertar nada que no esté explícitamente escrito en tú aplicación.
Todo es convertido en un string antes de ser renderizado

**JSX representa objetos**

Babel compila JSX a llamadas de React.createElement().
Estos son dos ejemplos idénticos:
_____________________________________

const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
_____________________________________

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
_____________________________________

React.createElement() realiza algunas comprobaciones para ayudarte a escribir código libre de errores,
pero, en esencia crea un objeto como este:
___________________________________________

// Nota: Esta estructura está simplificada
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
___________________________________________

Estos objetos son llamados “Elementos de React”. Puedes pensar en ellos como descripciones de lo que
quieres ver en pantalla. React lee estos objetos y los usa para construir el DOM y mantenerlo actualizado.

*****************************************************************************************************************************************

Con esta sintaxis JSX, la sintaxis <div /> es transformada en tiempo de construcción a
React.createElement('div'). El ejemplo anterior es equivalente a:

*******************************************
EJEMPLO:

return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);

*******************************************

Cada elemento de React es un objeto de JavaScript que puedes almacenar en una variable o pasar alrededor de tu programa.
Cada componente de React está encapsulado y puede operar independientemente; esto te permite construir IUs complejas
desde componentes simples.


**¿POR QUE ES IMPORTANTE LA INMUTABILIDAD?**

Hay generalmente dos enfoques para cambiar datos. El primer enfoque es mutar los datos directamente cambiando sus valores.
El segundo enfoque es reemplazar los datos con una nueva copia que tiene los cambios deseados.
_______________________________________________________________________________

EJEMPLO DE CAMBIO DE DATOS CON MUTACION

var player = {score: 1, name: 'Jeff'};
player.score = 2;
// Ahora `player` es {score: 2, name: 'Jeff'}
_______________________________________________________________________________

EJEMPLO DE CAMBIO DE DATOS SIN MUTACION

var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// Ahora `player` no ha cambiado, pero `newPlayer` es {score: 2, name: 'Jeff'}

// O si usas la sintaxis de propagación de objeto, puedes escribir:
// var newPlayer = {...player, score: 2};
_______________________________________________________________________________

El resultado final es el mismo, pero al no mutar (o cambiar los datos subyacentes) directamente,
obtenemos muchos beneficios descritos a continuación:

- Funcionalidades complejas se vuelven simples -

La inmutabilidad hace que funcionalidades complejas sean mucho más fácil de implementar. Luego en este tutorial,
implementaremos una funcionalidad de “viaje en el tiempo” que nos permite repasar el historial del juego tic-tac-toe
y “volver” a movimientos previos. Esta funcionalidad no es específica de juegos, una habilidad de deshacer y rehacer
ciertas acciones es un requerimiento común en aplicaciones. Evitar la mutación de datos directamente nos permite mantener
intacto versiones previas del historial del juego, y reusarlas luego.

- Detectar cambios -

Detectar cambios en objetos mutables es difícil porque son modificados directamente. Esta detección requiere que los objetos
mutables sean comparados a la copia previa del mismo y que el árbol entero del objeto sea recorrido.

Detectar cambios en objetos inmutables es considerablemente más sencillo. Si el objeto inmutable que está siendo referenciado
es diferente del anterior, significa que el objeto ha cambiado.

- Determinar cuando re-renderizar en React -

El beneficio principal de la inmutabilidad es que te ayuda a construir componentes puros en React. Con datos inmutables se puede
determinar fácilmente si se han realizado cambios, lo que ayuda también a determinar cuando un componente requiere ser re-renderizado.


**COMPONENTES DE FUNCION**

En React, componentes de función son una forma más simple de escribir componentes que solo contienen un método render y no tiene estado
propio. En lugar de definir una clase que extiende React.Component, podemos escribir una función que toma props como parámetros y retorna
lo que se debe renderizar. Componentes de función son menos tediosos de escribir que clases, y muchos componentes pueden ser expresados de
esta manera.












