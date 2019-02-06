import { Link } from 'next-avenues';

const Nav = ({ route }) => (
    <nav >
        <ul>
            <li><Link name='homepage'><a>Homepage</a></Link></li>
            <li><Link name='a'><a>A</a></Link></li>
            <li><Link name='b'><a>B</a></Link></li>
        </ul>
        <ul>
            <li><Link domain="domain.nl.local" name={route.name} params={route.params}><a>NL</a></Link></li>
            <li><Link domain="domain.fr.local" name={route.name} params={route.params}><a>FR</a></Link></li>
        </ul>
    </nav>
);

export default Nav;
