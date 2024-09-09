"use client";

import { useAuthStore } from "@/store/Auth";
import React from "react";

function loginpage() {
  const { login } = useAuthStore();
  const [isLoading, setIsloading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //   collect the data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError("Please fill all details in form ");
      return;
    }

    //   validate
    setIsloading(() => true);
    setError(() => "");
    //   call the store

    const loginResponse = await login(email.toString(), password.toString());
    if (loginResponse.error) {
      setError(() => loginResponse.error!.message);
    }

    setIsloading(() => false);
  };

  return <div> loginpage</div>;
}

export default loginpage;
