import { Forca } from "./forca.js";

class TelaForca {
  pnlConteudo: HTMLDivElement;
  pbImagemForca: HTMLImageElement;
  lblDica: HTMLParagraphElement;
  pnlTeclado: HTMLDivElement;
  pnlPalavra: HTMLDivElement;
  btnReset: HTMLButtonElement;

  jogoDaForca: Forca;

  constructor() {
    this.jogoDaForca = new Forca();

    this.registrarElementos();
    this.registrarEventos();
  }

  registrarElementos(): void {
    // Casts
    this.pnlConteudo =
      document.getElementById('pnlConteudo') as HTMLDivElement;
      
    this.pnlTeclado =
      document.getElementById('pnlTeclado') as HTMLDivElement;
    
    this.pnlPalavra =
      document.getElementById('pnlPalavra') as HTMLDivElement;
    
    this.pbImagemForca =
      document.getElementById('pbImagemForca') as HTMLImageElement;
    
    this.lblDica =
      document.getElementById('lblDica') as HTMLParagraphElement;

    this.btnReset =
      document.getElementById('btnReset') as HTMLButtonElement;
  }

  registrarEventos(): void {
    for (let botao of this.pnlTeclado.children) {
      botao.addEventListener("click", (sender) => this.darPalpite(sender));
      botao.addEventListener("click", (sender) => this.atualizarBotoesPainel(sender));
    }

    this.btnReset.addEventListener("click", () => this.reiniciarJogo());
  }

  darPalpite(sender: Event): void {
    const botaoClicado = sender.target as HTMLButtonElement;

    const palpite = botaoClicado.textContent![0];

    if (
      this.jogoDaForca.jogar(palpite) ||
      this.jogoDaForca.jogadorPerdeu()
    ) {
      this.finalizarJogo();
    }

    this.obterPalavraParcial();

    this.atualizarForca();
  }

  finalizarJogo(): void {
    const jogadorPerdeu: boolean = this.jogoDaForca.jogadorPerdeu();

    const lblMensagemFinal: HTMLParagraphElement = document.createElement('p');

    lblMensagemFinal.classList.add('notificacao');
    lblMensagemFinal.textContent = this.jogoDaForca.mensagemFinal;

    if (jogadorPerdeu)
      lblMensagemFinal.classList.add('notificacao-erro');
    else
      lblMensagemFinal.classList.add('notificacao-acerto');
    
    this.pnlConteudo.appendChild(lblMensagemFinal);

    for (let botao of this.pnlTeclado.children) {
      if (botao.textContent != 'Reiniciar')
        (botao as HTMLButtonElement).disabled = true;
    }
  }

  reiniciarJogo(): void {
    this.jogoDaForca = new Forca();

    this.obterPalavraParcial();

    this.lblDica.textContent = this.obterDicaPalavra();

    this.atualizarForca();

    this.pnlConteudo.querySelector('.notificacao')?.remove();

    for (let botao of this.pnlTeclado.children) {
      (botao as HTMLButtonElement).disabled = false;
    }
  }

  obterPalavraParcial(): void {
    this.pnlPalavra.replaceChildren();

    const palavra: string = this.jogoDaForca.obterPalavraParcial();

    for (let i = 0; i < palavra.length; i++) {
      const letra = document.createElement('p');
      letra.textContent = palavra[i];

      this.pnlPalavra.appendChild(letra);
    }
  }

  obterDicaPalavra(): string {
    return `${this.jogoDaForca.obterQuantidadeLetras()} letras`;
  }

  atualizarForca(): void {
    const imagensForca: string[] = [
      'forca00',
      'forca01',
      'forca02',
      'forca03',
      'forca04',
      'forca05',
      'forca06',
      'forca07',
    ];

    this.pbImagemForca.src = `assets/${
      imagensForca[this.jogoDaForca.erros]
    }.png`;
  }

  atualizarBotoesPainel(sender: Event): void {
    const botaoClicado = sender.target as HTMLButtonElement;

    botaoClicado.disabled = true;
  }
}

window.addEventListener('load', () => new TelaForca());