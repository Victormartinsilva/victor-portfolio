# Importações necessárias para a aplicação Flask
from flask import Flask, render_template, send_from_directory, request, flash, redirect, url_for  # Flask: framework web, render_template: renderiza templates HTML, send_from_directory: serve arquivos estáticos
import os  # Módulo para operações do sistema operacional
from datetime import datetime  # Para trabalhar com datas e horários

# Criação da instância da aplicação Flask
# __name__ indica o módulo atual como ponto de partida da aplicação
app = Flask(__name__)
# Chave secreta para sessões e formulários (necessária para flash messages)
app.secret_key = 'sua_chave_secreta_aqui_mude_em_producao'

# Rota principal da aplicação (página inicial)
# O decorator @app.route('/') define que esta função será executada quando alguém acessar a URL raiz do site
@app.route('/')
def index():
    """
    Função que processa a página inicial do portfólio.
    Retorna a página HTML com os dados do perfil e projetos.
    """
    
    # Dicionário contendo as informações do perfil do usuário - DADOS REAIS
    # Estes dados serão enviados para o template HTML e exibidos na página
    perfil = {
        'nome': 'Victor Martins da Silva',             # Nome completo
        'nivel': 35,                                   # Nível do "personagem" (conceito de gamificação)
        'xp': 2800,                                    # Experiência atual (pontos de experiência)
        'xp_max': 3500,                               # Experiência máxima para o próximo nível
        'titulo': 'Analista de Dados & Engenheiro Agrícola',  # Título profissional atual na EICON
        'sobre': 'Engenheiro Agrícola formado pela UNIOESTE com especialização em análise de dados e agricultura de precisão. Atualmente trabalho na EICON como Analista de Suporte exercendo função de Analista de Dados (desde Out/2024). Experiência sólida em pesquisa científica (CNPq), desenvolvimento industrial (FK Steel), agricultura de precisão (Unimaq-John Deere) e análise de dados. Domino Python, R, SQL, Power BI, QGIS, SolidWorks e metodologias de melhoria contínua, com foco em automação e otimização de processos.',
        'anos_experiencia': 7,                         # Anos de experiência (2017-2024)
        'projetos_concluidos': 30,                     # Número de projetos finalizados
        'tecnologias_dominadas': 16                    # Número de tecnologias que domina
    }
    
    # Dicionário com links de contato e redes sociais - DADOS REAIS
    contatos = {
        'email': 'victoreagri@gmail.com',              # Email real do currículo
        'linkedin': 'https://www.linkedin.com/in/victor-martins-da-silva-a111ba190/',
        'github': 'https://github.com/Victormartinsilva',
        'whatsapp': 'https://wa.me/5545999225862',
        'telefone': '+55 (45) 99922-5862',             # Telefone real do currículo
        'localizacao': 'São Paulo - SP, Brasil'        # Localização atual real
    }
    
    # Dicionário com informações educacionais - DADOS REAIS
    educacao = {
        'pos_graduacao': {
            'curso': 'Pós-graduação em Engenharia de Software',
            'instituicao': 'Faculdade Metropolitana de Franca - FAMEEF',
            'ano': '2023-2024',
            'status': 'Concluído',
            'icone': '🎓'
        },
        'graduacao': {
            'curso': 'Engenharia Agrícola',
            'instituicao': 'Universidade Estadual do Oeste do Paraná - UNIOESTE',  # Instituição real
            'ano': '2017-2023',                         # Período real do currículo
            'status': 'Concluído',
            'icone': '🌾'
        },
        'cursos_alura': [
            'Análise de gestão de processos: implantando melhorias',
            'Bizagi: Mapeamento de processos com BPMN',
            'SCRUM: agilidade em seu projeto',
            'Ferramentas para agilidade: controle de projetos e produtos',
            'Excel: Domine o editor de planilhas',
            'Funções com excel: operações matemáticas e filtros',
            'Power BI Desktop: construindo meu primeiro dashboard',
            'Dashboard com Power BI: visualizando dados',
            'Power BI Desktop: tratamento de dados no Power Query',
            'Power BI: Explorando recursos visuais',
            'Python: começando com a linguagem',
            'Estatística com Python: frequência e medidas',
            'Microsoft SQL Server 2022: conhecendo SQL'
        ]
    }
    
    # Nova seção: Experiência Profissional - DADOS REAIS DO CURRÍCULO
    experiencias = [
        {
            'cargo': 'Analista de Suporte / Analista de Dados',
            'empresa': 'EICON',
            'periodo': 'Out 2024 - Atual',
            'descricao': 'Análise de dados para identificar oportunidades e melhorias. Suporte técnico especializado e otimização de processos.',
            'icone': '📊',
            'atual': True
        },
        {
            'cargo': 'Analista de Agricultura de Precisão',
            'empresa': 'Unimaq - John Deere',
            'periodo': 'Out 2023 - Out 2024',
            'descricao': 'Apoio técnico no atendimento aos clientes, análise de dados para identificar oportunidades, problemas recorrentes e prospectar novos serviços de maneira proativa.',
            'icone': '🚜',
            'atual': False
        },
        {
            'cargo': 'Auxiliar de Programação de PCP',
            'empresa': 'FK Steel',
            'periodo': 'Fev 2023 - Jun 2023',
            'descricao': 'Programação CNC (LANTEK, Nesting), controle de produção, criação de dashboards e análise de dados de custos, produtividade e perdas.',
            'icone': '⚙️',
            'atual': False
        },
        {
            'cargo': 'Estagiário de Projetos',
            'empresa': 'FK Steel',
            'periodo': 'Out 2022 - Fev 2023',
            'descricao': 'Criação de projetos de equipamentos metálicos para armazenamento agrícola em SolidWorks, detalhamento de peças e documentação técnica.',
            'icone': '🏗️',
            'atual': False
        },
        {
            'cargo': 'Pesquisador Científico - Bolsista',
            'empresa': 'CNPq',
            'periodo': 'Ago 2017 - Mai 2019',
            'descricao': 'Análise geoestatística de variáveis georreferenciadas utilizando R, MySQL e QGIS. Tratamento de dados, filtros estatísticos e geração de mapas temáticos.',
            'icone': '🔬',
            'atual': False
        }
    ]
    
    # Lista contendo os projetos que serão exibidos no portfólio - BASEADOS NO CURRÍCULO REAL
    # Cada projeto é um dicionário com nome, tecnologia, ícone, descrição e link
    projetos = [
        {
            'nome': 'Análise Geoestatística CNPq', 
            'tecnologia': 'R & QGIS & MySQL', 
            'icone': '🌾',
            'descricao': 'Pesquisa científica para análise espacial de grande volume de dados agrícolas, utilizando parâmetros como produtividade, macronutrientes e compactação do solo. Aplicação de filtros estatísticos e geração de mapas temáticos.',
            'link': 'https://github.com/Victormartinsilva/analise-geoestatistica-cnpq',
            'tipo': 'github'
        },
        {
            'nome': 'Projetos Industriais FK Steel', 
            'tecnologia': 'SolidWorks & AutoCAD', 
            'icone': '🏗️',
            'descricao': 'Desenvolvimento de projetos de equipamentos metálicos para armazenamento agrícola, detalhamento de peças, quantidades e fases de fabricação.',
            'link': 'https://github.com/Victormartinsilva/projetos-fk-steel',
            'tipo': 'github'
        },
        {
            'nome': 'Sistema de Controle PCP', 
            'tecnologia': 'Excel & Power BI', 
            'icone': '📊',
            'descricao': 'Dashboards para controle de produção, análise de custos, produtividade, matérias-primas e perdas. Implementação de metodologias 5S.',
            'link': 'https://github.com/Victormartinsilva/sistema-pcp',
            'tipo': 'github'
        },
        {
            'nome': 'Programação CNC Automatizada', 
            'tecnologia': 'LANTEK & Nesting', 
            'icone': '⚙️',
            'descricao': 'Programação CNC otimizada para melhor aproveitamento de matéria-prima, geração de ordens de fabricação e controle de estoque.',
            'link': 'https://github.com/Victormartinsilva/programacao-cnc',
            'tipo': 'github'
        },
        {
            'nome': 'Análises Agricultura de Precisão', 
            'tecnologia': 'Python & SQL', 
            'icone': '🚜',
            'descricao': 'Análise de dados para identificar oportunidades na agricultura de precisão, diagnóstico de problemas recorrentes e prospecção de novos serviços.',
            'link': 'https://github.com/Victormartinsilva/agricultura-precisao',
            'tipo': 'github'
        },
        {
            'nome': 'Portfólio Interativo', 
            'tecnologia': 'Flask & Python', 
            'icone': '🎮',
            'descricao': 'Portfólio web interativo desenvolvido com Flask, apresentando experiências profissionais e competências de forma dinâmica e responsiva.',
            'link': 'https://github.com/Victormartinsilva/pixel-portfolio',
            'tipo': 'github'
        }
    ]
    
    # Renderiza o template HTML 'index.html' e passa os dados para ele
    # O template poderá acessar essas variáveis usando a sintaxe do Jinja2: {{ variavel }}
    return render_template('index.html', perfil=perfil, projetos=projetos, contatos=contatos, educacao=educacao, experiencias=experiencias)

