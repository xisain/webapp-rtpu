import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black w-100 h-100"/>
            </div>
            <div className="grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">RTPU Admin Panel</span>   
            </div>
        </>
    );
}
