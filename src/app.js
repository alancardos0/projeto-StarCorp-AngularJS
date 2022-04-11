angular.module("projetoStarCorpCrud", []);

angular
  .module("projetoStarCorpCrud")
  .controller("crudCtrl", function ($scope, $http) {
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
          var resultadoEmString = JSON.stringify(result.data);
          alert(resultadoEmString);
        })
        .catch((error) => console.log(error));
    };

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

    $scope.deletarClienteDaApi = function () {
      $http({
        method: "DELETE",
        url: `https://www.selida.com.br/avaliacaotecnica/api/Pessoas/48`,
        headers: {
          chave: "AED57B57-F588-4AB7-AD02-DD99B49D44AF",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));

      $scope.pessoas.splice($scope.pessoas.indexOf($scope.pessoas), 1);
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
        url: "https://www.selida.com.br/avaliacaotecnica/api/Pessoas/3",
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
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  });
