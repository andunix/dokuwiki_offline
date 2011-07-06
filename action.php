<?php
/*
 * Copyright 2011 Andreas Huber - http://andunix.net/
 *
 * Licensed unter the Creative Commons Attribution 3.0 Germany License
 * http://creativecommons.org/licenses/by/3.0/de/deed.en
 *
 * Lizensiert unter der Creative Commons Namensnennung 3.0 Deutschland Lizenz
 * http://creativecommons.org/licenses/by/3.0/de/
 */

// must be run within Dokuwiki
if (!defined('DOKU_INC')) die();

if (!defined('DOKU_LF')) define('DOKU_LF', "\n");
if (!defined('DOKU_TAB')) define('DOKU_TAB', "\t");
if (!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN',DOKU_BASE.'lib/plugins/');

require_once DOKU_PLUGIN.'action.php';

/**
 * DokuWiki Offline Plugin (Action Component)
 *
 * @license Creative Commons Attribution 3.0 Germany License http://creativecommons.org/licenses/by/3.0/de/deed.en
 * @author Andreas Huber, <a href="http://andunix.net/">http://andunix.net/</a>
 */
class action_plugin_offline extends DokuWiki_Action_Plugin {

    public function register(Doku_Event_Handler &$controller) {
        $controller->register_hook('offline', 'FIXME', $this, 'handle_offline');
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, '_hookjs');
    }

    public function handle_offline(Doku_Event &$event, $param) {
    }

    /**
         * Hook js script into page headers.
         *
         * @author Samuele Tognini <samuele@cli.di.unipi.it>
         */
        function _hookjs(&$event, $param) {
          $event->data['script'][] = array(
                              'type'    => 'text/javascript',
                              'charset' => 'utf-8',
                              '_data'   => '',
                              'src'     => DOKU_BASE.'lib/plugins/offline/js/jquery-1.6.1.min.js');
          $event->data['script'][] = array(
                              'type'    => 'text/javascript',
                              'charset' => 'utf-8',
                              '_data'   => '',
                              'src'     => DOKU_BASE.'lib/plugins/offline/js/pagehook.js');
        }
}

// vim:ts=4:sw=4:et:
