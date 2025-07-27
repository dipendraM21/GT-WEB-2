"use client";
import gtLogo from "@/../public/images/gt-logo.png";
import { navItems } from "@/utils/constant";
import { appRoutes } from "@/utils/routes";
import { translation } from "@/utils/translation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing icons for menu
import { Box, Text } from "theme-ui";
import { ThemeButton } from "../../core/Button/Button";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    router.push(appRoutes.login);
  };

  return (
    <Box
      as="nav"
      className={`fixed top-0 w-full bg-black shadow-md z-50 transition-all ${
        isSticky ? "sticky top-0" : ""
      }`}
    >
      <Box
        as="div"
        className="container mx-auto flex items-center justify-between px-4 py-[12px]"
      >
        <Box as="div" className="flex items-center">
          <Link href="/admin-dashboard" className="logo">
            <Image src={gtLogo} alt="gtLogo" width={100} height={100} />
          </Link>
        </Box>

        <Box as="div" className="hidden md: md:flex items-center gap-62">
          {navItems?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-decoration-none "
            >
              <Text
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  color: "grey_subtext",
                  ":hover": { color: "orange_500" },
                  "::after": {
                    content: '""',
                    display: "block",
                    height: "2px",
                    width: "100%",
                    backgroundColor: "#ff7b00",
                    position: "absolute",
                    bottom: "-4px",
                    left: "0",
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                  },
                  ":hover::after": { opacity: 1 },
                }}
                variant="Maison16Medium20"
              >
                {item.name}
              </Text>
            </Link>
          ))}
        </Box>

        <Box as="div" className="hidden md:flex">
          <ThemeButton
            variant="secondary3"
            onClick={handleClick}
            text={translation?.SIGNUP_LOGIN}
          />
        </Box>

        <Box as="div" className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? (
              <FiX color="white" size={30} />
            ) : (
              <FiMenu color="white" size={30} />
            )}
          </button>
        </Box>
      </Box>

      {isOpen && (
        <Box
          as="div"
          className="md:hidden bg-white py-4 px-6 flex flex-column items-center gap-3"
        >
          {navItems?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-decoration-none "
            >
              <Text
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  color: "grey_subtext",
                  ":hover": { color: "orange_500" },
                  "::after": {
                    content: '""',
                    display: "block",
                    height: "2px",
                    width: "100%",
                    backgroundColor: "#ff7b00",
                    position: "absolute",
                    bottom: "-4px",
                    left: "0",
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                  },
                  ":hover::after": { opacity: 1 },
                }}
                variant="Maison16Medium20"
              >
                {item.name}
              </Text>
            </Link>
          ))}

          <ThemeButton
            variant="secondary3"
            onClick={handleClick}
            sx={{ maxWidth: "160px" }}
            text={translation?.SIGNUP_LOGIN}
          />
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
