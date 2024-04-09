import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import decodeToken from "@/utils/decodeToken";
import Link from "next/link";

const NAV_MENU = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/"
  },
  {
    name: "Products",
    icon: BuildingStorefrontIcon,
    href: "/products"
  },
  {
    name: "Cart",
    icon: ShoppingCartIcon,
    href: "/cart"
  }
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as={Link}
        href={href || "#"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [dashboardLink, setDashboardLink] = React.useState<string>("");

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      // Check if token has expired
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("accountType");
      } else {
        setIsLoggedIn(true);
        const accountType = localStorage.getItem("accountType");
        if (accountType === "farmer") {
          setDashboardLink("/farmer_dashboard");
        } else {
          setDashboardLink("/user_dashboard")
        }
      }
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Typography color="blue-gray" className="text-lg font-bold">
          FarmFoodHub
        </Typography>
        <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              {name}
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-2 lg:flex">
          {isLoggedIn ? (
            <Link href={dashboardLink}>
              <Button color="gray">My Account</Button>
            </Link>
          ) : (
            <>
              <Link href={"/login"}>
                <Button variant="text">Log in</Button>
              </Link>
              <Link href={"/signup"}>
                <Button color="gray">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 mb-4 flex items-center gap-2">
          {isLoggedIn ? (
            <Link href={dashboardLink}>
              <Button color="gray">My Account</Button>
            </Link>
          ) : (
            <>
              <Link href={"/login"}>
                <Button variant="text">Log in</Button>
              </Link>
              <Link href={"/signup"}>
                <Button color="gray">Sign Up</Button>
              </Link>
            </>
          )}
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
