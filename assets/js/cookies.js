// ============================================================
// Cookieconsent v3 — Reatei (PT-BR)
// Docs: https://cookieconsent.orestbida.com/
// ============================================================

window.addEventListener('load', function () {
  CookieConsent.run({

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        enabled: false,
        autoClear: {
          cookies: [
            { name: /^_ga/ },
            { name: '_gid' },
          ],
        },
      },
      marketing: {
        enabled: false,
      },
    },

    guiOptions: {
      consentModal: {
        layout: 'box inline',
        position: 'bottom right',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    language: {
      default: 'pt',
      translations: {
        pt: {
          consentModal: {
            title: 'Usamos cookies',
            description:
              'Este site usa cookies para garantir o funcionamento e, com sua autorização, ' +
              'medir audiência. Você pode aceitar, recusar ou personalizar.',
            acceptAllBtn: 'Aceitar todos',
            acceptNecessaryBtn: 'Só essenciais',
            showPreferencesBtn: 'Personalizar',
            footer: '<a href="/privacy">Política de Privacidade</a>',
          },
          preferencesModal: {
            title: 'Preferências de cookies',
            acceptAllBtn: 'Aceitar todos',
            acceptNecessaryBtn: 'Só essenciais',
            savePreferencesBtn: 'Salvar preferências',
            closeIconLabel: 'Fechar',
            sections: [
              {
                title: 'Uso de cookies',
                description:
                  'Cookies essenciais são sempre carregados. Os demais só ativam mediante seu consentimento explícito.',
              },
              {
                title: 'Cookies estritamente necessários',
                description:
                  'Indispensáveis para o funcionamento básico do site. Não podem ser desativados.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Cookies de análise',
                description:
                  'Ajudam a entender como os visitantes interagem com o site (Google Analytics). Dados anonimizados.',
                linkedCategory: 'analytics',
              },
              {
                title: 'Cookies de marketing',
                description:
                  'Usados para exibir anúncios mais relevantes e medir campanhas. Desativados por padrão.',
                linkedCategory: 'marketing',
              },
              {
                title: 'Mais informações',
                description:
                  'Dúvidas sobre nossa política? <a href="/contact">Entre em contato</a>.',
              },
            ],
          },
        },
      },
    },
  });
});
