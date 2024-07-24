"use client";
import LoginComponent from "@/components/auth/login";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className=" flex xl:flex-row flex-col w-full ">
      <div className="xl:w-1/2 bg-red-50 ">
        <Image
          src={"/LOGIN&SIGNUP.svg"}
          alt={"."}
          height={0}
          width={0}
          className=" xl:h-screen w-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center xl:w-1/2 ">
        <div className="xl:w-2/3 ">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
