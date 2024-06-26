const BANNER = String.raw`
 ________      ___    ___ ________   _________  ___  ___  _______   ________     
|\   ____\    |\  \  /  /|\   ___  \|\___   ___\\  \|\  \|\  ___ \ |\   __  \    
\ \  \___|    \ \  \/  / | \  \\ \  \|___ \  \_\ \  \\\  \ \   __/|\ \  \|\  \   
 \ \  \  ___   \ \    / / \ \  \\ \  \   \ \  \ \ \   __  \ \  \_|/_\ \   _  _\  
  \ \  \|\  \   \/  /  /   \ \  \\ \  \   \ \  \ \ \  \ \  \ \  \_|\ \ \  \\  \| 
   \ \_______\__/  / /      \ \__\\ \__\   \ \__\ \ \__\ \__\ \_______\ \__\\ _\ 
    \|_______|\___/ /        \|__| \|__|    \|__|  \|__|\|__|\|_______|\|__|\|__|
             \|___|/
`;

function Banner() {
  return <pre className="font-mono text-[6px] md:text-[10px]">{BANNER}</pre>;
}

function BannerSmall() {
  return <pre className="font-mono text-[6px]">{BANNER}</pre>;
}

export default Banner;
export { BannerSmall };
