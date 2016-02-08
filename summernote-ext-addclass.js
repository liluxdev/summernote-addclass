/**
 * 
 * copyright 2016 creativeprogramming.it di Stefano Gargiulo
 * email: info@creativeprogramming.it
 * accepting tips at https://www.paypal.me/creativedotit 
 * license: MIT
 * 
 */
(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

    // Extends plugins for adding hello.
    //  - plugin is external module for customizing.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        'addclass': function (context) {
            var self = this;
            if (typeof context.options.addclass === 'undefined'){
                   context.options.addclass={};
            }
            if (typeof context.options.addclass.classTags === 'undefined') {
                context.options.addclass.classTags = [
                    //bootstrap3
                    'label', 'img-responsive', 'img-rounded', 'img-thumbnail', 'img-circle', 'sr-only', 'lead', 'text-muted', 'text-primary', 'text-warning', 'text-danger', 'text-success', 'text-info', 'text-left', 'text-right', 'text-center', 'page-header', 'list-unstyled', 'list-inline', 'initialism', 'pull-right', 'prettyprint', 'pre-scrollable', 'container', 'table-bordered', 'table-responsive', 'form-control', 'form-group', 'input-sm', 'input-lg', 'control-label', 'form-control-static', 'help-block', 'btn', 'active', 'btn-default', 'btn-primary', 'btn-warning', 'btn-danger', 'btn-success', 'btn-info', 'btn-link', 'btn-lg', 'btn-xs', 'btn-block', 'fade', 'in', 'collapse', 'collapsing', 'breadcrumb', 'label-default', 'label-primary', 'label-success', 'label-info', 'label-warning', 'label-danger', 'badge', 'jumbotron', 'thumbnail', 'caption', 'alert', 'alert-link', 'alert-dismissable', 'close', 'alert-success', 'alert-info', 'alert-warning', 'alert-danger', 'panel', 'arrow', 'carousel', 'carousel-inner', 'visible-xs', 'visible-sm', 'visible-md', 'visible-lg', 'hidden-xs', 'hidden-sm', 'hidden-md', 'hidden-lg', 'visible-print', '.hidden-print'
                    ,
                    //uikit
                    'uk-button', 'uk-button uk-button-large', 'uk-button uk-button-success', 'uk-button uk-button-primary', 'uk-button uk-button-warning', 'uk-button uk-button-danger'];
                //  console.log("Please define your summernote.options.addclass.classTags array");
            }
            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;
            
            addStyleString(".scrollable-menu {height: auto; max-height: 200px; max-width:300px; overflow-x: hidden;}");

            context.memo('button.addclass', function () {
                return ui.buttonGroup([
                    ui.button({
                        className: 'dropdown-toggle',
                        contents: '<i class="fa fa-css3"\/>' + ' ' + ui.icon(context.options.icons.caret, 'span'),
                        //ui.icon(context.options.icons.magic) + ' ' + ui.icon(context.options.icons.caret, 'span'),
                        tooltip: 'add css class', //lang.style.style,
                        data: {
                            toggle: 'dropdown'
                        }
                    }),
                    ui.dropdown({
                        className: 'dropdown-style scrollable-menu',
                        items: context.options.classTags,
                        template: function (item) {

                            if (typeof item === 'string') {
                                item = {tag: "div", title: item, cssclass: 'class="' + item + '"'};
                            }

                            var tag = item.tag || "div";
                            var title = item.title;
                            var style = item.style ? ' style="' + item.style + '" ' : '';


                            return '<' + tag + ' ' + style + item.cssclass + '>' + title + '</' + tag + '>';
                        },
                        click: function (event, namespace, value) {

                            event.preventDefault();
                            value = value || $(event.target).closest('[data-value]').data('value');
                            if (typeof context.options.addclass.debug !== 'undefined' && context.options.addclass.debug){
                                console.debug($(window.getSelection().focusNode.parentElement),"toggling class: "+value);
                            }
                            $(window.getSelection().focusNode.parentElement).toggleClass(value)


                        }
                    })
                ]).render();
                return $optionList;
            });

            function addStyleString(str) {
                var node = document.createElement('style');
                node.innerHTML = str;
                document.body.appendChild(node);
            }

            // This events will be attached when editor is initialized.
            this.events = {
                // This will be called after modules are initialized.
                'summernote.init': function (we, e) {
                    //console.log('summernote initialized', we, e);
                },
                // This will be called when user releases a key on editable.
                'summernote.keyup': function (we, e) {
                    //  console.log('summernote keyup', we, e);
                }
            };

            // This method will be called when editor is initialized by $('..').summernote();
            // You can create elements for plugin
            this.initialize = function () {

            };

            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {
                /*  this.$panel.remove();
                 this.$panel = null; */
            };
        }
    });
}));
