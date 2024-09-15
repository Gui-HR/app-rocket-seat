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

    if(respostas.lenght === 0) {
        console.log('Nenhuma meta selecionada')
        return
    }

    metas.forEach(meta => meta.checked = false)

    respostas.forEach(resposta => {
        const meta = metas.find(m => {
            return m.value === resposta
        })

        meta.checked = true
    })

    console.log('Metas marcadas como concluídas')
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
            case 'sair':
                console.log('Até a proxima')
                return
        }
    }
}

start()