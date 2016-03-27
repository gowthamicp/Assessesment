(function() {
 
var app = angular.module('userContactService',['ui.grid']);
var userCount = 0;


app.service('contactDetailService',function(){
	  var contactDetails =[];
	  var i,recordPresent = false,recordIndex = '';
	  
	 //Method to add and update contact details
	 
	  this.addContactDetails = function(contactDetail,image){
		  for(i = 0;i<contactDetails.length;i++){
			  if(contactDetails[i].id === contactDetail.id){
				  recordPresent = true;
				  recordIndex = i;
				  break;
			  }
		  }
		  if(!recordPresent){
			  contactDetail.id = ++userCount;
			  contactDetail.image = image;
			  contactDetails.push(contactDetail);
		  }else{
			   contactDetails[recordIndex].fName = contactDetail.fName;
				contactDetails[recordIndex].lName = contactDetail.lName;
				contactDetails[recordIndex].dob = contactDetail.dob;
				contactDetails[recordIndex].companyName = contactDetail.companyName;
				contactDetails[recordIndex].emailAddress = contactDetail.emailAddress;
				contactDetails[recordIndex].mobileNumber = contactDetail.mobileNumber;
				contactDetails[image] = image;
		 }
		 
	  };
	  this.getUserDetails = function(){
		  return contactDetails;
	  };
	  
	  //Method to display details on click of edit
	  this.editContact = function(row,image){
		 var contactListLen = contactDetails.length ,contactDetail = {};
		  for(i=0;i<contactListLen;i++){
			  if(contactDetails[i].id === row.id){
				  contactDetail.fName = row.fName;
				  contactDetail.lName = row.lName;
				  contactDetail.dob = row.dob;
				  contactDetail.companyName = row.companyName;
				  contactDetail.emailAddress = row.emailAddress;
				  contactDetail.mobileNumber = row.mobileNumber;
				  contactDetail.id = row.id;
				  contactDetail.image = row.image;
				  break;
			  }
		  }
		  return contactDetail;
	  };
	  
	  //Method to delete record details on click of delete
	  this.deletContact = function(row){
		  var i,
		  contactListLen = contactDetails.length;
		  for(i=0;i<contactListLen;i++){
			  if(contactDetails[i].id === row.id){
				  contactDetails.splice(i,1);
				  break;
			  }
		  }
	  };
  });


})();