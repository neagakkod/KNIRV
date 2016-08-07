<?php

if (!class_exists("ErrorData")) {
/**
 * ErrorData
 */
class ErrorData {
	/**
	 * @access public
	 * @var xslong
	 */
	public $errorId;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $domain;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $subdomain;
	/**
	 * @access public
	 * @var commonErrorSeverity
	 */
	public $severity;
	/**
	 * @access public
	 * @var commonErrorCategory
	 */
	public $category;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $message;
	/**
	 * @access public
	 * @var xstoken
	 */
	public $exceptionId;
	/**
	 * @access public
	 * @var commonErrorParameter
	 */
	public $parameter;
}}

if (!class_exists("ErrorParameter")) {
/**
 * ErrorParameter
 */
class ErrorParameter {
}}

if (!class_exists("RequestEnvelope")) {
/**
 * RequestEnvelope
 */
class RequestEnvelope {
	/**
	 * @access public
	 * @var commonDetailLevelCode
	 */
	public $detailLevel;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $errorLanguage;
}}

if (!class_exists("ResponseEnvelope")) {
/**
 * ResponseEnvelope
 */
class ResponseEnvelope {
	/**
	 * @access public
	 * @var xsdateTime
	 */
	public $timestamp;
	/**
	 * @access public
	 * @var commonAckCode
	 */
	public $ack;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $correlationId;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $build;
}}

if (!class_exists("ClientDetailsType")) {
/**
 * ClientDetailsType
 */
class ClientDetailsType {
	/**
	 * @access public
	 * @var xsstring
	 */
	public $ipAddress;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $deviceId;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $applicationId;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $model;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $geoLocation;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $customerType;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $partnerName;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $customerId;
}}

if (!class_exists("FaultMessage")) {
/**
 * FaultMessage
 */
class FaultMessage {
	/**
	 * @access public
	 * @var commonResponseEnvelope
	 */
	public $responseEnvelope;
	/**
	 * @access public
	 * @var commonErrorData
	 */
	public $error;
}}

if (!class_exists("CreateAccountRequest")) {
/**
 * CreateAccountRequest
 */
class CreateAccountRequest {
	/**
	 * @access public
	 * @var commonRequestEnvelope
	 */
	public $requestEnvelope;
	/**
	 * @access public
	 * @var commonClientDetailsType
	 */
	public $clientDetails;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $accountType;
	/**
	 * @access public
	 * @var aaNameType
	 */
	public $name;
	/**
	 * @access public
	 * @var xsdate
	 */
	public $dateOfBirth;
	/**
	 * @access public
	 * @var aaAddressType
	 */
	public $address;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $contactPhoneNumber;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $currencyCode;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $citizenshipCountryCode;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $preferredLanguageCode;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $notificationURL;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $emailAddress;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $registrationType;
	/**
	 * @access public
	 * @var aaCreateAccountWebOptionsType
	 */
	public $createAccountWebOptions;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $partnerField1;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $partnerField2;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $partnerField3;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $partnerField4;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $partnerField5;
	
	/**
	 * @access public
	 * @var xsstring
	 */
	public $sandboxEmailAddress;
}}

if (!class_exists("CreateAccountResponse")) {
/**
 * CreateAccountResponse
 */
class CreateAccountResponse {
	/**
	 * @access public
	 * @var commonResponseEnvelope
	 */
	public $responseEnvelope;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $createAccountKey;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $execStatus;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $redirectURL;
}}

if (!class_exists("GetUserAgreementRequest")) {
/**
 * GetUserAgreementRequest
 */
class GetUserAgreementRequest {
	/**
	 * @access public
	 * @var commonRequestEnvelope
	 */
	public $requestEnvelope;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $createAccountKey;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $countryCode;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $languageCode;
}}

if (!class_exists("GetUserAgreementResponse")) {
/**
 * GetUserAgreementResponse
 */
class GetUserAgreementResponse {
	/**
	 * @access public
	 * @var commonResponseEnvelope
	 */
	public $responseEnvelope;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $agreement;
}}

if (!class_exists("NameType")) {
/**
 * NameType
 */
class NameType {
	/**
	 * @access public
	 * @var xsstring
	 */
	public $salutation;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $firstName;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $middleName;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $lastName;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $suffix;
}}

if (!class_exists("AddressType")) {
/**
 * AddressType
 */
class AddressType {
	/**
	 * @access public
	 * @var xsstring
	 */
	public $line1;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $line2;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $city;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $state;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $postalCode;
	/**
	 * @access public
	 * @var xsstring
	 */
	public $countryCode;
}}

if (!class_exists("CreateAccountWebOptionsType")) {
/**
 * CreateAccountWebOptionsType
 */
class CreateAccountWebOptionsType {
	/**
	 * @access public
	 * @var xsstring
	 */
	public $returnUrl;
}}

?>