# Rota para acessar a versão backup (layout tradicional)
@app.route('/backup')
def backup():
    """
    Função que renderiza a versão backup do portfólio (layout tradicional).
    Usa os mesmos dados atualizados da versão principal.
    """
    # Dados atualizados da versão principal
    perfil = {
        'nome': 'Victor Martins da Silva',
        'nivel': 35,
        'xp': 2800,
        'xp_max': 3500,
        'titulo': 'Analista de Dados & Engenheiro Agrícola',
        'sobre': 'Engenheiro Agrícola formado pela UNIOESTE com especialização em análise de dados e agricultura de precisão. Atualmente trabalho na EICON como Analista de Suporte exercendo função de Analista de Dados (desde Out/2024). Experiência sólida em pesquisa científica (CNPq), desenvolvimento industrial (FK Steel), agricultura de precisão (Unimaq-John Deere) e análise de dados. Domino Python, R, SQL, Power BI, QGIS, SolidWorks e metodologias de melhoria contínua, com foco em automação e otimização de processos.',
        'anos_experiencia': 7,
        'projetos_concluidos': 30,
        'tecnologias_dominadas': 16
    }
    
    contatos = {
        'email': 'victoreagri@gmail.com',
        'linkedin': 'https://www.linkedin.com/in/victor-martins-da-silva-a111ba190/',
        'github': 'https://github.com/Victormartinsilva',
        'whatsapp': 'https://wa.me/5545999225862',
        'telefone': '+55 (45) 99922-5862',
        'localizacao': 'São Paulo - SP, Brasil'
    }
    
    projetos = [
        {
            'nome': 'Análise Geoestatística CNPq', 
            'tecnologia': 'R & QGIS & MySQL', 
            'icone': '🌾',
            'descricao': 'Pesquisa científica para análise espacial de grande volume de dados agrícolas, utilizando parâmetros como produtividade, macronutrientes e compactação do solo.',
            'link': 'https://github.com/Victormartinsilva/analise-geoestatistica-cnpq',
            'tipo': 'github'
        },
        {
            'nome': 'Projetos Industriais FK Steel', 
            'tecnologia': 'SolidWorks & AutoCAD', 
            'icone': '🏗️',
            'descricao': 'Desenvolvimento de projetos de equipamentos metálicos para armazenamento agrícola, detalhamento de peças e documentação técnica.',
            'link': 'https://github.com/Victormartinsilva/projetos-fk-steel',
            'tipo': 'github'
        },
        {
            'nome': 'Sistema de Controle PCP', 
            'tecnologia': 'Excel & Power BI', 
            'icone': '📊',
            'descricao': 'Dashboards para controle de produção, análise de custos, produtividade, matérias-primas e perdas com metodologias 5S.',
            'link': 'https://github.com/Victormartinsilva/sistema-pcp',
            'tipo': 'github'
        },
        {
            'nome': 'Programação CNC Automatizada', 
            'tecnologia': 'LANTEK & Nesting', 
            'icone': '⚙️',
            'descricao': 'Programação CNC otimizada para melhor aproveitamento de matéria-prima e controle de produção industrial.',
            'link': 'https://github.com/Victormartinsilva/programacao-cnc',
            'tipo': 'github'
        },
        {
            'nome': 'Análises Agricultura de Precisão', 
            'tecnologia': 'Python & SQL', 
            'icone': '🚜',
            'descricao': 'Análise de dados para agricultura de precisão, diagnóstico de problemas e prospecção de novos serviços.',
            'link': 'https://github.com/Victormartinsilva/agricultura-precisao',
            'tipo': 'github'
        },
        {
            'nome': 'Portfólio Interativo', 
            'tecnologia': 'Flask & Python', 
            'icone': '🎮',
            'descricao': 'Portfólio web interativo com experiências profissionais e competências apresentadas de forma dinâmica.',
            'link': 'https://github.com/Victormartinsilva/pixel-portfolio',
            'tipo': 'github'
        }
    ]
    
    # Dicionário com informações educacionais atualizadas
    educacao = {
        'pos_graduacao': {
            'curso': 'Pós-graduação em Engenharia de Software',
            'instituicao': 'Faculdade Metropolitana de Franca - FAMEEF',
            'ano': '2023-2024',
            'status': 'Concluído',
            'icone': '🎓'
        },
        'graduacao': {
            'curso': 'Engenharia Agrícola',
            'instituicao': 'Universidade Estadual do Oeste do Paraná - UNIOESTE',
            'ano': '2017-2023',
            'status': 'Concluído',
            'icone': '🌾'
        },
        'cursos_alura': [
            'Análise de gestão de processos: implantando melhorias',
            'Bizagi: Mapeamento de processos com BPMN',
            'SCRUM: agilidade em seu projeto',
            'Ferramentas para agilidade: controle de projetos e produtos',
            'Excel: Domine o editor de planilhas',
            'Funções com excel: operações matemáticas e filtros',
            'Power BI Desktop: construindo meu primeiro dashboard',
            'Dashboard com Power BI: visualizando dados',
            'Power BI Desktop: tratamento de dados no Power Query',
            'Power BI: Explorando recursos visuais',
            'Python: começando com a linguagem',
            'Estatística com Python: frequência e medidas',
            'Microsoft SQL Server 2022: conhecendo SQL'
        ]
    }
    
    # Experiências para versão backup também
    experiencias = [
        {
            'cargo': 'Analista de Suporte / Analista de Dados',
            'empresa': 'EICON',
            'periodo': 'Out 2024 - Atual',
            'descricao': 'Análise de dados para identificar oportunidades e melhorias. Suporte técnico especializado e otimização de processos.',
            'icone': '📊',
            'atual': True
        },
        {
            'cargo': 'Analista de Agricultura de Precisão',
            'empresa': 'Unimaq - John Deere',
            'periodo': 'Out 2023 - Out 2024',
            'descricao': 'Apoio técnico no atendimento aos clientes, análise de dados para identificar oportunidades e prospectar novos serviços.',
            'icone': '🚜',
            'atual': False
        },
        {
            'cargo': 'Auxiliar de Programação de PCP',
            'empresa': 'FK Steel',
            'periodo': 'Fev 2023 - Jun 2023',
            'descricao': 'Programação CNC, controle de produção, dashboards de análise e metodologias de melhoria contínua.',
            'icone': '⚙️',
            'atual': False
        },
        {
            'cargo': 'Estagiário de Projetos',
            'empresa': 'FK Steel',
            'periodo': 'Out 2022 - Fev 2023',
            'descricao': 'Projetos de equipamentos metálicos em SolidWorks e documentação técnica completa.',
            'icone': '🏗️',
            'atual': False
        },
        {
            'cargo': 'Pesquisador Científico - Bolsista',
            'empresa': 'CNPq',
            'periodo': 'Ago 2017 - Mai 2019',
            'descricao': 'Análise geoestatística com R, MySQL e QGIS. Tratamento de dados e geração de mapas temáticos.',
            'icone': '🔬',
            'atual': False
        }
    ]
    
    # Renderizar template backup com dados atualizados
    return render_template('index_backup.html', perfil=perfil, projetos=projetos, contatos=contatos, educacao=educacao, experiencias=experiencias)

