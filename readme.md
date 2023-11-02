## Criação do OrderBy Dentro Do Rh247

<p>
  Vocês vão encontrar um propriedade
  com o nome de <strong>portal</strong>.
</p>
<p>
 Ela serve para tirar umas coisas de estilização do component para eu conseguir utilizar ele no modulo
 <strong>portal.</strong>
</p>

<h2>
 Explicações como fui o component.
</h2>

<p>
  A logicá toda está nas seguintes partes : 
</p>

<img src="./img/estrutura.jpg" />

<h6>
  O arquivo principal desse <strong>CrudPageNew</strong> é o arquivo <strong>Crud/index.js.</strong>
</h6>

<p>
  Dentro do crud existe uma função chamada <strong>handleOrderBy.</strong>
</p>

<img src="./img/handleOrderBy.jpg">

<br />
<p>
  Essa função recebe dois paramêtros o <strong>order</strong> e o <strong>label.</strong>
  <br />
  Passamos no <strong>getDataParams</strong> o seguinte params page, descricao, label, order, ...paramsSearch.
</p>
<strong>
  a descricao é o search , as tags do component!
</strong>
<img src="./img/grid-ordery-by7.jpg">
<p>
  Já linha 206 que inicia a chamanda do component grid passamos o orderBy como
  props, e colocamos a função <strong>handleOrderBy.</strong>
</p>

## Dentro do arquivo Grid

<img src="./img/grid-fucn.jpg">

<p>
  O estado <strong>activeArrow</strong> serve para colocar as cores nas setas
  quando as mesmas estiveram ativas.
</p>
<img src="./img/grid.jpg">

<p>
 Caso orderby seja true , ele coloca as setas e todas funçãoes.
 <br/>
 no ato no onClick enviamos o direction e o label.
</p>

<p>
 Resumindo foi tudo isso que eu fiz!
</p>