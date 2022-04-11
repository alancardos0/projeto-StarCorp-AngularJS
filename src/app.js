angular.module("projetoStarCorpCrud", []);

angular
  .module("projetoStarCorpCrud")
  .controller("crudCtrl", function ($scope, $http) {
    $scope.form = [];

    $scope.pessoaSelecionadaPeloID = {};

    $scope.pessoas = [
      {
        nome: "Alan",
        dataNascimento: "07",
        idade: "idade",
        email: "email",
        telefone: "telefone",
        celular: "celular",
      },
    ];

    $scope.pegarPessoasNaApi = function () {
      $http({
        method: "GET",
        url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/GetAll",
        headers: {
          chave: "AED57B57-F588-4AB7-AD02-DD99B49D44AF",
        },
      })
        .then((result) => {
          $scope.pessoas = result.data.data;
          console.log($scope.pessoas);
        })
        .catch((error) => console.log(error));
    };
    $scope.pegarPessoasNaApi();

    $scope.adicionarClienteNaApi = function (
      nome,
      dataNascimento,
      idade,
      email,
      telefone,
      celular
    ) {
      $http({
        method: "POST",
        url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas",
        headers: {
          chave: "AED57B57-F588-4AB7-AD02-DD99B49D44AF",
        },
        data: {
          nome: nome,
          dataNascimento: dataNascimento,
          idade: idade,
          email: email,
          telefone: telefone,
          celular: celular,
        },
      })
        .then((res) => {
          console.log(res.data);
          $scope.pegarPessoasNaApi();
          alert("Pessoa Adicionada ao Banco de Dados com Sucesso!!");
        })
        .catch((error) => {
          console.error(error);
          alert("Ocorreu um erro!");
        });
      $scope.pessoas.push({
        nome: nome,
        dataNascimento: dataNascimento,
        idade: idade,
        email: email,
        telefone: telefone,
        celular: celular,
      });
    };

    $scope.limparCamposDoInput = function (
      nome,
      dataNascimento,
      idade,
      email,
      telefone,
      celular
    ) {
      this.nome = "";
      this.dataNascimento = "";
      this.idade = "";
      this.email = "";
      this.telefone = "";
      this.celular = "";
    };

    $scope.deletarClienteDaApi = function (pessoaId) {
      $http({
        method: "DELETE",
        url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${pessoaId}`,
        headers: {
          chave: "AED57B57-F588-4AB7-AD02-DD99B49D44AF",
        },
      })
        .then((res) => {
          var respostaTratada = JSON.stringify(res.data);
          alert("Pessoa Excluida com Sucesso!!!!");
          $scope.pegarPessoasNaApi();
        })
        .catch((error) => console.log(error));

      $scope.pessoas.splice($scope.pessoas.indexOf($scope.pessoas), 1);
    };

    $scope.selecionarPessoas = function (pessoaId) {
      $http({
        method: "GET",
        url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${pessoaId}`,
        headers: {
          chave: "AED57B57-F588-4AB7-AD02-DD99B49D44AF",
        },
      })
        .then((res) => {
          console.log(res.data.data);
          $scope.pessoaSelecionadaPeloID = {
            pessoaId: res.data.data.pessoaId,
            nome: res.data.data.nome,
            dataNascimento: res.data.data.dataNascimento,
            idade: res.data.data.idade,
            email: res.data.data.email,
            telefone: res.data.data.telefone,
            celular: res.data.data.celular,
          };
        })
        .catch((error) => console.error(error));
    };

    $scope.alterarPessoaNoBancoDeDados = function (
      nome,
      dataNascimento,
      idade,
      email,
      telefone,
      celular
    ) {
      $http({
        method: "PUT",
        url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/${$scope.pessoaSelecionadaPeloID.pessoaId}`,
        headers: {
          chave: "AED57B57-F588-4AB7-AD02-DD99B49D44AF",
        },
        data: {
          nome: nome || $scope.pessoaSelecionadaPeloID.nome,
          dataNascimento:
            dataNascimento || $scope.pessoaSelecionadaPeloID.dataNascimento,
          idade: idade || $scope.pessoaSelecionadaPeloID.idade,
          email: email || $scope.pessoaSelecionadaPeloID.email,
          telefone: telefone || $scope.pessoaSelecionadaPeloID.telefone,
          celular: celular || $scope.pessoaSelecionadaPeloID.celular,
        },
      })
        .then((res) => {
          $scope.pegarPessoasNaApi();
          var respostaTratadaComJson = JSON.stringify(res.data);
          console.log(respostaTratadaComJson);
          alert("Alteração Realizada com Sucesso!!!!");
        })
        .catch((error) => {
          console.log(error);
          alert("Parece que ocorreu um erro!");
        });
    };
  });
