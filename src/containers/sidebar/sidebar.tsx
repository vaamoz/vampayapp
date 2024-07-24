"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./sidebar.css";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [clickedTab, setClickedTab] = useState("");

  useEffect(() => {
    setOpen(true);
  }, []);

  const selectTab = (val: string) => {
    if (clickedTab === val) {
      setClickedTab("");
    } else {
      setClickedTab(val);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, width: 70 },
    visible: {
      opacity: 1,
      width: open ? 300 : 70,
      transition: { duration: 1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="hidden lg:block relative border-2 border-border-color-primary rounded-2xl shadow-sm bg-background-secondary"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`flex flex-col justify-center items-center w-full ${
          open ? "py-6" : "py-10"
        } overflow-hidden `}
      >
        <motion.div
          initial={{ scale: 1, y: 0 }}
          animate={{ y: open ? 0 : 20, scale: open ? 1 : 0.8 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: open ? 1.1 : 0.8 }}
          className="rounded-full"
        >
          <Image
            src="/profilepic.svg"
            height={60}
            width={60}
            alt="profile"
            className=""
          />
        </motion.div>

        <motion.div
          className={`flex flex-col  ${
            open ? "fade-in-text" : "hidden "
          }   overflow-hidden `}
        >
          <div className={"flex justify-center items-center gap-2"}>
            <p className="text-[#3D3E40] text-[18px] font-semibold text-text-primary">
              Admin
            </p>
            <Image src="/online.svg" height={15} width={15} alt="online" />
          </div>
          <div className="flex flex-col justify-center items-center text-[#3D3E40] text-[14px]">
            <p className="text-nowrap text-text-primary">Accounts Department</p>
            <p className="text-[#939393] text-text-secondary">OCC903948</p>
          </div>
        </motion.div>
      </motion.div>
      <hr className="pb-2" />
      <nav className="rounded-lg overflow-auto  ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col gap-2"
        >
          {[
            { id: "1", name: "Home", icon: "home", dropdown: "" },
            {
              id: "2",
              name: "Merchants Acc",
              icon: "merchantsacc",
              dropdown: "dropdown",
            },
            {
              id: "3",
              name: "Agent Acc",
              icon: "agentacc",
              dropdown: "dropdown",
            },
            {
              id: "4",
              name: "Transactions",
              icon: "transaction",
              dropdown: "dropdown",
            },
          ].map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="flex flex-col gap-2"
            >
              <button
                className={`p-2 w-full flex ${
                  open ? "justify-start" : "justify-center   "
                }  items-center gap-3 text-[#3D3E40] hover:text-black hover:bg-[#EBEBFF] px-2 rounded-full `}
                onClick={() => selectTab(item.name)}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Image
                    height={30}
                    width={30}
                    alt="home"
                    src={`/${item.icon}.svg`}
                  />
                </motion.div>
                <p
                  className={`block rounded transition duration-200 text-nowrap ${
                    open ? "" : "hidden"
                  }`}
                >
                  {item.name}
                </p>
                {item.dropdown && (
                  <Image
                    src={`/${item.dropdown}.svg`}
                    height={23}
                    width={23}
                    alt="dropdown"
                    className={`-rotate-90 ${open ? "" : "hidden"} ${
                      clickedTab === item.name ? "rotate-0 " : ""
                    }`}
                  />
                )}
              </button>

              <AnimatePresence>
                {clickedTab === item.name && item.dropdown && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                  >
                    {[
                      { id: "1", name: "Home", icon: "home", dropdown: "" },
                      {
                        id: "2",
                        name: "Merchants Acc",
                        icon: "merchantsacc",
                        dropdown: "dropdown",
                      },
                      {
                        id: "3",
                        name: "Agent Acc",
                        icon: "agentacc",
                        dropdown: "dropdown",
                      },
                      {
                        id: "4",
                        name: "Transactions",
                        icon: "transaction",
                        dropdown: "dropdown",
                      },
                    ].map((subItem) => (
                      <motion.button
                        key={subItem?.id}
                        variants={itemVariants}
                        className={`p-2 flex items-center gap-3 text-[#3D3E40] hover:text-black px-4 rounded-md ${
                          open ? "" : "justify-right"
                        }`}
                      >
                        <Image
                          height={open ? 25 : 20}
                          width={open ? 25 : 20}
                          alt="home"
                          src={`/${subItem.icon}.svg`}
                        />
                        <p
                          className={`block rounded transition duration-200 ${
                            open ? "" : "hidden"
                          }`}
                        >
                          {subItem?.name}
                        </p>
                        {subItem.dropdown && (
                          <Image
                            src={`/${item.dropdown}.svg`}
                            height={23}
                            width={23}
                            alt="dropdown"
                            className={`-rotate-90 ${open ? "" : "hidden"} ${
                              clickedTab === item.name ? "-rotate-0" : ""
                            }`}
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </nav>

      <div className="flex justify-center absolute top-8 -right-4">
        <motion.button
          className="p-2 bg-background-secondary border-2 border-border-color-primary rounded-full "
          onClick={() => setOpen(!open)}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            className={`rounded ${open ? "" : "rotate-180"} `}
            height={20}
            width={20}
            alt="sidebarshrink"
            src="/sidebarshrink.svg"
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
