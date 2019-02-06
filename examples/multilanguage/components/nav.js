import Link from './link';

const Nav = ({ route }) => (
    route.data ?
        <nav >
            <ul>
                <li><Link name='homepage'><a>Homepage</a></Link></li>
                <li><Link name='a'><a>A</a></Link></li>
                <li><Link name='b'><a>B</a></Link></li>
            </ul>
            <ul>
                <li><Link name={route.name} lang={ 'nl' }><a>NL</a></Link></li>
                <li><Link name={route.name} lang={ 'fr' }><a>FR</a></Link></li>
            </ul>
        </nav>
        :
        <nav></nav>
);

export default Nav;
