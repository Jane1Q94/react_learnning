import CoffeeLogo from '../images/logo.svg';

function Header() {
  return (
    <header>
      <img src={CoffeeLogo} alt="coffe logo" />
      <h1>Code Cafe</h1>
    </header>
  );
}

export default Header;
