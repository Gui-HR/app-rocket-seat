const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = 'Bem vindo ao app de metas!'
let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile('metas.json', 'utf-8')
        metas = JSON.parse(dados)
    } catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile('metas.json', JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({message: 'Digite a meta'})

    if(meta.length === 0) {
        return
    }

    metas.push({value: meta, checked: false})
}

const listarMetas =  async () => {
    if(metas.lenght === 0) {
        mensagem = 'Ainda não existem metas'
        return
    }

    const respostas = await checkbox({
        message: 'Use as setas para mudar de meta, o Espaço para marcar/descmarcar a meta e o Enter para finalizar esta etapa.',
        choices: [ ...metas ],
        instructions: false
    })

    metas.forEach(meta => meta.checked = false)

    if(respostas.lenght === 0) {
        mensagem = 'Nenhuma meta selecionada'
        return
    }

    respostas.forEach(resposta => {
        const meta = metas.find(m => {
            return m.value === resposta
        })

        meta.checked = true
    })

    mensagem = 'Metas marcadas como concluídas'
}

const metasRealizadas = async () => {
    if(metas.lenght === 0) {
        mensagem = 'Ainda não existem metas'
        return
    }
    const realizadas = metas.filter(meta => {
        return meta.checked
    })

    if(realizadas.length === 0) {
        mensagem = 'Nenhuma meta foi realizada ainda'
        return   
    }

    await select({
        message: `-------Metas Realizadas: ${realizadas.length}-------`,
        choices: [ ...realizadas ]
    })
}

const metasAbertas = async () => {
    if(metas.lenght === 0) {
        mensagem = 'Ainda não existem metas'
        return
    }
    const abertas = metas.filter(meta => {
        return !meta.checked
    })

    if(abertas.length === 0) {
        mensagem = 'Nenhuma meta está em aberto'
        return   
    }

    await select({
        message: `-------Metas Abertas: ${abertas.length}-------`,
        choices: [ ...abertas ]
    })
}

const deletarMetas = async () => {
    if(metas.lenght === 0) {
        mensagem = 'Ainda não existem metas'
        return
    }
    const metasDesmarcadas = metas.map(meta => {
        return {value: meta.value, checked: false}
    })

    const metasADeletar = await checkbox({
        message: 'Selecione uma meta para deletar',
        choices: [ ...metasDesmarcadas ],
        instructions: false
    })

    if(metasADeletar.length === 0) {
        mensagem = 'Nenhuma meta foi selecionada'
        return
    }

    metasADeletar.forEach(metaDeletada => {
        metas = metas.filter(meta => {
            return meta.value != metaDeletada
        })
    
    })
}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != '') {
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }
}

const start = async () => {
    await carregarMetas()

    while(true){
        await salvarMetas()
        mostrarMensagem()

        const opcao = await select({
            message: "---------Menu---------",
            choices: [
                {
                    name: 'Cadastrar nova meta',
                    value: 'cadastrar'
                },
                {
                    name: 'Listar metas',
                    value: 'listar'
                },
                {
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Metas abertas',
                    value: 'abertas'
                },
                {
                    name: 'Deletar metas',
                    value: 'deletar'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        switch(opcao) {
            case 'cadastrar':
                await cadastrarMeta()
                break
            case 'listar': 
                await listarMetas()
                break
            case 'realizadas':
                await metasRealizadas()
                break
            case 'abertas':
                await metasAbertas()
                break
            case 'deletar':
                await deletarMetas()
                break
            case 'sair':
                console.log('Até a proxima')
                return
        }
    }
}

start()