import React, { useState, useEffect } from 'react';
import { X, BookOpen, Search, Cpu, HardDrive, Keyboard, Monitor, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GlossaryModalProps {
  onClose: () => void;
}

interface Term {
  title: string;
  category: 'so' | 'hardware' | 'software' | 'perifericos';
  definition: string;
  example: string;
  icon: string;
}

const GLOSSARY_TERMS: Term[] = [
  {
    title: 'Sistema Operacional (SO)',
    category: 'so',
    definition: 'O software fundamental que gerencia todo o hardware do computador (processador, memória, tela, teclado) e cria a base necessária para que todos os outros programas consigam ser executados.',
    example: 'Windows, Linux Educacional, Android, macOS e iOS.',
    icon: '🧠'
  },
  {
    title: 'Hardware',
    category: 'hardware',
    definition: 'A parte física e tangível do computador, ou seja, todos os componentes eletrônicos, placas, cabos, teclas e carcaça que podemos tocar com as mãos.',
    example: 'Placa-mãe, teclado, mouse, monitor, HD, memória RAM e impressora.',
    icon: '🔧'
  },
  {
    title: 'Software de Aplicação',
    category: 'software',
    definition: 'Programas feitos de código lógico projetados para realizar tarefas específicas para o usuário. Precisam do Sistema Operacional para funcionar.',
    example: 'Navegadores de internet, editores de texto, Paint, jogos educativos e calculadoras.',
    icon: '💻'
  },
  {
    title: 'Memória RAM',
    category: 'hardware',
    definition: 'Memória de acesso ultrarrápido que guarda temporariamente apenas os dados e programas que estão sendo usados no exato momento. É volátil: quando o computador desliga, ela se esvazia.',
    example: 'Quando você abre o jogo, o SO carrega ele na RAM para rodar liso.',
    icon: '⚡'
  },
  {
    title: 'Armazenamento (HD / SSD)',
    category: 'hardware',
    definition: 'Memória permanente onde arquivos, fotos, músicas, trabalhos escolares e o próprio Sistema Operacional ficam guardados com segurança mesmo com a máquina desligada.',
    example: 'Disco rígido interno, SSD ultrarrápido ou pen drive USB.',
    icon: '💾'
  },
  {
    title: 'Periféricos de Entrada',
    category: 'perifericos',
    definition: 'Dispositivos que nós usamos para enviar dados, comandos e informações DE FORA PARA DENTRO do computador.',
    example: 'Teclado (letras), Mouse (cliques), Microfone (voz) e Câmera/Webcam (imagem).',
    icon: '⌨️'
  },
  {
    title: 'Periféricos de Saída',
    category: 'perifericos',
    definition: 'Dispositivos que mostram ou entregam informações DO COMPUTADOR PARA NÓS, de forma visual, física ou sonora.',
    example: 'Monitor (tela), Caixa de Som (áudio) e Impressora (papel impresso).',
    icon: '🖥️'
  },
  {
    title: 'Drivers de Dispositivos',
    category: 'software',
    definition: 'Pequenos programas especiais que ensinam o Sistema Operacional a se comunicar corretamente com peças novas ou aparelhos conectados.',
    example: 'O driver que faz a impressora nova ser reconhecida pelo Windows ou Linux.',
    icon: '🔌'
  }
];

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filtered = GLOSSARY_TERMS.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase()) ||
    t.example.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-7 relative">
        
        {/* Close */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
          aria-label="Fechar dicionário"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 pb-3 border-b border-slate-800 pr-10">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Guia do Técnico Mirim
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Dicionário de Informática & Sistema Operacional
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Consulte sempre que tiver dúvidas sobre os componentes e termos da computação!
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar termo (ex: memória, hardware, sistema operacional...)"
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition"
          />
        </div>

        {/* Terms List */}
        <div className="space-y-3">
          {filtered.map((term, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 hover:border-emerald-500/40 transition"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xl">{term.icon}</span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {term.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2.5">
                {term.definition}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] sm:text-xs text-emerald-300 font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Exemplos:</strong> {term.example}</span>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              Nenhum termo encontrado para &ldquo;{search}&rdquo;. Tente outra palavra!
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
