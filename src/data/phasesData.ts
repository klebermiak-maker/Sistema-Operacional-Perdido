import { Phase, VirtualDiagnosticBug } from '../types';

export const PHASES_DATA: Phase[] = [
  {
    id: 1,
    title: 'Fase 1: Quem Faz o Quê?',
    shortTitle: 'Quem Faz o Quê?',
    category: 'computacao',
    themeColor: 'from-cyan-500 to-blue-600',
    icon: 'Cpu',
    description: 'Relacione cada componente físico e o Sistema Operacional com a sua verdadeira função!',
    bnccFocus: 'EF05CO07 – Componentes de hardware e o papel do Sistema Operacional.',
    questions: [
      {
        id: 'f1_q1',
        title: 'Componente: TECLADO',
        prompt: 'Qual é a função principal do TECLADO em um computador?',
        imageVisual: {
          type: 'hardware',
          label: '⌨️ TECLADO',
          sublabel: 'Periférico de Entrada',
          color: 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
        },
        options: [
          { id: 'a', text: 'Digitar letras, números, símbolos e enviar comandos para o computador.', isCorrect: true },
          { id: 'b', text: 'Imprimir papéis coloridos e provas escolares.', isCorrect: false },
          { id: 'c', text: 'Mostrar as imagens e vídeos em alta definição.', isCorrect: false },
          { id: 'd', text: 'Guardar arquivos para sempre mesmo desligado.', isCorrect: false }
        ],
        explanation: 'O teclado é um periférico de entrada: ele transforma o toque das nossas mãos em sinais que o computador entende como letras, números e atalhos.',
        hint: 'Pense no que você usa para escrever seu nome em um trabalho de computador.'
      },
      {
        id: 'f1_q2',
        title: 'Componente: MOUSE',
        prompt: 'Qual é a função do MOUSE no uso diário do computador?',
        imageVisual: {
          type: 'hardware',
          label: '🖱️ MOUSE',
          sublabel: 'Periférico de Entrada',
          color: 'bg-indigo-950 border-indigo-500/40 text-indigo-300'
        },
        options: [
          { id: 'a', text: 'Guardar as músicas e fotos da escola.', isCorrect: false },
          { id: 'b', text: 'Apontar, clicar, selecionar e mover itens na tela através do cursor.', isCorrect: true },
          { id: 'c', text: 'Esquentar o computador para ele funcionar mais rápido.', isCorrect: false },
          { id: 'd', text: 'Emitir som de músicas e vídeos.', isCorrect: false }
        ],
        explanation: 'O mouse permite interagir visualmente com a tela, movimentando a setinha (cursor) para abrir pastas, clicar em botões e arrastar objetos.',
        hint: 'Ele tem botões para clicar e uma rodinha para rolar a página.'
      },
      {
        id: 'f1_q3',
        title: 'Componente: MONITOR',
        prompt: 'O MONITOR tem como principal objetivo:',
        imageVisual: {
          type: 'hardware',
          label: '🖥️ MONITOR',
          sublabel: 'Periférico de Saída',
          color: 'bg-blue-950 border-blue-500/40 text-blue-300'
        },
        options: [
          { id: 'a', text: 'Permitir que o usuário veja visualmente textos, imagens, janelas e jogos.', isCorrect: true },
          { id: 'b', text: 'Digitar os textos de redação de português.', isCorrect: false },
          { id: 'c', text: 'Calcular a matemática das contas sem energia.', isCorrect: false },
          { id: 'd', text: 'Conectar a internet aos fios da parede.', isCorrect: false }
        ],
        explanation: 'O monitor é um dispositivo de saída visual. Ele recebe as informações da placa de vídeo e as transforma na imagem que você enxerga.',
        hint: 'Sem ele, o computador estaria funcionando, mas você ficaria com a tela toda escura!'
      },
      {
        id: 'f1_q4',
        title: 'Componente: IMPRESSORA',
        prompt: 'Para que serve a IMPRESSORA ligada ao computador?',
        imageVisual: {
          type: 'hardware',
          label: '🖨️ IMPRESSORA',
          sublabel: 'Periférico de Saída Físico',
          color: 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
        },
        options: [
          { id: 'a', text: 'Criar jogos novos automaticamente.', isCorrect: false },
          { id: 'b', text: 'Passar textos e ilustrações digitais para folhas de papel físicas.', isCorrect: true },
          { id: 'c', text: 'Substituir a memória RAM do computador.', isCorrect: false },
          { id: 'd', text: 'Ligar e desligar a energia da tomada.', isCorrect: false }
        ],
        explanation: 'A impressora recebe os dados digitais enviados pelo Sistema Operacional e os imprime no papel usando tinta ou laser.',
        hint: 'A professora usa esse aparelho quando quer entregar atividades de folha na sala.'
      },
      {
        id: 'f1_q5',
        title: 'Componente: MEMÓRIA RAM',
        prompt: 'Qual é o papel da MEMÓRIA RAM no computador?',
        imageVisual: {
          type: 'hardware',
          label: '⚡ MEMÓRIA RAM',
          sublabel: 'Memória Rápida e Temporária',
          color: 'bg-amber-950 border-amber-500/40 text-amber-300'
        },
        options: [
          { id: 'a', text: 'Guardar arquivos para sempre mesmo com o computador desligado.', isCorrect: false },
          { id: 'b', text: 'Armazenar temporariamente dados e programas que estão em uso no momento.', isCorrect: true },
          { id: 'c', text: 'Limpar a poeira de dentro do gabinete.', isCorrect: false },
          { id: 'd', text: 'Servir apenas para conectar a impressora ao monitor.', isCorrect: false }
        ],
        explanation: 'A memória RAM é ultrarrápida e temporária! Quando você abre um jogo ou navegador, ele é carregado na RAM. Ao desligar o computador, a RAM se esvazia.',
        hint: 'Ela é como a sua mesa de estudos: guarda o que você está usando agora!'
      },
      {
        id: 'f1_q6',
        title: 'Componente: ARMAZENAMENTO (HD / SSD)',
        prompt: 'Qual a diferença do ARMAZENAMENTO (HD / SSD) em relação à RAM?',
        imageVisual: {
          type: 'hardware',
          label: '💾 ARMAZENAMENTO (HD/SSD)',
          sublabel: 'Memória Permanente',
          color: 'bg-purple-950 border-purple-500/40 text-purple-300'
        },
        options: [
          { id: 'a', text: 'O HD/SSD guarda fotos, trabalhos e o sistema operacional permanentemente, mesmo desligado.', isCorrect: true },
          { id: 'b', text: 'O HD/SSD apaga tudo assim que fechamos um aplicativo.', isCorrect: false },
          { id: 'c', text: 'O HD/SSD é responsável por clicar nos ícones da tela.', isCorrect: false },
          { id: 'd', text: 'O HD/SSD serve apenas para desenhar imagens no monitor.', isCorrect: false }
        ],
        explanation: 'O HD ou SSD é como o armário da sua casa: tudo o que você guarda ali fica seguro para a próxima vez que você ligar o computador.',
        hint: 'Quando você clica em "Salvar Arquivo", é para o HD/SSD que ele vai!'
      },
      {
        id: 'f1_q7',
        title: 'O Coração: SISTEMA OPERACIONAL',
        prompt: 'Qual é a função do SISTEMA OPERACIONAL no meio de todos esses componentes?',
        imageVisual: {
          type: 'hardware',
          label: '🧠 SISTEMA OPERACIONAL',
          sublabel: 'O Maestro Principal',
          color: 'bg-rose-950 border-rose-500/40 text-rose-300'
        },
        options: [
          { id: 'a', text: 'É apenas uma peça de plástico que segura a placa de vídeo.', isCorrect: false },
          { id: 'b', text: 'É o software fundamental que gerencia todas as peças físicas e permite rodar os outros programas.', isCorrect: true },
          { id: 'c', text: 'É um cabo que liga a tomada de luz ao teclado.', isCorrect: false },
          { id: 'd', text: 'É apenas um joguinho de cartas que vem pré-instalado.', isCorrect: false }
        ],
        explanation: 'O Sistema Operacional (como Windows, Linux ou Android) é o grande maestro: sem ele, o teclado não conversa com a tela, a impressora não recebe arquivos e nenhum jogo consegue abrir!',
        hint: 'Lembre-se da metáfora do maestro da orquestra!'
      }
    ]
  },
  {
    id: 2,
    title: 'Fase 2: Hardware ou Software?',
    shortTitle: 'Hardware ou Software?',
    category: 'computacao',
    themeColor: 'from-emerald-500 to-teal-700',
    icon: 'Layers',
    description: 'Descubra a diferença entre partes físicas (Hardware), programas comuns (Software) e o Sistema Operacional!',
    bnccFocus: 'EF05CO07 – Classificação de componentes físicos vs instruções lógicas.',
    questions: [
      {
        id: 'f2_q1',
        title: 'Item: TECLADO E MOUSE FÍSICOS',
        prompt: 'O teclado, o mouse e o monitor que você pode tocar com as mãos são:',
        imageVisual: {
          type: 'badge',
          label: 'Teclado, Mouse e Monitor',
          sublabel: 'Peças palpáveis',
          color: 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
        },
        options: [
          { id: 'a', text: 'HARDWARE (parte física que podemos tocar).', isCorrect: true },
          { id: 'b', text: 'SOFTWARE (programas e jogos digitais).', isCorrect: false },
          { id: 'c', text: 'SISTEMA OPERACIONAL exclusivamente.', isCorrect: false },
          { id: 'd', text: 'Vírus de computador.', isCorrect: false }
        ],
        explanation: 'HARDWARE é toda a parte física da máquina: tudo aquilo que você consegue tocar, como cabos, placas, circuitos, teclado e tela.',
        hint: 'Se você pode pegar com as mãos ou chutar sem querer, é hardware!'
      },
      {
        id: 'f2_q2',
        title: 'Item: JOGO EDUCATIVO DE MATEMÁTICA',
        prompt: 'Um jogo digital instalado para praticar tabuada no computador da escola é classificado como:',
        imageVisual: {
          type: 'badge',
          label: 'Jogo Educativo de Matemática',
          sublabel: 'Aplicativo / Game',
          color: 'bg-teal-950 border-teal-500/40 text-teal-300'
        },
        options: [
          { id: 'a', text: 'HARDWARE, pois ele está dentro do computador.', isCorrect: false },
          { id: 'b', text: 'SOFTWARE DE APLICAÇÃO (um programa feito para uma tarefa específica).', isCorrect: true },
          { id: 'c', text: 'SISTEMA OPERACIONAL que gerencia a placa-mãe.', isCorrect: false },
          { id: 'd', text: 'Um periférico de saída em papel.', isCorrect: false }
        ],
        explanation: 'O jogo é um SOFTWARE: um conjunto de códigos e instruções lógicas feitas para divertir e ensinar, que precisa do Sistema Operacional para rodar.',
        hint: 'Programas, navegadores e jogos são softwares!'
      },
      {
        id: 'f2_q3',
        title: 'Item: LINUX EDUCACIONAL / WINDOWS',
        prompt: 'O LINUX EDUCACIONAL e o WINDOWS instalados nos computadores são exemplos de:',
        imageVisual: {
          type: 'badge',
          label: 'Linux / Windows / Android',
          sublabel: 'O Cérebro da Máquina',
          color: 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
        },
        options: [
          { id: 'a', text: 'Hardware de plástico.', isCorrect: false },
          { id: 'b', text: 'Apenas peças de metal parafusadas no gabinete.', isCorrect: false },
          { id: 'c', text: 'SISTEMA OPERACIONAL (o software mestre que comanda o computador).', isCorrect: true },
          { id: 'd', text: 'Um tipo de papel para imprimir fotos.', isCorrect: false }
        ],
        explanation: 'Linux, Windows, macOS e Android são exemplos clássicos de Sistemas Operacionais. Eles são softwares fundamentais que tornam o computador utilizável.',
        hint: 'Eles inicializam a máquina e criam a área de trabalho onde todos os outros programas abrem.'
      },
      {
        id: 'f2_q4',
        title: 'Item: PENTE DE MEMÓRIA RAM',
        prompt: 'Uma plaquinha de circuito verde com chips pretos chamada "Memória RAM" é:',
        imageVisual: {
          type: 'badge',
          label: 'Placa de Memória RAM',
          sublabel: 'Circuito Físico',
          color: 'bg-green-950 border-green-500/40 text-green-300'
        },
        options: [
          { id: 'a', text: 'HARDWARE (componente físico interno do computador).', isCorrect: true },
          { id: 'b', text: 'Um arquivo de texto salvo em PDF.', isCorrect: false },
          { id: 'c', text: 'Um navegador de internet.', isCorrect: false },
          { id: 'd', text: 'Um antivírus que baixamos da internet.', isCorrect: false }
        ],
        explanation: 'Como a memória RAM é uma peça física com circuitos reais instalada na placa-mãe, ela é 100% HARDWARE.',
        hint: 'É uma peça que os técnicos instalam com as mãos dentro da máquina.'
      },
      {
        id: 'f2_q5',
        title: 'Item: APLICATIVO DE DESENHO (PAINT)',
        prompt: 'O aplicativo que usamos para fazer desenhos e colorir na tela do computador é:',
        imageVisual: {
          type: 'badge',
          label: 'Editor de Desenho (Paint)',
          sublabel: 'Programa de Arte',
          color: 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
        },
        options: [
          { id: 'a', text: 'SOFTWARE (programa executado com a ajuda do Sistema Operacional).', isCorrect: true },
          { id: 'b', text: 'HARDWARE, porque você usa o mouse para desenhar nele.', isCorrect: false },
          { id: 'c', text: 'Um cabo de força da tomada.', isCorrect: false },
          { id: 'd', text: 'Uma peça do monitor.', isCorrect: false }
        ],
        explanation: 'O Paint é um software aplicativo. Ele não funcionaria se o Sistema Operacional não lesse o movimento do seu mouse e não mandasse a imagem para a tela!',
        hint: 'É um programa de computador feito de código e pixels.'
      }
    ]
  },
  {
    id: 3,
    title: 'Fase 3: O Computador Precisa do SO',
    shortTitle: 'O Computador Precisa do SO',
    category: 'computacao',
    themeColor: 'from-blue-600 to-indigo-800',
    icon: 'Activity',
    description: 'Veja situações reais de estudantes e descubra como o Sistema Operacional trabalha nos bastidores!',
    bnccFocus: 'EF05CO07 – Reconhecer a necessidade do SO para execução de programas e gerenciamento do hardware.',
    questions: [
      {
        id: 'f3_q1',
        title: 'Cenário: João abriu um programa de desenho',
        prompt: 'João deu dois cliques no ícone do programa de desenho. O que o Sistema Operacional faz nesse momento?',
        scenario: '“João abriu um programa de desenho para fazer um cartaz de ciências.”',
        imageVisual: {
          type: 'scenario',
          label: '🎨 João e o Programa de Desenho',
          sublabel: 'Execução de Aplicativo',
          color: 'bg-blue-950 border-blue-500/40 text-blue-300'
        },
        options: [
          { id: 'a', text: 'Busca o programa no armazenamento (HD/SSD), carrega na memória RAM e entrega ao processador para rodar.', isCorrect: true },
          { id: 'b', text: 'Desliga o monitor para que João não canse a vista.', isCorrect: false },
          { id: 'c', text: 'Manda imprimir 50 folhas de papel em branco.', isCorrect: false },
          { id: 'd', text: 'Apaga todos os outros arquivos da escola.', isCorrect: false }
        ],
        explanation: 'Sem o Sistema Operacional, o programa de desenho seria apenas um monte de arquivos parados no disco. O SO é quem "dá a vida" ao programa, carregando-o na memória e gerenciando sua execução!',
        hint: 'Pense em quem autoriza o programa a entrar na memória e começar a trabalhar.'
      },
      {
        id: 'f3_q2',
        title: 'Cenário: Maria digitou um texto de História',
        prompt: 'Maria pressionou as teclas do teclado para escrever "Brasil". Como o Sistema Operacional participa dessa ação?',
        scenario: '“Maria digitou um texto longo para o trabalho de história.”',
        imageVisual: {
          type: 'scenario',
          label: '📝 Maria Digitando no Teclado',
          sublabel: 'Comunicação Hardware ➔ Software',
          color: 'bg-indigo-950 border-indigo-500/40 text-indigo-300'
        },
        options: [
          { id: 'a', text: 'O teclado faz tudo sozinho e não precisa de nenhum programa ou sistema.', isCorrect: false },
          { id: 'b', text: 'O Sistema Operacional recebe os pulsos do teclado, interpreta as letras e entrega ao editor de texto para desenhar na tela.', isCorrect: true },
          { id: 'c', text: 'O Sistema Operacional apaga as letras para testar a paciência da aluna.', isCorrect: false },
          { id: 'd', text: 'O Sistema Operacional desconecta o computador da energia.', isCorrect: false }
        ],
        explanation: 'O hardware do teclado apenas gera pulsos elétricos. O Sistema Operacional atua como o tradutor: ele escuta o teclado e passa as letras exatamente para a janela que está aberta!',
        hint: 'O Sistema Operacional faz a ponte entre o periférico físico e o programa aberto.'
      },
      {
        id: 'f3_q3',
        title: 'Cenário: Pedro imprimiu uma atividade',
        prompt: 'Pedro clicou no botão "Imprimir" no documento. Qual é o papel crucial do Sistema Operacional aqui?',
        scenario: '“Pedro imprimiu uma atividade sobre o meio ambiente.”',
        imageVisual: {
          type: 'scenario',
          label: '🖨️ Pedro Imprimindo a Lição',
          sublabel: 'Gerenciamento de Periféricos & Fila',
          color: 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
        },
        options: [
          { id: 'a', text: 'O SO gerencia a fila de impressão, converte o texto na linguagem da impressora e coordena o envio seguro dos dados.', isCorrect: true },
          { id: 'b', text: 'O Sistema Operacional compra as folhas de papel na papelaria da rua.', isCorrect: false },
          { id: 'c', text: 'O SO fecha o documento e impede que qualquer um imprima.', isCorrect: false },
          { id: 'd', text: 'O programa fala diretamente com a tinta sem precisar do computador.', isCorrect: false }
        ],
        explanation: 'Se vários alunos mandarem imprimir ao mesmo tempo, o Sistema Operacional cria uma fila organizada para que as folhas não saiam embaralhadas e avisa se a tinta ou papel acabarem!',
        hint: 'Pense em quem organiza a fila para a impressora não se confundir.'
      },
      {
        id: 'f3_q4',
        title: 'Cenário: Lucas salvou o trabalho escolar',
        prompt: 'Lucas clicou em "Salvar Trabalho". O que o Sistema Operacional faz para proteger o arquivo?',
        scenario: '“Lucas passou 1 hora fazendo uma pesquisa e clicou em Salvar.”',
        imageVisual: {
          type: 'scenario',
          label: '💾 Salvando o Trabalho Escolar',
          sublabel: 'Gerenciamento de Armazenamento',
          color: 'bg-blue-950 border-blue-500/40 text-blue-300'
        },
        options: [
          { id: 'a', text: 'O SO encontra blocos livres no HD/SSD, grava os dados de forma segura e guarda o endereço na pasta para podermos abrir depois.', isCorrect: true },
          { id: 'b', text: 'O SO apenas joga o texto fora porque a memória RAM é infinita.', isCorrect: false },
          { id: 'c', text: 'O SO envia o arquivo para a impressora sem pedir autorização.', isCorrect: false },
          { id: 'd', text: 'O SO bloqueia o computador para sempre.', isCorrect: false }
        ],
        explanation: 'O Sistema Operacional é quem cuida do sistema de arquivos e pastas. Ele garante que seu trabalho seja gravado no lugar certo sem sobrescrever o trabalho de outro colega!',
        hint: 'Ele é o arquivista que organiza as gavetas do disco rígido.'
      },
      {
        id: 'f3_q5',
        title: 'Cenário: Camila abriu 3 programas juntos',
        prompt: 'Camila está com o navegador aberto, ouvindo uma música e escrevendo uma redação. Como o SO ajuda nisso?',
        scenario: '“Camila está fazendo multitarefa no laboratório.”',
        imageVisual: {
          type: 'scenario',
          label: '⚡ Multitarefa no Computador',
          sublabel: 'Compartilhamento de Recursos',
          color: 'bg-indigo-950 border-indigo-500/40 text-indigo-300'
        },
        options: [
          { id: 'a', text: 'O SO desliga o computador porque computadores só podem fazer 1 coisa por dia.', isCorrect: false },
          { id: 'b', text: 'O SO divide o tempo do processador e os pedaços da memória RAM para que todos os programas funcionem juntos sem travar.', isCorrect: true },
          { id: 'c', text: 'O SO apaga a música para tocar apenas no dia seguinte.', isCorrect: false },
          { id: 'd', text: 'O SO pede que a Camila chame um bombeiro.', isCorrect: false }
        ],
        explanation: 'O Sistema Operacional é um mestre da multitarefa! Ele distribui a atenção do processador e a memória RAM com tanta rapidez que parece que todos os programas estão rodando juntinhos sem brigar.',
        hint: 'Ele distribui o trabalho entre todos os programas para ninguém travar.'
      }
    ]
  },
  {
    id: 4,
    title: 'Fase 4: Desafio de Língua Portuguesa',
    shortTitle: 'Língua Portuguesa',
    category: 'portugues',
    themeColor: 'from-amber-500 to-orange-600',
    icon: 'BookOpen',
    description: 'Leia textos informativos sobre informática e localize as informações explícitas com muita atenção!',
    bnccFocus: 'Língua Portuguesa – Localização de informações explícitas em textos informativos.',
    questions: [
      {
        id: 'f4_q1',
        title: 'Texto: O Maestro Invisível',
        readingText: '“Imagine uma orquestra com muitos instrumentos talentosos: violinos, flautas, tambores e trompetes. Se todos tocarem juntos sem ninguém para orientar, haverá apenas barulho. No computador acontece algo parecido. O teclado, o mouse, a tela e a memória são como esses instrumentos. O Sistema Operacional é o maestro invisível: ele organiza a entrada de cada componente e garante que os programas toquem uma bela melodia sem desafinar nem travar.”',
        prompt: 'De acordo com o texto, quem é comparado ao "maestro invisível" do computador?',
        imageVisual: {
          type: 'icon',
          label: '📖 Leitura Atenta',
          sublabel: 'Interpretação Textual',
          color: 'bg-amber-950 border-amber-500/40 text-amber-300'
        },
        options: [
          { id: 'a', text: 'O mouse óptico da escola.', isCorrect: false },
          { id: 'b', text: 'O Sistema Operacional.', isCorrect: true },
          { id: 'c', text: 'A impressora de papel.', isCorrect: false },
          { id: 'd', text: 'O cabo de energia da tomada.', isCorrect: false }
        ],
        explanation: 'O texto afirma com clareza: "O Sistema Operacional é o maestro invisível: ele organiza a entrada de cada componente e garante que os programas toquem uma bela melodia".',
        hint: 'Procure no texto onde aparece a frase "O Sistema Operacional é o maestro..."'
      },
      {
        id: 'f4_q2',
        title: 'Texto: O que acontece sem o maestro?',
        readingText: '“Se todos tocarem juntos sem ninguém para orientar, haverá apenas barulho. No computador acontece algo parecido. Sem o maestro, as peças físicas não saberiam quando agir e os programas não conseguiriam executar suas tarefas.”',
        prompt: 'Segundo o texto, o que aconteceria na orquestra se todos tocassem sem ninguém para orientar?',
        imageVisual: {
          type: 'icon',
          label: '📖 Localização de Informação',
          sublabel: 'Informação Explícita',
          color: 'bg-amber-950 border-amber-500/40 text-amber-300'
        },
        options: [
          { id: 'a', text: 'Haveria apenas barulho.', isCorrect: true },
          { id: 'b', text: 'Uma música perfeita seria tocada.', isCorrect: false },
          { id: 'c', text: 'Todos os instrumentos quebrariam sozinhos.', isCorrect: false },
          { id: 'd', text: 'A plateia bateria muitas palmas imediatamente.', isCorrect: false }
        ],
        explanation: 'A informação está explícita logo no início: "Se todos tocarem juntos sem ninguém para orientar, haverá apenas barulho."',
        hint: 'Volte ao começo do pequeno trecho de leitura.'
      },
      {
        id: 'f4_q3',
        title: 'Texto: A Memória que Esquece e a Memória que Guarda',
        readingText: '“Os computadores possuem duas formas principais de guardar informações. A memória RAM é muito rápida, mas é volátil: isso significa que tudo o que está nela desaparece assim que o computador é desligado da tomada. Já o disco de armazenamento (como o SSD ou o HD) é permanente. Ele guarda com segurança suas fotos, jogos e trabalhos escolares por anos, prontos para serem abertos novamente quando você ligar a máquina.”',
        prompt: 'No texto, o que significa dizer que a memória RAM é "volátil"?',
        imageVisual: {
          type: 'icon',
          label: '📖 Significado no Contexto',
          sublabel: 'Vocabulário e Leitura',
          color: 'bg-orange-950 border-orange-500/40 text-orange-300'
        },
        options: [
          { id: 'a', text: 'Significa que ela é feita de papel reciclado.', isCorrect: false },
          { id: 'b', text: 'Significa que tudo o que está nela desaparece assim que o computador é desligado.', isCorrect: true },
          { id: 'c', text: 'Significa que ela nunca pode ser usada para jogos.', isCorrect: false },
          { id: 'd', text: 'Significa que ela solta faíscas coloridas.', isCorrect: false }
        ],
        explanation: 'O próprio texto explica entre travessões: "A memória RAM é muito rápida, mas é volátil: isso significa que tudo o que está nela desaparece assim que o computador é desligado".',
        hint: 'Veja a explicação que o autor colocou logo após a palavra "volátil: isso significa que..."'
      },
      {
        id: 'f4_q4',
        title: 'Texto: Dispositivos do Cotidiano',
        readingText: '“Muitas pessoas pensam que apenas os computadores de mesa possuem sistema operacional. No entanto, os smartphones (celulares inteligentes) usam sistemas como Android ou iOS. Até mesmo os videogames modernos, smart TVs e carros tecnológicos precisam de um sistema operacional para gerenciar suas telas, botões e permitir que seus aplicativos funcionem de modo estável.”',
        prompt: 'De acordo com o texto, quais outros aparelhos além dos computadores usam sistemas operacionais?',
        imageVisual: {
          type: 'icon',
          label: '📖 Compreensão Explícita',
          sublabel: 'Exemplos no Texto',
          color: 'bg-amber-950 border-amber-500/40 text-amber-300'
        },
        options: [
          { id: 'a', text: 'Smartphones, videogames modernos, smart TVs e carros tecnológicos.', isCorrect: true },
          { id: 'b', text: 'Cadernos de papel, lápis de cor e borrachas.', isCorrect: false },
          { id: 'c', text: 'Apenas relógios antigos de corda e calculadoras de madeira.', isCorrect: false },
          { id: 'd', text: 'Nenhum outro aparelho usa sistema operacional.', isCorrect: false }
        ],
        explanation: 'O texto cita explicitamente: smartphones (com Android ou iOS), videogames modernos, smart TVs e até carros tecnológicos!',
        hint: 'Leia a segunda e a terceira frases do texto.'
      }
    ]
  },
  {
    id: 5,
    title: 'Fase 5: Desafio Matemático',
    shortTitle: 'Desafio Matemático',
    category: 'matematica',
    themeColor: 'from-purple-500 to-pink-600',
    icon: 'Calculator',
    description: 'Use cálculos de multiplicação, adição e capacidade de armazenamento para resolver problemas do laboratório!',
    bnccFocus: 'Matemática – Resolução de problemas com as quatro operações e unidades de medida digital.',
    questions: [
      {
        id: 'f5_q1',
        title: 'Problema: Programas no Laboratório',
        prompt: 'Uma escola possui 24 computadores no laboratório. Em cada computador há exatamente 5 programas educativos instalados. Quantos programas existem ao todo instalados nesses computadores?',
        imageVisual: {
          type: 'math',
          label: '24 computadores × 5 programas',
          sublabel: 'Multiplicação',
          color: 'bg-purple-950 border-purple-500/40 text-purple-300'
        },
        options: [
          { id: 'a', text: '29 programas no total.', isCorrect: false },
          { id: 'b', text: '120 programas no total.', isCorrect: true },
          { id: 'c', text: '100 programas no total.', isCorrect: false },
          { id: 'd', text: '245 programas no total.', isCorrect: false }
        ],
        explanation: 'Para calcular o total de programas, multiplicamos a quantidade de computadores pela quantidade de programas em cada um: 24 × 5 = 120 programas!',
        hint: 'Faça a conta: 20 × 5 = 100, e 4 × 5 = 20. Depois some 100 + 20!'
      },
      {
        id: 'f5_q2',
        title: 'Problema: Espaço no Pen Drive',
        prompt: 'O professor de informática possui um pen drive com 32 Gigabytes (GB) de capacidade total. Os trabalhos dos alunos já ocupam 18 GB. Quantos Gigabytes (GB) ainda restam livres para gravar novos arquivos?',
        imageVisual: {
          type: 'math',
          label: '32 GB total - 18 GB usados',
          sublabel: 'Subtração',
          color: 'bg-pink-950 border-pink-500/40 text-pink-300'
        },
        options: [
          { id: 'a', text: '14 GB livres.', isCorrect: true },
          { id: 'b', text: '50 GB livres.', isCorrect: false },
          { id: 'c', text: '12 GB livres.', isCorrect: false },
          { id: 'd', text: '24 GB livres.', isCorrect: false }
        ],
        explanation: 'Subtraímos o espaço ocupado da capacidade total: 32 GB - 18 GB = 14 GB livres no pen drive para novos arquivos.',
        hint: 'Calcule: 32 menos 18. (32 - 10 = 22; 22 - 8 = 14).'
      },
      {
        id: 'f5_q3',
        title: 'Problema: Teclados e Mouses',
        prompt: 'A escola comprou novos computadores e precisa de 1 teclado e 1 mouse para cada um dos 15 computadores novos. Quantos periféricos de entrada foram comprados ao todo?',
        imageVisual: {
          type: 'math',
          label: '15 teclados + 15 mouses',
          sublabel: 'Adição / Dobro',
          color: 'bg-purple-950 border-purple-500/40 text-purple-300'
        },
        options: [
          { id: 'a', text: '15 periféricos.', isCorrect: false },
          { id: 'b', text: '30 periféricos ao todo (15 teclados + 15 mouses).', isCorrect: true },
          { id: 'c', text: '45 periféricos.', isCorrect: false },
          { id: 'd', text: '225 periféricos.', isCorrect: false }
        ],
        explanation: 'São 15 computadores, e cada um precisa de 2 itens (1 teclado e 1 mouse): 15 + 15 = 30 periféricos de entrada comprados.',
        hint: 'Some a quantidade de teclados com a quantidade de mouses: 15 + 15.'
      },
      {
        id: 'f5_q4',
        title: 'Problema: Impressão de Atividades',
        prompt: 'A impressora da escola imprime 12 páginas de atividade por minuto. Se ela funcionou continuamente por 5 minutos, quantas páginas foram impressas ao todo?',
        imageVisual: {
          type: 'math',
          label: '12 páginas/min × 5 minutos',
          sublabel: 'Multiplicação de Taxa',
          color: 'bg-fuchsia-950 border-fuchsia-500/40 text-fuchsia-300'
        },
        options: [
          { id: 'a', text: '17 páginas.', isCorrect: false },
          { id: 'b', text: '60 páginas impressas.', isCorrect: true },
          { id: 'c', text: '120 páginas.', isCorrect: false },
          { id: 'd', text: '50 páginas.', isCorrect: false }
        ],
        explanation: 'Multiplicamos a quantidade de páginas por minuto pelo total de minutos: 12 × 5 = 60 páginas impressas para a turma!',
        hint: 'Tabuada: 10 × 5 = 50, e 2 × 5 = 10. Some 50 + 10 = 60.'
      },
      {
        id: 'f5_q5',
        title: 'Problema: Distribuição da Memória RAM',
        prompt: 'Um computador tem 8 Gigabytes (GB) de RAM. O Sistema Operacional utiliza 2 GB para funcionar, e um jogo educativo consome 3 GB. Quantos GB de RAM sobram livres?',
        imageVisual: {
          type: 'math',
          label: '8 GB total - (2 GB + 3 GB)',
          sublabel: 'Operações Combinadas',
          color: 'bg-purple-950 border-purple-500/40 text-purple-300'
        },
        options: [
          { id: 'a', text: 'Sobram 3 GB livres na memória RAM.', isCorrect: true },
          { id: 'b', text: 'Sobram 5 GB livres.', isCorrect: false },
          { id: 'c', text: 'Não sobra nenhum GB.', isCorrect: false },
          { id: 'd', text: 'Sobram 13 GB.', isCorrect: false }
        ],
        explanation: 'Os programas e o SO consomem juntos: 2 GB + 3 GB = 5 GB. Como a máquina tem 8 GB no total: 8 - 5 = 3 GB livres para outras tarefas.',
        hint: 'Some o que está sendo usado (2 + 3 = 5) e diminua do total de 8.'
      }
    ]
  },
  {
    id: 6,
    title: 'Fase 6: Conserte o Computador',
    shortTitle: 'Conserte o Computador',
    category: 'computacao',
    themeColor: 'from-red-500 to-rose-700',
    icon: 'Wrench',
    description: 'Diagnostique as falhas no computador virtual da escola e escolha como o Sistema Operacional resolve cada problema!',
    bnccFocus: 'EF05CO07 – Gerenciamento prático de hardware e resolução de falhas pelo Sistema Operacional.',
    questions: [
      {
        id: 'f6_q1',
        title: 'Diagnóstico 1: Teclado não responde',
        prompt: 'Um aluno conectou um teclado novo na porta USB, mas ao digitar, nada acontece na tela. Qual é o papel do Sistema Operacional para consertar essa situação?',
        scenario: '“Alerta da Bancada: Teclado desconhecido conectado!”',
        imageVisual: {
          type: 'hardware',
          label: '🔌 Porta USB com Teclado',
          sublabel: 'Comunicação Interrompida',
          color: 'bg-rose-950 border-rose-500/40 text-rose-300'
        },
        options: [
          { id: 'a', text: 'Reconhecer o novo hardware, carregar o driver correto e permitir que ele se comunique com os programas.', isCorrect: true },
          { id: 'b', text: 'Quebrar o cabo do teclado para evitar curto-circuito.', isCorrect: false },
          { id: 'c', text: 'Desligar a tela para o aluno não perceber que não funciona.', isCorrect: false },
          { id: 'd', text: 'Pedir para o aluno digitar na tela com uma caneta de papel.', isCorrect: false }
        ],
        explanation: 'O Sistema Operacional possui programas especiais chamados DRIVERS, que ensinam ao computador como conversar com cada modelo de teclado, mouse ou câmera que conectamos!',
        hint: 'Pense em como o computador "aprende" a falar com um aparelho novo conectado.'
      },
      {
        id: 'f6_q2',
        title: 'Diagnóstico 2: Impressora congestionada',
        prompt: 'Quatro alunos clicaram para imprimir suas redações ao mesmo segundo e a impressora começou a apitar confusa. O que o Sistema Operacional precisa gerenciar?',
        scenario: '“Alerta da Bancada: Conflito de Impressão Simultânea!”',
        imageVisual: {
          type: 'hardware',
          label: '📄 Fila de Impressão Bloqueada',
          sublabel: 'Disputa de Hardware',
          color: 'bg-rose-950 border-rose-500/40 text-rose-300'
        },
        options: [
          { id: 'a', text: 'Misturar todas as palavras dos 4 textos em uma folha só.', isCorrect: false },
          { id: 'b', text: 'Organizar uma fila de impressão (spool), enviando um documento por vez em ordem de chegada.', isCorrect: true },
          { id: 'c', text: 'Apagar os 4 documentos e reiniciar a impressora.', isCorrect: false },
          { id: 'd', text: 'Desligar o disjuntor da escola inteira.', isCorrect: false }
        ],
        explanation: 'O gerenciador de dispositivos do Sistema Operacional organiza uma fila de espera ordenada (fila de impressão). Assim, cada aluno recebe seu trabalho completo e sem confusão!',
        hint: 'Como fazemos na fila do lanche: um de cada vez em ordem de chegada!'
      },
      {
        id: 'f6_q3',
        title: 'Diagnóstico 3: Memória RAM Cheia!',
        prompt: 'Um computador começou a ficar extremamente lento porque 10 programas pesados foram abertos juntos. O que o Sistema Operacional faz para proteger a máquina?',
        scenario: '“Alerta da Bancada: Sobrecarga na Memória RAM!”',
        imageVisual: {
          type: 'hardware',
          label: '⚠️ RAM a 99% de Uso',
          sublabel: 'Escassez de Recursos',
          color: 'bg-rose-950 border-rose-500/40 text-rose-300'
        },
        options: [
          { id: 'a', text: 'Gerenciar a memória, priorizar os programas em primeiro plano e usar memória virtual no disco para não travar.', isCorrect: true },
          { id: 'b', text: 'Explodir a bateria para alertar o técnico.', isCorrect: false },
          { id: 'c', text: 'Imprimir todas as janelas na impressora colorida.', isCorrect: false },
          { id: 'd', text: 'Mudar a cor de fundo para rosa e bloquear o mouse.', isCorrect: false }
        ],
        explanation: 'O Sistema Operacional é responsável por alocar cada megabyte de memória. Quando ela fica cheia, o SO organiza a memória e evita que o computador congele completamente!',
        hint: 'O SO cuida da distribuição inteligente dos recursos escassos.'
      },
      {
        id: 'f6_q4',
        title: 'Diagnóstico 4: Computador sem Sistema Operacional',
        prompt: 'Um computador do laboratório foi ligado, as ventoinhas giraram, mas na tela apareceu uma mensagem: "Nenhum Sistema Operacional Encontrado". O que isso significa?',
        scenario: '“Alerta Crítico: Tela preta com cursor piscando!”',
        imageVisual: {
          type: 'hardware',
          label: '🛑 Tela Preta Sem Sistema',
          sublabel: 'Falta do Maestro',
          color: 'bg-rose-950 border-rose-500/40 text-rose-300'
        },
        options: [
          { id: 'a', text: 'As peças físicas estão ligadas, mas sem o Sistema Operacional o computador não sabe o que fazer e nenhum programa pode abrir!', isCorrect: true },
          { id: 'b', text: 'O teclado está com bateria fraca.', isCorrect: false },
          { id: 'c', text: 'O monitor está de cabeça para baixo.', isCorrect: false },
          { id: 'd', text: 'Apenas a tinta da impressora acabou.', isCorrect: false }
        ],
        explanation: 'Essa é a lição central da BNCC EF05CO07: o hardware pode estar perfeito e ligado, mas sem o Sistema Operacional ele é apenas metal inerte! O SO é indispensável para dar instruções e carregar programas.',
        hint: 'Lembre-se: sem o maestro, a orquestra inteira fica parada sem saber o que tocar.'
      }
    ]
  },
  {
    id: 7,
    title: 'Fase Final: O Grande Desafio',
    shortTitle: 'O Grande Desafio',
    category: 'misto',
    themeColor: 'from-amber-400 via-rose-500 to-indigo-700',
    icon: 'Award',
    description: 'A prova final interdisciplinar! Responda às perguntas decisivas de Computação, Português e Matemática para salvar o sistema da escola!',
    bnccFocus: 'EF05CO07 + Língua Portuguesa + Matemática – Integração interdisciplinar total.',
    questions: [
      {
        id: 'f7_q1',
        title: 'Desafio BNCC: A Verdade sobre o Sistema Operacional',
        prompt: 'Qual das seguintes afirmações sobre o Sistema Operacional está TOTALMENTE CORRETA segundo o que aprendemos?',
        imageVisual: {
          type: 'icon',
          label: '🏆 Conhecimento Fundamental',
          sublabel: 'Habilidade EF05CO07',
          color: 'bg-indigo-950 border-indigo-500/40 text-indigo-300'
        },
        options: [
          { id: 'a', text: 'O Sistema Operacional é apenas mais um aplicativo comum, igual a um jogo de cartas qualquer.', isCorrect: false },
          { id: 'b', text: 'O Sistema Operacional é o software indispensável que gerencia todo o hardware e possibilita a execução dos programas.', isCorrect: true },
          { id: 'c', text: 'Um computador funciona perfeitamente bem para navegar e jogar mesmo se não tiver nenhum sistema operacional.', isCorrect: false },
          { id: 'd', text: 'O Sistema Operacional é um componente físico de ferro que fica parafusado na parede da escola.', isCorrect: false }
        ],
        explanation: 'Excelente! O Sistema Operacional não é "só mais um joguinho": ele é a base de tudo. Sem ele, o hardware não responde e nenhum software de aplicação consegue rodar!',
        hint: 'Lembre-se da importância indispensável que estudamos em todas as missões.'
      },
      {
        id: 'f7_q2',
        title: 'Desafio de Português: Localização Textual',
        readingText: '“O primeiro passo de um computador ao ser ligado chama-se inicialização ou boot. Nesse momento, uma pequena instrução na placa-mãe acorda o disco de armazenamento e carrega o Sistema Operacional para a memória RAM. Uma vez carregado, o Sistema Operacional assume o controle total da máquina e apresenta ao aluno a área de trabalho amigável.”',
        prompt: 'De acordo com o texto acima, o que acontece imediatamente depois que o Sistema Operacional é carregado na memória RAM?',
        imageVisual: {
          type: 'icon',
          label: '📖 Localização Precisa',
          sublabel: 'Língua Portuguesa',
          color: 'bg-amber-950 border-amber-500/40 text-amber-300'
        },
        options: [
          { id: 'a', text: 'O computador desliga imediatamente por falta de energia.', isCorrect: false },
          { id: 'b', text: 'O Sistema Operacional assume o controle total da máquina e apresenta a área de trabalho ao aluno.', isCorrect: true },
          { id: 'c', text: 'O teclado começa a tocar uma música alta sozinho.', isCorrect: false },
          { id: 'd', text: 'A impressora queima suas folhas.', isCorrect: false }
        ],
        explanation: 'O texto descreve em sequência exata: "Uma vez carregado, o Sistema Operacional assume o controle total da máquina e apresenta ao aluno a área de trabalho amigável."',
        hint: 'Procure no texto as palavras "Uma vez carregado..."'
      },
      {
        id: 'f7_q3',
        title: 'Desafio Matemático: O Laboratório Completo',
        prompt: 'No laboratório restaurado há 18 computadores. Cada computador possui 1 monitor, 1 teclado, 1 mouse e 1 gabinete com Sistema Operacional. Quantos equipamentos físicos no total esses 18 postos de trabalho somam?',
        imageVisual: {
          type: 'math',
          label: '18 postos × 4 peças em cada',
          sublabel: 'Matemática Aplicada',
          color: 'bg-purple-950 border-purple-500/40 text-purple-300'
        },
        options: [
          { id: 'a', text: '22 equipamentos.', isCorrect: false },
          { id: 'b', text: '72 equipamentos físicos ao todo.', isCorrect: true },
          { id: 'c', text: '54 equipamentos.', isCorrect: false },
          { id: 'd', text: '36 equipamentos.', isCorrect: false }
        ],
        explanation: 'Cada posto possui 4 itens físicos (monitor, teclado, mouse e gabinete): 18 × 4 = 72 equipamentos físicos gerenciados pelos Sistemas Operacionais!',
        hint: 'Multiplique 18 por 4: (10 × 4 = 40) + (8 × 4 = 32). 40 + 32 = 72!'
      },
      {
        id: 'f7_q4',
        title: 'Desafio Final: O Técnico Mirim Conclui!',
        prompt: 'Se um colega da sua turma perguntar: "Por que meu computador precisa de um Sistema Operacional para abrir o jogo de ciências?", qual é a melhor resposta técnica que você dará?',
        imageVisual: {
          type: 'icon',
          label: '🎓 Conclusão do Técnico Mirim',
          sublabel: 'Síntese do Aprendizado',
          color: 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
        },
        options: [
          { id: 'a', text: '"Porque é o Sistema Operacional que gerencia a memória, o teclado, a tela e o processador para que o jogo consiga rodar com segurança!"', isCorrect: true },
          { id: 'b', text: '"Porque sem ele o computador ficaria mais pesado para carregar na mochila."', isCorrect: false },
          { id: 'c', text: '"Não precisa de nada, o jogo abre sozinho no ferro do computador sem nenhum software."', isCorrect: false },
          { id: 'd', text: '"Apenas para gastar mais energia da tomada da escola."', isCorrect: false }
        ],
        explanation: 'Parabéns, Técnico Mirim! Você dominou o conceito: o Sistema Operacional é o facilitador mestre que conecta o usuário, os programas e o hardware físico em perfeita harmonia!',
        hint: 'Escolha a resposta que destaca o gerenciamento do hardware e o suporte à execução de programas.'
      }
    ]
  }
];

