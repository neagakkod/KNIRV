<?php
/****************************************************
AdaptiveAccounts.php  
This file contains client business methods to call
PayPals AdaptiveAccounts Webservice APIs.    
****************************************************/
require_once 'Config/paypal_sdk_clientproperties.php' ;
require_once 'CallerServices.php'  ;
require_once 'Stub/AA/AdaptiveAccountsProxy.php'  ;
require_once 'SOAPEncoder/SOAPEncoder.php'  ;
require_once 'Exceptions/FatalException.php'  ;

class AdaptiveAccounts extends CallerServices {     

   function CreateAccount($createAccountRequest, $isRequestString = false) {
   		try {
   			if($isRequestString) {
   				return parent::callWebService($createAccountRequest, 'AdaptivePayments/CreateAccount');
   			}
   			else {
   				return $this->callAPI($createAccountRequest, 'AdaptiveAccounts/CreateAccount');	
   			}
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in CreateAccount method');
   		}
   }
   
   function GetUserAgreement($GUAgreementRequest, $isRequestString = false) {
   		try {
   			if($isRequestString) {
   				return parent::callWebService($GUAgreementRequest, 'AdaptivePayments/GetUserAgreement');
   			}
   			else {
   				return $this->callAPI($GUAgreementRequest, 'AdaptiveAccounts/GetUserAgreement');	
   			}
   		}
   		catch(Excpetion $ex) {
   			throw new FatalException('Error occurred in GetUserAgreement method');
   		}
   }
   
   /*
    * Calls the call method of CallerServices class and returns the response.
    */
   private function callAPI($request, $URL)
   {
   		$response = null;

   		try {
   			$request = SoapEncoder::Encode($request);
   			$response = parent::call($request, $URL); 
   			
   		}
   		catch(Exception $ex) {
   			throw new FatalException('Error occurred in callAPI method');
   		}
        return $response;
   }
                              
}
?>