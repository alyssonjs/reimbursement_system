FROM ruby:3.1.4

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copia os arquivos do projeto para o container
COPY . .

# Instala as gems
RUN bundle install

# Expõe a porta padrão do Rails
EXPOSE 3000

# Define o entrypoint
COPY ./config/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Comando padrão para iniciar o servidor
CMD ["rails", "server", "-b", "0.0.0.0"]