// Interactive diagnostic lab items for Phase 6 dedicated simulation
export const VIRTUAL_DIAGNOSTIC_BUGS: VirtualDiagnosticBug[] = [
  {
    id: 'diag_teclado',
    component: 'teclado',
    componentName: 'Teclado USB do Aluno',
    symptom: 'Teclas pressionadas não geram texto no documento.',
    problemDescription: 'O teclado envia pulsos elétricos, mas o editor de texto não recebe nenhuma letra.',
    options: [
      { id: 'd1_a', text: 'O Sistema Operacional precisa carregar o driver e rotear os eventos de tecla para o programa.', isCorrect: true },
      { id: 'd1_b', text: 'Trocar o monitor da escola por uma televisão.', isCorrect: false },
      { id: 'd1_c', text: 'Desinstalar a placa-mãe do gabinete.', isCorrect: false },
      { id: 'd1_d', text: 'Colocar o teclado dentro da geladeira para esfriar.', isCorrect: false }
    ],
    explanation: 'O Sistema Operacional é o intermediário que escuta o periférico e envia as letras para a aplicação aberta.',
    osRole: 'Gerenciamento de Dispositivos de Entrada (E/S) e Drivers de Barramento USB.'
  },
  {
    id: 'diag_impressora',
    component: 'impressora',
    componentName: 'Impressora Compartilhada',
    symptom: 'Várias impressões misturadas e fila travada.',
    problemDescription: 'Três salas mandaram trabalhos de ciências ao mesmo tempo.',
    options: [
      { id: 'd2_a', text: 'O Sistema Operacional deve criar e gerenciar a Fila de Impressão (Spooler), organizando uma tarefa de cada vez.', isCorrect: true },
      { id: 'd2_b', text: 'Rasgar as folhas de papel antes de colocar na bandeja.', isCorrect: false },
      { id: 'd2_c', text: 'Apagar a memória RAM de todos os alunos.', isCorrect: false },
      { id: 'd2_d', text: 'Pintar a carcaça da impressora com tinta guache.', isCorrect: false }
    ],
    explanation: 'O serviço de fila de impressão do SO garante que cada documento seja enviado do início ao fim sem colidir com outros.',
    osRole: 'Gerenciamento de Spooler e Fila de Periféricos Compartilhados.'
  },
  {
    id: 'diag_memoria',
    component: 'memoria',
    componentName: 'Memória RAM Principal',
    symptom: 'Dois programas tentando usar o mesmo endereço de memória.',
    problemDescription: 'O editor de imagens e o navegador estão competindo pelo espaço da RAM.',
    options: [
      { id: 'd3_a', text: 'O Sistema Operacional aloca áreas de memória separadas e protegidas para cada programa em execução.', isCorrect: true },
      { id: 'd3_b', text: 'Desligar a tela para a memória descansar.', isCorrect: false },
      { id: 'd3_c', text: 'Deixar os programas brigarem até um deles quebrar a placa.', isCorrect: false },
      { id: 'd3_d', text: 'Limpar a memória com sabão em pó.', isCorrect: false }
    ],
    explanation: 'A proteção e alocação de memória é uma das funções mais vitais do SO para evitar que um aplicativo trave os outros.',
    osRole: 'Gerenciamento de Memória Virtual e Espaço de Endereçamento Seguro.'
  },
  {
    id: 'diag_disco',
    component: 'armazenamento',
    componentName: 'Armazenamento SSD / HD',
    symptom: 'Arquivo de pesquisa salvo não é localizado.',
    problemDescription: 'O aluno salvou "trabalho.odt", mas não lembra em qual setor do disco foi parar.',
    options: [
      { id: 'd4_a', text: 'O Sistema Operacional organiza o Sistema de Arquivos em pastas indexadas, permitindo buscar e abrir com segurança.', isCorrect: true },
      { id: 'd4_b', text: 'Chamar um chaveiro para abrir o disco com uma chave de metal.', isCorrect: false },
      { id: 'd4_c', text: 'O arquivo evaporou no ar da sala de aula.', isCorrect: false },
      { id: 'd4_d', text: 'Comprar outro computador novo imediatamente.', isCorrect: false }
    ],
    explanation: 'O Sistema de Arquivos (como NTFS, ext4 ou FAT) é gerenciado pelo SO, que cria a árvore de diretórios, nomes de arquivos e permissões.',
    osRole: 'Gerenciamento do Sistema de Arquivos e Armazenamento Secundário.'
  }
];
