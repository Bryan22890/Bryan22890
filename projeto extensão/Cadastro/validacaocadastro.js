function voltar(){
    window.location.href = "../login/login.html";
}



document.addEventListener("DOMContentLoaded", function () {
    
    // Gera um UUID v4 seguro
    function generate_uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    // Salva os dados do usuário no LocalStorage
    function SalvarDados() {
        var usuario = document.getElementById('campousuario').value;
        var senha = document.getElementById('camposenha').value;
        var email = document.getElementById('inserirEmail').value;

        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        var novoUsuario = {
            id: generate_uuidv4(),
            login: usuario,
            senha: senha,
            email: email
        };

        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        console.log(usuarios);
        alert('Cadastro realizado com sucesso!');
    }

    // Valida o formulário de cadastro
    function validarcadastro(event) {
        event.preventDefault();
        var campos = [
            'nomecompleto', 'idade', 'genero', 'campousuario',
            'camposenha', 'confirmasenha', 'cep', 'num', 'tel', 'cpf', 'inserirEmail'
        ];

        for (let campo of campos) {
            if (document.getElementById(campo).value.trim() === '') {
                alert('[ERRO] Todos os campos são obrigatórios.');
                return false;
            }
        }

        var senha = document.getElementById('camposenha').value;
        var confirmasenha = document.getElementById('confirmasenha').value;
        if (senha !== confirmasenha) {
            alert('[ERRO] As senhas não coincidem.');
            return false;
        }

        var cpf = document.getElementById('cpf').value;
        if (!validarCPF(cpf)) return false;

        var idade = document.getElementById('idade').value;
        if (!validarIdade(idade)) return false;

        SalvarDados();
        window.location.href = "../html/telalogin.html";
    }

    // Formata o CPF automaticamente
    function formatarCPF(input) {
        let cpf = input.value.replace(/\D/g, '').slice(0, 11);

        if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
        } else if (cpf.length > 6) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
        } else if (cpf.length > 3) {
            cpf = cpf.replace(/(\d{3})(\d{0,3})/, "$1.$2");
        }

        input.value = cpf;
    }

    // Formata o CEP
    function formatarCEP(input) {
        let cep = input.value.replace(/\D/g, '').slice(0, 8);
        input.value = cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;
    }

    // Busca endereço pelo CEP
    document.getElementById('buscar').addEventListener('click', function() {
        const cep = document.getElementById('cep').value;
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado.');
                    return;
                }
                document.getElementById('rua').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
            })
            .catch(error => {
                alert('Erro ao buscar o CEP.');
                console.error('Erro:', error);
            });
    });

    // Formata telefone automaticamente
    function formatarTEL(input) {
        let tel = input.value.replace(/\D/g, '').slice(0, 11);
        if (tel.length === 11) {
            input.value = `(${tel.slice(0, 2)}) ${tel.slice(2, 7)}-${tel.slice(7)}`;
        } else if (tel.length === 10) {
            input.value = `(${tel.slice(0, 2)}) ${tel.slice(2, 6)}-${tel.slice(6)}`;
        } else {
            input.value = tel;
        }
    }

    // Valida CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            alert('[ERRO] CPF inválido!');
            return false;
        }

        const calcularDigito = (numArray, pesoInicial) => {
            let soma = numArray
                .slice(0, pesoInicial - 1)
                .reduce((acc, num, i) => acc + num * (pesoInicial - i), 0);
            let resto = (soma * 10) % 11;
            return resto === 10 ? 0 : resto;
        };

        let digitos = cpf.split('').map(Number);
        if (calcularDigito(digitos, 10) !== digitos[9] || calcularDigito(digitos, 11) !== digitos[10]) {
            alert('[ERRO] CPF inválido!');
            return false;
        }

        return true;
    }

    // Valida e-mail
    function validarEmail(input) {
        var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(input.value);
    }

    // Valida idade
    function validarIdade(idade) {
        idade = parseInt(idade, 10);
        if (isNaN(idade) || idade < 1 || idade > 120) {
            alert("[ERRO] A idade deve estar entre 1 e 120 anos.");
            document.getElementById("idade").value = "";
            return false;
        }
        return true;
    }

    // Adiciona eventos para formatar os campos automaticamente
    document.getElementById("cpf").addEventListener("input", function() {
        formatarCPF(this);
    });

    document.getElementById("cep").addEventListener("input", function() {
        formatarCEP(this);
    });

    document.getElementById("tel").addEventListener("input", function() {
        formatarTEL(this);
    });

    document.getElementById("idade").addEventListener("input", function() {
        validarIdade(this.value);
    });

});


