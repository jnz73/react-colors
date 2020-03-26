import sizes from './sizes';
import background from './Confetti-Doodles.svg';

export default {
    '@global': {
        '.fade-exit': {
            opacity: 1
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-out'
        }
    },
    root: {
        /* background by SVGBackgrounds.com */
        backgroundColor: '#002aaa',
        backgroundImage: `url(${background})`,
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'scroll'
    },
    heading: { fontSize: '2rem' },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [sizes.down('xl')]: {
            width: '80%'
        },
        [sizes.down('xs')]: {
            width: '75%'
        }
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        '& a': {
            color: 'white'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%',
        [sizes.down('md')]: {
            gridTemplateColumns: 'repeat(2, 48%)',
            gridGap: '4%'
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: 'repeat(1,100%)',
            gridGap: '1.4rem'
        }
    }
};
