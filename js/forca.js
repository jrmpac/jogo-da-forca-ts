export class Forca {
    constructor() {
        this.mensagemFinal = '';
        this.palavraSecreta = this.obterPalavraSecreta();
        this.letrasEncontradas = this.popularLetrasEncontradas(this.palavraSecreta.length);
        this.erros = 0;
    }
    obterPalavraParcial() {
        return this.letrasEncontradas.join('');
    }
    obterQuantidadeErros() {
        return this.erros;
    }
    obterQuantidadeLetras() {
        return this.palavraSecreta.length;
    }
    jogar(palpite) {
        let letraFoiEncontrada = false;
        for (let i = 0; i < this.obterQuantidadeLetras(); i++) {
            if (palpite == this.palavraSecreta[i]) {
                this.letrasEncontradas[i] = palpite;
                letraFoiEncontrada = true;
            }
        }
        if (!letraFoiEncontrada)
            this.erros++;
        const jogadorAcertou = this.letrasEncontradas.join("") === this.palavraSecreta;
        if (jogadorAcertou)
            this.mensagemFinal = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;
        else if (this.jogadorPerdeu())
            this.mensagemFinal = 'Você perdeu! Tente novamente...';
        return jogadorAcertou;
    }
    jogadorPerdeu() {
        return this.obterQuantidadeErros() === 7;
    }
    obterPalavraSecreta() {
        const palavras = [
            "ABACATE", "ABACAXI", "ACEROLA", "ACAI", "ARACA", "ABACATE", "BACABA",
            "BACURI", "BANANA", "CAJA", "CAJU", "CARAMBOLA", "CUPUACU", "GRAVIOLA",
            "GOIABA", "JABUTICABA", "JENIPAPO", "MACA", "MANGABA", "MANGA", "MARACUJA",
            "MURICI", "PEQUI", "PITANGA", "PITAYA", "SAPOTI", "TANGERINA", "UMBU",
            "UVA", "UVAIA"
        ];
        const indiceAleatorio = Math.floor(Math.random() * palavras.length);
        return palavras[indiceAleatorio];
    }
    popularLetrasEncontradas(tamanho) {
        const letrasEncontradas = new Array(tamanho).fill('_');
        return letrasEncontradas;
    }
}
//# sourceMappingURL=forca.js.map