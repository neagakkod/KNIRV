<?php
/****************************************************
AdaptivePayments.php

This file contains client business methods to call
PayPals AdaptivePayments Webservice APIs.

****************************************************/
require_once 'Config/paypal_sdk_clientproperties.php' ;
require_once 'CallerServices.php'  ;
require_once 'Stub/AP/AdaptivePaymentsProxy.php'  ;
require_once 'SOAPEncoder/SOAPEncoder.php'  ;
require_once 'Exceptions/FatalException.php'  ;

class AdaptivePayments extends CallerServices {
   
   function Pay($payRequest, $isRequestString = false) {
   		try {
   			if($isRequestString) {
   				return parent::callWebService($payRequest, 'AdaptivePayments/Pay');
   			}
   			else {
   				return $this->callAPI($payRequest, 'AdaptivePayments/Pay');	
   			}
   				
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in Pay method');
   		}
   		
   }
   
   function PaymentDetails($paymentDetailsRequest, $isRequestString = false) {
   		try {
   			if($isRequestString) {
   				return parent::callWebService($paymentDetailsRequest, 'AdaptivePayments/PaymentDetails');
   			}
   			else {
   				return $this->callAPI($paymentDetailsRequest, 'AdaptivePayments/PaymentDetails');	
   			}
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in PaymentDetails method');
   		}
   		
        
   }
   function Preapproval($preapprovalRequest, $isRequestString = false) {
   		try {
   			
   			if($isRequestString) {
   				return parent::callWebService($preapprovalRequest, 'AdaptivePayments/Preapproval');
   			}
   			else {
   				return $this->callAPI($preapprovalRequest, 'AdaptivePayments/Preapproval');	
   			}
   			
   				
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in Preapproval method');
   		}      
      	   
   }
   function PreapprovalDetails($preapprovalDetailsRequest, $isRequestString = false) {
   		try {
   			if($isRequestString) {
   				return parent::callWebService($preapprovalDetailsRequest, 'AdaptivePayments/PreapprovalDetails');
   			}
   			else {
   				return $this->callAPI($preapprovalDetailsRequest, 'AdaptivePayments/PreapprovalDetails');	
   			}
   				
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in PreapprovalDetails method');
   		}
   		
   }
   function CancelPreapproval($cancelPreapprovalRequest, $isRequestString = false)
   {	
   		try {
   			if($isRequestString) {
   				return parent::callWebService($cancelPreapprovalRequest, 'AdaptivePayments/CancelPreapproval');
   			}
   			else {
   				return $this->callAPI($cancelPreapprovalRequest, 'AdaptivePayments/CancelPreapproval');	
   			}
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in CancelPreapproval method');
   		}
 	  	
   }
   function Refund($refundRequest, $isRequestString = false) {
   		try {
   			if($isRequestString) {
   				return parent::callWebService($refundRequest, 'AdaptivePayments/Refund');
   			}
   			else {
   				return $this->callAPI($refundRequest, 'AdaptivePayments/Refund');	
   			}
   			
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in Refund method');
   		}
   		   		     
   }
   function ConvertCurrency($convertCurrencyRequest, $isRequestString = false)
   {
   		try {
   			if($isRequestString) {
   				return parent::callWebService($convertCurrencyRequest, 'AdaptivePayments/ConvertCurrency');
   			}
   			else {
   				return $this->callAPI($convertCurrencyRequest, 'AdaptivePayments/ConvertCurrency');	
   			}
   			
   				
   		}
   		catch(Exception $ex) {
				  			
   			throw new FatalException('Error occurred in ConvertCurrency method');
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