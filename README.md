bs.Modal
========

This javascript library will create bootstrap modal dialog dynamically without the need of any html markup

```javascript
var modal = new bs.ModalDialog({
                /* optional parameters */
                backdrop: 'static',
                keyboard: false,
                appendTo: '.container',
                headerText: 'Sweet Dialog',
                content: 'Check out my sweet dialog!',
                actionButtonText: 'Submit',
                actionButtonClass: 'btn-primary',
                contentTemplateId: null,
        		bindingData: null,
        		largeModal: false
            });

            modal.show(function() {
                console.log('shown');
            });

            modal.on('submitted', function(e) {
               console.log('submitted'); 
            });
```
![alt text](https://raw.githubusercontent.com/samranjbari/bs.Modal/master/modal.PNG "Modal Dialog")
