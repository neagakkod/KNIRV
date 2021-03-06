<?php
/**
 * Zend Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 *
 * @category   Zend
 * @package    Zend_Pdf
 * @copyright  Copyright (c) 2005-2009 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 * @version    $Id: Stream.php 16541 2009-07-07 06:59:03Z bkarwin $
 */


/** Zend_Pdf_Parser */
require_once 'Zend/Pdf/Parser.php';


/**
 * PDF object stream parser
 *
 * @package    Zend_Pdf
 * @copyright  Copyright (c) 2005-2009 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */
class Zend_Pdf_Parser_Stream extends Zend_Pdf_Parser
{
    /**
     * Get Trailer object
     *
     * @return Zend_Pdf_Trailer_Keeper
     */
    public function getTrailer()
    {
        throw new Zend_Pdf_Exception('Stream object parser doesn\'t contain trailer information.');
    }

    /**
     * Object constructor
     *
     * @param string $pdfString
     * @param Zend_Pdf_ElementFactory $factory
     * @throws Zend_Exception
     */
    public function __construct(&$source, Zend_Pdf_ElementFactory $factory)
    {
        $this->_current        = 0;
        $this->_currentContext = null;
        $this->_contextStack   = array();
        $this->_elements       = new Zend_Pdf_PhpArray();
        $this->_objFactory     = $factory;
    }
}
