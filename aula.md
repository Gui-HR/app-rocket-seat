# Módulos/Bibliotecas em node.js:
- importação de modulos (require, CommonJs)
Biblioteca 'inquirer' para criar prompts interativos

npm install para instalar pacotes no node
dessa vez instalamos o inquirer

Para utilizarmos o módulo que instalamos vamos atribuir um objeto para uma variável, esse objeto irá receber o retorno do 'require()'.

Para usar o 'require()', que vai receber um argumento, esse parâmetro sera o modulo que instalamos (é preciso coloar um @ antes do nome do modulo, e o arguemtno precisa estar entre parenteses)

neste caso vamos usar o método ´select´ do Módulo
Ex: ```const { select } = require('@inquirer/prompts')```

## `select()` 
É importante usar async e await quando precisarmos do `select()` 

Para usar o `select()` precisamos passar como argumento um objeto. Esse objeto precisa ter duas propriedades, 'message' que vai receber uma mensagem e 'choices' que vai receber um array. O array dentro de 'choices' precisa que as escolhas dentro dele sejam declaradas como objeto (o array não tem limite de escolhas), estes objetos precisam ter as propriedades name que receberá um nome e value que vai receber um valor.

## `input()`
Para usar o `input()` também precisamos do async e await

O `input()` vai preceber como argumento um objeto que terá uma propiedade 'message', essa propriedade vai receber uma mensagem. Este método exibe a mensagem recebida dentro do objeto e aguarda uma resposta do usuário.

Ex: ```
    const cadastrarMeta = async () => {
        const meta = await input({message: 'Digite a meta'})
    }
    ```

## `checkbox()`
Assim como os métodos anteriores precisamos usar async e await.

O `checkbox()` precisa receber dois argumentos, sendo eles 'message' que vai ser uma mensagem e 'choices' que será um array com varías escolhas possiveis, essas escolhas serão exibidas na tela. Podemos passar um argumento opcional que é o 'instructions',  esse argumento exibe automaticamente as instruções, ele deve receber um valor booleano.

Ex: ```
    const respostas = await checkbox({
        message: 'Use as setas para mudar de meta, o Espaço para marcar/descmarcar a meta e o Enter para finalizar esta etapa.',
        choices: [ ...metas ],
        instructions: false
    })
    ```




