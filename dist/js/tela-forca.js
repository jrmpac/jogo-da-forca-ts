import { Forca } from "./forca.js";
class TelaForca {
    constructor() {
        this.jogoDaForca = new Forca();
        this.registrarElementos();
        this.registrarEventos();
    }
    registrarElementos() {
        // Casts
        this.pnlConteudo =
            document.getElementById('pnlConteudo');
        this.pnlTeclado =
            document.getElementById('pnlTeclado');
        this.pnlPalavra =
            document.getElementById('pnlPalavra');
        this.pbImagemForca =
            document.getElementById('pbImagemForca');
        this.lblDica =
            document.getElementById('lblDica');
        this.btnReset =
            document.getElementById('btnReset');
    }
    registrarEventos() {
        for (let botao of this.pnlTeclado.children) {
            botao.addEventListener("click", (sender) => this.darPalpite(sender));
            botao.addEventListener("click", (sender) => this.atualizarBotoesPainel(sender));
        }
        this.btnReset.addEventListener("click", () => this.reiniciarJogo());
    }
    darPalpite(sender) {
        const botaoClicado = sender.target;
        const palpite = botaoClicado.textContent[0];
        if (this.jogoDaForca.jogar(palpite) ||
            this.jogoDaForca.jogadorPerdeu()) {
            this.finalizarJogo();
        }
        this.obterPalavraParcial();
        this.atualizarForca();
    }
    finalizarJogo() {
        const jogadorPerdeu = this.jogoDaForca.jogadorPerdeu();
        const lblMensagemFinal = document.createElement('p');
        lblMensagemFinal.classList.add('notificacao');
        lblMensagemFinal.textContent = this.jogoDaForca.mensagemFinal;
        if (jogadorPerdeu)
            lblMensagemFinal.classList.add('notificacao-erro');
        else
            lblMensagemFinal.classList.add('notificacao-acerto');
        this.pnlConteudo.appendChild(lblMensagemFinal);
        for (let botao of this.pnlTeclado.children) {
            if (botao.textContent != 'Reiniciar')
                botao.disabled = true;
        }
    }
    reiniciarJogo() {
        var _a;
        this.jogoDaForca = new Forca();
        this.obterPalavraParcial();
        this.lblDica.textContent = this.obterDicaPalavra();
        this.atualizarForca();
        (_a = this.pnlConteudo.querySelector('.notificacao')) === null || _a === void 0 ? void 0 : _a.remove();
        for (let botao of this.pnlTeclado.children) {
            botao.disabled = false;
        }
    }
    obterPalavraParcial() {
        this.pnlPalavra.replaceChildren();
        const palavra = this.jogoDaForca.obterPalavraParcial();
        for (let i = 0; i < palavra.length; i++) {
            const letra = document.createElement('p');
            letra.textContent = palavra[i];
            this.pnlPalavra.appendChild(letra);
        }
    }
    obterDicaPalavra() {
        return `${this.jogoDaForca.obterQuantidadeLetras()} letras`;
    }
    atualizarForca() {
        const imagensForca = [
            'forca00',
            'forca01',
            'forca02',
            'forca03',
            'forca04',
            'forca05',
            'forca06',
            'forca07',
        ];
        this.pbImagemForca.src = `assets/${imagensForca[this.jogoDaForca.erros]}.png`;
    }
    atualizarBotoesPainel(sender) {
        const botaoClicado = sender.target;
        botaoClicado.disabled = true;
    }
}
window.addEventListener('load', () => new TelaForca());
//# sourceMappingURL=tela-forca.js.map