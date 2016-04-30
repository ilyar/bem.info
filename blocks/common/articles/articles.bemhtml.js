block('articles')(
    tag()('dl'),
    elem('title').tag()('dt'),
    elem('author').tag()('dd'),
    elem('position').tag()('dd'),
    elem('text').tag()('dd'),
    elem('photo')(
	tag()('img'),
        attrs()(function() {
            return this.extend(applyNext(), {
                alt: this.ctx.alt,
                src: this.freeze(this.ctx.src)
            });
        })
	),
    elem('link').tag()('a')
);
