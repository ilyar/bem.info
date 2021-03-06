block('feedback').elem('feedback-done').content()(function() {
    return [
        {
            block: 'face'
        },
        {
            block: 'heading',
            mods: { level: 4 },
            mix: { block: this.block, elem: 'heading' },
            content: 'Thank you!'
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'l',
                view: 'action'
            },
            mix: { block: this.block, elem: 'close', js: true },
            text: 'OK'
        }
    ]
});
