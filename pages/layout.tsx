import Nav from '../components/Navbar';

export default function Layout(props: any) {
  return <Nav>{props.children}</Nav>;
}
