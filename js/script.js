document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------
    // Lógica para o Menu Hamburguer (Mobile)
    // --------------------------------------------------------------------
    const btnMenuMobile = document.querySelector('.btn-menu-mobile');
    const linksNavegacao = document.querySelector('.links-navegacao');

    if (btnMenuMobile && linksNavegacao) {
        btnMenuMobile.addEventListener('click', () => {
            linksNavegacao.classList.toggle('active'); // Adiciona/remove a classe 'active'
            btnMenuMobile.querySelector('i').classList.toggle('bx-menu'); // Troca ícone para fechar
            btnMenuMobile.querySelector('i').classList.toggle('bx-x');    // Troca ícone para abrir
            // Adiciona ou remove aria-expanded para acessibilidade
            const isExpanded = btnMenuMobile.getAttribute('aria-expanded') === 'true' || false;
            btnMenuMobile.setAttribute('aria-expanded', !isExpanded);
        });

        // Fechar o menu ao clicar em um link (apenas em mobile)
        linksNavegacao.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (linksNavegacao.classList.contains('active')) {
                    linksNavegacao.classList.remove('active');
                    btnMenuMobile.querySelector('i').classList.remove('bx-x');
                    btnMenuMobile.querySelector('i').classList.add('bx-menu');
                    btnMenuMobile.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // --------------------------------------------------------------------
    // Lógica para o Acordeão (FAQ)
    // --------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.item-faq');

    faqItems.forEach(item => {
        const pergunta = item.querySelector('.pergunta-faq');
        const resposta = item.querySelector('.resposta-faq');

        pergunta.addEventListener('click', () => {
            // Verifica se a pergunta clicada já está aberta
            const isOpen = pergunta.getAttribute('aria-expanded') === 'true';

            // Fecha todas as outras perguntas abertas
            faqItems.forEach(otherItem => {
                const otherPergunta = otherItem.querySelector('.pergunta-faq');
                const otherResposta = otherItem.querySelector('.resposta-faq');
                if (otherPergunta !== pergunta && otherPergunta.getAttribute('aria-expanded') === 'true') {
                    otherPergunta.setAttribute('aria-expanded', 'false');
                    otherResposta.style.maxHeight = 0;
                    otherResposta.setAttribute('aria-expanded', 'false'); // Remove a classe para transição suave de padding/opacity
                    otherResposta.style.padding = '0 2rem'; // Redefine padding
                    otherResposta.style.opacity = 0;
                }
            });

            // Alterna a pergunta clicada
            pergunta.setAttribute('aria-expanded', !isOpen);
            resposta.setAttribute('aria-expanded', !isOpen); // Adiciona para a transição
            if (isOpen) {
                resposta.style.maxHeight = 0;
                resposta.style.padding = '0 2rem'; // Redefine padding
                resposta.style.opacity = 0;
            } else {
                // Define uma altura que seja maior que o conteúdo, mas com transição
                // Isso é um truque. A altura exata seria scrollHeight, mas complica a transição CSS.
                // Usar um valor grande com overflow hidden funciona para a maioria dos casos.
                resposta.style.maxHeight = resposta.scrollHeight + 'px'; // Ajusta a altura real do conteúdo
                resposta.style.padding = '1.5rem 2rem'; // Adiciona padding
                resposta.style.opacity = 1;
            }
        });
    });

    // --------------------------------------------------------------------
    // Lógica para Scroll Top Button (Botão Voltar ao Topo)
    // --------------------------------------------------------------------
    const btnTopo = document.createElement('a');
    btnTopo.href = '#inicio';
    btnTopo.classList.add('btn-topo');
    btnTopo.setAttribute('aria-label', 'Voltar ao topo');
    btnTopo.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    document.body.appendChild(btnTopo);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Mostra o botão após 300px de scroll
            btnTopo.classList.add('visivel');
        } else {
            btnTopo.classList.remove('visivel');
        }
    });

    // --------------------------------------------------------------------
    // Lógica para Adicionar Sombra na Navbar ao Rolar
    // --------------------------------------------------------------------
    const navbar = document.querySelector('.barra-navegacao');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adiciona sombra após 50px de scroll
            navbar.classList.add('rolada');
        } else {
            navbar.classList.remove('rolada');
        }
    });

    // --------------------------------------------------------------------
    // Lógica para Animação de Elementos ao Rolar (Scroll Reveal)
    // --------------------------------------------------------------------
    const elementosAnimar = document.querySelectorAll('.animar-ao-rolar, .secao h2, .texto-sobre, .card-servico, .card-integrante');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    }, {
        threshold: 0.1, // Elemento visível em 10% da viewport
        rootMargin: '0px 0px -100px 0px' // Começa a animar 100px antes de entrar totalmente
    });

    elementosAnimar.forEach(elemento => {
        observer.observe(elemento);
    });

    // Adiciona a classe 'animar-ao-rolar' a alguns elementos para garantir que o observer os encontre
    // (Pode ser feito diretamente no HTML, mas aqui garantimos que eles estão sendo observados)
    document.querySelectorAll('.conteudo-inicio, .inicio img').forEach(el => el.classList.add('animar-ao-rolar'));
});