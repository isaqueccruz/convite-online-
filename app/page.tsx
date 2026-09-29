"use client";

import { useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [conviteAberto, setConviteAberto] = useState(false);
  const [abrindoConvite, setAbrindoConvite] = useState(false);
  const [somLigado, setSomLigado] = useState(false);

  const [modalAberto, setModalAberto] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [presencaConfirmada, setPresencaConfirmada] = useState(false);

  // =========================================
  // ABRIR CONVITE
  // =========================================

  async function abrirConvite() {
    const video = videoRef.current;

    setAbrindoConvite(true);

    if (video) {
      try {
        video.muted = false;
        video.defaultMuted = false;
        video.volume = 1;

        await video.play();

        setSomLigado(true);
      } catch (error) {
        console.log("Áudio bloqueado pelo navegador:", error);
        setSomLigado(false);
      }
    }

    setTimeout(() => {
      setConviteAberto(true);
    }, 900);
  }

  // =========================================
  // SOM
  // =========================================

  function alternarSom() {
    const video = videoRef.current;

    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.defaultMuted = false;
      video.volume = 1;

      video.play().catch(() => {});

      setSomLigado(true);
    } else {
      video.muted = true;

      setSomLigado(false);
    }
  }

  // =========================================
  // FECHAR MODAL
  // =========================================

  function fecharModal() {
    setModalAberto(null);
  }

  // =========================================
  // CONFIRMAR PRESENÇA
  // =========================================

  function confirmarPresenca() {
    if (!nome.trim()) {
      alert("Digite seu nome.");
      return;
    }

    const numeroWhatsApp = "5571992580989";

    const mensagem =
      `Olá! Gostaria de confirmar minha presença no aniversário do Arthur.\n\n` +
      `Nome: ${nome}\n` +
      `Quantidade de pessoas: ${quantidade}`;

    const url =
      `https://wa.me/${numeroWhatsApp}?text=` +
      encodeURIComponent(mensagem);

    setPresencaConfirmada(true);

    setTimeout(() => {
      window.open(url, "_blank");
    }, 800);
  }

  // =========================================
  // CONFIRMAÇÃO
  // =========================================

  function abrirConfirmacao() {
    setPresencaConfirmada(false);
    setModalAberto("confirmar");
  }

  return (
    <main className="convite">

      {/* =====================================
          1 — VÍDEO DE FUNDO
      ===================================== */}

      <video
        ref={videoRef}
        className="video-fundo"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="/video/convite.mp4"
          type="video/mp4"
        />
      </video>


      {/* =====================================
          ESCURECIMENTO SUAVE
      ===================================== */}

      <div className="video-overlay" />


      {/* =====================================
          TELA DE ENTRADA
      ===================================== */}

      {!conviteAberto && (
        <section
          className={`tela-inicial ${
            abrindoConvite ? "tela-inicial-saindo" : ""
          }`}
        >

          <div className="intro">

            <span className="intro-pequeno">
              UM CONVITE ESPECIAL
            </span>

            <h1>ARTHUR</h1>

            <span className="intro-idade">
              3 ANOS
            </span>

            <p>
              Você está convidado!
            </p>

          </div>


          <button
            type="button"
            className="botao-entrar"
            onClick={abrirConvite}
          >
            VER CONVITE
          </button>

        </section>
      )}


      {/* =====================================
          CONVITE
      ===================================== */}

      {conviteAberto && (
        <section className="convite-interface">
          <div className="transicao-ondas" />

          {/* =================================
              2 — CAMADA DO CONVITE
          ================================= */}

          <div className="camada-convite">

  {/* SUA ARTE */}
  <img
    src="/imagens/convite-arte.png"
    alt="Arte do convite de aniversário"
    className="arte-convite"
  />

  {/* TEXTOS SOBRE A ARTE */}
  <div className="conteudo-arte">

    <span className="convite-mini">
      VOCÊ É NOSSO CONVIDADO
    </span>

    <h1>
      ARTHUR
    </h1>

    <div className="idade">
      3 anos
    </div>

    <p>
      Você é nosso convidado especial
      <br />
      para essa grande aventura!
    </p>

    <div className="data-evento">

      <div className="dia-semana">
        TERÇA
      </div>

      <div className="numero-data">
        10
      </div>

      <div className="horario">
        ÀS 19:00
      </div>

      <div className="mes">
        NOVEMBRO
      </div>

    </div>

  </div>

</div>


          {/* =================================
              3 — BOTÕES INTERATIVOS
          ================================= */}

          <div className="botoes-interativos">

            {/* LOCAL */}

            <button
              type="button"
              className="botao-interativo"
              onClick={() =>
                setModalAberto("local")
              }
            >
              <div className="icone-botao">
                📍
              </div>

              <span>
                LOCAL DA
                <br />
                FESTA
              </span>
            </button>


            {/* CONFIRMAR */}

            <button
              type="button"
              className="botao-interativo"
              onClick={abrirConfirmacao}
            >
              <div className="icone-botao">
                📅
              </div>

              <span>
                CONFIRMAR
                <br />
                PRESENÇA
              </span>
            </button>


            {/* PRESENTE */}

            <button
              type="button"
              className="botao-interativo"
              onClick={() =>
                setModalAberto("presente")
              }
            >
              <div className="icone-botao">
                🎁
              </div>

              <span>
                SUGESTÃO
                <br />
                DE PRESENTE
              </span>
            </button>

          </div>


          {/* AVISO */}

          <div className="aviso-confirmacao">
            CONFIRMAR PRESENÇA ATÉ DIA 20/06
          </div>


          {/* SOM */}

          <button
            type="button"
            className="botao-som"
            onClick={alternarSom}
            aria-label="Ativar ou desativar som"
          >
            {somLigado ? "🔊" : "🔇"}
          </button>

        </section>
      )}


      {/* =====================================
          MODAIS
      ===================================== */}

      {modalAberto && (

        <div
          className="modal-fundo"
          onClick={fecharModal}
        >

          <div
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================
                LOCAL
            ================================= */}

            {modalAberto === "local" && (
              <>

                <div className="modal-icone">
                  📍
                </div>

                <span className="modal-mini">
                  LOCAL DA FESTA
                </span>

                <h2>
                  Onde será?
                </h2>

                <p className="modal-texto">
                  Estamos preparando tudo para
                  receber você.
                </p>

                <div className="informacao">
                  <strong>📅 DATA</strong>

                  <span>
                    10 de novembro de 2026
                  </span>
                </div>

                <div className="informacao">
                  <strong>🕐 HORÁRIO</strong>

                  <span>
                    19:00 horas
                  </span>
                </div>

                <div className="informacao">
                  <strong>📍 LOCAL</strong>

                  <span>
                    Space A
                  </span>
                </div>

                <div className="informacao">
                  <strong>📌 ENDEREÇO</strong>

                  <span>
                    Rua Pituaçu, 35
                    <br />
                    São Marcos,
                    Salvador - BA
                  </span>
                </div>

                <button
                  type="button"
                  className="botao-mapa"
                  onClick={() => {
                    window.open(
                      "https://www.google.com/maps/search/?api=1&query=Space+A%2C+Rua+Pituaçu%2C+35%2C+São+Marcos%2C+Salvador%2C+Bahia%2C+Brasil",
                      "_blank"
                    );
                  }}
                >
                  ABRIR NO GOOGLE MAPS
                </button>

                <button
                  type="button"
                  className="botao-fechar"
                  onClick={fecharModal}
                >
                  FECHAR
                </button>

              </>
            )}


            {/* =================================
                CONFIRMAR
            ================================= */}

            {modalAberto === "confirmar" && (

              !presencaConfirmada ? (

                <>

                  <div className="modal-icone">
                    🎉
                  </div>

                  <span className="modal-mini">
                    CONFIRMAÇÃO
                  </span>

                  <h2>
                    Você vem?
                  </h2>

                  <p className="modal-texto">
                    Confirme sua presença
                    para celebrarmos juntos.
                  </p>

                  <div className="campo">

                    <label htmlFor="nome">
                      SEU NOME
                    </label>

                    <input
                      id="nome"
                      type="text"
                      placeholder="Digite seu nome"
                      value={nome}
                      onChange={(event) =>
                        setNome(event.target.value)
                      }
                    />

                  </div>


                  <div className="campo">

                    <label htmlFor="quantidade">
                      QUANTIDADE DE PESSOAS
                    </label>

                    <select
                      id="quantidade"
                      value={quantidade}
                      onChange={(event) =>
                        setQuantidade(
                          event.target.value
                        )
                      }
                    >

                      <option value="1">
                        1 pessoa
                      </option>

                      <option value="2">
                        2 pessoas
                      </option>

                      <option value="3">
                        3 pessoas
                      </option>

                      <option value="4">
                        4 pessoas
                      </option>

                      <option value="5">
                        5 pessoas
                      </option>

                      <option value="6">
                        6 pessoas
                      </option>

                    </select>

                  </div>


                  <button
                    type="button"
                    className="botao-confirmar"
                    onClick={confirmarPresenca}
                  >
                    CONFIRMAR PRESENÇA
                  </button>


                  <button
                    type="button"
                    className="botao-fechar"
                    onClick={fecharModal}
                  >
                    FECHAR
                  </button>

                </>

              ) : (

                <>

                  <div className="sucesso-icone">
                    ✓
                  </div>

                  <span className="modal-mini">
                    TUDO CERTO!
                  </span>

                  <h2>
                    Presença confirmada
                  </h2>

                  <p className="modal-texto">
                    Obrigado, {nome}! 🎉
                  </p>

                  <div className="informacao">

                    <strong>
                      👤 NOME
                    </strong>

                    <span>
                      {nome}
                    </span>

                  </div>

                  <div className="informacao">

                    <strong>
                      👥 CONVIDADOS
                    </strong>

                    <span>
                      {quantidade} pessoa(s)
                    </span>

                  </div>

                  <button
                    type="button"
                    className="botao-fechar"
                    onClick={fecharModal}
                  >
                    CONTINUAR
                  </button>

                </>

              )

            )}


            {/* =================================
                PRESENTE
            ================================= */}

            {modalAberto === "presente" && (

              <>

                <div className="modal-icone">
                  🎁
                </div>

                <span className="modal-mini">
                  COM CARINHO
                </span>

                <h2>
                  Um presente?
                </h2>

                <p className="modal-texto">
                  Sua presença já é o maior
                  presente.
                  <br />
                  Mas, se quiser presentear,
                  deixamos as informações aqui.
                </p>

                <div className="presente-card">

                  <div className="presente-card-icone">
                    🎁
                  </div>

                  <div>

                    <strong>
                      OPÇÃO DE PRESENTE
                    </strong>

                    <span>
                      Informações em breve
                    </span>

                  </div>

                </div>

                <div className="presente-card">

                  <div className="presente-card-icone">
                    💚
                  </div>

                  <div>

                    <strong>
                      SUA PRESENÇA
                    </strong>

                    <span>
                      É o que realmente importa!
                    </span>

                  </div>

                </div>

                <button
                  type="button"
                  className="botao-fechar"
                  onClick={fecharModal}
                >
                  VOLTAR
                </button>

              </>

            )}

          </div>

        </div>

      )}

    </main>
  );
}