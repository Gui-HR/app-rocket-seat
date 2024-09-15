const { select, input, checkbox } = require('@inquirer/prompts')

let metas = [
    {
        value: 'Ler a Bíblia',
        checked: false
    }
]

const cadastrarMeta = async () => {
    const meta = await input({message: 'Digite a meta'})

    if(meta.length === 0) {
        return
    }

    metas.push({value: meta, checked: false})

    console.log(metas)
}

const listarMetas =  async () => {
    const respostas = await checkbox({
        message: 'Use as setas para mudar de meta, o Espaço para marcar/descmarcar a meta e o Enter para finalizar esta etapa.',
        choices: [ ...metas ],
        instructions: false
    })

    metas.forEach(meta => meta.checked = false)

    if(respostas.lenght === 0) {
        console.log('Nenhuma meta selecionada')
        return
    }

    respostas.forEach(resposta => {
        const meta = metas.find(m => {
            return m.value === resposta
        })

        meta.checked = true
    })

    console.log('Metas marcadas como concluídas')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter(meta => {
        return meta.checked
    })

    if(realizadas.length === 0) {
        console.log('Nenhuma meta foi realizada ainda')
        return   
    }

    await select({
        message: `-------Metas Realizadas: ${realizadas.length}-------`,
        choices: [ ...realizadas ]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter(meta => {
        return !meta.checked
    })

    if(abertas.length === 0) {
        console.log('Nenhuma meta está em aberto')
        return   
    }

    await select({
        message: `-------Metas Abertas: ${abertas.length}-------`,
        choices: [ ...abertas ]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map(meta => {
        return {value: meta.value, checked: false}
    })

    const metasADeletar = await checkbox({
        message: 'Selecione uma meta para deletar',
        choices: [ ...metasDesmarcadas ],
        instructions: false
    })

    if(metasADeletar.length === 0) {
        console.log('Nenhuma meta foi selecionada')
        return
    }

    metasADeletar.forEach(metaDeletada => {
        metas = metas.filter(meta => {
            return meta.value != metaDeletada
        })
    })
}

const start = async () => {
    while(true){

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