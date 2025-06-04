// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

  const barraNavegacao = document.querySelector('.barra-navegacao'); // Navbar
  const btnMenuMobile = document.querySelector('.btn-menu-mobile'); // Botão hamburguer
  const linksNavegacao = document.querySelector('.links-navegacao'); // Lista de links
  const btnTopo = document.querySelector('.btn-topo'); // Botão "Voltar ao Topo"
  const perguntasFaq = document.querySelectorAll('.pergunta-faq'); // Botões de pergunta do FAQ
  const formDoacao = document.getElementById('form-doacao'); // Formulário de Doação
  const formContato = document.getElementById('form-contato'); // Formulário de Contato

  // Seleciona todos os elementos que terão animação ao rolar
  const elementosAnimar = document.querySelectorAll('.secao h2, .texto-sobre, .card-servico, .card-integrante, #form-contato, #form-doacao');


  // -------------------------------------------------------------------
  // EFEITO DE SCROLL NA BARRA DE NAVEGAÇÃO - Adiciona/remove sombra
  // -------------------------------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Se a página for rolada mais de 50 pixels
      barraNavegacao.classList.add('rolada'); // Adiciona a classe 'rolada' (para aplicar sombra)
    } else {
      barraNavegacao.classList.remove('rolada'); // Remove a classe 'rolada' se estiver no topo
    }
  });


  // -------------------------------------------------------------------
  // MENU MOBILE (HAMBURGUER) - Abre e fecha
  // -------------------------------------------------------------------
  if (btnMenuMobile && linksNavegacao) {
    btnMenuMobile.addEventListener('click', () => {
      // Alterna a classe 'menu-aberto' na lista de links
      linksNavegacao.classList.toggle('menu-aberto');
      // Altera o ícone do botão: 'bx-x' (X) para fechar, 'bx-menu' (hamburguer) para abrir
      const icone = btnMenuMobile.querySelector('i');
      if (linksNavegacao.classList.contains('menu-aberto')) {
        icone.classList.remove('bx-menu');
        icone.classList.add('bx-x');
        btnMenuMobile.setAttribute('aria-label', 'Fechar menu');
      } else {
        icone.classList.remove('bx-x');
        icone.classList.add('bx-menu');
        btnMenuMobile.setAttribute('aria-label', 'Abrir menu');
      }
    });

    // Fecha o menu mobile quando um link é clicado
    linksNavegacao.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (linksNavegacao.classList.contains('menu-aberto')) {
          linksNavegacao.classList.remove('menu-aberto');
          const icone = btnMenuMobile.querySelector('i');
          icone.classList.remove('bx-x');
          icone.classList.add('bx-menu');
          btnMenuMobile.setAttribute('aria-label', 'Abrir menu');
        }
      });
    });
  }


  // -------------------------------------------------------------------
  // BOTÃO "VOLTAR AO TOPO" - Mostra/esconde e rola suavemente
  // -------------------------------------------------------------------
  if (btnTopo) {
    // Mostra/esconde o botão conforme a posição do scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) { // Se a página for rolada mais de 400 pixels
        btnTopo.classList.add('visivel'); // Adiciona a classe 'visivel' para torná-lo visível (com fade-in)
      } else {
        btnTopo.classList.remove('visivel'); // Remove a classe 'visivel' para escondê-lo (com fade-out)
      }
    });

    // Rolagem suave ao topo ao clicar no botão
    btnTopo.addEventListener('click', e => {
      e.preventDefault(); // Previne o comportamento padrão do link (salto instantâneo)
      window.scrollTo({
        top: 0, // Rola para o topo da página
        behavior: 'smooth' // Ativa a rolagem suave
      });
    });
  }


  // -------------------------------------------------------------------
  // FAQ (PERGUNTAS FREQUENTES) - Abre/fecha respostas e fecha as outras
  // -------------------------------------------------------------------
  perguntasFaq.forEach(pergunta => {
    pergunta.addEventListener('click', () => {
      const itemFaq = pergunta.parentElement; // Pega o elemento pai (o '.item-faq')
      // Verifica se o item clicado já está aberto (atributo 'aria-expanded' é 'true')
      const estaAberta = itemFaq.getAttribute('aria-expanded') === 'true';

      // Fecha todas as outras respostas abertas (melhora a usabilidade)
      perguntasFaq.forEach(p => {
        const outroItemFaq = p.parentElement; // Pega o item FAQ pai de cada pergunta
        // Se não for o item clicado atualmente E se estiver aberto
        if (outroItemFaq !== itemFaq && outroItemFaq.getAttribute('aria-expanded') === 'true') {
          outroItemFaq.setAttribute('aria-expanded', 'false'); // Fecha-o
        }
      });

      // Alterna o estado do item clicado
      if (estaAberta) {
        itemFaq.setAttribute('aria-expanded', 'false'); // Se estava aberta, fecha
      } else {
        itemFaq.setAttribute('aria-expanded', 'true'); // Se estava fechada, abre
      }
    });
  });


  // -------------------------------------------------------------------
  // ANIMAÇÃO DE ELEMENTOS AO ROLAR (Intersection Observer)
  // -------------------------------------------------------------------
  // Cria um novo Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { // Se o elemento estiver visível na tela
        entry.target.classList.add('visivel'); // Adiciona a classe 'visivel' para disparar a animação
        observer.unobserve(entry.target); // Deixa de observar o elemento após a animação
      }
    });
  }, {
    threshold: 0.1, // A animação dispara quando 10% do elemento está visível
    rootMargin: '0px 0px -100px 0px' // Começa a observar um pouco antes de o elemento entrar totalmente na viewport
  });

  // Observa cada elemento que deve ser animado
  elementosAnimar.forEach(elemento => {
    observer.observe(elemento);
  });


  // -------------------------------------------------------------------
  // VALIDAÇÃO E REDIRECIONAMENTO DO FORMULÁRIO DE DOAÇÃO
  // -------------------------------------------------------------------
  if (formDoacao) {
    formDoacao.addEventListener('submit', e => {
      e.preventDefault();

      const nome = formDoacao['nome-doacao'].value.trim(); // ID do campo 'nome-doacao'
      const email = formDoacao['email-doacao'].value.trim(); // ID do campo 'email-doacao'
      const tipo = formDoacao['tipo-doacao'].value; // ID do select 'tipo-doacao'
      const valor = formDoacao['valor-doacao'].value.trim(); // ID do campo 'valor-doacao'

      if (!nome || !email || !tipo || !valor) {
        alert('Por favor, preencha todos os campos antes de prosseguir com a doação.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
      }

      const valorNumerico = parseFloat(valor.replace(',', '.')); // Lida com vírgula como separador decimal
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        alert('Por favor, insira um valor de doação válido (apenas números e maior que zero).');
        return;
      }

      // Se todas as validações passarem, redireciona
      window.location.href = 'pagamento.html';
    });
  }

  // -------------------------------------------------------------------
  // VALIDAÇÃO SIMPLES DO FORMULÁRIO DE CONTATO (apenas um alert)
  // -------------------------------------------------------------------
  if (formContato) {
    formContato.addEventListener('submit', e => {
      e.preventDefault();

      const nome = formContato['nome-contato'].value.trim(); // ID do campo 'nome-contato'
      const email = formContato['email-contato'].value.trim(); // ID do campo 'email-contato'
      const mensagem = formContato['mensagem-contato'].value.trim(); // ID do campo 'mensagem-contato'

      if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos do formulário de contato.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
      }

      // Simula o envio
      alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      formContato.reset(); // Limpa o formulário
    });
  }

}); // Fim do DOMContentLoaded