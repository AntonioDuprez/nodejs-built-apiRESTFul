(function() {
    'use strict';
  
    var app = angular.module('contactsApp', []);
  
    // Función de Angular
    app.controller('contactsController', function($scope, $http) {
  
        $http.get('http://localhost:3001/api/contacts')
            .then(function(response) {
            $scope.contacts = response.data;
            });
      
      // Almacenará los nuevos valores introducidos siempre y cuando la API
      // siga abierta, si se reinicia o se para, se perderán esos datos,
      // a no ser que se modifique el archivo json.
      $scope.saveContact = function(contact) {
        $http.post('http://localhost:3001/api/contacts', contact)
          .then(function(response) {
            $scope.contacts.push(response.data);
        });
      };

     //$scope.prueba = "HAhadhjds";

     $scope.deleteContact = function(contactId){
        $http.delete('http://localhost:3001/api/contacts/'+ contactId, contactId)
            .then(function(response){
                let contact = $scope.contacts.filter(contact => {
                    return contact.id == contactId;
                })[0];

                const index = $scope.contacts.indexOf(contact);
                $scope.contacts.splice(index, 1); 

        });
        //console.log("entro en delete");
    };
    
     
    
  });

  })();