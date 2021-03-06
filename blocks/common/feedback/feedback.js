modules.define('feedback',
    ['i-bem-dom', 'jquery', 'feedback__cancel', 'feedback__close',
    'feedback__submit', 'textarea', 'button', 'radio-group', 'feedback__wrapper',
    'feedback__feedback-done'],

    function(provide, bemDom, $, FeedbackCancel, FeedbackClose, FeedbackSubmit, Textarea,
         Button, RadioGroup, FeedbackWrapper, FeedbackDone) {

    provide(bemDom.declBlock(this.name, {
        _onTextareaChange: function(e) {
            var textarea = e.bemTarget;
            this._button || (this._button = this.findChildElem(FeedbackSubmit).findMixedBlock(Button));
            this._button.setMod('disabled', !textarea.getVal().length);
        },

        _onCancel: function() {
            this._emit('cancel');
        },

        _onClose: function() {
            this._emit('close');
        },

        _onSubmit: function(e) {
            e.preventDefault();

            var _this = this,
                href = window.location.href,
                vote = this._elem('radio-group').findMixedBlock(RadioGroup).getVal(),
                feedbackText = this._elem('textarea').findMixedBlock(Textarea).getVal(),
                data = {
                    doc: encodeURIComponent(href),
                    text: feedbackText,
                    rating: vote
                },
                handlerPrefix = window.location.host.indexOf('.bem.info') > -1 ? '' : '/bem.info';

            $.post(handlerPrefix + '/doc-feedback/', data)
                .then(() => {
                    _this._elem(FeedbackWrapper).delMod('visible');
                    _this._elem(FeedbackDone).setMod('visible');
                    _this._emit('rate', data);
                })
                .fail(err => {
                    console.log(err);
                    alert('Oops! Something is wrong!');
                });
        }

    }, {
        lazyInit: true,
        onInit: function() {
            this._events(FeedbackCancel).on('cancel', this.prototype._onCancel);
            this._events(FeedbackClose).on('close', this.prototype._onClose);
            this._events(FeedbackSubmit).on('submit', this.prototype._onSubmit);
            this._events(Textarea).on('change', this.prototype._onTextareaChange);
        }
    }));

});
