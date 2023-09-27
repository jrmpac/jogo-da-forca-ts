export class Forca {
  erros: number;
  mensagemFinal: string;
  palavraSecreta: string;
  letrasEncontradas: string[];

  constructor() {
    this.mensagemFinal = '';
    this.palavraSecreta = this.obterPalavraSecreta();
    this.letrasEncontradas = this.popularLetrasEncontradas(this.palavraSecreta.length);
    this.erros = 0;
  }

  obterPalavraParcial(): string {
    return this.letrasEncontradas.join('');
  }

  obterQuantidadeErros(): number {
    return this.erros;
  }

  obterQuantidadeLetras(): number {
    return this.palavraSecreta.length;
  }

  jogar(palpite: string): boolean {
    let letraFoiEncontrada: boolean = false;

    for (let i = 0; i < this.obterQuantidadeLetras(); i++) {
      if (palpite == this.palavraSecreta[i]) {
          this.letrasEncontradas[i] = palpite;
          letraFoiEncontrada = true;
      }
    }

    if (!letraFoiEncontrada)
      this.erros++;
    
    const jogadorAcertou: boolean =
      this.letrasEncontradas.join("") === this.palavraSecreta;

    if (jogadorAcertou)
      this.mensagemFinal = `Você acertou a palavra ${this.palavraSecreta}, parabéns!`;

    else if (this.jogadorPerdeu())
      this.mensagemFinal = 'Você perdeu! Tente novamente...';

    return jogadorAcertou;
  }
  
  jogadorPerdeu(): boolean {
    return this.obterQuantidadeErros() === 7;
  }

  obterPalavraSecreta(): string {
    const palavras: string[] = [
        "ABACATE", "ABACAXI", "ACEROLA", "ACAI", "ARACA", "ABACATE", "BACABA", 
        "BACURI", "BANANA", "CAJA", "CAJU", "CARAMBOLA", "CUPUACU", "GRAVIOLA", 
        "GOIABA", "JABUTICABA", "JENIPAPO", "MACA", "MANGABA", "MANGA", "MARACUJA", 
        "MURICI", "PEQUI", "PITANGA", "PITAYA", "SAPOTI", "TANGERINA", "UMBU", 
        "UVA", "UVAIA"
    ];

    const indiceAleatorio = Math.floor(Math.random() * palavras.length);

    return palavras[indiceAleatorio];
  }

  popularLetrasEncontradas(tamanho: number): string[] {
    const letrasEncontradas: string[] = new Array(tamanho).fill('_');

    return letrasEncontradas;
  }
}