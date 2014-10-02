/*! 
* Creates a bootstrap modal window
/**
@Sam Ranjbari
**/

var bs = (function(window, dom, undefined) {
    var ModalDialog = function(options) {
        this.events = {};
    
        this.eventsMapper = {
            closed: 'closed',
            submitted: 'submitted'
        }
    
        this.metadata = $.extend({
            Id: 'myModal',
            content: 'content...',
            headerText: '&nbsp;',
            actionButtonText: 'Yes, Continue',
            actionButtonClass: 'btn-primary',
            appendTo: '',
            contentTemplateId: null,
            bindingData: null,
            largeModal: false
        }, options || {});
    }
    
    ModalDialog.prototype = {
        init: function () {
            var self = this;
            var dfd = $.Deferred();
            if (this.modalId().length !== 0) {
                this.modalId().remove();
            }
    
            $.get("templates/modaltmpl.htm")
                .done(function(data) {
                    self.setup(data);
    
                    dfd.resolve();
                });
    
            return dfd.promise();
        },
    
        setup: function (data) {
            var self = this;
            
            if (this.metadata.contentTemplateId != null) {
                var tmplMarkup = $(this.metadata.contentTemplateId).html();
                this.metadata.content = tmplMarkup;
    
                var compiledContent = _.template(this.metadata.content);
                this.metadata.content = compiledContent(this.metadata.bindingData);
            }
            
            var compiled = _.template(data);
    
            this.metadata.appendTo = this.metadata.appendTo || 'body';
            $(this.metadata.appendTo).append(compiled(this.metadata));
    
            $("#" + this.metadata.Id + " .modalActionButton").click(function (e) {
                e.preventDefault();
    
                self.emit(self.eventsMapper.submitted, e);
            });
        },
    
        show: function(func) {
            var self = this;
            this.init()
                .then(function () {
                    self.modalId().modal(self.metadata);
        
                    if (typeof func === 'function') {
                        func();
                    }
                });
        },
    
        hide: function() {
            this.modalId().modal('hide');
        },
    
        hideCloseButtons: function() {
            //$("#" + this.metadata.Id + " .modalCloseButton").attr('disabled', 'disabled');
            $(".modalCloseButton").hide();
        },
    
        showCloseButtons: function() {
            $(".modalCloseButton").show();
        },
    
        on: function(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        },
    
        emit: function(event, data) {
            var callbacks = this.events[event];
            if (callbacks) {
                callbacks.forEach(function(callback) {
                    callback(data);
                });
            }
        },
    
        modalId: function() {
            return $("#" + this.metadata.Id);
        }
    }
    
    return {
        ModalDialog: ModalDialog
    }
})(this, this.document);
