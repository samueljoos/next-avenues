const { router } = require('next-avenues');

const pages = () => {
    router.add('/', 'index').as('homepage');
    router.add('/a', 'a').as('a');
    router.add('/b', 'b').as('b');
};

router.group(pages).prefix('nl').data({ lang: 'nl' });
router.group(pages).prefix('fr').data({ lang: 'fr' });

module.exports = router;
