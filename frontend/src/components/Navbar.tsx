import { Session, Version } from "@/api/user";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { ModeToggle } from "./mode-toggle";

type MenuItem = {
  title: string;
  description?: string;
  href?: string;
  children?: MenuItem[];
};

const Menu: MenuItem[] = [
  {
    title: "Start",
    href: "/",
  },
  {
    title: "Einkauf",
    href: "/einkauf/eingabe",
  },
  {
    title: "Mitarbeiter",
    href: "/mitarbeiter",
  },
  {
    title: "Lieferanten",
    href: "/lieferanten",
  },
  {
    title: "CE Archiv",
    href: "/archiv",
  },
  {
    title: "Kundensuche",
    href: "/suche",
  },
  {
    title: "Werkstatt",
    href: "/werkstatt",
  },
];

const Navbar = () => {
  let session: Session | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, _setValue, removeValue] = useLocalStorage("session", session);

  const query = useQuery({
    queryKey: ["version"],
    queryFn: Version,
    refetchInterval: 1000 * 60 * 60 * 1, // Every Hour
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (query.isLoading) return;
    if (query.isError) return;
    if (!query.data) {
      alert("Es liegt ein Update der App vor, bitte installieren!");
      location.reload();
    }
  }, [query]);

  if (query.isPending) return <>Loading...</>;

  if (query.isError) return <>Error: {query.error.message}</>;

  return (
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {Menu.map((item, idx) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <NavigationMenuItem key={idx}>
                      <NavigationMenuTrigger>
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 p-3">
                          {item.children.map((feature, index) => (
                            <NavigationMenuLink
                              asChild
                              key={index}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <NavLink to={feature.href!}>
                                <div key={feature.title}>
                                  <p className="mb-1 font-semibold text-foreground">
                                    {feature.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </NavLink>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
              })}
              {Menu.map((item, idx) => {
                if (!item.children) {
                  return (
                    <NavigationMenuItem key={idx}>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <NavLink to={item.href!}>{item.title}</NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <ModeToggle />
            {value && value.User && (
              <Button
                variant={"outline"}
                onClick={() => {
                  removeValue();
                  location.reload();
                }}
              >
                {value?.User.User?.Name} Abmelden
              </Button>
            )}
            {(value == null || value.User == null) && (
              <>
                <Button variant="outline" asChild>
                  <NavLink to="/login">Anmelden</NavLink>
                </Button>
                <Button asChild>
                  <NavLink to="/register">Registieren</NavLink>
                </Button>
              </>
            )}
          </div>
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <NavLink to="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold tracking-tighter">
                      Victor
                    </span>
                  </NavLink>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible>
                  {Menu.map((item, idx) => {
                    if (item.children && item.children?.length > 0) {
                      return (
                        <AccordionItem
                          value={`${idx}`}
                          className="border-none"
                          key={idx}
                        >
                          <AccordionTrigger className="text-base hover:no-underline">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid md:grid-cols-2">
                              {item.children.map((feature, index) => (
                                <NavLink
                                  to={feature.href!}
                                  key={index}
                                  className="rounded-md p-3 transition-colors hover:bg-muted/70"
                                >
                                  <div key={feature.title}>
                                    <p className="mb-1 font-semibold text-foreground">
                                      {feature.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {feature.description}
                                    </p>
                                  </div>
                                </NavLink>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    }
                  })}
                </Accordion>

                <div className="flex flex-col gap-6">
                  {Menu.map((item, idx) => {
                    if (!item.children) {
                      return (
                        <NavLink
                          to={item.href!}
                          className={"font-medium"}
                          key={idx}
                        >
                          {item.title}
                        </NavLink>
                      );
                    }
                  })}
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline" asChild>
                    <NavLink to="/login">Anmelden</NavLink>
                  </Button>
                  <Button asChild>
                    <NavLink to="/register">Registieren</NavLink>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };
