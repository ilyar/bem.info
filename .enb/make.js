var langs = ['ru', 'en'],
    techs = {
        // essential
        fileProvider: require('enb/techs/file-provider'),
        fileMerge: require('enb/techs/file-merge'),

        // optimization
        borschik: require('enb-borschik/techs/borschik'),

        // css
        css: require('enb-css/techs/css'),

        // js
        prependYm: require('enb-modules/techs/prepend-modules'),
        browserJs: require('enb-js/techs/browser-js'),

        // i18n
        keysets: require('enb-bem-i18n/techs/keysets'),
        i18n: require('enb-bem-i18n/techs/i18n'),

        // bemtree
        bemtree: require('enb-bemxjst-i18n/techs/bemtree-i18n'),

        // bemhtml
        bemhtml: require('enb-bemxjst-i18n/techs/bemhtml-i18n')
    },
    enbBemTechs = require('enb-bem-techs'),
    libLevels = [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/desktop.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/desktop.blocks', check: false },
        { path: 'libs/bem-components/design/common.blocks', check: false },
        { path: 'libs/bem-components/design/desktop.blocks', check: false },
        'blocks/common'
    ];

function configNodes(config, isProd, bundle, levels) {
    config.nodes(bundle, function(nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: libLevels.concat(levels) }],
            [techs.fileProvider, { target: '?.bemdecl.js' }],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            // css
            [techs.css, { target: '?.css' }],

            // i18n
            [techs.keysets, { lang: '{lang}' }],
            [techs.i18n, {
                exports: { ym: true, commonJS: true },
                lang: '{lang}'
            }],

            // bemtree
            [techs.bemtree, {
                sourceSuffixes: ['bemtree.js', 'bemtree'],
                target: '?.{lang}.bemtree.js',
                lang: '{lang}'
            }],

            // bemhtml
            [techs.bemhtml, {
                sourceSuffixes: ['bemhtml.js', 'bemhtml'],
                target: '?.{lang}.bemhtml.js',
                lang: '{lang}'
            }],

            // js
            [techs.browserJs],

            [techs.fileMerge, {
                target: '?.pre.{lang}.js',
                sources: ['?.lang.{lang}.js', '?.browser.js'],
                lang: '{lang}'
            }],

            [techs.prependYm, {
                source: '?.pre.{lang}.js',
                target: '?.{lang}.js'
            }],

            // borschik
            [techs.borschik, { sourceTarget: '?.{lang}.js', destTarget: '?.{lang}.min.js', minify: isProd }],
            [techs.borschik, { sourceTarget: '?.css', destTarget: '?.min.css', tech: 'cleancss', minify: isProd }]
        ]);

        nodeConfig.addTargets(['?.{lang}.bemtree.js', '?.{lang}.bemhtml.js', '?.min.css', '?.{lang}.min.js']);
    });
}

module.exports = function(config) {
    var isProd = process.env.YENV === 'production';

    config.setLanguages(langs);
    configNodes(config, isProd, 'bundles/index', [ 'blocks/promo/', 'blocks/index' ]);

    configNodes(config, isProd, 'bundles/methodology-index', [ 'blocks/promo', 'blocks/methodology' ]);
    configNodes(config, isProd, 'bundles/methodology', [ 'blocks/methodology' ]);

    configNodes(config, isProd, 'bundles/tools-index', [ 'blocks/promo', 'blocks/tools' ]);
    configNodes(config, isProd, 'bundles/tools', [ 'blocks/tools' ]);

    configNodes(config, isProd, 'bundles/platform-index', [ 'blocks/promo', 'blocks/platform' ]);
    configNodes(config, isProd, 'bundles/platform', [ 'blocks/platform' ]);

    configNodes(config, isProd, 'bundles/forum', [ 'blocks/forum' ]);
};
