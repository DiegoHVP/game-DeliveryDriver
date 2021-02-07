//SELECAO MENU
let xo = 365,  yo = 315;//COR MENU RGB
let Red = 10,  Green = 100, Blue  = 200;//Posicao player
let x = 30,  y = 450;//TELA
let cena = 0,  aux = -1;//Sprites sem caixa
let down = [],  up = [],  right = [],  left = [];//Sprites com caixa
let downc = [],  upc = [],  rightc = [],  leftc = []//Outros
let bg, player, countframe = 0,  FR = 0,  caixa = 0,  q1 = 0,  ask = 0,  time = 0,  logo,  XP = 12000,  sonsON,  stage = 0,  pontos = [],  x1,  lista = '', Speed = 10, questaoatual;//INSERIR NOME e EFEITO
let  L2 = 20,  A = 65,  B = 65,  C = 65,  A0 = ' ',  B0 = ' ',  C0 = ' ',  efeito = 0,  efeito0 = 0,  FX,  jogador = []//SOM
let sons = []/////xi e yi - inimigo posição. dance0 e dance1 - pés do inimigo
let xi = 320,  yi = 500,  vida = 12,  inimigoON = 1,  dance0, dance1 ////ROBOTIME, trocadilho horriveis
let xi0 = 40,  yi0 = 40,  dance, dance11, paint0, paint1 ////ROBOPONTO, 'paint0' e 'paint1' para inserir cor por proximidade
function preload() {
  soundFormats('ogg');
  sons[1] = loadSound('sons/theme menu.ogg') //MENU SOUND
  sons[2] = loadSound('sons/fx_menu.ogg') //MENU FX
  sons[0] = loadSound('sons/pass.ogg') //GANHOU FASE
  sons[3] = loadSound('sons/game_over.ogg') //GAME OVE
  sons[4] = loadSound('sons/theme.ogg') //MUSICA FASES
  sons[5] = loadSound('sons/win.ogg') //GANHOU JOGO
  sons[6] = loadSound('sons/fx_caixa_solta.ogg') //SOLTA CAIXA
  sons[7] = loadSound('sons/fx_caixa_pega.ogg') //PEGA CAIXA

  for(let i=0;i<4;i++){
    //PLAYER SEM A CAIXA
    down[i] = loadImage('Player/DOWN0'+i+'.png')
    up[i] = loadImage('Player/UP0'+i+'.png')
    left[i] = loadImage('Player/LEFT0'+i+'.png')
    right[i] = loadImage('Player/RIGHT0'+i+'.png')

    //PLAYER COM A CAIXA
    downc[i] = loadImage('PlayerBox/DOWN0'+i+'.png')
    upc[i] = loadImage('PlayerBox/UP0'+i+'.png')
    leftc[i] = loadImage('PlayerBox/LEFT0'+i+'.png')
    rightc[i] = loadImage('PlayerBox/RIGHT0'+i+'.png')
}
  bg = loadImage('background.png') //FUNDO
  logo = loadImage('logo.png');
}
function setup() {
   createCanvas(900, 580);
}
function draw() {
  switch (cena) {
    case -1:
      intro()
      break;
    case 0:
      menu();
      break;
    case 1:
      fase1();
      break;
    case 2:
      regras();
      break;
    case 3:
      sobre()
      break;
    case 4:
      fase2();
      break;
    case 5:
      fase3()
      break;
    case 6:
      fase4()
      break;
    case 7:
      fase5()
      break;
    case 8:
      fase6()
      break;
    case 9:
      fase7()
      break;
    case 10:
      fase8()
      break;
    case 11:
      fase9()
      break;
    case 12:
      fase10()
      break;
    case 99:
      gameover();
      break;
    case 100:
      win()
      break;
  }

  //O 'countframe' REGULA O NUMERO
  //DE FRAMES NOS SPRITES
  //O 'FR' EA letIACAO DOS FRAMES
  if (countframe > 8)
    countframe = 0, FR++
  if (FR > 3)
    FR = 0;

  //let 'efeito' e a velocidade
  if (efeito > 25)
    efeito = 0, efeito0++
  if (efeito0 > 100)
    efeito0 = 0
  if (efeito0 % 2 == 0)
    FX = 0
  else
    FX = 255
  //let 'FX' e a cor
}
function menu() {
  //RESTAURAR DADOS
  if (q1 != 0 || x != 30 || y != 450)
    q1 = 0, x = 30, y = 450, XP = 12000, stage++, caixa = 0, sonsON = undefined, x1 = undefined, sons[3].stop(), sons[5].stop()

  //TELA
  Red++, Green++,  Blue++
  if (Red >= 255)
    Red = random(0, 255);
  if (Green >= 255)
    Green = random(0, 255);
  if (Blue >= 255)
    Blue = random(0, 255);
  background(Red, Green, Blue);

  fill('white');
  stroke('black');
  strokeWeight(1);
  rect(370, 320, 120, 55, 120); //ELIPESE JOGAR
  rect(370, 390, 120, 55, 120); //ELIPESE REGRAS
  rect(370, 460, 120, 55, 120); //ELIPESE SOBRE

  textSize(32);
  fill('black');
  stroke(255);
  image(logo, 130, 200, 680, 60); //TITULO
  textSize(12);
  text('A vida nunca foi tão emocionante.', 588, 270) //SUBTITULO MUITO FOD.... QUER DIZER SUBTITULO BOLADO PRA DÉDÉU
  textSize(32);
  stroke(0);
  text('Jogar', 390, 355);
  text('Regras', 379, 425);
  text('Sobre', 385, 496);

  noFill();
  strokeWeight(5)
  stroke(255, 0, 0);
  rect(xo, yo, 130, 65, 30) //ELIPSE SELECIONAR
  if (sonsON == undefined) {
    //O 'sonsON' E UMA VARIAVEL AUXILIAR PARA EXECUTAR APENAS UM VEZ, O MESMO PARA 'x1'
    sonsON = 1
    sons[0].setVolume(0.1);
    sons[0].play();

    for (let i = 0; pontos[i] != undefined; i++) //RANKIAR OS JOGADORES
      for (let ii = 0, rank; pontos[ii] != undefined; ii++) {
        if (pontos[i] > pontos[ii]) {
          rank = pontos[i]
          pontos[i] = pontos[ii]
          pontos[ii] = rank

          rank = jogador[i]
          jogador[i] = jogador[ii]
          jogador[ii] = rank
        }
      }

    lista = ''

    for (let i = 4; i > -1; i--) { //GUARDAR OS 5 PRIMEIROS EM lista
      if (pontos[i] != undefined)
        lista = (i + 1) + '° ' + jogador[i] + ' ' + parseInt(pontos[i]) + '\n' + lista
    }
  }
  if (lista == '') //CASO NÃO TENHA NINGUEM
    lista = '...........'
  textSize(18)
  fill(0)
  stroke('grey')
  strokeWeight(1)
  text('RANKING:\n\n' + lista, 40, 340) //PRINTAR RANKING
}
function regras() {
  background('#7FDBFF');
  fill(0);
  stroke('grey');
  strokeWeight(1);
  textSize(32);
  text('REGRAS', 370, 40)
  textSize(18)
  text('O Jogador não pode conjurar magias, lançar raios, usar telepatia, se transformar\nno flash, fazer o curso com um carro, usar patins, usar ki, nem, stand, mantra,\nchakara, usar mochiila a jato, usar cavalo, teleporter, truques ou qualquer outro\ntipo de poder que possa lhe dar vantagem no jogo.', 100, 80);

  textSize(18)
  text('Pressione ESPAÇO para voltar ao menu.', 290, 500);
  if (keyCode == 32) //VOLTA MENU
    cena = 0, sons[2].play()

}
function sobre() {
  background(80, 80, 200);
  textSize(32);
  fill(0)
  text('OBJETIVO DO JOGO', 300, 40);
  textSize(18);
  text('O jogo consiste em ajudar o caminhoneiro a encher o caminhão no menor\ntempo possivel usando sua habilidade de matemática, enfrentando problemas\nde soma, subtrações e frações.', 100, 80);
  text('', 80, 100);
  stroke('blue');
  strokeWeight(1);
  textSize(18)
  text('Pressione ESPAÇO para voltar ao menu.', 290, 500);
  if (keyCode == 32) //VOLTA MENU
    cena = 0, sons[2].play()

}
function keyPressed() {

  //////////////////////////CONTROLE MENU/////////////////////////////////////
  if (cena == 0) { //FUNCIONA APENAS EM CENA 0, OU SEJA MENU
    if (keyCode === ENTER) //CENA RECEBE AUX, MUDA A TELA
      cena = aux, sons[2].play()
    if (keyCode === DOWN_ARROW) {
      if (yo >= 315 && yo < 455) //DESCER, LIMITE
        yo += 70, sons[2].play()
    }
    if (keyCode === UP_ARROW) {
      if (yo > 315 && yo <= 455) //SUBIR, LIMITE
        yo -= 70, sons[2].play()
    }
    if (yo == 385) //SE ESTA EM REGRAS AUX = 2
      aux = 2;
    if (yo == 315) //SE ESTA EM JOGAR AUX = -1
      aux = -1;
    if (yo == 455) //SE ESTA EM REGRAS AUX = 3
      aux = 3;
  }

  //////////////////CONTROLE INSERIR NOME/////////////////////////////////////
  if (cena == 99 || cena == 100) { //FUNCIONA APENAS EM CENA 99 OU CENA 100, OU SEJA GAME OVER E WIN
    if (keyIsDown(RIGHT_ARROW) && x < 466) //MOVER QUADRO DIREITA
      x += 70, sons[2].play()
    if (keyIsDown(LEFT_ARROW) && x > 326) //MOVER QUADRO ESQUERDA
      x -= 70, sons[2].play()
    if (x == 326 && keyCode <= 90 && keyCode >= 65) //PRIMEIRO QUADRO, INSERIR LETRA
      A = keyCode, A0 = String.fromCharCode(A)
    if (x == 326 && keyCode == 8) //PRIMEIRO QUADRO, APAGAR LETRA
      A0 = ' '

    if (x == 396 && keyCode <= 90 && keyCode >= 65) //SEGUNDO QUADRO, INSERIR LETRA
      B = keyCode, B0 = String.fromCharCode(B)
    if (x == 396 && keyCode == 8) //SEGUNDO QUADRO, APAGAR LETRA
      B0 = ' '

    if (x == 466 && keyCode <= 90 && keyCode >= 65) //TERCEIRO QUADRO, INSERIR LETRA
      C = keyCode, C0 = String.fromCharCode(C)
    if (x == 466 && keyCode == 8) //TERCEIRO QUADRO, APAGAR LETRA
      C0 = ' '
  }
}
function fase1() {
  if (pontos[stage] == undefined)
    pontos[stage] = 0, player = left[1], caixa = 0, sons[0].stop(), sons[4].setVolume(0.08), sons[4].play(), x1 = undefined, sonsON = undefined, inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 01
  design0() //DESENHOS, DEFINIÇÕES, CONTADORES
  textSize(18)
  text(': O CAMINHÃO DE BILL GATES ESTA VAZIO, ELE PRECISA DE 5 CAIXAS, VOCÊ\nPODE ENCHER O CAMINHÃO PARA ELE?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)


  if (keyCode == 81)
    cena = 100

  base(); //CONTROLE, SPRITES, CONDIÇÕES, TEMPO, INIMIGO


  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 5) {
      design1() //PONTOS SOMA, PENSAMENTO - CERTO
    }
  else
  if (time < 4000) {
    design2() //PENSAMENTO - ERRADO
  } else
    time = 0
  if (keyCode == 83 && q1 == 5) //PROXIMA FASE
    cena = 4


  image(player, x, y, 80, 150); //PLAYER

}
function fase2() {
  if (x1 != 1) //x1 por tela ser para executar um vez, o mesmo para sonsON
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 1, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 02
  //TELA
  design0()
  text(': SHREK VIROU CAMINHONEIRO ELE PRECISA DE 3+3+3 CAIXAS VOCÊ\nPODE AJUDA-LO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)

  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 9) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 9)
    cena = 5

  //PLAYER
  image(player, x, y, 80, 150);

}
function fase3() {
  if (x1 != 2)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 2, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 03
  design0()
  text(': O BATIMAM COMPROU 12-8+2 CAIXAS COM BAT-EQUIPAMENTOS,\nQUANTAS CAIXAS DEVEM SER COLOCADAS NO CAMINHÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)


  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 6) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 6)
    cena = 6


  //PLAYER
  image(player, x, y, 80, 150);

}
function fase4() {
  if (x1 != 3)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 3, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 04
  design0()
  text(': UM LOJA DE CAIXAS COMPROU 12+12-12 CAIXAS, QUANTAS CAIXAS\nDEVEM IR NO CAMINHÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)

  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 12) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 12)
    cena = 7

  //PLAYER
  image(player, x, y, 80, 150);
}
function fase5() {
  if (x1 != 4)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 4, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 05
  design0()
  text(': UMA FAMILIA DE ZUMBI COMPROU 9-2-4+7 CAIXAS COM CEREBROS\nENLATADOS, QUANTAS CAIXAS DEVEM IR NO CAMINHÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)

  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 10) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 10)
    cena = 8

  //PLAYER
  image(player, x, y, 80, 150);
}
function fase6() {
  if (x1 != 5)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 5, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 06
  design0()
  text(': A BARBIE COMPROU METADE DE 6 (OU 6/2) CAIXAS DE SAPATOS,\n QUANTAS CAIXAS SÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)

  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 3) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 3)
    cena = 9


  //PLAYER
  image(player, x, y, 80, 150);

}
function fase7() {
  if (x1 != 6)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 6, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 07
  design0()
  text(': GOHAN COMPROU 8 DIVIDIDO POR 4 (OU 8/4) CAIXAS COM CARNE DE\nDINOSSAURO QUANTAS CAIXAS DE CARNE SÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)

  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 2) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 2)
    cena = 10

  //PLAYER
  image(player, x, y, 80, 150);

}
function fase8() {
  if (x1 != 7)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 7, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 08
  design0()
  text(': UM UPALUPA COMPROU 20/4 CAIXAS DE CHOCOLATE\nQUANTAS CAIXAS SÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)

  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 5) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 5)
    cena = 11

  //PLAYER
  image(player, x, y, 80, 150);

}
function fase9() {
  if (x1 != 8)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 8, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 09
  design0()
  text(': A GALINHA PINTADINHA COMPROU 30/5 CAIXAS COM MILHO, QUANTAS\nCAIXAS SÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)
  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 6) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 6)
    cena = 12

  //PLAYER
  image(player, x, y, 80, 150);

}
function fase10() {
  if (x1 != 9)
    XP = 12000, x = 30, y = 450, q1 = 0, sonsON = undefined, x1 = 9, player = l[1], caixa = 0, sons[4].setVolume(0.08), inimigoON = 1, xi = 320, yi = 500, xi0 = 730, yi0 = 350, questaoatual = 10
  design0()
  text(': O CHAVEZ ACHOU 20 REAIS E COMPROU 21/3 CAIXAS COM\nSANDUICHE DE PRESUNTO, QUANTAS CAIXAS SÃO?', 170, 34)
  textSize(13)
  text('Pressione Z para pegar a caixa no deposito.\nPressione X para pegar as caixas que já estão no caminhão.\nPressione ESPAÇO para verificar a resposta.', 510, 145)

  base()

  //RESOLUÇÃO DA QUESTÃO
  if (keyCode == 32)
    if (q1 == 7) {
      design1()
    }
  else
  if (time < 4000) {
    design2()
  } else
    time = 0
  if (keyCode == 83 && q1 == 7)
    cena = 100

  //PLAYER
  image(player, x, y, 80, 150);
}
function gameover() {
  if (x1 != 'FIM DO JOGO')
    x1 = 'FIM DO JOGO', x = 326, y = 480, A0 = ' ', B0 = ' ', C0 = ' ', sons[4].stop(), sons[3].setVolume(0.06), sons[3].play(), sons[0].stop()
  efeito++
  background('grey');
  textSize(45)
  fill(0)
  text('GAME OVER', (width * 5) / 14 - 20, height / 2)
  textSize(18)
  strokeWeight(1)
  stroke('grey')
  text('Pontos: ' + parseInt(pontos[stage]), (width * 5) / 14 + 75, height / 2 + 100)
  text('\nNão desamine você pode tentar novamente.', (width * 5) / 14 - 45, height / 2 + 100)


  /////////////////////////INSERIR NOME + TRANSIÇÃO//////////////////////////
  text('INSIRA SEU NOME:', (width * 5) / 14 + 20 + 12, height / 2 + 180)
  if (keyCode == ENTER)
    jogador[stage] = A0 + B0 + C0, cena = 0, x1 = undefined
  noFill(0)
  strokeWeight(3)
  stroke(FX)
  rect(x + 9, y, 70, 50, 10)
  textSize(16)
  stroke('grey')
  fill(0)
  textSize(32)
  text(A0, (width * 5) / 14 + 31 + 7, height / 2 + 226)
  text(B0, (width * 5) / 14 + 70 + 31 + 7, height / 2 + 226)
  text(C0, (width * 5) / 14 + 140 + 31 + 7, height / 2 + 226)
  /////////////////////////////////////////////////////////

}
function win() {
  if (x1 != 'FIM DO JOGO')
    x1 = 'FIM DO JOGO', x = 326, y = 480, A0 = ' ', B0 = ' ', C0 = ' ', sons[4].stop(), sons[5].setVolume(0.07), sons[5].play(), sons[0].stop()
  efeito++
  L += 0.5
  S++
  D += 1.5
  if (L >= 220)
    L = random(0, 220);
  if (S >= 220)
    S = random(0, 220);
  if (D >= 220)
    D = random(0, 220)
  background(D, L, S);
  textSize(32)
  fill(0)
  strokeWeight(6)
  stroke(L - 23, S - 40, D)
  text('VOCE GANHOU!!', (width * 5) / 14 - 5, height / 2 + 30)
  textSize(52)
  text('PARABENS!', (width * 5) / 14 - 20, height / 2 - 30)
  textSize(18)
  strokeWeight(2)
  stroke(255)
  text('Pontos: ' + parseInt(pontos[stage]), (width * 5) / 14 + 75, height / 2 + 100)
  text('\nVocê consegue ir mais rapido que isso?', (width * 5) / 14 - 15, height / 2 + 100)

  /////////////////////INSERIR NOME + TRANSIÇÃO/////////////////////
  text('INSIRA SEU NOME:', (width * 5) / 14 + 40, height / 2 + 180)
  if (keyCode == ENTER)
    cena = 0, x1 = undefined, jogador[stage] = A0 + B0 + C0
  noFill(0)
  strokeWeight(3)
  stroke(FX)
  rect(x + 17, y + 20 - 10, 70, 50, 10)
  textSize(16)
  stroke('grey')
  fill(0)
  textSize(32)
  strokeWeight(0)
  text(A0, (width * 5) / 14 + 46 - 1, height / 2 + 243 - 10)
  text(B0, (width * 5) / 14 + 70 + 46 - 1, height / 2 + 243 - 10)
  text(C0, (width * 5) / 14 + 140 + 46 - 1, height / 2 + 243 - 10)
}
function intro() {
  background(170)
  textSize(32);
  efeito++
  if (x1 != 'Zero')
    sons[0].stop(), x1 = 'zero', sons[1].stop()
  fill(FX)
  text('!!FIQUE ATENTO!!', 300, 40);
  textSize(18);
  strokeWeight(0)
  fill(0)
  text('As questões tem que ser resolvidas NO MENOR TEMPO POSSIVEL, você recebe os pontos\nreferente ao tempo restante, CASO O TEMPO CHEGUE A 0 (ZERO) VOCÊ PERDE.\nEm algumas fase aparecerão 2 robos o RoboTime(Em verde, ele rouba o tempo) e\nRoboPontos(em vermelho, rouba os pontos). Lembrando que não há transição de tela\nentre as questões, então...\nSeja rápido :D\n\nCONTROLES:\nZ para pegar caixa do deposito para o caminhão.\nX para pegar do caminhão para o deposito.\nESPAÇO para verifica a resposta.\nS para ir para a próxima fase.\n\nPS: Os pontos só serão adicionados se você verificar a resposta!', 100, 80);
  stroke('grey');
  strokeWeight(1);
  textSize(18)
  fill(0)
  text('Pressione S para para começar.', 320, 500);
  if (keyCode == 83)
    cena = 1, sons[2].play()
}
function base() {
  //CONDIÇÕES
  if (keyCode == 90 && x >= 5 && x <= 195 && y < 360 && caixa == 0) //PEGA CAIXA - DEPOSITO
    caixa = 1, player = upc[1], sons[7].setVolume(0.6), sons[7].play()
  if (keyCode == 90 && x >= 705 && y <= 435 && caixa == 1) //SOLTA CAIXA - CAMINHÃO
    caixa = 0, q1++, player = right[1], sons[6].setVolume(0.6), sons[6].play()
  if (keyCode == 88 && x >= 705 && y <= 435 && caixa == 0 && q1 > 0) //PEGA CAIXA - CAMINHÃO
    caixa = 1, q1--, player = rightc[1], sons[7].play()
  if (keyCode == 88 && x >= 5 && x <= 195 && y < 360 && caixa == 1) //SOLTA CAIXA DEPOSITO
    caixa = 0, player = up[1], sons[6].play()

  //MOVIMENTO E ANIMAÇÕES
  if (keyIsDown(LEFT_ARROW) && x > 0) {
    x -= Speed //ESQUERDA COM LIMITE E CONTADOR DE FRAMES
    countframe++
    if (caixa == 0)
      player = right[FR]
    if (caixa == 1)
      player = rightc[FR]
  }
  if (keyIsDown(RIGHT_ARROW) && x < 730) {
    x += Speed //DIREITA COM LIMITE E CONTADOR DE FRAMES
    countframe++
    if (caixa == 0)
      player = left[FR]
    if (caixa == 1)
      player = leftc[FR]
  }
  if (keyIsDown(UP_ARROW) && y > 350) {
    y -= Speed //SUBINDO COM LIMITE E CONTADOR DE FRAMES
    countframe++
    if (caixa == 0)
      player = up[FR]
    if (caixa == 1)
      player = upc[FR]
  }
  if (keyIsDown(DOWN_ARROW) && y < 500) {
    y += Speed //DESCENDO COM LIMITE E CONTADOR DE FRAMES
    countframe++
    if (caixa == 0)
      player = down[FR]
    if (caixa == 1)
      player = downc[FR]
  }

  //////TEMPO E GAME OVER
  XP -= 1.5
  textSize(22)
  fill(255)
  stroke('grey')
  strokeWeight(3)
  rect(720, 93, 170, 37, 10) //SCORE
  rect(20, 93, 145, 37, 10) //TEMPO
  fill(0)
  strokeWeight(1)
  if (paint1 == 1)
    fill('red')
  if (paint1 == 0)
    fill(0)
  text('Pontos: ' + parseInt(pontos[stage]), 725, 118) //PRINT PONTOS
  fill(0)
  if (0 * XP == 0) { //VERIFICAR SE XP (OU TEMPO) E NUMERO
    if (paint0 == 1)
      fill(0, 255, 0)
    if (paint0 == 0)
      fill(0)
    text('Tempo: ' + parseInt(XP / 100), 26, 118)
  } else {
    fill(0)
    text('Tempo: STOP', 26, 118)
  }
  if (parseInt(XP / 100) == 0) //GAME OVER
    cena = 99


  ///////////////////INIMIGO//////////////////////////
  if (inimigoON == 1) { //SE INIMIGO ATIVO
    if (xi < x)
      xi += 2
    if (xi > x)
      xi -= 2
    if (yi > y)
      yi -= 1
    if (yi < y)
      yi += 1
    if (xi < 120 + x && xi > x - 90 && yi < 40 + y && yi > y - 60) //DANO
      XP -= 10.5, paint0 = 1
    else
      paint0 = 0
    dance0 = parseInt(random(xi + 25, xi + 65))
    dance1 = parseInt(random(xi + 25, xi + 65))
  }
  fill(255)
  ellipse(xi + 45, yi + 40, 40, 40) //CABEÇA
  rect(xi + 25, yi + 55, 40, 80) //CORPO
  ellipse(dance1, yi + 130, 15, 20) //PE
  ellipse(dance0, yi + 130, 15, 20) //PE
  if (xi < 160 + x && xi > x - 90)  //COR OLHO
    fill(0, 255, 0), paint0 = 1
  else
    fill(20)
  if (inimigoON == 0)  //INIMIGO DESATIIVADO
    fill('yellow'), dance0 = xi + 25, dance1 = xi + 65
  ellipse(xi + 45, yi + 40, 20, 20) //OLHO


  ///////////2° INIMIGO//////////////////
  if ((questaoatual >= 3 && questaoatual < 5) || (questaoatual > 6)) {
    if (inimigoON == 1) { //SE  ESTA INIMIGO ATIVO
      if (xi0 < x)
        xi0 += 4
      if (xi0 > x)
        xi0 -= 4
      if (yi0 > y)
        yi0 -= 4
      if (yi0 < y)
        yi0 += 4
      if (xi0 < 120 + x && xi0 > x - 90 && yi0 < 40 + y && yi0 > y - 60) //DANO NOS PONTOS
        pontos[stage] -= 0.1, paint1 = 1
      dance = parseInt(random(xi0 + 25, xi0 + 65)) //POSIÇÃO PE
      dance11 = parseInt(random(xi0 + 25, xi0 + 65)) //POSIÇÃO PE
    }

    fill(255)
    ellipse(xi0 + 45, yi0 + 40, 40, 40) //CABEÇA
    rect(xi0 + 25, yi0 + 55, 40, 80) //CORPO
    ellipse(dance11, yi0 + 130, 15, 20) //PE
    ellipse(dance, yi0 + 130, 15, 20) //PE
    if (xi0 < 160 + x && xi0 > x - 90) //COR OLHO
      fill('red')
    else
      fill(20), paint1 = 0
    if (inimigoON == 0) //INIMIGO DESATIVADO
      fill('yellow'), dance = xi0 + 25, dance11 = xi0 + 65
    ellipse(xi0 + 45, yi0 + 40, 20, 20) //OLHO
  }
  ///////////////////////////////////////////////////
  textSize(14)
  if (parseInt(pontos[stage]) < -100) {
    text('ALERT:', 700, 220)
    text('\nPONTOS EM ESTADO CRÍTICO!!', 610, 220)
  }

}
function design0() {
  background(bg);
  fill('grey');
  stroke('black');
  strokeWeight(1);
  if (q1 >= 10) //CIRCULO DO CONTADOR DO CAMINHÃO
    rect(838, 400, 70, 40, 6) //CIRCULO
  else
    rect(838, 400, 40, 40, 20) //QUADRADO

  fill('white')
  strokeWeight(5)
  stroke(255, 0, 0);
  rect(70, 11, 800, 65, 25); //'QUADRADO' NA QUESTÃO
  strokeWeight(1);
  fill(0);
  stroke(0);
  textSize(14)
  text('Caixas no\ncaminhão:', 823, 367)
  fill('blue')
  textSize(32)
  text(q1, 850, 430) //CONTADOR CAIXAS
  fill('black')
  textSize(16)
  text('Questão ', 80, 34)
  fill('red')

  if (questaoatual <= 9) //NUMERO DA QUESTÃO
    text('0' + questaoatual, 150, 34) //ADD ZERO
  else
    text(questaoatual, 150, 34) //SEM ZERO

  //PARA AS STRINGS DA FASE LOGO ABAIXO
  fill(0);
  strokeWeight(0)
  textSize(18)
}
function design1() {
  ////PENSAMENTO - ACERTO
  textSize(14)
  fill('white');
  strokeWeight(1)
  stroke('black');
  ellipse(x + 10, y + 10, 10, 10)
  ellipse(x + 10, y - 10, 12, 12)
  ellipse(x + 22, y - 20, 14, 14)
  strokeWeight(1);
  rect(x + 30, y - 35, 100, 20, 10);
  fill(0)
  stroke(0);
  text('CONSEGUI!!', x + 35, y - 20)
  textSize(32)
  text('PARABENS!!', 345, 259)
  textSize(14);
  strokeWeight(0)
  text('Pressione S para ir para a proxima fase.', 319, 278);
  if (sonsON == undefined) {
    sonsON = 1
    sons[4].setVolume(0.03)
    sons[0].stop()
    sons[1].setVolume(0.13);
    sons[1].play()
    pontos[stage] += parseInt(XP / 100)
    XP = 'STOP'
    inimigoON = 0
  };
}
function design2() {
  ///PENSAMENTO - ERRO
  time+=1.5
  textSize(14)
  fill('white');
  stroke('black')
  strokeWeight(1);
  ellipse(x + 10, y + 10, 10, 10)
  ellipse(x + 10, y - 10, 12, 12)
  ellipse(x + 22, y - 20, 14, 14)
  rect(x + 30, y - 55, 150, 50, 10)
  fill(0)
  text('ACHO QUE TEM\nALGUM DE ERRADO', x + 35, y - 37)
}
