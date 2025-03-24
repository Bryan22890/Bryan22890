<?php
//Tudo que será criado, será dentro disso
echo "Hello Word"; 


echo "<h1> Tipos de variáveis </h1>";

//Variável do php começa sempre com '$'
$esporte = 'boxe';
//Declarando variável String:
echo "Está variável é do tipo: ";
echo gettype($esporte);

//Variável do php começa sempre com '$'
$irmaos = 3;
//Declarando variável Number:
echo "<br> <br> Está variável é do tipo: ";
echo gettype($irmaos);

//Variável do php começa sempre com '$'
$aula = true;
//Declarando variável Boolean:
echo "<br> <br> Está variável é do tipo: ";
echo gettype($aula);

//Variável do php começa sempre com '$'
$nota = 8.5;
//Declarando variável Ponto flutuante:
echo "<br> <br> Está variável é do tipo: ";
echo gettype($nota);


//Constante do php começa sempre com 'define'
define("nome","Alessandra"); //Constante significa que o valor não vai mudar
//Declarando a constante:
echo "<br> <br> <h4>Constante nome: </h4>" . nome . "<br>";


echo "<br> <h4> Minha lista </h4>";
//Crindo um Array:
$coisas = array("trabalho","faculdade","autoescola","investimentos","cursos","boxe","academia","surf");
//Mostra a estrutura da lista Array
var_dump($coisas);


echo "<br> <br> <h4> Operações </h4>";
//Operadores aritmétricos:
$soma = 5 + 3;
echo "<br> <br>Este resultado é " . $soma . "<br>";

$soma1 = 7 - 2;
echo "Este resultado é " . $soma1 . "<br>";

$soma2 = 10 * 5;
echo "Este resultado é " . $soma2 . "<br>";

$soma3 = 10 / 2;
echo "Este resultado é " . $soma3 . "<br>";
?>