# Rota para processar formulário de contato
@app.route('/contato', methods=['POST'])
def processar_contato():
    """
    Função que processa o formulário de contato.
    Recebe os dados via POST e pode enviar email ou salvar em arquivo.
    """
    try:
        # Captura os dados do formulário
        nome = request.form.get('nome')
        email = request.form.get('email')
        assunto = request.form.get('assunto')
        mensagem = request.form.get('mensagem')
        
        # Validação básica dos campos
        if not all([nome, email, assunto, mensagem]):
            flash('Por favor, preencha todos os campos.', 'error')
            return redirect(url_for('index'))
        
        # Salva a mensagem em um arquivo de log (alternativa ao email)
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_entry = f"""
=== NOVA MENSAGEM - {timestamp} ===
Nome: {nome}
Email: {email}
Assunto: {assunto}
Mensagem: {mensagem}
=====================================

"""
        
        # Cria o arquivo de mensagens se não existir
        with open('mensagens_contato.txt', 'a', encoding='utf-8') as f:
            f.write(log_entry)
        
        # Aqui você pode implementar o envio de email real se quiser
        # enviar_email(nome, email, assunto, mensagem)
        
        flash('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success')
        return redirect(url_for('index'))
        
    except Exception as e:
        print(f"Erro ao processar contato: {e}")
        flash('Ocorreu um erro ao enviar a mensagem. Tente novamente.', 'error')
        return redirect(url_for('index'))

