(function() {
 
var app = angular.module('contactApp',['ui.grid','userContactService']);

 app.controller('UserControlller', ['$scope','contactDetailService', function($scope,contactDetailService) {
     $scope.contactDetail = {};
	 $scope.formDisable = true;
	 $scope.gridOptions ={};
	
      $scope.gridOptions = {
		  showHeader:false,
		  columnDefs:[
		     {field:'fName',cellTemplate:'<div>{{row.entity.fName+" "+row.entity.lName}}</div>'},
			 {field:'update',cellTemplate:'<span style="float:right"><button class="btn contact-page-custom-btn" ng-click="grid.appScope.editContact(row.entity)">Edit</button>&nbsp<button class="btn contact-page-custom-btn" ng-click="grid.appScope.deletContact(row.entity)">Delete</button></span>'}
			
		  ]
	  };
	  
     $scope.addContactDetails = function(){
			contactDetailService.addContactDetails($scope.contactDetail, $scope.image );
            $scope.gridOptions.data = contactDetailService.getUserDetails();
			$scope.reset($scope.contactForm);
			
		};
		
	$scope.enableFormFields = function(){
		 $scope.formDisable = false;
	};
	
	$scope.disableFormFields = function(){
		 $scope.formDisable = true;
	};
	
	$scope.enableForm = function(){
		$scope.enableFormFields();
		 $scope.contactDetail = {};
		 document.getElementById("contactImgId").src = '';
	};
	$scope.photoUploaded = function(element){
		  if(element != null){
			        var file = element.files[0];
                    if(file.type.indexOf('image') > -1){
						var fileReader = new FileReader();
						fileReader.readAsDataURL(file);
                          fileReader.onload = function(event){
						  $scope.image = event.target.result;
						  $scope.$apply();
						}
						
					}					
		  }
	};
	  $scope.editContact = function(row){
		 $scope.enableFormFields();
		 $scope.contactDetail = contactDetailService.editContact(row, $scope.image );
		 $scope.image = $scope.contactDetail.image;
		 
	  };
	  $scope.deletContact = function(row){
		 contactDetailService.deletContact(row);
		 if(row.id === $scope.contactDetail.id){
			  $scope.reset();
		 }
	  };
    
	
	$scope.reset = function(form) {
		 $scope.image = '';
	     if (form) {
		     form.$setPristine();
         }
		 $scope.contactDetail = {};
	     document.getElementById("contactImgId").src = '';
	    $scope.disableFormFields();
	  
    };

  
	
  }]);
})();
