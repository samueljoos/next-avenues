const { router } = require('next-avenues');

const pages = () => {
    router.add('/', 'index').as('homepage');
    router.add('/a', 'a').as('a');
    router.add('/b', 'b').as('b');
};

router.group(pages).domain('domain.nl.local').data({ lang: 'nl' });
router.group(pages).domain('domain.fr.local').data({ lang: 'fr' });

module.exports = router;