def enviar_email(nome, email, assunto, mensagem):
    """
    Função para enviar email (opcional - requer configuração SMTP)
    Por enquanto, apenas salva em arquivo. Para implementar email real,
    você precisará instalar bibliotecas adicionais e configurar SMTP.
    """
    # Por enquanto, apenas registra que a função foi chamada
    print(f"Email seria enviado para: {email}")
    print(f"Assunto: {assunto}")
    pass

# Rota para servir arquivos estáticos (como imagens, CSS, JS)
# <path:filename> captura qualquer caminho de arquivo após /assets/
@app.route('/assets/<path:filename>')
def assets(filename):
    """
    Função que serve arquivos estáticos da aplicação.
    Permite que o HTML acesse arquivos como imagens, CSS, JavaScript, etc.
    """
    # send_from_directory serve um arquivo específico do diretório atual ('.')
    # Isso é útil para servir arquivos como avatar.png, style.css, script.js
    return send_from_directory('.', filename)

# Bloco que executa apenas quando o arquivo é executado diretamente (não importado)
if __name__ == '__main__':
    # Inicia o servidor Flask com as seguintes configurações:
    # host='0.0.0.0': permite acesso de qualquer IP (não apenas localhost)
    # port=5000: define a porta 5000 para acessar a aplicação
    # debug=True: ativa o modo de depuração (reinicia automaticamente quando o código muda)
    app.run(host='0.0.0.0', port=5000, debug=True)
